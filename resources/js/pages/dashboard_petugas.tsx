import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';

import DashboardCard from '@/components/ui/dashboard-card';
import { ButtonLink } from '@/components/ui/button-link';
import { ChartNilai } from '@/components/ui/chart-nilai';
import { ChartProgress } from '@/components/ui/chart-progress';
import { prioritas as permohonan_prioritas } from '@/routes/permohonan';
import {
    RefreshCcw,
    FileSearch,
    CheckCircle,
    Receipt,
    CircleAlert,
    TriangleAlert
} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: dashboard().url,
	},
];

export default function Dashboard() {
	const {
		perlu_diverifikasi,
		sedang_diverifikasi,
		menunggu_pembayaran,
		perlu_ditutup,
		priority = [],
	} = usePage().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<DashboardCard
						variant="soft"
						color="red"
						value={perlu_diverifikasi ?? 0}
						subtitle="Perlu Diverifikasi"
						icon={FileSearch}
					/>

					<DashboardCard
						variant="soft"
						color="amber"
						value={sedang_diverifikasi ?? 0}
						subtitle="Sedang Diverifikasi"
						icon={RefreshCcw}
					/>

					<DashboardCard
						variant="soft"
						color="slate"
						value={menunggu_pembayaran ?? 0}
						subtitle="Menunggu Pembayaran"
						icon={Receipt}
					/>

					<DashboardCard
						variant="soft"
						color="green"
						value={perlu_ditutup ?? 0}
						subtitle="Perlu Ditutup"
						icon={CheckCircle}
					/>
				</div>
				<div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border bg-background">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold flex items-center">
								<CircleAlert size={16} className="mr-2" />
								Tugas Prioritas Hari Ini
							</h3>
							<p className="text-sm text-muted-foreground">
								{priority.length ?? 0} permohonan perlu segera diproses
							</p>
						</div>
						<ButtonLink
							href={permohonan_prioritas().url}
							variant="destructive"
						>
							<TriangleAlert size={16} className="mr-2" />
							Proses Sekarang
						</ButtonLink>
					</div>
				</div>
			</div>
		</AppLayout>
		);
}
