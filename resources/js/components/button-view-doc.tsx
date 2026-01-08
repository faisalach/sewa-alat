import { useState } from "react";
import Modal from "@/components/ui/modal";
import { document_access_log } from '@/routes/permohonan';

export default function ButtonViewDoc({file,id}) {
	const [open, setOpen] = useState(false);
	const [hasFile, setHasFile] = useState(false);

	return (
		<>
		<div className="flex gap-1 items-center">
			<button
				type="button"
				onClick={() => {
					historyViewDoc(id,1,() => {
						console.log("OKE");
						setOpen(true)
					})
				}}
				className=" cursor-pointer px-2 py-1 bg-cyan-800 text-xs text-white rounded"
			>
				Lihat
			</button>
			<button
				type="button"
				onClick={ () => {
					historyViewDoc(id,2,() => {
						const a = document.createElement('a');
						a.href = file;
						a.download = '';
						a.click();
					})
				}}
				className=" cursor-pointer px-2 py-1 bg-red-800 text-xs text-white rounded"
			>
				Download
			</button>
		</div>

		<Modal
			open={open}
			onClose={() => setOpen(false)}
			title="View Dokumen"
		>
			{file && (
				<iframe
					src={file+"#toolbar=0&navpanes=0&scrollbar=0"}
					className="w-full h-64 rounded border border-gray-600"
					/>
			)}

			<div className="flex justify-end gap-2 mt-4">
				<button
					type="button"
					onClick={() => setOpen(false)}
					className="cursor-pointer px-4 py-2 bg-cyan-600 text-white rounded text-sm"
				>
					Tutup
				</button>
			</div>
		</Modal>
		</>
		);
}

function historyViewDoc(docId,action,onSuccess) {
	const url = document_access_log(docId).url;
	fetch(url, {
		method: 'POST',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
			'X-CSRF-TOKEN': document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute('content'),
		},
		body: JSON.stringify({action:action}),
	})
	.then(async (res) => {
		if (!res.ok) {
			return false;
		};
		onSuccess();
		return res.json();
	});
}