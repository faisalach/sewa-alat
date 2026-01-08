<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Permohonan;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
	public function dashboard()
	{
		switch (auth()->user()->role) {
			case 1:
				return $this->dashboardPemohon();
				break;
			case 2:
				return $this->dashboardPetugas();
				break;
			case 3:
				return $this->dashboardSuperadmin();
				break;
		}
		abort_if(1,404);
	}
	public function dashboardPetugas()
	{
		$perlu_diverifikasi		= Permohonan::where("status",1)->count();
		$sedang_diverifikasi	= Permohonan::where("status",2)->count();
		$menunggu_pembayaran	= Permohonan::where("status",5)->count();
		$perlu_ditutup			= Permohonan::where("status",6)->count();
		$priority 				= [];
		if (auth()->user()->role == 2) {
			if (auth()->user()->timja == 1) {
				$priority 				= Permohonan::whereIn("status",[1,2])->get();
			}else{
				$priority 				= Permohonan::whereIn("status",[3,5,6])->get();
			}
		}
		return Inertia::render('dashboard_petugas',compact("perlu_diverifikasi","sedang_diverifikasi","menunggu_pembayaran","perlu_ditutup","priority"));
	}
	public function dashboardPemohon()
	{
		$permohonan 			= Permohonan::with("permohonanHistory")
		->where("permohonan.pemohon_id",auth()->user()->pemohon->id)
		->orderBy("tanggal_permohonan","desc")
		->limit(1)
		->first();

		if (!empty($permohonan)) {
			$permohonan->status_text 	= format_name_status_permohonan($permohonan->status);
			$permohonan->status_desc 	= desc_status_permohonan($permohonan->status);

			foreach ($permohonan->permohonanHistory as $row) {
				$row->time 	= format_date("d/m/Y H:i",$row->created_at);
			}
		}

		$summary 	= [
			"total" 	=> Permohonan::where("pemohon_id",auth()->user()->pemohon->id)->count(),
			"aktif" 	=> Permohonan::where("pemohon_id",auth()->user()->pemohon->id)->whereIn("status",[1,2,3,5,6])->count(),
			"pembayaran" => Permohonan::where("pemohon_id",auth()->user()->pemohon->id)->where("status",5)->count(),
			"selesai" 	=> Permohonan::where("pemohon_id",auth()->user()->pemohon->id)->where("status",7)->count()
		];

		return Inertia::render('dashboard_pemohon',compact("permohonan","summary"));
	}
	public function dashboardSuperadmin()
	{
		$total_permohonan		= Permohonan::whereYear("tanggal_permohonan",date("Y"))->count();
		$sedang_diverifikasi	= Permohonan::whereYear("tanggal_permohonan",date("Y"))->where("status",2)->count();
		$permohonan_aktif		= Permohonan::whereYear("tanggal_permohonan",date("Y"))->whereNotIn("status",[3,7])->count();
		$permohonan_selesai		= Permohonan::whereYear("tanggal_permohonan",date("Y"))->where("status",7)->count();
		$total_pnbp 			= Permohonan::whereYear("tanggal_permohonan",date("Y"))->where("status",7)->sum("total_tarif");

		$permohonan 			= Permohonan::select(
			DB::raw('count(id) as `data`'),
			DB::raw('SUM(IF(status = 7,total_tarif,0)) as `total_pnbp`'),
			DB::raw('MONTH(tanggal_permohonan) as `month`')
		)
		->whereYear("tanggal_permohonan",date("Y"))
		->groupBy(DB::raw('MONTH(tanggal_permohonan)'))
		->orderBy("tanggal_permohonan","ASC")
		->get();

		$graph_permohonan 		= [];
		$graph_pnbp 			= [];
		for ($i=0; $i < 12; $i++) {
			$bulan 					= $i+1;
			$graph_permohonan[$i] 	= [
				"name" 	=> date("M",strtotime(date("Y-$bulan-d"))),
				"value"	=> 0
			];
			$graph_pnbp[$i] 		= [
				"name" 	=> date("M",strtotime(date("Y-$bulan-d"))),
				"value"	=> 0
			];
		}
		foreach ($permohonan as $row) {
			$bulan 						= $row->month;
			$graph_permohonan[$bulan - 1]["value"] 	= $row->data;
			$graph_pnbp[$bulan - 1]["value"] 		= $row->total_pnbp;
		}


		$stats 					= [
			"total_permohonan" 		=> $total_permohonan,
			"permohonan_aktif" 		=> $permohonan_aktif,
			"permohonan_selesai" 	=> $permohonan_selesai,
			"total_pnbp" 			=> format_rupiah($total_pnbp)
		];

		return Inertia::render('dashboard_superadmin',compact("stats","graph_permohonan","graph_pnbp"));
	}
}
