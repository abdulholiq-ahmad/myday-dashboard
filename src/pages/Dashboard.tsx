import StatCard from "../components/features/StatCard";
import PaymentChart from "../components/features/PaymentChart";
import FinancialChart from "../components/features/FinancialChart";
import FinancialSummary from "../components/features/FinancialSummary";
import LessonTable from "../components/features/LessonTable";
import { Users, GraduationCap, Wallet, Users2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="text-white" />} iconBg="bg-blue-400" title="New leads" value="45" />
        <StatCard icon={<GraduationCap className="text-white" />} iconBg="bg-blue-400" title="All students" value="45" />
        <StatCard icon={<Users2 className="text-white" />} iconBg="bg-blue-400" title="Groups" value="45" />
        <StatCard icon={<Wallet className="text-white" />} iconBg="bg-blue-400" title="Debtors" value="16" />
      </div>

      {/* Charts and Financial Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Charts Section */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Payment Status Chart */}
          <div className="md:col-span-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Payment status</h2>
            <PaymentChart />
          </div>

          {/* Financial Indicators Chart */}
          <div className="md:col-span-8 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Monthly financial indicators</h2>
            <FinancialChart />
          </div>
        </div>

        {/* Financial Summary Section */}
        <div className="lg:col-span-3 space-y-4">
          <FinancialSummary title="255 000 000so'm" subtitle="General English" percentage={67} color="text-red-500" count="10" />
          <FinancialSummary title="218 000 000so'm" subtitle="General English" percentage={35} color="text-green-500" count="10" />
          <FinancialSummary title="156 000 000so'm" subtitle="General English" percentage={21} color="text-yellow-500" count="10" />
        </div>
      </div>

      {/* Lesson Table */}
      <div className="bg-white rounded-lg shadow">
        <LessonTable />
      </div>
    </div>
  );
}
