import { useRef, useState, useEffect } from "react";

export default function FileUpload({
	inputName,
	hasFile= () => false,
  	defaultFile, // "uploads/xxx.pdf"
  }) {
	const inputRef = useRef<HTMLInputElement>(null);

	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [existingFile, setExistingFile] = useState<string | null>( defaultFile ?? null );
	const [isHasFile, setIsHasFile] = useState(existingFile ? 1 : null);

	const selectFile = (f: File) => {
		setFile(f);
		setPreview(URL.createObjectURL(f));
		setExistingFile(null); // ganti file lama
		setIsHasFile(1);
	};

	useEffect(() => {
		hasFile(isHasFile);
	}, [file, existingFile, isHasFile]);

  // cleanup preview object URL
	useEffect(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);

	const removeFile = () => {
		setFile(null);
		setPreview(null);
		setExistingFile(null);
		setIsHasFile(null);
		if (inputRef.current) inputRef.current.value = "";
	};

	const isPdf =
	(file && file.type === "application/pdf") ||
	(!file && existingFile?.endsWith(".pdf"));

	const isImage =
	(file && file.type.startsWith("image/")) ||
	(!file && /\.(jpg|jpeg|png|webp)$/i.test(existingFile || ""));

	return (
		<>
      {/* DROP AREA */}
		<div
			onClick={() => inputRef.current?.click()}
			className={`${isHasFile ? "hidden" : ""} flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500`}
		>
			<p className="text-sm text-gray-400">
				Klik atau drag file ke sini
			</p>

			{isHasFile && (
			<input type="hidden" name={`has_${inputName}`} value="1" />
			)}
			<input
				ref={inputRef}
				type="file"
				accept="image/*,application/pdf"
				className="hidden"
				name={inputName}
				onChange={(e) =>
				e.target.files && selectFile(e.target.files[0])
			}
		/>
	</div>

      {/* PREVIEW */}
	{(file || existingFile) && (
		<div className="p-3 border border-gray-700 rounded-lg space-y-3">
          {/* IMAGE */}
			{isImage && (
				<img
					src={file ? preview! : existingFile!}
					className="w-full max-h-60 object-contain rounded"
					/>
					)}

          {/* PDF */}
			{isPdf && (
				<iframe
					src={file ? preview! : existingFile!}
					className="w-full h-64 rounded border border-gray-600"
					/>
					)}

          {/* UNKNOWN */}
			{!isImage && !isPdf && (
				<div className="flex items-center justify-center h-32 bg-gray-700 rounded">
					📄
				</div>
				)}

          {/* INFO */}
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-gray-200">
						{file?.name || existingFile?.split("/").pop()}
					</p>
					{file && (
						<p className="text-xs text-gray-400">
							{(file.size / 1024 / 1024).toFixed(2)} MB
						</p>
						)}
				</div>

				<button
					type="button"
					onClick={removeFile}
					className="text-red-400 text-sm hover:text-red-500"
				>
					Hapus
				</button>
			</div>
		</div>
		)}
	</>
	);
}
