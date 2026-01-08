import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';

import DashboardCard from '@/components/ui/dashboard-card';
import { ChartPnbp } from '@/components/ui/chart-pnbp';
import { ChartPermohonan } from '@/components/ui/chart-permohonan';
import { prioritas as permohonan_prioritas } from '@/routes/permohonan';
import {
	FileText,
	Activity,
	CheckCircle,
	Wallet,
	AlertTriangle,
	Users,
	Settings,
	Database,
} from "lucide-react";


const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: dashboard().url,
	},
];

export default function Dashboard() {
	const {
		stats,
		graph_permohonan,
		graph_pnbp,
	} = usePage().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
					<DashboardCard
						variant="soft"
						color="blue"
						value={stats.total_permohonan}
						subtitle="Total Permohonan"
						icon={FileText}
					/>

					<DashboardCard
						variant="soft"
						color="amber"
						value={stats.permohonan_aktif}
						subtitle="Permohonan Aktif"
						icon={Activity}
					/>

					<DashboardCard
						variant="soft"
						color="green"
						value={stats.permohonan_selesai}
						subtitle="Permohonan Selesai"
						icon={CheckCircle}
					/>

					<DashboardCard
						variant="soft"
						color="purple"
						value={stats.total_pnbp}
						subtitle="Total PNBP"
						icon={Wallet}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6">
						<ChartPermohonan data={graph_permohonan}/>
						<ChartPnbp data={graph_pnbp}/>
				</div>


			</div>
		</AppLayout>
		);
}
