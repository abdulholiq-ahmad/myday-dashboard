import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, FileText, Users, UserIcon as UserGroup, BookOpen, UserCog, DollarSign, BarChart3, Settings, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon, label, active, hasSubmenu, expanded, onClick }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors",
        active && "bg-blue-600 text-white hover:bg-blue-700"
      )}
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1">{label}</span>
      {hasSubmenu && <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "transform rotate-180")} />}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [branchExpanded, setBranchExpanded] = useState(false);

  return (
    <div className="w-60 border-r bg-white flex flex-col h-full">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-blue-600">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 18C7.5 12.201 12.201 7.5 18 7.5C23.799 7.5 28.5 12.201 28.5 18C28.5 23.799 23.799 28.5 18 28.5C12.201 28.5 7.5 23.799 7.5 18Z"
                fill="url(#paint0_linear_1_2)"
              />
              <path
                d="M18 0C8.059 0 0 8.059 0 18C0 27.941 8.059 36 18 36C27.941 36 36 27.941 36 18C36 8.059 27.941 0 18 0ZM18 28.5C12.201 28.5 7.5 23.799 7.5 18C7.5 12.201 12.201 7.5 18 7.5C23.799 7.5 28.5 12.201 28.5 18C28.5 23.799 23.799 28.5 18 28.5Z"
                fill="url(#paint1_linear_1_2)"
              />
              <defs>
                <linearGradient id="paint0_linear_1_2" x1="7.5" y1="18" x2="28.5" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="paint1_linear_1_2" x1="0" y1="18" x2="36" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">MYday</span>
        </Link>
      </div>

      <div className="p-4 border-b">
        <Button variant="ghost" className="w-full justify-start gap-2 font-normal" onClick={() => setBranchExpanded(!branchExpanded)}>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21V3H21V21H3Z" stroke="#6B7280" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium">Main branch</span>
            <span className="text-xs text-gray-500">Nukus city</span>
          </div>
          <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", branchExpanded && "transform rotate-180")} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4 px-2 space-y-1">
        <SidebarItem href="/" icon={<LayoutGrid size={20} />} label="Dashboard" active={location.pathname === "/"} />
        <SidebarItem href="/leads" icon={<FileText size={20} />} label="Leads" active={location.pathname === "/leads"} />
        <SidebarItem href="/clients" icon={<Users size={20} />} label="Clients" active={location.pathname === "/clients"} />
        <SidebarItem href="/groups" icon={<UserGroup size={20} />} label="Groups" active={location.pathname === "/groups"} />
        <SidebarItem href="/courses" icon={<BookOpen size={20} />} label="Courses" active={location.pathname === "/courses"} />
        <SidebarItem href="/personnel" icon={<UserCog size={20} />} label="Personnel" active={location.pathname === "/personnel"} />
        <SidebarItem href="/finance" icon={<DollarSign size={20} />} label="Finance" active={location.pathname === "/finance"} />
        <SidebarItem href="/reports" icon={<BarChart3 size={20} />} label="Reports" active={location.pathname === "/reports"} />
        <SidebarItem href="/settings" icon={<Settings size={20} />} label="Settings" active={location.pathname === "/settings"} />
      </div>
    </div>
  );
};

export default Sidebar;
