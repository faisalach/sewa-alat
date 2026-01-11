import { useState } from 'react';
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
	const [step, setStep] = useState(1);

	const next = () => setStep((s) => s + 1);
	const prev = () => setStep((s) => s - 1);

	return (
		<AuthLayout
			title="Create an account"
			description="Enter your details below to create your account"
		>
			<Head title="Register" />

			{/* STEP INDICATOR */}
			<div className="flex justify-between mb-4 text-sm border-b">
				{['Akun', 'Instansi', 'Keamanan'].map((label, i) => (
					<div
						key={label}
						className={`p-3 flex-1 text-center font-medium ${
							step === i + 1
								? 'rounded border-x border-t -mb-[2px] bg-white dark:bg-gray-950 text-teal-600'
								: 'text-muted-foreground'
						}`}
					>
						{label}
					</div>
				))}
			</div>

			<Form
				{...store.form()}
				resetOnSuccess={['password', 'password_confirmation']}
				disableWhileProcessing
				className="space-y-6"
			>
				{({ processing, errors }) => (
					<>
						{/* STEP 1 */}
						{step === 1 && (
							<div className="grid gap-4">
								<div>
									<Label>Nama</Label>
									<Input name="name" placeholder="Nama Lengkap" />
									<InputError message={errors.name} />
								</div>

								<div>
									<Label>Email</Label>
									<Input name="email" placeholder="email@example.com" />
									<InputError message={errors.email} />
								</div>

								<div>
									<Label>No Telepon</Label>
									<Input name="phone" placeholder="08**********" />
									<InputError message={errors.phone} />
								</div>
							</div>
						)}

						{/* STEP 2 */}
						{step === 2 && (
							<div className="grid gap-4">
								<div>
									<Label>Instansi</Label>
									<Input name="instansi" placeholder="Nama Instansi" />
									<InputError message={errors.instansi} />
								</div>

								<div>
									<Label>Alamat</Label>
									<Input name="alamat" placeholder="Alamat Instansi" />
									<InputError message={errors.alamat} />
								</div>
							</div>
						)}

						{/* STEP 3 */}
						{step === 3 && (
							<div className="grid gap-4">
								<div>
									<Label>Password</Label>
									<Input
										type="password"
										name="password"
										placeholder="Password"
									/>
									<InputError message={errors.password} />
								</div>

								<div>
									<Label>Konfirmasi Password</Label>
									<Input
										type="password"
										name="password_confirmation"
										placeholder="Konfirmasi password"
									/>
									<InputError
										message={errors.password_confirmation}
									/>
								</div>
							</div>
						)}

						{/* ACTION BUTTONS */}
						<div className="flex gap-2 pt-2">
							{step > 1 && (
								<Button
									type="button"
									variant="outline"
									onClick={prev}
								>
									Kembali
								</Button>
							)}

							{step < 3 ? (
								<Button
									type="button"
									className="ml-auto"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										next();
									}}
								>
									Lanjut
								</Button>
								) : (
								<Button
									type="submit"
									className="ml-auto"
									tabIndex={4}
									disabled={processing}
									data-test="login-button"
								>
									{processing && <Spinner />}
									Create Account
								</Button>
								)}
						</div>

						{/* LOGIN LINK */}
						<div className="text-center text-sm text-muted-foreground">
							Already have an account?{' '}
							<TextLink href={login()}>Log in</TextLink>
						</div>
					</>
				)}
			</Form>
		</AuthLayout>
	);
}
