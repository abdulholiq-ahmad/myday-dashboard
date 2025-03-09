import { useQuery } from "@tanstack/react-query";
import { Users, GraduationCap, UserIcon as UserGroup, Wallet } from "lucide-react";
import StatCard from "../components/features/StatCard";
import PaymentChart from "../components/features/PaymentChart";
import FinancialChart from "../components/features/FinancialChart";
import FinancialSummary from "../components/features/FinancialSummary";
import LessonTable from "../components/features/LessonTable";
import DashboardService from "../services/dashboard.service";
import LoadingSpinner from "../components/features/loading";
import { ErrorDisplay } from "../components/ui/error-display";

export default function Dashboard() {
  // Dashboard ma'lumotlarini olish
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: DashboardService.getStats,
  });

  // Darslar ma'lumotlarini olish
  const {
    data: lessons = [],
    isLoading: lessonsLoading,
    error: lessonsError,
  } = useQuery<Lesson[]>({
    queryKey: ["lessons"],
    queryFn: DashboardService.getLessons,
  });

  // Agar ma'lumotlar yuklanayotgan bo'lsa
  if (statsLoading || lessonsLoading) {
    return <LoadingSpinner />;
  }

  // Agar xatolik bo'lsa
  if (statsError || lessonsError) {
    return <ErrorDisplay error={statsError || lessonsError} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="text-white" />} iconBg="bg-blue-400" title="New leads" value={stats?.newLeads.toString() || "0"} />
        <StatCard
          icon={<GraduationCap className="text-white" />}
          iconBg="bg-blue-400"
          title="All students"
          value={stats?.allStudents.toString() || "0"}
        />
        <StatCard icon={<UserGroup className="text-white" />} iconBg="bg-blue-400" title="Groups" value={stats?.groups.toString() || "0"} />
        <StatCard icon={<Wallet className="text-white" />} iconBg="bg-blue-400" title="Debtors" value={stats?.debtors.toString() || "0"} />
      </div>

      {/* Charts and Financial Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Charts Section */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Payment Status Chart */}
          <div className="md:col-span-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Payment status</h2>
            <PaymentChart data={stats?.paymentStatus} />
          </div>

          {/* Financial Indicators Chart */}
          <div className="md:col-span-8 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Monthly financial indicators</h2>
            <FinancialChart data={stats?.financialData} />
          </div>
        </div>

        {/* Financial Summary Section */}
        <div className="lg:col-span-3 space-y-4">
          {stats?.financialSummaries.map((summary, index) => (
            <FinancialSummary
              key={index}
              title={summary.title}
              subtitle={summary.subtitle}
              percentage={summary.percentage}
              color={summary.color}
              count={summary.count}
            />
          ))}
        </div>
      </div>

      {/* Lesson Table */}
      <div className="bg-white rounded-lg shadow">
        <LessonTable lessons={lessons || []} />
      </div>
    </div>
  );
}
