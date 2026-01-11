import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
	name?: string;
	title?: string;
	description?: string;
}

export default function AuthSimpleLayout({
	children,
	title,
	description,
}: PropsWithChildren<AuthLayoutProps>) {
	const { app_name } = usePage().props;
	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

			<div className="hidden md:flex flex-col justify-center items-center
				bg-gradient-to-br from-teal-600 to-cyan-500
				text-white px-12 relative overflow-hidden">

				<div className="absolute bottom-0 left-0 w-full h-40 bg-white/10 rounded-t-[100%]" />
				<div className="w-20 mb-6 z-10">
					<AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
				</div>

				<h1 className="text-4xl font-bold mb-4 z-10">
					{ app_name }
				</h1>

				<p className="text-lg text-teal-100 text-center max-w-md z-10">
					Sistem digital BBP3KP untuk pengelolaan dan peminjaman alat secara mudah, aman, dan terintegrasi.
				</p>
			</div>

			<div className="flex py-8 items-center justify-center bg-slate-100 dark:bg-slate-900  px-6">
				<div className="w-full max-w-md bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden">
					<div className="md:hidden relative bg-gradient-to-br from-teal-600 to-cyan-500 p-4 gap-4">
						<div className="absolute bottom-0 left-0 w-full h-5 bg-white/10 rounded-t-[100%]" />

						<div className="flex items-center gap-4">
							<div className="w-10">
								<AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
							</div>
							<h1 className="text-xl text-white font-bold z-10">
								{ app_name }
							</h1>
						</div>
						<p className="text-sm text-teal-100 max-w-md z-10 mt-3">
							Sistem digital BBP3KP untuk pengelolaan dan peminjaman alat secara mudah, aman, dan terintegrasi.
						</p>
					</div>

					<div className="p-8">
						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
								{title}
							</h2>
							<p className="text-slate-500 mt-1">
								{description}
							</p>
						</div>

						{children}
					</div>
				</div>
			</div>
		</div>
		);
}
