import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export function ChartPermohonan({data}) {
	return (
		<Card className="bg-white dark:bg-gray-950 rounded-2xl shadow-sm">
			<CardContent className="">
				<h3 className="font-semibold mb-4">
					Permohonan per Bulan
				</h3>

				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<XAxis dataKey="name" />
						<YAxis width="auto" />
						<Tooltip />
						<Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
		);
}
