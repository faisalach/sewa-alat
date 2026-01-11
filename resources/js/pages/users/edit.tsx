import UsersController from '@/actions/App/Http/Controllers/UsersController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { show, edit } from '@/routes/users';
import Select from 'react-select';
import { ButtonLink } from '@/components/ui/button-link';


export default function Users() {
	const { data, role, timja_arr } = usePage<SharedData>().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Edit Petugas',
			href: edit(data.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Petugas" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="bg-white dark:bg-slate-950 relative rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
					<Form
						{...UsersController.update.form(data.id)}
						options={{
							preserveScroll: true,
						}}
						className="space-y-6"
					>
						{({ processing, recentlySuccessful, errors }) => (
							<>
							<div className="grid gap-2">
								<Label htmlFor="name">Nama Petugas</Label>
								<Input
									id="name"
									className="mt-1 block w-full"
									name="name"
									defaultValue={data.name}
									required
									autoComplete="name"
									placeholder="Nama Petugas"
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
								<Label htmlFor="timja">Tim Kerja</Label>
								<Select
									id="timja"
									className="custom-react-select-container"
									classNamePrefix="custom-react-select"
									unstyled
									name="timja"
									required
									options={timja_arr}
									placeholder="Tim Kerja"
									defaultValue={timja_arr.find(
										(item) => item.value === data?.timja
									)}
								/>
								<InputError
									className="mt-2"
									message={errors.timja}
								/>
							</div>

							<div className="flex items-center">
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
			</div>
		</AppLayout>
		);
}
