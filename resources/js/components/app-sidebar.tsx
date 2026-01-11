import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { show as pemohon } from '@/routes/pemohon';
import { show as petugas } from '@/routes/users';
import { show as sarana } from '@/routes/sarana';
import { show as permohonan } from '@/routes/permohonan';
import { show as tagihan } from '@/routes/tagihan';
import { type NavItem, NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { 
	LayoutDashboard,
	Users,
	DollarSign,
	History,
	FileChartColumn,
	Database,
	FileText
} from 'lucide-react';
import AppLogo from './app-logo';

/*const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
];*/

/*const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: FileChartColumn,
    },
];*/

export function AppSidebar() {
	const { auth, app_name } = usePage().props;
	let mainNavItems: NavItem[] = [];

	if (auth.user.role == 1) {
		mainNavItems = [
			{
				title: 'Dashboard',
				href: dashboard(),
				icon: LayoutDashboard,
			},
			{
				title: 'Permohonan',
				href: permohonan(),
				icon: FileText,
			},
			{
				title: 'Tagihan',
				href: tagihan(),
				icon: DollarSign,
			},
		];
	}else if (auth.user.role == 2){
		mainNavItems = [
			{
				title: 'Dashboard',
				href: dashboard(),
				icon: LayoutDashboard,
			},
			{
				title: 'Permohonan',
				href: permohonan(),
				icon: FileText,
			},
			{
				title: 'Tagihan',
				href: tagihan(),
				icon: DollarSign,
			}
		];
	}else if (auth.user.role == 3){
		mainNavItems = [
			{
				title: 'Dashboard',
				href: dashboard(),
				icon: LayoutDashboard,
			},
			{
				title: 'Permohonan',
				href: permohonan(),
				icon: FileText,
			},
			{
				title: 'Tagihan',
				href: tagihan(),
				icon: DollarSign,
			},
			{
				title: 'Master Data',
				icon: Database,
				children: [
					{ title: "Alat dan Sarana", href: sarana() },
					{ title: "Pemohon", href: pemohon() },
					{ title: "Petugas", href: petugas() },
				]
			},
			/*{
				title: 'Laporan',
				icon: FileChartColumn,
				children: [
					{ title: "Laporan Permohonan", href: "" },
					{ title: "Laporan Pendapatan PNBP", href: "" },
				]
			},
			{
				title: 'Riwayat',
				icon: History,
				children: [
					{ title: "Riwayat Permohonan", href: "" },
					{ title: "Riwayat Dokumen", href: "" },
				]
			},*/
		];
	}

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton  className="hover:bg-transparent hover:text-white active:bg-transparent active:text-white" size="lg" asChild>
							<Link href={dashboard()} prefetch>
							<AppLogo app_name={app_name} />
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>

		<SidebarContent>
			<NavMain items={mainNavItems} />
		</SidebarContent>

		<SidebarFooter>
                {/*<NavFooter items={footerNavItems} className="mt-auto" />*/}
			<NavUser />
		</SidebarFooter>
	</Sidebar>
	);
}
