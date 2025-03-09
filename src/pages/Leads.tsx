import { useState } from "react";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import LeadCard from "../components/features/LeadCard";
import { Lead } from "../types";

// Mock data for leads
const leadData: Record<string, Lead[]> = {
  new: Array(2)
    .fill(null)
    .map(() => ({
      name: "Alisher Atajanov",
      phone: "+998 99 966 73 63",
      language: "General english",
      type: "Individual",
      source: "Instagram",
      date: "28.02.2024",
      time: "08:00 - 09:00",
      teacher: "Mr. Alibek",
    })),
  contacted: Array(2)
    .fill(null)
    .map(() => ({
      name: "Alisher Atajanov",
      phone: "+998 99 966 73 63",
      language: "General english",
      type: "Individual",
      source: "Instagram",
      date: "28.02.2024",
      time: "08:00 - 09:00",
      teacher: "Mr. Alibek",
    })),
  trial: Array(2)
    .fill(null)
    .map(() => ({
      name: "Alisher Atajanov",
      phone: "+998 99 966 73 63",
      language: "General english",
      type: "Individual",
      source: "Instagram",
      date: "28.02.2024",
      time: "08:00 - 09:00",
      teacher: "Mr. Alibek",
    })),
  summary: Array(2)
    .fill(null)
    .map(() => ({
      name: "Alisher Atajanov",
      phone: "+998 99 966 73 63",
      language: "General english",
      type: "Individual",
      source: "Instagram",
      date: "28.02.2024",
      time: "08:00 - 09:00",
      teacher: "Mr. Alibek",
    })),
};

// Add one special case with missing data
leadData.contacted[1] = {
  ...leadData.contacted[1],
  source: "Not available",
  type: "Not available",
  time: "Not available",
  teacher: "Not available",
};

function Leads() {
  const [activeTab, setActiveTab] = useState<"leads" | "applications">("leads");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Board of leads</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex space-x-2">
            <button className={`px-4 py-2 ${activeTab === "leads" ? "border-b-2 border-blue-500" : ""}`} onClick={() => setActiveTab("leads")}>
              Leads
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "applications" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
            </button>
          </div>
        </div>

        <div className="p-4 flex justify-between items-center">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              Close filters
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>New lead</Button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* New leads column */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg text-center font-medium">New leads</div>
          <div className="bg-blue-500 text-white p-3 rounded-t-lg text-center font-medium">Contacted</div>
          <div className="bg-blue-500 text-white p-3 rounded-t-lg text-center font-medium">Trial lesson</div>
          <div className="bg-gray-700 text-white p-3 rounded-t-lg text-center font-medium">Summary</div>

          {/* Lead cards */}
          <div className="space-y-4 bg-gray-100 p-4 rounded-b-lg">
            {leadData.new.map((lead, index) => (
              <LeadCard key={`new-${index}`} lead={lead} />
            ))}
          </div>

          <div className="space-y-4 bg-gray-100 p-4 rounded-b-lg">
            {leadData.contacted.map((lead, index) => (
              <LeadCard key={`contacted-${index}`} lead={lead} />
            ))}
          </div>

          <div className="space-y-4 bg-gray-100 p-4 rounded-b-lg">
            {leadData.trial.map((lead, index) => (
              <LeadCard key={`trial-${index}`} lead={lead} />
            ))}
          </div>

          <div className="space-y-4 bg-gray-100 p-4 rounded-b-lg">
            {leadData.summary.map((lead, index) => (
              <LeadCard key={`summary-${index}`} lead={lead} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
