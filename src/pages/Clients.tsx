"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Search, Filter, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { AddStudentDialog } from "../components/add-student-dialog";
import StudentService from "../services/students.service";
import { ErrorDisplay } from "../components/ui/error-display";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Pagination } from "../components/ui/pagination";
import { Student } from "../types";
import LoadingSpinner from "../components/features/loading";

export default function ClientsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const pageSize = 10;

  // Talabalar ma'lumotlarini olish
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await StudentService.getStudents({
        page: currentPage,
        page_size: pageSize,
        search: searchTerm,
      });

      console.log(response);

      setStudents(response.results);
      setTotalPages(Math.ceil(response.count / pageSize));
    } catch (err: any) {
      console.error("Students fetch error:", err);
      setError(err.response?.data?.detail || "Talabalarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  // Sahifa yuklanganda va sahifa o'zgarganda talabalarni olish
  useEffect(() => {
    fetchStudents();
  }, [currentPage, searchTerm]);

  // Talaba qo'shilganda yoki yangilanganda ro'yxatni yangilash
  const handleStudentSaved = () => {
    fetchStudents();
    setSelectedStudentId(null);
  };

  const toggleStudentSelection = (id: string) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id.toString()));
    }
  };

  const handleEditStudent = (studentId: number) => {
    setSelectedStudentId(studentId);
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = async (studentId: number) => {
    if (window.confirm("Haqiqatan ham bu talabani o'chirmoqchimisiz?")) {
      try {
        await StudentService.deleteStudent(studentId.toString());
        fetchStudents();
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Talabani o'chirishda xatolik yuz berdi");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "process":
        return <Badge className="bg-yellow-500">Process</Badge>;
      case "finished":
        return <Badge className="bg-blue-500">Finished</Badge>;
      case "stopped":
        return <Badge className="bg-red-500">Stopped</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const openAddDialog = () => {
    setSelectedStudentId(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] w-[300px]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center gap-2 rounded-xl border-gray-200">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={openAddDialog} className="rounded-xl bg-[#2F3C7E] hover:bg-[#2F3C7E]/90">
            New Student
          </Button>
        </div>
      </div>

      {error && <ErrorDisplay message={error} onDismiss={() => setError(null)} />}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="border-b-2 border-blue-500 rounded-none px-4 py-2">
              All Students
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox checked={selectedStudents.length === students.length && students.length > 0} onChange={toggleSelectAll} />
                  </TableHead>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="w-24">Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Study date</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(student.id.toString())}
                        onChange={() => toggleStudentSelection(student.id.toString())}
                      />
                    </TableCell>
                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{`${student.full_name}`}</div>
                        <div className="text-xs text-gray-500">
                          {student.birthday ? new Date(student.birthday).toLocaleDateString("ru-RU") : "Not available"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        {student.points || 0} points
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{student.group_name || "Individual"}</div>
                        <div className="text-xs text-gray-500">{student.course_name || "General English"}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.study_date || "Not available"}</TableCell>
                    <TableCell>{student.phone_number}</TableCell>
                    <TableCell>{student.balance || "0 so'm"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditStudent(student?.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteStudent(student?.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="p-4 flex justify-between items-center">
          <Pagination />
        </div>
      </div>

      <AddStudentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSuccess={handleStudentSaved} studentId={selectedStudentId} />
    </div>
  );
}
