import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { show, getData, add, edit, destroy } from '@/routes/pemohon';
import { ActionMenu, handleDelete } from '@/components/ui/action-menu';
import Datatables from '@/components/datatables';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Pemohon',
		href: show().url,
	},
];

export default function Pemohon() {
	const { auth } = usePage().props;


	const menuLists = (data) => {
		const menus 	= [];
		menus.push({
			label:"Edit",
			url: edit(data.id).url
		});	
		menus.push(
		{
			label:"Delete",
			onclick: () => handleDelete({
				url : destroy(data.id).url,
				table: window.pemohonTable
			})
		});

		return menus;
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Pemohon" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				{auth.user.role === 3 && (
					<div>
						<Link href={add().url} className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800 inline-flex items-center cursor-pointer">
							<Plus className="h-4 w-4 mr-3" />
							<span>Tambah Data</span>
						</Link>
					</div>
				)}
			<div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">

				<Datatables 
					id="datatable"
					ajaxUrl={getData().url}
					onInit={(table) => {
						window.pemohonTable = table;
					}}
					columns={[
						{ data: 'name' },
						{ data: 'phone' },
						{ data: 'email' },
						{ data: 'instansi' },
						{ data: 'alamat' },
						{ data: 'id', orderable:false, createdCell: (td, _cellData, rowData) => {
							return ReactDOM.createRoot(td).render(
								<ActionMenu 
									menus={menuLists(rowData)}
								/>
							)
						} },
					]}
					actionMenu={(container,data) =>{
						return ReactDOM.createRoot(container).render(
							<ActionMenu
								label="action"
								menus={menuLists(data)}
							/>
						);
					}}>
					<thead>
						<tr className="bg-cyan-600 text-white">
							<th>Nama</th>
							<th>No Telp / Wa</th>
							<th>Email</th>
							<th>Instansi</th>
							<th>Alamat</th>
							<th>#</th>
						</tr>
					</thead>
				</Datatables>
			</div>
		</div>
	</AppLayout>
	);
}
