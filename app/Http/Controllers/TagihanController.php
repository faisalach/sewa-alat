<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tagihan;
use App\Models\Permohonan;
use App\Models\DokumenPermohonan;

class TagihanController extends Controller
{
	public function show()
	{
		$status_bayar = status_bayar();
		return Inertia::render('tagihan/index',compact("status_bayar"));
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Tagihan::class;

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select(
			"tagihan_pnbp.id",
			"nomor_billing",
			"nomor_permohonan",
			"nominal",
			"status_bayar",
			"tanggal_kadaluarsa",
			"tagihan_pnbp.permohonan_id",
			"file_path as doc",
		);
		$query->join("permohonan","permohonan.id","=","tagihan_pnbp.permohonan_id");
		$query->leftJoin("dokumen_permohonan",[["permohonan.id","=","dokumen_permohonan.permohonan_id"],["dokumen_permohonan.jenis_dokumen","=",\DB::raw("4")]]);

        // Total data sebelum search
		$qrecordsTotal = $model::query();
		$recordsTotal  = $qrecordsTotal->count();

		if (!empty($request->input("filter_status_bayar"))) {
			$query->whereIn("status_bayar",$request->input("filter_status_bayar"));
		}

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('nomor_billing', 'like', "%{$search}%")
				->orWhere('nomor_permohonan', 'like', "%{$search}%")
				->orWhere('nominal', 'like', "%{$search}%")
				->orWhere('status_bayar', 'like', "%{$search}%")
				->orWhere('tanggal_kadaluarsa', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'nomor_billing');
		$orderDir      = $request->input('order.0.dir', 'desc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		foreach ($data as $row) {
			$row->nominal               = format_rupiah($row->nominal);
			$row->status_bayar_text     = format_name_status_bayar($row->status_bayar);
			$row->tanggal_kadaluarsa    = format_date($row->tanggal_kadaluarsa,"d/m/Y H:i");
			if (!empty($row->doc)) {
				$row->doc 				= route('dokumen.preview',['path' => $row->doc]);
			}
			$row->doc_ext 				= !empty(pathinfo($row->doc)["extension"]) ? pathinfo($row->doc)["extension"] : "";
		}

		return response()->json([
			'draw'            => intval($request->input('draw')),
			'recordsTotal'    => $recordsTotal,
			'recordsFiltered' => $recordsFiltered,
			'data'            => $data,
		]);
	}

	public function store(Request $request,$permohonan_id){
		$validated = $request->validate([
			'nomor_billing' => ['required','string'],
			'tanggal_terbit' => ['required','date','before_or_equal:tanggal_kadaluarsa'],
			'tanggal_kadaluarsa' => ['required','date','after_or_equal:tanggal_terbit'],
		]);

		$permohonan     = Permohonan::findOrFail($permohonan_id);
		if ($permohonan->status !== 3) {
			return back()->withErrors([
				'global' => 'Akses tidak dikenal!',
			]);
		}

		$tagihan					= Tagihan::where("permohonan_id",$permohonan->id)->first();
		if (empty($tagihan)) {
			$tagihan				= new Tagihan;
			$tagihan->permohonan_id	= $permohonan->id;
			$tagihan->nominal		= $permohonan->total_tarif;
			$tagihan->status_bayar 	= 1;
		}
		$tagihan->nomor_billing			= $request->nomor_billing;
		$tagihan->tanggal_terbit		= $request->tanggal_terbit;
		$tagihan->tanggal_kadaluarsa 	= $request->tanggal_kadaluarsa;
		if ($tagihan->save()) {
			update_status_permohonan($permohonan,5); // update billing
		}

		return to_route("permohonan.detail",["id" => $permohonan_id]);
	}
	public function edit($tagihan_id)
	{
		$data			= Tagihan::findOrFail($tagihan_id);
		return Inertia::render('tagihan/edit',compact("data"));
	}

	public function update(Request $request,$tagihan_id){
		$validated = $request->validate([
			'nomor_billing' => ['required','string'],
			'tanggal_terbit' => ['required','date','before_or_equal:tanggal_kadaluarsa'],
			'tanggal_kadaluarsa' => ['required','date','after_or_equal:tanggal_terbit','after_or_equal:today'],
		]);

		$tagihan						= Tagihan::findOrFail($tagihan_id);
		$tagihan->nomor_billing			= $request->nomor_billing;
		$tagihan->tanggal_terbit		= $request->tanggal_terbit;
		$tagihan->tanggal_kadaluarsa 	= $request->tanggal_kadaluarsa;

		if ($tagihan->status_bayar == 3 && $tagihan->tanggal_kadaluarsa > date("Y-m-d H:i")) {
			$tagihan->status_bayar 		= 1;
		}

		$tagihan->save();
		return to_route("tagihan.edit",["id" => $tagihan->id]);
	}
	public function upload_bukti_pembayaran(Request $request,$tagihan_id){
		$validated = $request->validate([
			'bukti_pembayaran' => ['required','file','mimes:pdf,jpg,png,bmp,jpeg'],
		]);

		$tagihan						= Tagihan::findOrFail($tagihan_id);
		$tagihan->status_bayar 			= 2;
		if ($tagihan->save()) {
			$path 						= $request->file('bukti_pembayaran')->store('uploads', 'public');

			$dokumen					= DokumenPermohonan::where("permohonan_id",$tagihan->permohonan_id)
			->where("jenis_dokumen",4)
			->first();
			if (empty($dokumen)) {
				$dokumen 					= new DokumenPermohonan;
				$dokumen->permohonan_id 	= $tagihan->permohonan_id;
				$dokumen->jenis_dokumen 	= 4; // bukti bayar
			}
			$dokumen->file_path 		= $path;
			$dokumen->save();
		}

		return to_route("tagihan.show");
	}
	public function verifikasi(Request $request,$tagihan_id){
		$validated = $request->validate([
			'status_bayar' => ['required'],
		]);

		$tagihan						= Tagihan::findOrFail($tagihan_id);
		$tagihan->status_bayar 			= !empty($request->status_bayar) ? 4 : 5; // 4 = Pembayaran Diterima, 5 = Pembayaran ditolak
		if ($tagihan->save()) {
			if (!empty($request->status_bayar)) {
				$permohonan 		= Permohonan::find($tagihan->permohonan_id);
				update_status_permohonan($permohonan,6); // sudah dibayar
			}
		}

		return to_route("tagihan.show");
	}

}
