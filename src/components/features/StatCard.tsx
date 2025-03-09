import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  value: string;
}

function StatCard({ icon, iconBg, title, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
      <div className={`${iconBg} p-3 rounded-lg`}>{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{value}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
