import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Plus, Maximize2, Bell, History, User, FileText, Headphones, Settings, LogOut } from "lucide-react";
import AuthService from "../../services/auth.service";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await AuthService.logout();
    // AuthService.logout() ichida window.location.href = '/login' mavjud
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const getPageTitle = () => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/leads":
        return "Board of leads";
      case "/clients":
        return "List of clients";
      case "/settings":
        return "Settings";
      default:
        return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4">
      <h1 className="text-xl font-medium">{getPageTitle()}</h1>

      <div className="flex items-center space-x-4">
        <div className="relative w-[480px]">
          <input
            type="text"
            placeholder="Global search"
            className="pl-10 bg-gray-50 h-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Action Buttons */}
        <button className="h-10 w-10 rounded-md flex items-center justify-center hover:bg-gray-100">
          <Plus className="h-5 w-5" />
        </button>

        <button className="h-10 w-10 rounded-md flex items-center justify-center hover:bg-gray-100">
          <Maximize2 className="h-5 w-5" />
        </button>

        <button className="h-10 w-10 rounded-md flex items-center justify-center hover:bg-gray-100 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="h-10 w-10 rounded-md flex items-center justify-center hover:bg-gray-100">
          <History className="h-5 w-5" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button className="flex items-center space-x-2 h-10 px-2 rounded-md hover:bg-gray-100" onClick={toggleDropdown}>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rKUhDqbxVOqczUWNMjAQV2bogUMbl5.png"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">Baxtiyorov X</div>
              <div className="text-xs text-gray-500">Founder</div>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="flex items-center p-3 border-b">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rKUhDqbxVOqczUWNMjAQV2bogUMbl5.png"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Baxtiyorov X</p>
                  <p className="text-xs text-gray-500">Founder</p>
                </div>
              </div>

              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500">
                  <User className="mr-2 h-4 w-4" />
                  <span>My profile</span>
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500">
                  <Headphones className="mr-2 h-4 w-4" />
                  <span>Technique support</span>
                </button>
                <button
                  onClick={handleSettings}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>

              <div className="border-t py-1">
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
