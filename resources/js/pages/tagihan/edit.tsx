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
