import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface PaymentStatusData {
  paid: number;
  notPaid: number;
}

interface PaymentChartProps {
  data?: PaymentStatusData;
}

export default function PaymentChart({ data }: PaymentChartProps) {
  // Agar ma'lumotlar bo'lmasa, standart qiymatlarni ishlatish
  const chartData = data
    ? [
        { name: "Paid", value: data.paid },
        { name: "Not paid", value: data.notPaid },
      ]
    : [
        { name: "Paid", value: 60 },
        { name: "Not paid", value: 40 },
      ];

  const COLORS = ["#2563EB", "#DBEAFE"];

  return (
    <div className="h-64 flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((index: any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            Payments
          </text>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
