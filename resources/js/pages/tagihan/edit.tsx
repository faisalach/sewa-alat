import TagihanController from '@/actions/App/Http/Controllers/TagihanController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { show, edit } from '@/routes/tagihan';
import Select from 'react-select';
import { ButtonLink } from '@/components/ui/button-link';


export default function Tagihan() {
	const { data } = usePage<SharedData>().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Edit Tagihan',
			href: edit(data.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Tagihan" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...TagihanController.update.form(data.id)}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2">
							<Label htmlFor="nomor_billing">Kode Billing</Label>
							<Input
								id="nomor_billing"
								className="mt-1 block w-full"
								name="nomor_billing"
								defaultValue={data.nomor_billing}
								required
								autoComplete="nomor_billing"
								placeholder="Kode Billing"
							/>
							<InputError
								className="mt-2"
								message={errors.nomor_billing}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tanggal_terbit">Tanggal Terbit Billing</Label>
							<Input
								id="tanggal_terbit"
								className="mt-1 block w-full"
								name="tanggal_terbit"
								type="datetime-local"
								defaultValue={data.tanggal_terbit}
								required
								autoComplete="tanggal_terbit"
								placeholder="Tanggal Terbit"
							/>
							<InputError
								className="mt-2"
								message={errors.tanggal_terbit}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tanggal_kadaluarsa">Tanggal Kadaluarsa Billing</Label>
							<Input
								id="tanggal_kadaluarsa"
								className="mt-1 block w-full"
								name="tanggal_kadaluarsa"
								type="datetime-local"
								defaultValue={data.tanggal_kadaluarsa}
								required
								autoComplete="tanggal_kadaluarsa"
								placeholder="Tanggal Terbit"
							/>
							<InputError
								className="mt-2"
								message={errors.tanggal_kadaluarsa}
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
