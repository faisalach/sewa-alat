import { useState } from 'react';
import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { show, getData, add, edit, destroy } from '@/routes/users';
import { ActionMenu, handleDelete } from '@/components/ui/action-menu';
import { ButtonLink } from '@/components/ui/button-link';
import Datatables from '@/components/datatables';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Petugas',
		href: show().url,
	},
];

export default function Users() {
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
				table: window.usersTable
			})
		});

		return menus;
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Petugas" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				{auth.user.role === 3 && (
					<div>
						<ButtonLink href={add().url}>
							<Plus className="h-4 w-4 mr-3" />
							<span>Tambah Data</span>
						</ButtonLink>
					</div>
				)}
			<div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
				
				<Datatables 
					id="datatable"
					ajaxUrl={getData().url}
					onInit={(table) => {
						window.usersTable = table;
					}}
					columns={[
						{ data: 'name' },
						{ data: 'phone' },
						{ data: 'email' },
						{ data: 'timja' },
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
							<th>Nama</th>
							<th>No Telp / Wa</th>
							<th>Email</th>
							<th>Tim Kerja</th>
							<th>#</th>
						</tr>
					</thead>
				</Datatables>
			</div>
		</div>
	</AppLayout>
	);
}
