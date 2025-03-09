export interface Student {
  id: string;
  name: string;
  age: string;
  points: number;
  lesson: string;
  lessonDetails: string;
  status: "Active" | "Process" | "Finished" | "Stopped";
  studyDate: string;
  phone: string;
  balance: string;
}

export interface Lead {
  name: string;
  phone: string;
  language: string;
  type: string;
  source: string;
  date: string;
  time: string;
  teacher: string;
}

export interface Lesson {
  id: number;
  time: string;
  name: string;
  teacher: string;
  subject: string;
  type: string;
  room: string;
  students: number;
}

export interface FinancialData {
  name: string;
  value: number;
}

export interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  employeeRole: string;
}
