import { Link } from '@inertiajs/react';
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-flex items-center cursor-pointer",
	{
		variants: {
			variant: {
				default:
				"text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800 cursor-pointer shadow-xs",
				outline:
				"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
				secondary:
				"text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300  px-5 py-2.5 me-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800 cursor-pointer",
				destructive:
				"text-white bg-destructive hover:bg-destructive/90 focus:ring-4 focus:ring-destructive  px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-destructive focus:outline-none dark:focus:ring-red-800 cursor-pointer",
				back:
				"bg-gray-100 text-dark hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-gray-400 cursor-pointer",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
	)


function ButtonLink({
	className,
	variant,
	href,
	size,
	children,
	...props}) {
	return (
		<Link
			href={href}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
			>
				{children}
		</Link>
			)
}

export { ButtonLink, buttonVariants }
