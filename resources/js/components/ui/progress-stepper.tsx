export function ProgressStepper({ status }: { status: string }) {
	const steps = [
		"Diajukan",
		"Diverifikasi",
		"Disetujui",
		"Pembayaran",
		"Dibayar",
		"Selesai",
	];

	return (
		<div className="flex items-center justify-between">
			{steps.map((step, i) => {
				const active = steps.indexOf(status) >= i;
				return (
					<div key={step} className="flex-1 flex flex-col items-center">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center
							${active ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
						>
							✓
						</div>
						<p className="text-xs mt-1 text-center capitalize">
							{step.replace("_", " ")}
						</p>
					</div>
					);
			})}
		</div>
		);
}
