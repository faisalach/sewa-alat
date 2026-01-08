import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan profile',
        href: edit().url,
    },
];

export default function Profile() {
    const { auth, pemohon } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan profile" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Informasi profile"
                        description="Perbarui profile Anda"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama Lengkap</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Nama Lengkap"
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
                                    defaultValue={auth.user.phone}
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
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            {auth.user.role == 1 && (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="instansi">Instansi</Label>

                                        <Input
                                            id="instansi"
                                            className="mt-1 block w-full"
                                            defaultValue={pemohon?.instansi}
                                            name="instansi"
                                            required
                                            autoComplete="instansi"
                                            placeholder="Nama Instansi"
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
                                            defaultValue={pemohon?.alamat}
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
                                </>
                            )}

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
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

            </SettingsLayout>
        </AppLayout>
        );
}
