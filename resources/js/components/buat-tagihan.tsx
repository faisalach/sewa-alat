import TagihanController from '@/actions/App/Http/Controllers/TagihanController';
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BuatTagihan({permohonan}) {
	const [open, setOpen] = useState(false);

	return (
		<>
		<Button
			variant="secondary"
			onClick={() => setOpen(true)}
		>
			Buat Tagihan
		</Button>

		<Modal
			open={open}
			onClose={() => setOpen(false)}
			title="Buat Tagihan"
		>
			<Form
				{...TagihanController.store.form(permohonan.id)}
				options={{
					preserveScroll: true,
				}}
				className="space-y-6"
			>
				{({ processing, recentlySuccessful, errors }) => {
					if (recentlySuccessful) {
						setOpen(false);
					}
					return (
					<>
					<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
						<div className="grid gap-2">
							<Label htmlFor="nomor_billing">Kode Billing</Label>
							<Input
								id="nomor_billing"
								className="mt-1 block w-full"
								required
								name="nomor_billing"
								autoComplete="nomor_billing"
								placeholder="Kode Billing"
							/>
							<InputError
								className="mt-2"
								message={errors?.nomor_billing}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tanggal_terbit">Tanggal Terbit Billing</Label>
							<Input
								id="tanggal_terbit"
								className="mt-1 block w-full"
								type="datetime-local"
								name="tanggal_terbit"
								required
								autoComplete="tanggal_terbit"
								placeholder="Tanggal Terbit"
							/>
							<InputError
								className="mt-2"
								message={errors?.tanggal_terbit}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tanggal_kadaluarsa">Tanggal Kadaluarsa Billing</Label>
							<Input
								id="tanggal_kadaluarsa"
								className="mt-1 block w-full"
								type="datetime-local"
								name="tanggal_kadaluarsa"
								required
								autoComplete="tanggal_kadaluarsa"
								placeholder="Tanggal Kadaluarsa"
							/>
							<InputError
								className="mt-2"
								message={errors?.tanggal_kadaluarsa}
							/>
						</div>
					</div>

					<div className="flex justify-end gap-2 mt-4">
						<InputError
							className="mt-2"
							message={errors?.global}
						/>
						<Button
							variant="back"
							onClick={() => setOpen(false)}
						>
							Tutup
						</Button>
						<Button
							disabled={processing}
						>
							Submit
						</Button>
					</div>
					</>
					)}}
			</Form>
		</Modal>
		</>
		);
}