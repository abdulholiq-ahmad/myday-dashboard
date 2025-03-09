import { AlertCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "../../lib/utils";

type ErrorType = "error" | "warning" | "info";

interface ErrorDisplayProps {
  message: string;
  type?: ErrorType;
  className?: string;
  onDismiss?: () => void;
}

export function ErrorDisplay({ message, type = "error", className, onDismiss }: ErrorDisplayProps) {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-50 text-red-500 border-red-200";
      case "warning":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "info":
        return "bg-blue-50 text-blue-500 border-blue-200";
      default:
        return "bg-red-50 text-red-500 border-red-200";
    }
  };

  if (!message) return null;

  return (
    <div className={cn("flex items-center gap-2 p-3 rounded-md border text-sm mb-4", getStyles(), className)}>
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1">{message}</div>
      {onDismiss && (
        <button onClick={onDismiss} className="flex-shrink-0 hover:opacity-70 transition-opacity" aria-label="Dismiss">
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export function ErrorDisplayFullPage({ message, type = "error", onRetry }: { message: string; type?: ErrorType; onRetry?: () => void }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4",
          type === "error" ? "bg-red-100" : type === "warning" ? "bg-yellow-100" : "bg-blue-100"
        )}
      >
        {type === "error" ? (
          <XCircle className="h-8 w-8 text-red-500" />
        ) : type === "warning" ? (
          <AlertTriangle className="h-8 w-8 text-yellow-600" />
        ) : (
          <Info className="h-8 w-8 text-blue-500" />
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">{type === "error" ? "Xatolik yuz berdi" : type === "warning" ? "Ogohlantirish" : "Ma'lumot"}</h3>

      <p className="text-gray-600 mb-6 max-w-md">{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Qayta urinib ko'rish
        </button>
      )}
    </div>
  );
}
