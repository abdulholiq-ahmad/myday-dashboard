import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Clock, Users } from "lucide-react";
import { Lesson } from "../../services/dashboard.service";

interface LessonTableProps {
  lessons: Lesson[];
}

export default function LessonTable({ lessons }: LessonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Lesson time</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Teacher name</TableHead>
          <TableHead>Subject name: level</TableHead>
          <TableHead>Lesson type</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Students</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessons.map((lesson, index) => (
          <TableRow key={lesson.id} className={index === 3 ? "bg-blue-50 border-l-4 border-blue-500" : ""}>
            <TableCell className="font-medium">1/{index + 1}</TableCell>
            <TableCell>
              <div className="flex items-center text-red-500">
                <Clock className="h-4 w-4 mr-1" />
                {lesson.time}
              </div>
            </TableCell>
            <TableCell>{lesson.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {lesson.teacher}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-1">🌐</span>
                {lesson.subject}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-1">📋</span>
                {lesson.type}
              </div>
            </TableCell>
            <TableCell>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{lesson.room}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {lesson.students} {lesson.students === 1 ? "student" : "students"}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
