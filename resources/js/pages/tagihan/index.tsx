import TagihanController from '@/actions/App/Http/Controllers/TagihanController';
import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage, Link, router } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { show, getData, verifikasi , edit } from '@/routes/tagihan';
import Datatables from '@/components/datatables';
import { ActionMenu } from '@/components/ui/action-menu';
import { useState } from "react";
import Modal from "@/components/ui/modal";
import FileUpload from "@/components/ui/file-upload";
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Label } from '@/components/ui/label';
import { MultipleSelect } from '@/components/ui/multiple-select';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Tagihan',
		href: show().url,
	},
];

export default function Tagihan() {
	const { auth, status_bayar } = usePage().props;
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(0);

	const menuLists = (data) => {
		const menus 	= [];
		if (auth.user.role == 1 && (data.status_bayar == 1 || data.status_bayar == 5)) {
			menus.push(
			{
				label:"Upload Bukti Pembayaran",
				onclick: () => {
					setOpen(true);
					setId(data.id);
				}
			});
		}
		if ((auth.user.role === 3 || (auth.user.role == 2 && auth.user.timja == 2)) && (data.status_bayar == 1 || data.status_bayar == 3)) {
			menus.push({
				label:"Edit",
				url: edit(data.id).url
			});
		}
		if ((auth.user.role === 3 || (auth.user.role == 2 && auth.user.timja == 2)) && data.status_bayar == 2) {
			menus.push({
				label:"Verifikasi",
				onclick: () => handleVerifikasi(data.id,data.doc,data.doc_ext)
			});
		}

		return menus;
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Tagihan" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="relative rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
					<div className="flex items-center gap-4">
						<Label htmlFor="status_bayar">Filter Status</Label>
						<MultipleSelect
							id="status_bayar"
							className="md:max-w-48 "
							options={status_bayar}
							placeholder="Pilih Status"
							onChange={(option) => {
								let filter 	= [];
								option.map((data) => {
									filter.push(data.value);
								})
								window.filterDatatable = {
									filter_status_bayar:filter
								};
								window.tagihanTable.ajax.reload();
							}}
						/>
					</div>
					<Datatables 
						id="datatable"
						ajaxUrl={getData().url}
						onInit={(table) => {
							window.tagihanTable = table;
						}}
						order={[[0,"desc"]]}
						columns={[
							{ data: 'nomor_permohonan' },
							{ data: 'nomor_billing' },
							{ data: 'nominal' },
							{ 
								data: 'status_bayar',
								render: (td, _cellData, rowData)  => {
									const map = {
										1: 'bg-yellow-100 text-yellow-800',
										2: 'bg-blue-100 text-blue-800',
										3: 'bg-purple-100 text-purple-800',
										4: 'bg-green-100 text-green-800',
										5: 'bg-red-100 text-red-800',
									} as const;
									const statusClass =
									map[rowData.status_bayar as keyof typeof map] ??
									'bg-gray-100 text-gray-700';

									return `
										<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusClass}	">
											${rowData.status_bayar_text}
										</span>
									`;
								} 
							},
							{ data: 'tanggal_kadaluarsa' },
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
								<th>Kode Biling</th>
								<th>Nominal</th>
								<th>Status Pembayaran</th>
								<th>Tanggal Kadaluarsa</th>
								<th>#</th>
							</tr>
						</thead>
					</Datatables>
				</div>

				<Form
					{...TagihanController.upload_bukti_pembayaran.form(id)}
					options={{
						preserveScroll: true,
					}}
					encType="multipart/form-data"
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => {
						if (recentlySuccessful) {
							setOpen(false);
							window.tagihanTable.ajax.reload(null, false);
						}
						return (
							<>
							<Modal
								open={open}
								onClose={() => setOpen(false)}
								title="Upload Dokumen"
							>
								<FileUpload 
									inputName="bukti_pembayaran"
								/>

								<div className="flex justify-end gap-2 mt-4">
									<button
										type="button"
										onClick={() => setOpen(false)}
										className="cursor-pointer px-3 py-2 text-sm text-gray-300"
									>
										Tutup
									</button>
									<button
										className="cursor-pointer px-4 py-2 bg-cyan-600 text-white rounded text-sm"
									>
										Submit
									</button>
								</div>
							</Modal>
							</>
							)
					}}
				</Form>
			</div>


	</AppLayout>
	);
}

export function handleVerifikasi(tagihan_id,doc,ext){
	let html 		= "";
	let imageUrl	= "";

	if (ext === "pdf") {
		html = `<iframe
				src=${doc+"#toolbar=0&navpanes=0&scrollbar=0"}
				style="width:100%;min-height:256px"
		/>`;
	}else{
		imageUrl = doc;

	}
	Swal.fire({
		title: 'Konfirmasi Verifikasi',
		// text: 'Apakah Anda yakin ingin menghapus data ini?',
		imageUrl: imageUrl,
		html:html,
		// icon: 'warning',
		showCancelButton: true,
		showDenyButton: true,
		confirmButtonText: "Terima",
		denyButtonText: "Tolak",
		cancelButtonText: 'Batal',
		confirmButtonColor: "#3085d6",
		denyButtonColor: "#d33"
	}).then((result) => {
		if (!result.isConfirmed && !result.isDenied) return;

		Swal.fire({
			title: 'Memproses...',
			text: 'Mohon tunggu',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		router.post(
			verifikasi(tagihan_id).url,{
				status_bayar : result.isConfirmed ? 1 : 0
			},
			{
				preserveScroll: true,
				onSuccess: () => {
					Swal.fire({
						icon: 'success',
						title: 'Berhasil',
						text: `Tagihan ${
							result.isConfirmed ? 'Diterima' : 'Ditolak'
						}.`,
					});
					window.tagihanTable.ajax.reload(null, false);
				},
				onError: () => {
					Swal.fire({
						icon: 'error',
						title: 'Gagal',
						text: 'Terjadi kesalahan saat update data.',
					});
				},
			}
		);

	});
};
