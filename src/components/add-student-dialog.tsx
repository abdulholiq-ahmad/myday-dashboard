import type React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectItem } from "../components/ui/select";
import LoadingSpinner from "./features/loading";
import StudentService from "../services/students.service";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentAdded: (student: any) => void;
  studentId?: string | null;
  initialData?: any | null;
}

interface FormData {
  name: string;
  phoneNumber: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  actionType: string;
  groupId?: string;
  branch: string;
  subject: string;
  level: string;
  teacher: string;
  teacherPercentage: string;
  days: string;
  financeType: string;
  startDate: string;
  startTimeId: string;
  roomId: string;
  calculationType: string;
}

export function AddStudentDialog({ open, onOpenChange, onStudentAdded, studentId = null, initialData = null }: AddStudentDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    actionType: "trial",
    branch: "",
    subject: "",
    level: "",
    teacher: "",
    teacherPercentage: "",
    days: "",
    financeType: "",
    startDate: "",
    startTimeId: "",
    roomId: "",
    calculationType: "",
  });
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate years from 1950 to current year
  const years = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => (1950 + i).toString()).reverse();

  // Generate months 1-12
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { value: month, label: month };
  });

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, "0");
    return { value: day, label: day };
  });

  // Available groups (for demo)
  const groups = [
    { id: "1", name: "Group 45 (General English)" },
    { id: "2", name: "Group 46 (IELTS)" },
    { id: "3", name: "Group 47 (Business English)" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validate form
    if (!formData.name.trim()) {
      setError("Name is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Telefon raqam kiritilishi shart");
      setIsSubmitting(false);
      return;
    }
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      setError("To'liq tug'ilgan sana kiritilishi shart");
      setIsSubmitting(false);
      return;
    }
    if (formData.actionType === "group" && !formData.groupId) {
      setError("Guruh tanlanishi shart");
      setIsSubmitting(false);
      return;
    }

    try {
      const birthday = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;
      const studentData = {
        first_month_discount: 0,
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" "),
        phone_number_1: formData.phoneNumber,
        monthly_discount: 0,
        birthday,
        group_id: formData.actionType === "group" ? formData.groupId : null,
        branch: Number.parseInt(formData.branch),
        group_type: formData.actionType,
        subject: Number.parseInt(formData.subject),
        level: Number.parseInt(formData.level),
        teacher: Number.parseInt(formData.teacher),
        teacher_percentage: Number.parseFloat(formData.teacherPercentage),
        days: formData.days,
        finance_type: formData.financeType,
        start_date: formData.startDate,
        start_time_id: Number.parseInt(formData.startTimeId),
        room_id: Number.parseInt(formData.roomId),
        discount_first_month: false,
        calculation_type: Number.parseInt(formData.calculationType),
      };

      console.log(studentData);

      const createdStudent = await StudentService.createStudent(studentData);
      onStudentAdded(createdStudent);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Error creating student:", err.response?.data);
      setError(err.response?.data?.detail || "Failed to create student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog className="bg-white" open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{studentId ? "Edit Student" : "Add Student"}</DialogTitle>
          <DialogDescription>Fill in the information to {studentId ? "update" : "create"} a new student.</DialogDescription>
        </DialogHeader>

        {fetchingData ? (
          <div className="p-12 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6 pt-4">
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#2F3C7E] text-sm font-medium">
                      Full Name<span className="text-red-500 ml-0.5">*</span>
                    </Label>
                    <Input id="name" name="name" placeholder="Enter student's name" required value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-[#2F3C7E] text-sm font-medium">
                      Phone Number<span className="text-red-500 ml-0.5">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      required
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#2F3C7E] text-sm font-medium">
                      Birthday<span className="text-red-500 ml-0.5">*</span>
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Year selector */}
                      <Select name="birthYear" value={formData.birthYear} onChange={handleChange}>
                        <SelectItem value="" disabled>
                          Year
                        </SelectItem>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* Month selector */}
                      <Select name="birthMonth" value={formData.birthMonth} onChange={handleChange}>
                        <SelectItem value="" disabled>
                          Month
                        </SelectItem>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* Day selector */}
                      <Select name="birthDay" value={formData.birthDay} onChange={handleChange}>
                        <SelectItem value="" disabled>
                          Day
                        </SelectItem>
                        {days.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#2F3C7E] text-sm font-medium">
                    Action Type<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <RadioGroup value={formData.actionType} onValueChange={(value) => setFormData((prev) => ({ ...prev, actionType: value }))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="trial" id="trial" />
                      <Label htmlFor="trial">Trial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="group" id="group" />
                      <Label htmlFor="group">Group</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.actionType === "group" && (
                  <div className="space-y-2">
                    <Label htmlFor="groupId" className="text-[#2F3C7E] text-sm font-medium">
                      Group<span className="text-red-500 ml-0.5">*</span>
                    </Label>
                    <Select name="groupId" value={formData.groupId || ""} onChange={handleChange}>
                      <SelectItem value="" disabled>
                        Select a group
                      </SelectItem>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="text-[#2F3C7E] text-sm font-medium">
                      Branch
                    </Label>
                    <Input id="branch" name="branch" placeholder="Enter branch" value={formData.branch} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[#2F3C7E] text-sm font-medium">
                      Subject
                    </Label>
                    <Input id="subject" name="subject" placeholder="Enter subject" value={formData.subject} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-[#2F3C7E] text-sm font-medium">
                      Level
                    </Label>
                    <Input id="level" name="level" placeholder="Enter level" value={formData.level} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher" className="text-[#2F3C7E] text-sm font-medium">
                      Teacher
                    </Label>
                    <Input id="teacher" name="teacher" placeholder="Enter teacher" value={formData.teacher} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacherPercentage" className="text-[#2F3C7E] text-sm font-medium">
                      Teacher Percentage
                    </Label>
                    <Input
                      id="teacherPercentage"
                      name="teacherPercentage"
                      placeholder="Enter teacher percentage"
                      value={formData.teacherPercentage}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="days" className="text-[#2F3C7E] text-sm font-medium">
                      Days
                    </Label>
                    <Input id="days" name="days" placeholder="Enter days" value={formData.days} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="financeType" className="text-[#2F3C7E] text-sm font-medium">
                      Finance Type
                    </Label>
                    <Input
                      id="financeType"
                      name="financeType"
                      placeholder="Enter finance type"
                      value={formData.financeType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-[#2F3C7E] text-sm font-medium">
                      Start Date
                    </Label>
                    <Input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTimeId" className="text-[#2F3C7E] text-sm font-medium">
                      Start Time ID
                    </Label>
                    <Input
                      id="startTimeId"
                      name="startTimeId"
                      placeholder="Enter start time ID"
                      value={formData.startTimeId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomId" className="text-[#2F3C7E] text-sm font-medium">
                      Room ID
                    </Label>
                    <Input id="roomId" name="roomId" placeholder="Enter room ID" value={formData.roomId} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calculationType" className="text-[#2F3C7E] text-sm font-medium">
                    Calculation Type
                  </Label>
                  <Input
                    id="calculationType"
                    name="calculationType"
                    placeholder="Enter calculation type"
                    value={formData.calculationType}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> : studentId ? "Update Student" : "Add Student"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
