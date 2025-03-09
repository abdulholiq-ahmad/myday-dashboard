import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Search, Filter } from "lucide-react";
import { Student } from "../types";

// Mock data for students
const studentData: Student[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: `015 862`,
    name: "Alisher Atajanov",
    age: "28 y.o (28.02.1996)",
    points: 160,
    lesson: i % 2 === 0 ? "Group 45" : "Individual",
    lessonDetails: "General English: Indermatade",
    status: i === 1 ? "Process" : i === 2 ? "Finished" : i === 3 ? "Stopped" : "Active",
    studyDate: "02.03.2024-03.09.2024",
    phone: "+998 99 966 73 63",
    balance: "- 180 000 so'm",
  }));

// Special case for the second row
studentData[1].points = 1600;

function Clients() {
  const [students] = useState<Student[]>(studentData);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(13);

  const toggleStudentSelection = (id: string) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id));
    }
  };

  const getStatusBadge = (status: Student["status"]) => {
    let bgColor = "";
    switch (status) {
      case "Active":
        bgColor = "bg-green-500";
        break;
      case "Process":
        bgColor = "bg-yellow-500";
        break;
      case "Finished":
        bgColor = "bg-blue-500";
        break;
      case "Stopped":
        bgColor = "bg-red-500";
        break;
      default:
        bgColor = "bg-gray-500";
    }
    return <span className={`${bgColor} text-white px-2 py-1 rounded text-xs`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">List of clients</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="border-b-2 border-blue-500 rounded-none px-4 py-2">
              All Students
            </Button>
          </div>
        </div>

        <div className="p-4 flex justify-between items-center">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button>New Student</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === students.length && students.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
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
                <TableRow key={index}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleStudentSelection(student.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{student.name}</div>
                      <div className="text-xs text-gray-500">{index % 3 === 0 ? student.age : "Not available"}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {student.points} points
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{student.lesson}</div>
                      <div className="text-xs text-gray-500">{student.lessonDetails}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{student.studyDate}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.balance}</TableCell>
                  <TableCell>⋮</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 flex justify-between items-center">
          <Button variant="outline" size="sm" disabled={currentPage === 1}>
            Previous page
          </Button>

          <div className="flex items-center gap-1">
            {[10, 11, 12, 13, 14].map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
            <span className="px-2">...</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(52)} className="w-8 h-8 p-0">
              52
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 52}>
            Next page
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <Input className="w-16 h-8" placeholder="№" />
            <Button variant="outline" size="sm">
              Go to page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
