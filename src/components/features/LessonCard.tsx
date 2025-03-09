import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Lead } from "../../types";

interface LeadCardProps {
  lead: Lead;
}

function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{lead.name}</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mb-3 inline-block">{lead.phone}</div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <span className="w-5 h-5 mr-2">🌐</span>
          <span className="text-gray-600">{lead.language}</span>
        </div>

        {lead.type !== "Not available" && (
          <div className="flex items-center">
            <span className="w-5 h-5 mr-2">📋</span>
            <span className="text-gray-600">Type: {lead.type}</span>
          </div>
        )}

        {lead.source !== "Not available" && (
          <div className="flex items-center">
            <span className="w-5 h-5 mr-2">📱</span>
            <span className="text-gray-600">{lead.source}</span>
          </div>
        )}

        <div className="flex items-center">
          <span className="w-5 h-5 mr-2">📅</span>
          <span className="text-gray-600">{lead.date}</span>
        </div>

        {lead.time !== "Not available" && (
          <div className="flex items-center">
            <span className="w-5 h-5 mr-2">⏰</span>
            <span className="text-gray-600">{lead.time}</span>
          </div>
        )}

        {lead.teacher !== "Not available" && (
          <div className="flex items-center">
            <span className="w-5 h-5 mr-2">👨‍🏫</span>
            <span className="text-gray-600">{lead.teacher}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadCard;
