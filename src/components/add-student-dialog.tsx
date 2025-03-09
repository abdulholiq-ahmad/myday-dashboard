"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { X } from "lucide-react";
import StudentService from "../services/students.service";
import LoadingSpinner from "./features/loading";

interface StudentFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  actionType: string;
  groupId?: string;
  [key: string]: any;
}

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (data: any) => void;
  studentId?: number | null; // If provided, we're in update mode
  initialData?: any | null;
}

export function AddStudentDialog({ open, onOpenChange, onSuccess, studentId = null, initialData = null }: AddStudentDialogProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "+998",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    actionType: "individual", // individual or group
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isUpdateMode = !!studentId;

  // Parse date string to year, month, day
  const parseDateString = (dateString: string | null | undefined) => {
    if (!dateString) return { year: "", month: "", day: "" };

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return { year: "", month: "", day: "" };

      return {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        day: date.getDate().toString().padStart(2, "0"),
      };
    } catch (e) {
      return { year: "", month: "", day: "" };
    }
  };

  // Fetch student data if in update mode
  useEffect(() => {
    if (open && isUpdateMode && studentId && !initialData) {
      const fetchStudentData = async () => {
        try {
          setFetchingData(true);
          const studentData = await StudentService.getStudent(studentId.toString());

          const { year, month, day } = parseDateString(studentData.birthday);

          setFormData({
            firstName: studentData.first_name || "",
            lastName: studentData.last_name || "",
            phoneNumber: studentData.phone_number || "+998",
            birthYear: year,
            birthMonth: month,
            birthDay: day,
            actionType: studentData.group_id ? "group" : "individual",
            groupId: studentData.group_id?.toString() || "",
          });
        } catch (err) {
          console.error("Error fetching student data:", err);
          setError("Talaba ma'lumotlarini yuklashda xatolik yuz berdi");
        } finally {
          setFetchingData(false);
        }
      };

      fetchStudentData();
    } else if (initialData) {
      // Use provided initial data if available
      const { year, month, day } = parseDateString(initialData.birthday);

      setFormData({
        ...initialData,
        birthYear: year,
        birthMonth: month,
        birthDay: day,
      });
    }
  }, [open, studentId, isUpdateMode, initialData]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setError(null);
      if (!isUpdateMode) {
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "+998",
          birthYear: "",
          birthMonth: "",
          birthDay: "",
          actionType: "individual",
        });
      }
    }
  }, [open, isUpdateMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, actionType: value }));
  };

  // Format date as YYYY-MM-DD
  const formatBirthday = () => {
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) return "";
    return `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate form
      if (!formData.firstName.trim()) {
        setError("Ism kiritilishi shart");
        return;
      }
      if (!formData.lastName.trim()) {
        setError("Familiya kiritilishi shart");
        return;
      }
      if (!formData.phoneNumber.trim() || formData.phoneNumber === "+998") {
        setError("Telefon raqam kiritilishi shart");
        return;
      }
      if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
        setError("Tug'ilgan sana to'liq tanlanishi kerak");
        return;
      }

      // Prepare data for API
      const birthday = formatBirthday();

      const studentData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phoneNumber,
        birthday: birthday,
        group_id: formData.actionType === "group" ? formData.groupId : null,
      };

      let result;
      if (isUpdateMode && studentId) {
        // Update existing student
        result = await StudentService.updateStudent(studentId.toString(), studentData);
      } else {
        // Create new student
        result = await StudentService.createStudent(studentData);
      }

      // Close dialog and call success callback
      onOpenChange(false);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err: any) {
      console.error("Error saving student:", err);
      setError(err.response?.data?.detail || "Talaba ma'lumotlarini saqlashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
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

  return (
    <Dialog className="bg-white" open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-semibold text-[#2F3C7E]">{isUpdateMode ? "Update Student" : "Add new Student"}</DialogTitle>
              <DialogDescription className="text-base text-gray-500 mt-1">
                {isUpdateMode ? "Update student information" : "Add or move selected students to a new group"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {fetchingData ? (
          <div className="p-12 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="p-6 pt-4">
            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#2F3C7E] text-sm font-medium">
                    First name<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="rounded-lg border-gray-200"
                    placeholder="John"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#2F3C7E] text-sm font-medium">
                    Last name<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="rounded-lg border-gray-200"
                    placeholder="Anderson"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-[#2F3C7E] text-sm font-medium">
                    Phone number<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="rounded-lg border-gray-200"
                    placeholder="+998"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#2F3C7E] text-sm font-medium">
                    Birthday<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Year selector */}
                    <Select onVolumeChange={(value: any) => handleSelectChange("birthYear", value)} value={formData.birthYear}>
                      <SelectTrigger className="rounded-lg border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Month selector */}
                    <Select onVolumeChange={(value: any) => handleSelectChange("birthMonth", value)} value={formData.birthMonth}>
                      <SelectTrigger className="rounded-lg border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Day selector */}
                    <Select onVolumeChange={(value: any) => handleSelectChange("birthDay", value)} value={formData.birthDay}>
                      <SelectTrigger className="rounded-lg border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day.value} value={day.value}>
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[#2F3C7E] text-sm font-medium">Select type of action</Label>
                <RadioGroup value={formData.actionType} onValueChange={handleRadioChange} className="flex space-x-12">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="font-normal">
                      Individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="group" id="group" />
                    <Label htmlFor="group" className="font-normal">
                      Add group
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.actionType === "group" && (
                <div className="space-y-2">
                  <Label htmlFor="groupId" className="text-[#2F3C7E] text-sm font-medium">
                    Group<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Select onVolumeChange={(value: any) => handleSelectChange("groupId", value)} value={formData.groupId || ""}>
                    <SelectTrigger className="rounded-lg border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="rounded-lg px-8 text-gray-600 border-gray-200"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="rounded-lg px-8 bg-[#2F3C7E] hover:bg-[#2F3C7E]/90" disabled={loading}>
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      {isUpdateMode ? "Updating..." : "Creating..."}
                    </>
                  ) : isUpdateMode ? (
                    "Update"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
