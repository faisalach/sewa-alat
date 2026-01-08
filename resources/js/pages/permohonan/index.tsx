import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { show, getData, add, edit, destroy, detail, prioritas } from '@/routes/permohonan';
import { ActionMenu, handleDelete } from '@/components/ui/action-menu';
import Datatables from '@/components/datatables';
import Select, { components } from 'react-select';
import { Label } from '@/components/ui/label';
import { MultipleSelect } from '@/components/ui/multiple-select';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Permohonan',
		href: show().url,
	},
];



export default function Permohonan() {
	const { auth, status_permohonan, status_permohonan_filtered, order_by } = usePage().props;

	const menuLists = (data) => {
		const menus 	= [
			{
				label: (auth.user.role == 2 && auth.user.timja == 1 && data.status == 1) ? "Verifikasi" :"Detail",
				url: detail(data.id).url
			}
		];
		if (data.status === 1 && auth.user.role == 1) {
			menus.push({
				label:"Edit",
				url: edit(data.id).url
			});	
			menus.push(
			{
				label:"Delete",
				onclick: () => handleDelete({
					url : destroy(data.id).url,
					table: window.permohonanTable
				})
			});
		}

		return menus;
	}


	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Permohonan" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto over rounded-xl p-4">
				{auth.user.role === 1 && (
					<div>
						<Link href={add().url} className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800 inline-flex items-center cursor-pointer">
							<Plus className="h-4 w-4 mr-3" />
							<span>Buat Permohonan</span>
						</Link>
					</div>
				)}
				<div className="relative rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
					{status_permohonan && (
						<div className="grid gap-4 md:grid-cols-2">
							<div className="md:order-1 order-2 flex items-center gap-4">
								<Label htmlFor="status_permohonan">Filter Status</Label>
								<MultipleSelect
									id="status_permohonan"
									className="md:max-w-48"
									options={status_permohonan}
									placeholder="Pilih Status"
									onChange={(option) => {
										let filter 	= [];
										option.map((data) => {
											filter.push(data.value);
										})
										window.filterDatatable = {
											filter_status_permohonan:filter
										};
										window.permohonanTable.ajax.reload();
									}}
								/>
							</div>
							{auth.user.role == 2 && (
								<div className="md:order-2 order-1 md:text-right">
									<a
										onClick={() => {
											router.visit(prioritas().url)
										}}
										className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-red-600/50 cursor-pointer"
									>
										Prioritas
									</a>
								</div>
							)}
						</div>
					)}
					<Datatables 
						id="datatable"
						ajaxUrl={getData().url}
						onInit={(table) => {
							window.permohonanTable = table;
						}}
						customData={{filter_status_permohonan:status_permohonan_filtered}}
						order={order_by ?? [[0,"desc"]]}
						columns={[
							{ data: 'nomor_permohonan' },
							{ data: 'tanggal_permohonan' },
							{ 
								data: 'status',
								render: (td, _cellData, rowData)  => {
									const map = {
										1: 'bg-yellow-100 text-yellow-800',
										2: 'bg-blue-100 text-blue-800',
										3: 'bg-green-100 text-green-800',
										4: 'bg-red-100 text-red-800',
										5: 'bg-purple-100 text-purple-800',
										6: 'bg-gray-200 text-gray-900',
										7: 'bg-lime-200 text-lime-900',
									} as const;

									const statusClass =
									map[rowData.status as keyof typeof map] ??
									'bg-gray-100 text-gray-700';

									return `
										<span class="
											inline-flex items-center
											px-2 py-1
											rounded-full
											text-xs font-semibold
											${statusClass}
										">
											${rowData.status_text}
										</span>
									`;
								} 
							},
							{ 
								data: 'tanggal_awal_penggunaan',
								render: (td, _cellData, rowData)  => {
									return rowData.tanggal_awal_penggunaan == rowData.tanggal_akhir_penggunaan 
									? rowData.tanggal_awal_penggunaan 
									: rowData.tanggal_awal_penggunaan + " - " + rowData.tanggal_akhir_penggunaan;
								} 
							},
							{ data: 'id', orderable:false, createdCell: (td, _cellData, rowData) => {
								return ReactDOM.createRoot(td).render(
									<ActionMenu 
										menus={menuLists(rowData)}
									/>
								)
							} },
						]}
						actionMenu={(container,rowData) =>{
							return ReactDOM.createRoot(container).render(
								<ActionMenu
									label="action"
									menus={menuLists(rowData)}
								/>
							);
						}}>
						<thead>
							<tr className="bg-cyan-600 text-white">
								<th>Nomor Permohonan</th>
								<th>Tgl Permohonan</th>
								<th>Status</th>
								<th>Periode Penggunaan</th>
								<th>#</th>
							</tr>
						</thead>
					</Datatables>
				</div>
			</div>
	</AppLayout>
	);
}
