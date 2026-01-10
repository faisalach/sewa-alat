import { ReactNode } from "react";
import { X } from 'lucide-react';

export default function Modal({
	open,
	onClose,
	title,
	children,
}: {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}) {
	// if (!open) return null;

	return (
		<div className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"}`}>
			<div
				className="fixed inset-0 bg-black/60"
				// onClick={onClose}
			/>

			<div className="w-full overflow-auto py-10">
				<div className="relative max-w-[90%] w-lg mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
					<div className="flex items-center bg-cyan-600 justify-between px-4 py-3 border-b border-gray-700">
						<h3 className="text-sm font-medium text-gray-200">{title}</h3>
						<button
							type="button"
							onClick={onClose}
							className="font-bold cursor-pointer text-gray-400 hover:text-gray-400/50"
						>
							<X strokeWidth={3} />
						</button>
					</div>

					<div className="p-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
