export function Timeline({ history }: { history: any[] }) {
	return (
		<div className="rounded-2xl border p-6">
			<h3 className="font-semibold mb-4">Riwayat Permohonan</h3>

			<div className="space-y-4">
				{history.map((item, i) => (
					<div key={i} className="flex gap-3">
						<span className="mt-1 w-2 h-2 rounded-full bg-primary" />
						<div>
							<p className="text-sm font-medium">
								{item.status_text}
							</p>
							<p className="text-xs text-muted-foreground">
								{item.time}
							</p>
						</div>
					</div>
					))}
			</div>
		</div>
		);
}
