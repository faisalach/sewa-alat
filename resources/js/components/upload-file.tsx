import { useState } from "react";
import Modal from "@/components/ui/modal";
import FileUpload from "@/components/ui/file-upload";
import { CircleCheck } from "lucide-react";

export default function UploadModalPage({inputName, defaultFile}) {
	const [open, setOpen] = useState(false);
	const [hasFile, setHasFile] = useState(false);

	return (
		<>
		<div className="flex gap-2 items-center">
			<button
				type="button"
				onClick={() => setOpen(true)}
				className=" cursor-pointer px-4 py-2 bg-cyan-600 text-xs text-white rounded"
			>
				Upload File
			</button>
			{hasFile && (
				<p className="text-green-500">
					<CircleCheck/>
				</p>
			)}
		</div>

		<Modal
			open={open}
			onClose={() => setOpen(false)}
			title="Upload Dokumen"
		>
			<FileUpload 
				defaultFile={defaultFile}
				inputName={inputName}
				hasFile={(isHasFile) => {
					setHasFile(isHasFile);
				}}
			/>

			<div className="flex justify-end gap-2 mt-4">
				{/*<button
					type="button"
					onClick={() => setOpen(false)}
					className="cursor-pointer px-3 py-2 text-sm text-gray-300"
				>
					Tutup
				</button>*/}
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
