import PermohonanController from '@/actions/App/Http/Controllers/PermohonanController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UploadModalPage from '@/components/upload-file';
import AppLayout from '@/layouts/app-layout';
import { show, edit } from '@/routes/permohonan';
import Select from 'react-select';
import { ButtonLink } from '@/components/ui/button-link';

const formatRupiah = (val) => {
	const formatter = Intl.NumberFormat("id-ID");
	return "Rp "+ formatter.format(val);
}


export default function Permohonan() {
	
	const { permohonan, sarana } = usePage<SharedData>().props;
	const [jumlahSarana, setJumlahSarana] = useState<(number | '')[]>([]);
	const [durasi, setDurasi] = useState<(number | '')[]>([]);
	const [suratPermohonan, setSuratPermohonan] = useState(permohonan?.dokumen_permohonan?.find((item) => item.jenis_dokumen === 1)?.file_preview_url);
	const [suratPernyataan, setSuratPernyataan] = useState(permohonan?.dokumen_permohonan?.find((item) => item.jenis_dokumen === 2)?.file_preview_url);

	const getSubTotal = (i) => {
		const jumlah = Number(jumlahSarana[i] || 0);
		const durasiPakai = Number(durasi[i] || 0);
		const tarif = Number(sarana[i].tarif_pnbp);
		return jumlah * durasiPakai * tarif;
	};
	const getGrandTotal = () => {
		const grandTotal = sarana.reduce((total, _, i) => {
			return total + getSubTotal(i);
		}, 0);
		return grandTotal;
	};

	useEffect(() => {
		if (!sarana.length) return;

		setJumlahSarana(
			sarana.map((row) => {
				const ps = permohonan.permohonan_sarana
				.find((p) => p.sarana_id === row.id);
				return ps?.jumlah_sarana ?? "";
			})
		);

		setDurasi(
			sarana.map((row) => {
				const ps = permohonan.permohonan_sarana
				.find((p) => p.sarana_id === row.id);
				return ps?.durasi ?? "";
			})
		);
	}, [sarana, permohonan.permohonan_sarana]);


	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Edit Permohonan',
			href: edit(permohonan.id).url,
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Permohonan" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...PermohonanController.update.form(permohonan.id)}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2 grid-cols-2">
							<Label className="col-span-2" htmlFor="tanggal_awal_penggunaan">Durasi Sewa</Label>

							<div className="grid gap-2">
								<Input
									id="tanggal_awal_penggunaan"
									className="mt-1 block w-full"
									name="tanggal_awal_penggunaan"
									type="date"
									required
									autoComplete="tanggal_awal_penggunaan"
									placeholder="Tanggal Awal Penggunaan"
									defaultValue={permohonan.tanggal_awal_penggunaan}
								/>
								<InputError
									className="mt-2"
									message={errors.tanggal_awal_penggunaan}
								/>
							</div>
							<div className="grid gap-2">
								<Input
									id="tanggal_akhir_penggunaan"
									className="mt-1 block w-full"
									name="tanggal_akhir_penggunaan"
									type="date"
									required
									autoComplete="tanggal_akhir_penggunaan"
									placeholder="Tanggal Akhir Penggunaan"
									defaultValue={permohonan.tanggal_akhir_penggunaan}
								/>
								<InputError
									className="mt-2"
									message={errors.tanggal_akhir_penggunaan}
								/>
							</div>
						</div>

						<div className="grid gap-2 md:grid-cols-2">
							<div className="grid gap-2">
								<Label>Surat Permohonan</Label>
								<div>
									<UploadModalPage
										defaultFile={suratPermohonan}
										inputName="file_permohonan"
									/>
									<InputError
										className="mt-2"
										message={errors.file_permohonan}
									/>
								</div>
							</div>

							<div className="grid gap-2">
								<Label>Surat pernyataan kesanggupan mematuhi peraturan/tata tertib</Label>
								<div>
									<UploadModalPage 
										defaultFile={suratPernyataan}
										inputName="surat_pernyataan"
									/>
									<InputError
										className="mt-2"
										message={errors.surat_pernyataan}
									/>
								</div>
							</div>
						</div>

						<div className="grid gap-2 overflow-x-auto">
							<table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
								<thead className="bg-gray-700 text-white">
									<tr>
										<th className="px-4 py-2 text-left font-semibold">Nama Sarana</th>
										<th className="px-4 py-2 text-left font-semibold">Tarif</th>
										<th className="px-4 py-2 text-center font-semibold">Jumlah</th>
										<th className="px-4 py-2 text-center font-semibold">Durasi Pemakaian</th>
										<th className="px-4 py-2 text-center font-semibold">Sub Total</th>
									</tr>
								</thead>

								<tbody
									className="divide-y divide-gray-200"
									>
									{sarana.map((rowSarana, i) => (
										<tr key={i} className={i % 2 == 0 ? `bg-gray-50 dark:bg-gray-900` : ''}>
											<td className="px-4 py-2">
												{rowSarana.nama_sarana}
											</td>
											<td className="px-4 py-2">
												{rowSarana.tarif_pnbp_format} {rowSarana.satuan_tarif_format}
											</td>
											<td className="px-4 py-2 text-center">
												<Input
													className="mt-1 block w-full"
													name={jumlahSarana[i] ? `jumlah_sarana[id_${rowSarana.id}]` : ""}
													type="number"
													onChange={(e) => {
														const value = e.target.value;
														setJumlahSarana((prev) => {
															const next = [...prev];
															next[i] = value;
															return next;
														});
													}}
													min="1"
													value={jumlahSarana[i] ?? ""}
													placeholder="Jumlah sarana yang dipakai"
												/>
											</td>
											<td className="px-4 py-2 text-center">
												<Input
													className="mt-1 block w-full"
													name={durasi[i] ? `durasi[id_${rowSarana.id}]` : ""}
													type="number"
													onChange={(e) => {
														const value = e.target.value;
														setDurasi((prev) => {
															const next = [...prev];
															next[i] = value;
															return next;
														});
													}}
													min="1"
													value={durasi[i] ?? ""}
													placeholder="Durasi pemakaian sarana"
												/>
											</td>
											<td className="px-4 py-2 text-right font-medium">
												{formatRupiah(getSubTotal(i))}
											</td>
										</tr>
									))}
								</tbody>
								<tfoot
									className="divide-y divide-gray-200"
								>
									<tr>
										<td colSpan="3"></td>
										<td>Grand Total</td>
										<td className="px-4 py-2 text-right font-medium">
											{formatRupiah(getGrandTotal())}
											<Input type="hidden" name="grandTotal" defaultValue={getGrandTotal()}/>
										</td>
									</tr>
								</tfoot>
							</table>
							<InputError
								className="mt-2"
								message={errors.jumlah_sarana}
							/>
							<InputError
								className="mt-2"
								message={errors.durasi}
							/>
							<InputError
								className="mt-2"
								message={errors.grandTotal}
							/>
						</div>

						<div className="flex items-center ">
							<ButtonLink
								href={show().url}
								variant="back"
							>
								Kembali
							</ButtonLink>
							<Button
								disabled={processing}
							>
								Simpan
							</Button>

							<Transition
								show={recentlySuccessful}
								enter="transition ease-in-out"
								enterFrom="opacity-0"
								leave="transition ease-in-out"
								leaveTo="opacity-0"
							>
								<p className="text-sm text-neutral-600">
									Disimpan
								</p>
							</Transition>
						</div>
						</>
						)}
				</Form>
			</div>
		</AppLayout>
		);
}
