<?php
if (! function_exists('format_name_timja')) {
	function format_name_timja($name) {
		switch ($name) {
			case 1:
				return "UTTPP";
				break;
			case 2:
				return "TU";
				break;
		}
		return $name;
	}
}

if (! function_exists('timja')) {
	function timja() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_timja(1)
			],
			[
				"value"  	=> 2,
				"label"	=> format_name_timja(2)
			]
		];
	}
}
if (! function_exists('format_name_role')) {
	function format_name_role($name) {
		switch ($name) {
			case 1:
				return "Pemohon";
				break;
			case 2:
				return "Petugas";
				break;
			case 3:
				return "Superadmin";
				break;
		}
		return $name;
	}
}

if (! function_exists('role')) {
	function role() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_role(1)
			],
			[
				"value"  	=> 2,
				"label"	=> format_name_role(2)
			],
			[
				"value"  	=> 3,
				"label"	=> format_name_role(3)
			]
		];
	}
}
if (! function_exists('format_name_status_permohonan')) {
	function format_name_status_permohonan($name) {
		switch ($name) {
			case 1:
				return "Diajukan";
				break;
			case 2:
				return "Diverifikasi";
				break;
			case 3:
				return "Disetujui";
				break;
			case 4:
				return "Ditolak";
				break;
			case 5:
				return "Pembayaran";
				break;
			case 6:
				return "Dibayar";
				break;
			case 7:
				return "Selesai";
				break;
		}
		return $name;
	}
}
if (! function_exists('desc_status_permohonan')) {
	function desc_status_permohonan($name) {
		switch ($name) {
			case 1:
				return "Permohonan anda sedang diproses.";
				break;
			case 2:
				return "Permohonan sedang diverifikasi petugas.";
				break;
			case 3:
				return "Permohonan telah disetujui.";
				break;
			case 4:
				return "Maaf, Permohonan anda ditolak.";
				break;
			case 5:
				return "Silakan lakukan pembayaran PNBP.";
				break;
			case 6:
				return "Pembayaran sudah diverifikasi.";
				break;
			case 7:
				return "Layanan telah selesai.";
				break;
		}
		return $name;
	}
}

if (! function_exists('status_permohonan')) {
	function status_permohonan() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_status_permohonan(1)
			],
			[
				"value"  	=> 2,
				"label"	=> format_name_status_permohonan(2)
			],
			[
				"value"  	=> 3,
				"label"	=> format_name_status_permohonan(3)
			],
			[
				"value"  	=> 4,
				"label"	=> format_name_status_permohonan(4)
			],
			[
				"value"  	=> 5,
				"label"	=> format_name_status_permohonan(5)
			],
			[
				"value"  	=> 6,
				"label"	=> format_name_status_permohonan(6)
			],
			[
				"value"  	=> 7,
				"label"	=> format_name_status_permohonan(7)
			]
		];
	}
}
if (! function_exists('format_name_status_verifikasi')) {
	function format_name_status_verifikasi($name) {
		switch ($name) {
			case 1:
				return "Review";
				break;
			case 2:
				return "Disetujui";
				break;
			case 3:
				return "Ditolak";
				break;
		}
		return $name;
	}
}

if (! function_exists('status_verifikasi')) {
	function status_verifikasi() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_status_verifikasi(1)
			],
			[
				"value"  	=> 2,
				"label"	=> format_name_status_verifikasi(2)
			],
			[
				"value"  	=> 3,
				"label"	=> format_name_status_verifikasi(3)
			]
		];
	}
}
if (! function_exists('format_name_status_bayar')) {
	function format_name_status_bayar($name) {
		switch ($name) {
			case 1:
				return "Menunggu Pembayaran";
				break;
			case 2:
				return "Lunas";
				break;
			case 3:
				return "Kadaluarsa";
				break;
			case 4:
				return "Diterima";
				break;
			case 5:
				return "Ditolak";
				break;
		}
		return $name;
	}
}

if (! function_exists('status_bayar')) {
	function status_bayar() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_status_bayar(1)
			],
			[
				"value"	=> 2,
				"label"	=> format_name_status_bayar(2)
			],
			[
				"value"	=> 3,
				"label"	=> format_name_status_bayar(3)
			],
			[
				"value"	=> 4,
				"label"	=> format_name_status_bayar(4)
			],
			[
				"value"	=> 5,
				"label"	=> format_name_status_bayar(5)
			]
		];
	}
}
if (! function_exists('format_name_jenis_dokumen')) {
	function format_name_jenis_dokumen($name) {
		switch ($name) {
			case 1:
				return "Surat Permohonan";
				break;
			case 2:
				return "Surat pernyataan kesanggupan mematuhi peraturan/tata tertib";
				break;
			case 3:
				return "KTP";
				break;
			case 4:
				return "Bukti Bayar";
				break;
		}
		return $name;
	}
}

if (! function_exists('jenis_dokumen')) {
	function jenis_dokumen() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_jenis_dokumen(1)
			],
			[
				"value"	=> 2,
				"label"	=> format_name_jenis_dokumen(2)
			],
			[
				"value"	=> 3,
				"label"	=> format_name_jenis_dokumen(3)
			],
			[
				"value"	=> 4,
				"label"	=> format_name_jenis_dokumen(4)
			]
		];
	}
}
if (! function_exists('format_name_action_dokumen')) {
	function format_name_action_dokumen($name) {
		switch ($name) {
			case 1:
				return "View";
				break;
			case 2:
				return "Download";
				break;
		}
		return $name;
	}
}

if (! function_exists('action_dokumen')) {
	function action_dokumen() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_action_dokumen(1)
			],
			[
				"value"	=> 2,
				"label"	=> format_name_action_dokumen(2)
			],
		];
	}
}

if (! function_exists('format_name_satuan_tarif')) {
	function format_name_satuan_tarif($name) {
		switch ($name) {
			case 1:
				return "Unit/Hari";
				break;
			case 2:
				return "Unit/Bulan";
				break;
			case 3:
				return "Unit/Jam";
				break;
			case 4:
				return "Kg";
				break;
		}
		return $name;
	}
}

if (! function_exists('satuan_tarif')) {
	function satuan_tarif() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_satuan_tarif(1)
			],
			[
				"value"	=> 2,
				"label"	=> format_name_satuan_tarif(2)
			],
			[
				"value"	=> 3,
				"label"	=> format_name_satuan_tarif(3)
			],
			[
				"value"	=> 4,
				"label"	=> format_name_satuan_tarif(4)
			],
		];
	}
}
if (! function_exists('format_name_status_ketersediaan_sarana')) {
	function format_name_status_ketersediaan_sarana($name) {
		switch ($name) {
			case 1:
				return "Tersedia";
				break;
			case 0:
				return "Tidak Tersedia";
				break;
		}
		return $name;
	}
}

if (! function_exists('status_ketersediaan_sarana')) {
	function status_ketersediaan_sarana() {
		return [
			[
				"value"	=> 1,
				"label"	=> format_name_status_ketersediaan_sarana(1)
			],
			[
				"value"	=> 0,
				"label"	=> format_name_status_ketersediaan_sarana(0)
			],
		];
	}
}

if (! function_exists('format_rupiah')) {
	function format_rupiah($value) {
		return "Rp " . number_format($value, 0, ',', '.');
	}
}
if (! function_exists('format_date')) {
	function format_date($value, $format = "d/m/y") {
		return date($format, strtotime($value));
	}
}


if (! function_exists('permohonan_history')) {
	function permohonan_history($permohonan_id,$status,$keterangan = "") {
		$permohonan_history = new App\Models\PermohonanHistory;
		$permohonan_history->permohonan_id 	= $permohonan_id;
		$permohonan_history->status 		= $status;
		$permohonan_history->keterangan		= $keterangan;
		$permohonan_history->actor_id		= auth()->user()->id;
		$permohonan_history->actor_role		= auth()->user()->role;
		return $permohonan_history->save();
	}
}

if (! function_exists('update_status_permohonan')) {
	function update_status_permohonan(App\Models\Permohonan $permohonan,$status,$keterangan = "") {
		$permohonan->status 		= $status;
		$permohonan->catatan		= $keterangan;
		$update 					= $permohonan->save();
		
		if ($update) {
			if ($permohonan->status == 2) { // verifikasi
				$verifikasi 					= new App\Models\Verifikasi;
				$verifikasi->permohonan_id 		= $permohonan->id;
				$verifikasi->verifikator_id 	= auth()->user()->id;
				$verifikasi->status_verifikasi 	= 1;
				$verifikasi->catatan 			= $keterangan;
				$verifikasi->tanggal_verifikasi	= date("Y-m-d H:i:s");
				$verifikasi->save();
			}
			if ($permohonan->status == 3) { // disetujui
				$verifikasi 					= App\Models\Verifikasi::where("permohonan_id",$permohonan->id)->first();
				$verifikasi->status_verifikasi 	= 2;
				$verifikasi->catatan 			= $keterangan;
				$verifikasi->save();
			}
			if ($permohonan->status == 4) { // ditolak
				$verifikasi 					= App\Models\Verifikasi::where("permohonan_id",$permohonan->id)->first();
				$verifikasi->status_verifikasi 	= 3;
				$verifikasi->catatan 			= $keterangan;
				$verifikasi->save();
			}
		}

		return permohonan_history($permohonan->id,$status,$keterangan);
	}
}


if (! function_exists('whoCanSee')) {
	function whoCanSee($user_id,$roles = []) {
		if (empty($roles)) {
			$roles 	= [2,3];
		}

		if ($user_id !== auth()->user()->id && !in_array(auth()->user()->role, $roles)) {
			abort(403, 'Anda tidak berhak mengakses data ini');
		}

		return true;
	}
}

if (! function_exists('generate_nomor_permohonan')) {
	function generate_nomor_permohonan()
	{
		$prefix 	= "SWA-BBP3KP";
		$tahun 		= date("Y");
		$bulan 		= date("m");
		$lastNumber = App\Models\Permohonan::whereYear('created_at', $tahun)
		->whereMonth('created_at', $bulan)
		->count() + 1;
		$urut = str_pad($lastNumber, 4, '0', STR_PAD_LEFT);

		return "{$prefix}/{$tahun}/{$bulan}/{$urut}";
	}
}