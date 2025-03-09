import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ruxsat berilmagan</h1>
        <p className="text-gray-600 mb-8">Kechirasiz, sizda ushbu sahifani ko'rish uchun yetarli huquqlar mavjud emas.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Orqaga qaytish
          </Button>

          <Button onClick={() => navigate("/")}>Bosh sahifaga o'tish</Button>
        </div>
      </div>
    </div>
  );
}
