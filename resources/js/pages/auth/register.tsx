import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
	return (
		<AuthLayout
			title="Create an account"
			description="Enter your details below to create your account"
		>
			<Head title="Register" />
			<Form
				{...store.form()}
				resetOnSuccess={['password', 'password_confirmation']}
				disableWhileProcessing
				className="flex flex-col gap-6"
			>
				{({ processing, errors }) => (
					<>
					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="name">Nama</Label>
							<Input
								id="name"
								type="text"
								required
								autoFocus
								tabIndex={1}
								autoComplete="name"
								name="name"
								placeholder="Nama Lengkap"
							/>
							<InputError
								message={errors.name}
								className="mt-2"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								required
								tabIndex={2}
								autoComplete="email"
								name="email"
								placeholder="email@example.com"
							/>
							<InputError message={errors.email} />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="phone">No Telepon</Label>
							<Input
								id="phone"
								required
								tabIndex={2}
								autoComplete="phone"
								name="phone"
								placeholder="08**********"
							/>
							<InputError message={errors.phone} />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="instansi">Instansi</Label>
							<Input
								id="instansi"
								required
								tabIndex={2}
								autoComplete="instansi"
								name="instansi"
								placeholder="Nama Instansi"
							/>
							<InputError message={errors.instansi} />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="alamat">Alamat</Label>
							<Input
								id="alamat"
								required
								tabIndex={2}
								autoComplete="alamat"
								name="alamat"
								placeholder="Alamat Instansi"
							/>
							<InputError message={errors.alamat} />
						</div>
						
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								required
								tabIndex={3}
								autoComplete="new-password"
								name="password"
								placeholder="Password"
							/>
							<InputError message={errors.password} />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password_confirmation">
								Konfirmassi password
							</Label>
							<Input
								id="password_confirmation"
								type="password"
								required
								tabIndex={4}
								autoComplete="new-password"
								name="password_confirmation"
								placeholder="Konfirmassi password"
							/>
							<InputError
								message={errors.password_confirmation}
							/>
						</div>

						<Button
							type="submit"
							className="mt-2 w-full"
							tabIndex={5}
							data-test="register-user-button"
						>
							{processing && <Spinner />}
							Create account
						</Button>
					</div>

					<div className="text-center text-sm text-muted-foreground">
						Already have an account?{' '}
						<TextLink href={login()} tabIndex={6}>
							Log in
						</TextLink>
					</div>
					</>
					)}
			</Form>
		</AuthLayout>
		);
}
