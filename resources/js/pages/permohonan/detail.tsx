import PermohonanController from '@/actions/App/Http/Controllers/PermohonanController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import ButtonViewDoc from '@/components/button-view-doc';
import BuatTagihan from '@/components/buat-tagihan';
import AppLayout from '@/layouts/app-layout';
import { show, edit, update_verifikasi, update_selesai } from '@/routes/permohonan';
import Swal from 'sweetalert2';
import { ButtonLink } from '@/components/ui/button-link';

const formatRupiah = (val) => {
	const formatter = Intl.NumberFormat("id-ID");
	return "Rp "+ formatter.format(val);
}

export default function Permohonan() {
	
	const { auth, permohonan } = usePage<SharedData>().props;
	const [suratPermohonan, setSuratPermohonan] = useState(permohonan?.dokumen_permohonan?.find((item) => item.jenis_dokumen === 1));
	const [suratPernyataan, setSuratPernyataan] = useState(permohonan?.dokumen_permohonan?.find((item) => item.jenis_dokumen === 2));

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Detail Permohonan',
			href: edit(permohonan.id).url,
		},
	];

	const map = {
		1: 'bg-yellow-400 text-yellow-800',
		2: 'bg-blue-400 text-blue-800',
		3: 'bg-green-400 text-green-800',
		4: 'bg-red-400 text-red-800',
		5: 'bg-purple-400 text-purple-800',
		6: 'bg-gray-500 text-gray-900',
		7: 'bg-lime-500 text-lime-900',
	} as const;


	const statusClass = map[permohonan?.status as keyof typeof map] ?? 'bg-gray-100 text-gray-700';
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Detail Permohonan" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				
				<div className="grid gap-2 overflow-x-auto dark:shadow-gray-900 shadow-md rounded-lg">
					<div className="max-w-full mx-auto pt-4">
						<h2 className="text-xl font-semibold mb-6 text-center">Timeline Status Permohonan</h2>
					</div>
					<div className="max-w-full mx-auto pb-4 px-4">
						<div className="relative flex items-center justify-start space-x-12 px-6 overflow-x-auto">
							<div className="absolute top-[10px] left-[73px] right-[30px] h-1 bg-gray-300 z-0"></div>
							{permohonan?.permohonan_history.map((item, idx) => (
								<div
									key={idx}
									className="relative z-10 flex flex-col items-center min-w-[100px] text-center"
								>
									<span
										className={`w-6 h-6 rounded-full border-2 border-white shadow-md ${map[item.status]}`}
										aria-hidden="true"
									/>
									<h3 className="mt-2 font-semibold text-gray-900 dark:text-gray-200">{item.status_text}</h3>
									<time className="text-xs text-gray-500">{item.waktu}</time>
									{(auth.user.role == 3) && (
										<p className="text-xs text-gray-600">By: {item.actor.name}</p>
									)}
								</div>
								))}
						</div>
					</div>
				</div>

				<div className="grid gap-2 dark:shadow-gray-900 shadow-md rounded-lg">
					<table className="w-full border border-gray-200 rounded-lg overflow-hidden">
						<thead className="bg-cyan-600 text-white">
							<tr>
								<th colSpan="2" className="px-4 py-2 text-left font-semibold">Data Pemohon</th>
							</tr>
						</thead>
						<tbody className="">
							<tr className="bg-gray-100 dark:bg-gray-900">
								<td className="w-[200px] px-4 py-2 font-medium text-gray-600 dark:text-gray-300 w-1/3">
									Nomor Permohonan
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
									: {permohonan?.nomor_permohonan}
								</td>
							</tr>
							<tr className="bg-gray-50 dark:bg-gray-950">
								<td className="w-[200px] px-4 py-2 font-medium text-gray-600 dark:text-gray-300 w-1/3">
									Nama Pemohon
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
									: {permohonan?.pemohon?.user?.name}
								</td>
							</tr>
							<tr className="bg-gray-100 dark:bg-gray-900">
								<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
									Instansi
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
									: {permohonan?.pemohon?.instansi}
								</td>
							</tr>
							<tr className="bg-gray-50 dark:bg-gray-950">
								<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
									Alamat Instansi
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
									: {permohonan?.pemohon?.alamat}
								</td>
							</tr>
							<tr className="bg-gray-100 dark:bg-gray-900">
								<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
									Durasi Sewa
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
									: {
										permohonan?.tanggal_awal_penggunaan === permohonan?.tanggal_akhir_penggunaan
										? permohonan?.tanggal_awal_penggunaan
										: `${permohonan?.tanggal_awal_penggunaan} - ${permohonan?.tanggal_akhir_penggunaan}`
									}
								</td>
							</tr>
							<tr className="bg-gray-50 dark:bg-gray-950">
								<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
									Surat Permohonan
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
									<div className="flex items-center gap-2">
										: <ButtonViewDoc
											id={suratPermohonan?.id}
											file={suratPermohonan?.file_preview_url}
											/>
									</div>
								</td>
							</tr>
							<tr className="bg-gray-100 dark:bg-gray-900">
								<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
									Surat Pernyataan
								</td>
								<td className="px-4 py-2 text-gray-900 dark:text-gray-100 ">
									<div className="flex items-center gap-2">
										: <ButtonViewDoc
											id={suratPernyataan?.id}
											file={suratPernyataan?.file_preview_url}
											/>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="grid gap-2 overflow-x-auto dark:shadow-gray-900 shadow-md rounded-lg">
					<table className="w-full border border-gray-300 rounded-lg overflow-hidden">
						<thead  >
							<tr className="bg-cyan-600 text-white">
								<th colSpan="5" className="px-4 py-2 text-left font-semibold">Sarana</th>
							</tr>
							<tr className="border-b border-gray-400 dark:border-gray-600 ">
								<th className="px-4 py-2 text-left font-semibold">Nama Sarana</th>
								<th className="px-4 py-2 text-left font-semibold">Tarif</th>
								<th className="px-4 py-2 text-center font-semibold">Jumlah</th>
								<th className="px-4 py-2 text-center font-semibold">Durasi Pemakaian</th>
								<th className="px-4 py-2 text-center font-semibold">Sub Total</th>
							</tr>
						</thead>

						<tbody className="">
							{permohonan?.permohonan_sarana.map((rowSarana, i) => (
								<tr key={i} className={i % 2 == 0 ? `bg-gray-100 dark:bg-gray-900` : 'bg-gray-50 dark:bg-gray-950'}>
									<td className="px-4 py-2">
										{rowSarana?.sarana.nama_sarana}
									</td>
									<td className="px-4 py-2">
										{formatRupiah( rowSarana?.tarif_satuan )} /{rowSarana?.sarana?.satuan_tarif_format}
									</td>
									<td className="px-4 py-2 text-center">
										{rowSarana?.jumlah_sarana}
									</td>
									<td className="px-4 py-2 text-center">
										{rowSarana?.durasi}
									</td>
									<td className="px-4 py-2 text-right font-medium">
										{formatRupiah( rowSarana?.subtotal )}
									</td>
								</tr>
								))}
						</tbody>
						<tfoot
							className="divide-y divide-gray-200"
						>
							<tr className="border-t border-gray-400 dark:border-gray-600">
								<td colSpan="3"></td>
								<td>Grand Total</td>
								<td className="px-4 py-2 text-right font-medium">
									{formatRupiah(permohonan?.total_tarif)}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>

				{permohonan?.tagihan && (
					<div className="grid gap-2 dark:shadow-gray-900 shadow-md rounded-lg">
						<table className="w-full border border-gray-200 rounded-lg overflow-hidden">
							<thead className="bg-cyan-600 text-white">
								<tr>
									<th colSpan="2" className="px-4 py-2 text-left font-semibold">Data Tagihan PNBP</th>
								</tr>
							</thead>
							<tbody className="">
								<tr className="bg-gray-100 dark:bg-gray-900">
									<td className="w-[200px] px-4 py-2 font-medium text-gray-600 dark:text-gray-300 w-1/3">
										Kode Billing
									</td>
									<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
										: {permohonan?.tagihan?.nomor_billing}
									</td>
								</tr>
								<tr className="bg-gray-50 dark:bg-gray-950">
									<td className="w-[200px] px-4 py-2 font-medium text-gray-600 dark:text-gray-300 w-1/3">
										Nominal
									</td>
									<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
										: {permohonan?.tagihan?.nominal_format}
									</td>
								</tr>
								<tr className="bg-gray-100 dark:bg-gray-900">
									<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
										Status Bayar
									</td>
									<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
										: {permohonan?.tagihan?.status_bayar_text}
									</td>
								</tr>
								<tr className="bg-gray-50 dark:bg-gray-950">
									<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
										Tanggal Terbit
									</td>
									<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
										: {permohonan?.tagihan?.tanggal_terbit}
									</td>
								</tr>
								<tr className="bg-gray-100 dark:bg-gray-900">
									<td className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300">
										Tanggal Kadaluarsa
									</td>
									<td className="px-4 py-2 text-gray-900 dark:text-gray-100">
										: {permohonan?.tagihan?.tanggal_kadaluarsa}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}


				<div className="flex items-center ">
					<ButtonLink
						onClick={() => window.history.back()}
						variant="back"
					>
						Kembali
					</ButtonLink>

					{((auth.user.role === 3 || (auth.user.role == 2 && auth.user.timja == 1)) && permohonan.status == 1) && (
						<>
							<Button
								variant="secondary"
								onClick={() => handleVerifikasi(update_verifikasi(permohonan?.id).url,1)}
							>
								Setujui
							</Button>
							<Button
								variant="destructive"
								onClick={() => handleVerifikasi(update_verifikasi(permohonan?.id).url,0)}
							>
								Tolak
							</Button>
						</>
					)}

					{((auth.user.role === 3 
						|| (auth.user.role == 2 && auth.user.timja == 2))
						&& (permohonan.status == 3 
							|| (permohonan.status == 5 
								&& permohonan.tagihan.status_bayar == 3))) && (
						<BuatTagihan permohonan={permohonan}/>
					)}

					{((auth.user.role === 3 || (auth.user.role == 2 && auth.user.timja == 1)) && permohonan.status == 6) && (
						<>
							<Button
								className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800 cursor-pointer"
								onClick={() => handleSelesai(update_selesai(permohonan?.id).url)}
							>
								Selesaikan
							</Button>
						</>
					)}

				</div>
			</div>
		</AppLayout>
		);
}

function handleVerifikasi(url,status){
	Swal.fire({
		title: 'Konfirmasi Verifikasi',
		// text: 'Apakah Anda yakin ingin menghapus data ini?',
		input: "text",
		inputAttributes: {
			autocapitalize: "off",
			placeholder:"Catatan"
		},
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: (status == 1 ? "Ya, Setujui" : "Ya, Tolak"),
		cancelButtonText: 'Batal',
		reverseButtons: true,
		confirmButtonColor: (status == 1 ? "#3085d6" : "#d33")
	}).then((result) => {
		if (!result.isConfirmed) return;

		Swal.fire({
			title: 'Memproses...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		router.post(
			url,
			{
				keterangan: result.value,
				status: status,
			},
			{
				preserveScroll: true,
				onSuccess: () => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil',
						text: `Permohonan berhasil ${
							status === 1 ? 'disetujui' : 'ditolak'
						}.`,
					});
				},
				onError: () => {
					Swal.fire({
						icon: 'error',
						title: 'Gagal',
						text: 'Terjadi kesalahan saat update data.',
					});
				},
			}
		);

	});
};
function handleSelesai(url,status){
	Swal.fire({
		title: 'Konfirmasi Selesai',
		text: 'Apakah Anda yakin ingin menyelesaikan data permohonan ini?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: "Ya, Selesai",
		cancelButtonText: 'Batal',
		reverseButtons: true,
		confirmButtonColor: "#3085d6"
	}).then((result) => {
		if (!result.isConfirmed) return;

		Swal.fire({
			title: 'Memproses...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		router.post(
			url,
			{
				preserveScroll: true,
				onSuccess: () => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil',
						text: `Permohonan berhasil diselesaikan.`,
					});
				},
				onError: () => {
					Swal.fire({
						icon: 'error',
						title: 'Gagal',
						text: 'Terjadi kesalahan saat update data.',
					});
				},
			}
		);

	});
};
