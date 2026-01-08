<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermohonanRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Pemohon;
use App\Models\Sarana;
use App\Models\Permohonan;
use App\Models\PermohonanHistory;
use App\Models\PermohonanSarana;
use App\Models\DokumenPermohonan;
use App\Models\DokumenAccessLog;

class PermohonanController extends Controller
{
	public function show()
	{
		$status_permohonan = status_permohonan();
		return Inertia::render('permohonan/index',compact("status_permohonan"));
	}
	public function prioritas()
	{
		$status_permohonan = status_permohonan();
		$status_permohonan_filtered 	= [];
		if (auth()->user()->role == 2) {
			if (auth()->user()->timja == 1) {
				$status_permohonan_filtered = [
					$status_permohonan[0]["value"],
					$status_permohonan[1]["value"],
				];
			}else if (auth()->user()->timja == 2) {
				$status_permohonan_filtered = [
					$status_permohonan[2]["value"],
					$status_permohonan[4]["value"],
					$status_permohonan[5]["value"],
				];
			}
		}
		$order_by 	= [[1,"asc"]];
		return Inertia::render('permohonan/index',compact("status_permohonan_filtered","order_by"));
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Permohonan::class;
		$user = auth()->user()->load('pemohon');

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select(
			"permohonan.id",
			"nomor_permohonan",
			"tanggal_permohonan",
			"status",
			"tanggal_awal_penggunaan",
			"tanggal_akhir_penggunaan"
		);

		if ($user->role == 1) {
			$query->where("permohonan.pemohon_id", $user->pemohon->id);
		}else if($user->role == 2){
			/*if ($user->timja == 1) {
				$query->whereIn("permohonan.status", [1,2]);
			}else if ($user->timja == 2){
				$query->whereIn("permohonan.status", [3,5,6]);
			}*/
		}

        // Total data sebelum search
		$qrecordsTotal = $model::query();
		if ($user->role == 1) {
			$qrecordsTotal->where("permohonan.pemohon_id", $user->pemohon->id);
		}else if($user->role == 2){
			/*if ($user->timja == 1) {
				$qrecordsTotal->whereIn("permohonan.status", [1,2]);
			}else if ($user->timja == 2){
				$qrecordsTotal->whereIn("permohonan.status", [3,5,6]);
			}*/
		}
		$recordsTotal  = $qrecordsTotal->count();

		if (!empty($request->input("filter_status_permohonan"))) {
			$query->whereIn("status",$request->input("filter_status_permohonan"));
		}

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('nomor_permohonan', 'like', "%{$search}%")
				->orWhere('tanggal_permohonan', 'like', "%{$search}%")
				->orWhere('status', 'like', "%{$search}%")
				->orWhere('tanggal_awal_penggunaan', 'like', "%{$search}%")
				->orWhere('tanggal_akhir_penggunaan', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'nomor_permohonan');
		$orderDir      = $request->input('order.0.dir', 'desc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		foreach ($data as $row) {
			$row->tanggal_awal_penggunaan 	= format_date($row->tanggal_awal_penggunaan);
			$row->tanggal_akhir_penggunaan 	= format_date($row->tanggal_akhir_penggunaan);
			$row->tanggal_permohonan		= format_date($row->tanggal_permohonan);
			$row->status_text				= format_name_status_permohonan($row->status);
		}

		return response()->json([
			'draw'            => intval($request->input('draw')),
			'recordsTotal'    => $recordsTotal,
			'recordsFiltered' => $recordsFiltered,
			'data'            => $data,
		]);
	}

	public function detail($id): Response
	{
		$permohonan 	= Permohonan::with([
			"pemohon.user",
			"dokumenPermohonan",
			"permohonanSarana.sarana",
			"permohonanHistory.actor",
			"tagihan",
		])->findOrFail($id);
		whoCanSee($permohonan->pemohon->user_id);

		// update status diajukan jadi diverifikasi oleh petugas UTTPP
		if (auth()->user()->role == 2 
			&& auth()->user()->timja == 1 
			&& $permohonan->status == 1) {
			update_status_permohonan($permohonan,2); // verifikasi
			$permohonan->refresh();
		}

		if (
			$permohonan->status == 5 
			&&! empty($permohonan?->tagihan) 
			&& $permohonan?->tagihan?->tanggal_kadaluarsa < date("Y-m-d H:i:s")
		) {
			$permohonan->tagihan->status_bayar 	= 3;
			$permohonan->tagihan->save();
		}

		$permohonan->status_text				= format_name_status_permohonan($permohonan->status);
		$permohonan->tanggal_awal_penggunaan	= format_date($permohonan->tanggal_awal_penggunaan);
		$permohonan->tanggal_akhir_penggunaan	= format_date($permohonan->tanggal_akhir_penggunaan);

		if (!empty($permohonan->dokumenPermohonan)) {
			foreach ($permohonan->dokumenPermohonan as $row) {
				$row->file_preview_url 	= route('dokumen.preview',['path' => $row->file_path]);
			}
		}

		if (!empty($permohonan->permohonanSarana)) {
			foreach ($permohonan->permohonanSarana as $row) {
				$row->sarana->satuan_tarif_format	= format_name_satuan_tarif($row->sarana->satuan_tarif);
			}
		}
		if (!empty($permohonan->permohonanHistory)) {
			foreach ($permohonan->permohonanHistory as $row) {
				$row->waktu	= format_date($row->created_at,"Y-m-d H:i:s");
			}
		}

		if (!empty($permohonan->tagihan)) {
			$permohonan->tagihan->nominal_format	= format_rupiah($permohonan->tagihan->nominal);
			$permohonan->tagihan->status_bayar_text	= format_name_status_bayar($permohonan->tagihan->status_bayar);
		}

		return Inertia::render('permohonan/detail',compact("permohonan"));
	}
	public function add(): Response
	{
		$sarana     = Sarana::get();
		foreach ($sarana as $row) {
			$row->tarif_pnbp_format		= format_rupiah($row->tarif_pnbp);
			$row->satuan_tarif_format	= format_name_satuan_tarif($row->satuan_tarif);
		}
		return Inertia::render('permohonan/add',compact("sarana"));
	}
	public function store(PermohonanRequest $request): RedirectResponse
	{
		$total_tarif			= 0;
		$permohonan_sarana_arr	= [];

		$sarana_arr = Sarana::get()->keyBy('id');
		foreach ($request->jumlah_sarana as $key => $val) {
			$sarana_id 		= preg_replace("/[^0-9]/", "", $key);
			$jumlah_sarana 	= !empty($val) ? $val : ""; 
			$durasi 		= !empty($request->durasi[$key]) ? $request->durasi[$key] : 0;

			if (!empty($jumlah_sarana) && !empty($durasi)) {
				$sarana 		= $sarana_arr[$sarana_id];
				$subtotal 		= $sarana->tarif_pnbp * $jumlah_sarana * $durasi;
				$total_tarif 	+= $subtotal;
				$permohonan_sarana_arr[$sarana_id] 	= [
					"sarana_id"			=> $sarana->id,
					"jumlah_sarana" 	=> $jumlah_sarana,
					"durasi" 			=> $durasi,
					"tarif_satuan" 		=> $sarana->tarif_pnbp,
					"subtotal" 			=> $subtotal,
				];
			}
		}

		if (empty($total_tarif)) {
			return back()->withErrors([
				'grandTotal' => 'Total minimal 1000',
			]);
		}


		$pemohon            = Pemohon::where("user_id",auth()->user()->id)->first();

		$permohonan								= new Permohonan;
		$permohonan->nomor_permohonan			= generate_nomor_permohonan();
		$permohonan->pemohon_id					= $pemohon->id;
		$permohonan->tanggal_permohonan			= date("Y-m-d");
		$permohonan->tanggal_awal_penggunaan	= $request->tanggal_awal_penggunaan;
		$permohonan->tanggal_akhir_penggunaan	= $request->tanggal_akhir_penggunaan;
		$permohonan->status						= 1; // diajukan
		$permohonan->total_tarif				= $total_tarif;
		$permohonan->catatan					= "";
		$save									= $permohonan->save();

		if ($save) {
			foreach ($permohonan_sarana_arr as $row) {
				$permohonan_sarana					= new PermohonanSarana;
				$permohonan_sarana->permohonan_id 	= $permohonan->id;
				$permohonan_sarana->sarana_id 		= $row["sarana_id"];
				$permohonan_sarana->jumlah_sarana 	= $row["jumlah_sarana"];
				$permohonan_sarana->durasi 			= $row["durasi"];
				$permohonan_sarana->tarif_satuan 	= $row["tarif_satuan"];
				$permohonan_sarana->subtotal 		= $row["subtotal"];
				$permohonan_sarana->save();
			}

			if (!empty($request->file('file_permohonan'))) {
				$path 						= $request->file('file_permohonan')->store('uploads', 'public');
				$dokumen 					= new DokumenPermohonan;
				$dokumen->permohonan_id 	= $permohonan->id;
				$dokumen->jenis_dokumen 	= 1;
				$dokumen->file_path 		= $path;
				$dokumen->save();
			}

			if (!empty($request->file('surat_pernyataan'))) {
				$path 						= $request->file('surat_pernyataan')->store('uploads', 'public');
				$dokumen 					= new DokumenPermohonan;
				$dokumen->permohonan_id 	= $permohonan->id;
				$dokumen->jenis_dokumen 	= 2;
				$dokumen->file_path 		= $path;
				$dokumen->save();
			}

			permohonan_history($permohonan->id,$permohonan->status);
		}

		return to_route('permohonan.show');
	}
	public function edit($id): Response
	{
		$permohonan 	= Permohonan::with(["pemohon","dokumenPermohonan","permohonanSarana"])->findOrFail($id);
		whoCanSee($permohonan->pemohon->user_id);

		$permohonan->tanggal_awal_penggunaan	= format_date($permohonan->tanggal_awal_penggunaan,"Y-m-d");
		$permohonan->tanggal_akhir_penggunaan	= format_date($permohonan->tanggal_akhir_penggunaan,"Y-m-d");
		if (!empty($permohonan->dokumenPermohonan)) {
			foreach ($permohonan->dokumenPermohonan as $row) {
				$row->file_preview_url 	= route('dokumen.preview',['path' => $row->file_path]);
			}
		}

		$sarana     = Sarana::get();
		foreach ($sarana as $row) {
			$row->tarif_pnbp_format		= format_rupiah($row->tarif_pnbp);
			$row->satuan_tarif_format	= format_name_satuan_tarif($row->satuan_tarif);
		}
		return Inertia::render('permohonan/edit',compact("sarana","permohonan"));
	}
	public function update(PermohonanRequest $request,$id): RedirectResponse
	{
		$permohonan			= Permohonan::with(["pemohon"])->findOrFail($id);
		whoCanSee($permohonan->pemohon->user_id);

		$total_tarif		= 0;
		$permohonan_sarana_arr	= [];

		$sarana_arr = Sarana::get()->keyBy('id');
		foreach ($request->jumlah_sarana as $key => $val) {
			$sarana_id 		= preg_replace("/[^0-9]/", "", $key);
			$jumlah_sarana 	= !empty($val) ? $val : ""; 
			$durasi 		= !empty($request->durasi[$key]) ? $request->durasi[$key] : 0;

			if (!empty($jumlah_sarana) && !empty($durasi)) {
				$sarana 		= $sarana_arr[$sarana_id];
				$subtotal 		= $sarana->tarif_pnbp * $jumlah_sarana * $durasi;
				$total_tarif 	+= $subtotal;
				$permohonan_sarana_arr[$sarana_id] 	= [
					"sarana_id"			=> $sarana->id,
					"jumlah_sarana" 	=> $jumlah_sarana,
					"durasi" 			=> $durasi,
					"tarif_satuan" 		=> $sarana->tarif_pnbp,
					"subtotal" 			=> $subtotal,
				];
			}
		}

		if (empty($total_tarif)) {
			return back()->withErrors([
				'grandTotal' => 'Total minimal 1000',
			]);
		}

		$permohonan->tanggal_awal_penggunaan	= $request->tanggal_awal_penggunaan;
		$permohonan->tanggal_akhir_penggunaan	= $request->tanggal_akhir_penggunaan;
		$permohonan->total_tarif				= $total_tarif;
		$save									= $permohonan->save();

		if ($save) {
			$existing = PermohonanSarana::where('permohonan_id', $permohonan->id)
			->get()
			->keyBy('sarana_id');
			foreach ($permohonan_sarana_arr as $row) {
				if (!empty($existing[$row["sarana_id"]])) {
					$permohonan_sarana 					= $existing[$row["sarana_id"]];
				}else{
					$permohonan_sarana					= new PermohonanSarana;
					$permohonan_sarana->permohonan_id 	= $permohonan->id;
					$permohonan_sarana->sarana_id 		= $row["sarana_id"];
				}
				$permohonan_sarana->jumlah_sarana 	= $row["jumlah_sarana"];
				$permohonan_sarana->durasi 			= $row["durasi"];
				$permohonan_sarana->tarif_satuan 	= $row["tarif_satuan"];
				$permohonan_sarana->subtotal 		= $row["subtotal"];
				$permohonan_sarana->save();
			}

			$incomingIds = array_keys($permohonan_sarana_arr);
			PermohonanSarana::where('permohonan_id', $permohonan->id)
			->whereNotIn('sarana_id', $incomingIds)
			->delete();

			if (!empty($request->file('file_permohonan'))) {
				$path 						= $request->file('file_permohonan')->store('uploads', 'public');
				$dokumen 					= DokumenPermohonan::where("permohonan_id",$permohonan->id)
				->where("jenis_dokumen",1)
				->first();
				if (empty($dokumen)) {
					$dokumen 					= new DokumenPermohonan;
					$dokumen->permohonan_id 	= $permohonan->id;
					$dokumen->jenis_dokumen 	= 1;
				}
				$dokumen->file_path 		= $path;
				$dokumen->save();
			}

			if (!empty($request->file('surat_pernyataan'))) {
				$path 						= $request->file('surat_pernyataan')->store('uploads', 'public');
				$dokumen 					= DokumenPermohonan::where("permohonan_id",$permohonan->id)
				->where("jenis_dokumen",2)
				->first();
				if (empty($dokumen)) {
					$dokumen 					= new DokumenPermohonan;
					$dokumen->permohonan_id 	= $permohonan->id;
					$dokumen->jenis_dokumen 	= 2;
				}
				$dokumen->file_path 		= $path;
				$dokumen->save();
			}

		}

		return to_route('permohonan.update',["id" => $id]);
	}
	public function destroy(Request $request,$id)
	{
		$data = Permohonan::with(["pemohon"])->findOrFail($id);
		whoCanSee($data->pemohon->user_id);

		$data->delete();
        // return to_route('users.show');
		return response()->json([
			'status' => true
		]);
	}
	public function preview_dokumen(Request $request,$path)
	{
		$fullPath = storage_path('app/public/' . $path);
		abort_if(!file_exists($fullPath), 404);
		return response()->file($fullPath, [
			'Content-Disposition' => 'inline'
		]);
	}

	public function document_access_log(Request $request,$doc_id)
	{
		$doc 		= DokumenPermohonan::with(["permohonan.pemohon"])->findOrFail($doc_id);
		whoCanSee($doc->permohonan->pemohon->user_id);

		$log = new DokumenAccessLog;
		$log->user_id 		= auth()->user()->id;
		$log->dokumen_id 	= $doc_id;
		$log->action 		= $request->action;
		$log->ip_address 	= $request->ip();
		$log->save();

        // return to_route('users.show');
		return response()->json([
			'status' => true
		]);
	}

	public function update_verifikasi(Request $request,$id)
	{
		$permohonan 	= Permohonan::find($id);
		$keterangan 	= $request->keterangan ?? "";
		$status 		= $request->status == 1 ? 3 : 4; // jika 1 artinya {3:Disetujui}, 0 artinya{4:Ditolak}
		$update  		= update_status_permohonan($permohonan,$status,$keterangan);
		return to_route("permohonan.detail",["id" => $id]);

	}

	public function update_selesai(Request $request,$id)
	{
		$permohonan 	= Permohonan::find($id);
		$status 		= 7; // Selesai
		$update  		= update_status_permohonan($permohonan,$status);
		return to_route("permohonan.detail",["id" => $id]);
	}
}
