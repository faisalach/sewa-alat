import PermohonanController from '@/actions/App/Http/Controllers/PermohonanController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UploadModalPage from '@/components/upload-file';
import AppLayout from '@/layouts/app-layout';
import { show, add } from '@/routes/permohonan';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Buat Permohonan',
		href: add().url,
	},
];

const formatRupiah = (val) => {
	const formatter = Intl.NumberFormat("id-ID");
	return "Rp "+ formatter.format(val);
}

export default function Permohonan() {
	const { sarana } = usePage<SharedData>().props;
	const [jumlahSarana, setJumlahSarana] = useState<(number | '')[]>([]);
	const [durasi, setDurasi] = useState<(number | '')[]>([]);

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


	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Buat Permohonan" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...PermohonanController.store.form()}
					options={{
						preserveScroll: true,
					}}
					encType="multipart/form-data"
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
									<UploadModalPage inputName="file_permohonan"/>
									<InputError
										className="mt-2"
										message={errors.file_permohonan}
									/>
								</div>
							</div>

							<div className="grid gap-2">
								<Label>Surat pernyataan kesanggupan mematuhi peraturan/tata tertib</Label>
								<div>
									<UploadModalPage inputName="surat_pernyataan"/>
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
														const value = e.currentTarget.value;
														setJumlahSarana((prev) => {
															const newData = [...prev];
															newData[i] = value;
															return newData;
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
														const value = e.currentTarget.value;
														setDurasi((prev) => {
															const newData = [...prev];
															newData[i] = value;
															return newData;
														});
													}}
													value={durasi[i] ?? ""}
													min="1"
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

						<div className="flex items-center">
							<Link
								href={show().url}
								className="inline-flex items-center justify-center h-9 w-[90px] bg-gray-100 text-dark hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-gray-400 cursor-pointer"
							>
								Kembali
							</Link>
							<Button
								className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800 cursor-pointer"
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
