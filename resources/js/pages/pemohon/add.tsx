import PemohonController from '@/actions/App/Http/Controllers/PemohonController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { show, add } from '@/routes/pemohon';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Tambah Pemohon',
		href: add().url,
	},
];

export default function Pemohon() {
	const { role } = usePage<SharedData>().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Tambah Pemohon" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...PemohonController.store.form()}
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
								required
								autoComplete="email"
								placeholder="Email"
								type="email"
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
								required
								autoComplete="alamat"
								placeholder="Alamat Instansi"
							/>
							<InputError
								className="mt-2"
								message={errors.alamat}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								className="mt-1 block w-full"
								name="password"
								required
								autoComplete="password"
								placeholder="Password"
							/>
							<InputError
								className="mt-2"
								message={errors.password}
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
