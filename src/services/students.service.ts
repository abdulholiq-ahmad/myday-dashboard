import api from "./api";
import { Student } from "../types";

const StudentsService = {
  async getStudents(): Promise<Student[]> {
    const response = await api.get<Student[]>("/students");
    return response.data;
  },

  async getStudent(id: string): Promise<Student> {
    const response = await api.get<Student>(`/students/${id}`);
    return response.data;
  },

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const response = await api.post<Student>("/students", studentData);
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
