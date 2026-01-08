export function NextActionCard({ status, status_bayar }) {
	if (status !== 5 && status_bayar !== 1) return null;

	return (
		<div className="rounded-2xl border bg-amber-50 p-6">
			<div className="flex items-center gap-4">
				<Upload className="w-8 h-8 text-amber-600" />
				<div>
					<h3 className="font-semibold">
						Upload Bukti Pembayaran
					</h3>
					<p className="text-sm text-muted-foreground">
						Unggah bukti pembayaran PNBP untuk diverifikasi.
					</p>
				</div>
			</div>

			<button className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm text-white">
				Upload Bukti Pembayaran
			</button>
		</div>
		);
}
