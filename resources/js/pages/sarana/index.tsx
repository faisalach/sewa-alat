import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { show, getData, add, edit, destroy } from '@/routes/sarana';
import { ActionMenu, handleDelete } from '@/components/ui/action-menu';
import Datatables from '@/components/datatables';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Sarana',
		href: show().url,
	},
];

export default function Sarana() {
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
				table: window.saranaTable
			})
		});
		return menus;
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Sarana" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div>
					<Link href={add().url} className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800 inline-flex items-center cursor-pointer">
						<Plus className="h-4 w-4 mr-3" />
						<span>Tambah Data</span>
					</Link>
				</div>
				<div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
					<Datatables 
						id="datatable"
						ajaxUrl={getData().url}
						onInit={(table) => {
							window.saranaTable = table;
						}}
						columns={[
							{ data: 'nama_sarana'},
							{ data: 'tarif_pnbp'},
							{ data: 'satuan_tarif'},
							{ data: 'status_ketersediaan'},
							{ data: 'jumlah_sarana'},
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
						}}
						>
						<thead>
							<tr className="bg-cyan-600 text-white">
								<th>Nama Sarana</th>
								<th>Tarif PNBP</th>
								<th>Satuan Tarif</th>
								<th>Status Ketersediaan</th>
								<th>Jumlah Sarana</th>
								<th>#</th>
							</tr>
						</thead>
					</Datatables>
				</div>
			</div>
		</AppLayout>
	);
}

