import api from "./api";
import { Lead } from "../types";

const LeadsService = {
  async getLeads(): Promise<Record<string, Lead[]>> {
    const response = await api.get<Record<string, Lead[]>>("/leads");
    return response.data;
  },

  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    const response = await api.post<Lead>("/leads", leadData);
    return response.data;
  },

  async updateLead(id: string, leadData: Partial<Lead>): Promise<Lead> {
    const response = await api.put<Lead>(`/leads/${id}`, leadData);
    return response.data;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },
};

export default LeadsService;
