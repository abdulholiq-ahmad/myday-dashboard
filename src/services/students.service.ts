import api from "./api";
import { Student } from "../types";

const StudentsService = {
  async getStudents(p: { page: number; page_size: number; search: string }): Promise<Student[]> {
    const response = await api.get<Student[]>("/api/v1/student/list/");
    return response.data;
  },

  async getStudent(id: string): Promise<Student> {
    const response = await api.get<Student>(`/students/${id}`);
    return response.data;
  },

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const response = await api.post<Student>("/api/v1/student/create/", studentData);
    return response.data;
  },

  async updateStudent(id: string, studentData: Partial<Student>): Promise<Student> {
    const response = await api.put<Student>(`/students/${id}`, studentData);
    return response.data;
  },

  async deleteStudent(id: string): Promise<void> {
    await api.delete(`/students/${id}`);
  },
};

export default StudentsService;
