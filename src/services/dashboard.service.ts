import api from "./api";

export interface DashboardStats {
  newLeads: number;
  allStudents: number;
  groups: number;
  debtors: number;
  paymentStatus: {
    paid: number;
    notPaid: number;
  };
  financialData: {
    month: string;
    value: number;
  }[];
  financialSummaries: {
    title: string;
    subtitle: string;
    percentage: number;
    count: string;
    color: string;
  }[];
}

export interface Lesson {
  id: string;
  time: string;
  name: string;
  teacher: string;
  subject: string;
  type: string;
  room: string;
  students: number;
}

const DashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  async getLessons(): Promise<Lesson[]> {
    const response = await api.get<Lesson[]>("/dashboard/lessons");
    return response.data;
  },
};

export default DashboardService;
