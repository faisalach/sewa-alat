import SaranaController from '@/actions/App/Http/Controllers/SaranaController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { show, edit } from '@/routes/sarana';
import Select from 'react-select';
import { ButtonLink } from '@/components/ui/button-link';

export default function Sarana() {
	const { data, satuan_tarif_arr, status_ketersediaan_sarana_arr } = usePage<SharedData>().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Edit Sarana',
			href: edit(data.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Sarana" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...SaranaController.update.form(data.id)}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2">
							<Label htmlFor="nama_sarana">Nama Sarana</Label>
							<Input
								id="nama_sarana"
								className="mt-1 block w-full"
								name="nama_sarana"
								defaultValue={data.nama_sarana}
								required
								autoComplete="nama_sarana"
								placeholder="Nama Sarana"
							/>
							<InputError
								className="mt-2"
								message={errors.nama_sarana}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="satuan_tarif">Satuan Tarif</Label>
							<Select
								id="satuan_tarif"
								className="mt-1 block w-full custom-react-select-container"
								classNamePrefix="custom-react-select"
								unstyled
								name="satuan_tarif"
								required
								options={satuan_tarif_arr}
								placeholder="Satuan Tarif"
								defaultValue={satuan_tarif_arr.find(
									(item) => item.value === data?.satuan_tarif
								)}
							/>
							<InputError
								className="mt-2"
								message={errors.satuan_tarif}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tarif_pnbp">Tarif PNBP</Label>
							<Input
								id="tarif_pnbp"
								className="mt-1 block w-full"
								name="tarif_pnbp"
								required
								autoComplete="tarif_pnbp"
								placeholder="Tarif PNBP"
								defaultValue={data.tarif_pnbp}
							/>
							<InputError
								className="mt-2"
								message={errors.tarif_pnbp}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="status_ketersediaan">Status Ketersediaan</Label>
							<Select
								id="status_ketersediaan"
								className="mt-1 block w-full custom-react-select-container"
								classNamePrefix="custom-react-select"
								unstyled
								name="status_ketersediaan"
								required
								options={status_ketersediaan_sarana_arr}
								placeholder="Status Ketersediaan"
								defaultValue={status_ketersediaan_sarana_arr.find(
									(item) => item.value === data?.status_ketersediaan
								)}
							/>
							<InputError
								className="mt-2"
								message={errors.status_ketersediaan}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="jumlah_sarana">Jumlah Sarana</Label>
							<Input
								id="jumlah_sarana"
								className="mt-1 block w-full"
								name="jumlah_sarana"
								required
								autoComplete="jumlah_sarana"
								placeholder="Jumlah Sarana"
								defaultValue={data.jumlah_sarana}
							/>
							<InputError
								className="mt-2"
								message={errors.jumlah_sarana}
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
