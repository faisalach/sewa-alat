import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { add as buat_permohonan } from '@/routes/permohonan';

import DashboardCard from '@/components/ui/dashboard-card';
import { ProgressStepper } from '@/components/ui/progress-stepper';
import { NextActionCard } from '@/components/ui/next-action-card';
import { Timeline } from '@/components/ui/timeline';
import { Button } from '@/components/ui/button';
import {
	CheckCircle,
	Clock,
	CreditCard,
	FileText,
	Upload,
	Plus,
} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: dashboard().url,
	},
];

export default function Dashboard() {
	const {
		permohonan,
		summary
	} = usePage().props;
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				{permohonan && (
					<>
						<div className="rounded-2xl bg-gray-100 dark:bg-transparent p-6 border">
							<p className="text-sm text-muted-foreground">
								Status Permohonan Anda
							</p>
							<h2 className="text-xl font-semibold mt-1">
								{permohonan?.nomor_permohonan ?? "-"}
							</h2>

							<h1 className="text-2xl font-bold mt-3 uppercase">
								{permohonan?.status_text ?? "-"}
							</h1>

							<p className="text-sm text-muted-foreground mt-1">
								{permohonan?.status_desc ?? "-"}
							</p>

							<div className="mt-6">
								<ProgressStepper status={permohonan?.status_text} />
							</div>
						</div>

						<NextActionCard status={permohonan?.status_text} />

						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<DashboardCard
								variant="soft"
								color="blue"
								value={summary.total}
								subtitle="Total Permohonan"
								icon={FileText}
							/>

							<DashboardCard
								variant="soft"
								color="amber"
								value={summary.aktif}
								subtitle="Permohonan Aktif"
								icon={Clock}
							/>

							<DashboardCard
								variant="soft"
								color="slate"
								value={summary.pembayaran}
								subtitle="Menunggu Pembayaran"
								icon={CreditCard}
							/>

							<DashboardCard
								variant="soft"
								color="green"
								value={summary.selesai}
								subtitle="Selesai"
								icon={CheckCircle}
							/>
						</div>

						<Timeline history={permohonan?.permohonan_history ?? []} />

						<div className="flex flex-wrap gap-3">
							<Button 
								onClick={() => router.visit(buat_permohonan().url)}
								>
								<Plus/>
								Ajukan Permohonan Baru
							</Button>
						</div>
					</>
				)}

				{!permohonan && (
					<div className="rounded-2xl bg-gray-100 dark:bg-transparent p-6 border">
						<p className="text-lg mb-3">
							Belum Ada Permohonan
						</p>
						<Button 
							onClick={() => router.visit(buat_permohonan().url)}
							>
							<Plus/> 
							Buat Permohonan
						</Button>
					</div>
				)}

				
			</div>
		</AppLayout>
		);
}
