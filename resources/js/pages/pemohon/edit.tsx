import PemohonController from '@/actions/App/Http/Controllers/PemohonController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { show, edit } from '@/routes/pemohon';
import Select from 'react-select';
import { ButtonLink } from '@/components/ui/button-link';

export default function Pemohon() {
	const { data, role } = usePage<SharedData>().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Edit Pemohon',
			href: edit(data.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Pemohon" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...PemohonController.update.form(data.id)}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2">
							<Label htmlFor="name">Nama Pemohon</Label>
							<Input
								id="name"
								className="mt-1 block w-full"
								name="name"
								defaultValue={data.name}
								required
								autoComplete="name"
								placeholder="Nama Pemohon"
							/>
							<InputError
								className="mt-2"
								message={errors.name}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="phone">No Telp / Wa</Label>
							<Input
								id="phone"
								className="mt-1 block w-full"
								name="phone"
								defaultValue={data.phone}
								required
								autoComplete="phone"
								placeholder="08**********"
							/>
							<InputError
								className="mt-2"
								message={errors.phone}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								className="mt-1 block w-full"
								name="email"
								defaultValue={data.email}
								required
								autoComplete="email"
								placeholder="Email"
							/>
							<InputError
								className="mt-2"
								message={errors.email}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="instansi">Instansi</Label>
							<Input
								id="instansi"
								className="mt-1 block w-full"
								name="instansi"
								defaultValue={data.pemohon?.instansi}
								required
								autoComplete="instansi"
								placeholder="Instansi"
							/>
							<InputError
								className="mt-2"
								message={errors.instansi}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="alamat">Alamat Instansi</Label>
							<Input
								id="alamat"
								className="mt-1 block w-full"
								name="alamat"
								defaultValue={data.pemohon?.alamat}
								required
								autoComplete="alamat"
								placeholder="Alamat Instansi"
							/>
							<InputError
								className="mt-2"
								message={errors.alamat}
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
