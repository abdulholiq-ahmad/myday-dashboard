"use client";

import type React from "react";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { ErrorDisplay } from "../components/ui/error-display";
import LoadingSpinner from "./features/loading";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (data: any) => void;
}

export function AddStudentDialog({ open, onOpenChange, onSuccess }: AddStudentDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "+998",
    birthday: "",
    email: "",
    gender: "male",
    actionType: "individual", // individual or group
    course: "",
    level: "",
    groupId: "",
    paymentStatus: "unpaid",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user selects
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, actionType: value }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Ism kiritilishi shart";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Familiya kiritilishi shart";
    }

    if (!formData.phoneNumber.trim() || formData.phoneNumber === "+998") {
      errors.phoneNumber = "Telefon raqam kiritilishi shart";
    } else if (!/^\+998\d{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak";
    }

    if (!formData.birthday) {
      errors.birthday = "Tug'ilgan sana tanlanishi kerak";
    }

    if (formData.actionType === "group" && !formData.groupId) {
      errors.groupId = "Guruh tanlanishi kerak";
    }

    if (!formData.course) {
      errors.course = "Kurs tanlanishi kerak";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // API call simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success - move to success step
      setStep(3);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(formData);
      }

      // Auto close after success
      setTimeout(() => {
        onOpenChange(false);
        // Reset form after dialog is closed
        setTimeout(() => {
          setStep(1);
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "+998",
            birthday: "",
            email: "",
            gender: "male",
            actionType: "individual",
            course: "",
            level: "",
            groupId: "",
            paymentStatus: "unpaid",
            notes: "",
          });
        }, 300);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Talaba qo'shishda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onOpenChange(false);
      // Reset form after dialog is closed
      setTimeout(() => {
        setStep(1);
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "+998",
          birthday: "",
          email: "",
          gender: "male",
          actionType: "individual",
          course: "",
          level: "",
          groupId: "",
          paymentStatus: "unpaid",
          notes: "",
        });
      }, 300);
    }
  };

  // Available courses
  const courses = [
    { id: "general-english", name: "General English" },
    { id: "ielts", name: "IELTS Preparation" },
    { id: "business", name: "Business English" },
    { id: "kids", name: "English for Kids" },
  ];

  // Available levels
  const levels = [
    { id: "beginner", name: "Beginner" },
    { id: "elementary", name: "Elementary" },
    { id: "pre-intermediate", name: "Pre-Intermediate" },
    { id: "intermediate", name: "Intermediate" },
    { id: "upper-intermediate", name: "Upper-Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  // Available groups
  const groups = [
    { id: "group-45", name: "Group 45 (General English)" },
    { id: "group-46", name: "Group 46 (IELTS)" },
    { id: "group-47", name: "Group 47 (Business English)" },
  ];

  // Available birthdays (for demo)
  const birthdays = [
    { id: "1990-01-01", name: "01.01.1990" },
    { id: "1995-05-15", name: "15.05.1995" },
    { id: "2000-10-20", name: "20.10.2000" },
    { id: "2005-03-25", name: "25.03.2005" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Yangi talaba qo'shish</DialogTitle>
              <DialogDescription>Yangi talaba ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>

            {error && <ErrorDisplay message={error} onDismiss={() => setError(null)} />}

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={formErrors.firstName ? "text-red-500" : ""}>
                    Ism<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={formErrors.firstName ? "border-red-500" : ""}
                  />
                  {formErrors.firstName && <p className="text-red-500 text-xs">{formErrors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className={formErrors.lastName ? "text-red-500" : ""}>
                    Familiya<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={formErrors.lastName ? "border-red-500" : ""}
                  />
                  {formErrors.lastName && <p className="text-red-500 text-xs">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className={formErrors.phoneNumber ? "text-red-500" : ""}>
                    Telefon raqam<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+998XXXXXXXXX"
                    className={formErrors.phoneNumber ? "border-red-500" : ""}
                  />
                  {formErrors.phoneNumber && <p className="text-red-500 text-xs">{formErrors.phoneNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday" className={formErrors.birthday ? "text-red-500" : ""}>
                    Tug'ilgan sana<span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.birthday}>
                    <SelectTrigger className={formErrors.birthday ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {birthdays.map((birthday) => (
                        <SelectItem key={birthday.id} value={birthday.id}>
                          {birthday.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.birthday && <p className="text-red-500 text-xs">{formErrors.birthday}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Jinsi</Label>
                  <Select value={formData.gender}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Erkak</SelectItem>
                      <SelectItem value="female">Ayol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course" className={formErrors.course ? "text-red-500" : ""}>
                  Kurs<span className="text-red-500">*</span>
                </Label>
                <Select value={formData.course}>
                  <SelectTrigger className={formErrors.course ? "border-red-500" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.course && <p className="text-red-500 text-xs">{formErrors.course}</p>}
              </div>

              {formData.course && (
                <div className="space-y-2">
                  <Label htmlFor="level">Daraja</Label>
                  <Select value={formData.level}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Dars turi</Label>
                <RadioGroup value={formData.actionType} onValueChange={handleRadioChange} className="flex space-x-8">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="group" id="group" />
                    <Label htmlFor="group">Guruh</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.actionType === "group" && (
                <div className="space-y-2">
                  <Label htmlFor="groupId" className={formErrors.groupId ? "text-red-500" : ""}>
                    Guruh<span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.groupId}>
                    <SelectTrigger className={formErrors.groupId ? "border-red-500" : ""}>
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
                  {formErrors.groupId && <p className="text-red-500 text-xs">{formErrors.groupId}</p>}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">To'lov holati</Label>
                <Select value={formData.paymentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">To'langan</SelectItem>
                    <SelectItem value="partial">Qisman to'langan</SelectItem>
                    <SelectItem value="unpaid">To'lanmagan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Qo'shimcha ma'lumot</Label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Qo'shimcha ma'lumotlar..."
                  className="w-full min-h-[80px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Bekor qilish
              </Button>
              <Button onClick={handleSubmit}>Keyingi</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Ma'lumotlarni tasdiqlash</DialogTitle>
              <DialogDescription>Quyidagi ma'lumotlar to'g'riligini tasdiqlang</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Ism:</p>
                    <p className="font-medium">{formData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Familiya:</p>
                    <p className="font-medium">{formData.lastName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Telefon:</p>
                    <p className="font-medium">{formData.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tug'ilgan sana:</p>
                    <p className="font-medium">{birthdays.find((b) => b.id === formData.birthday)?.name || formData.birthday}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Kurs:</p>
                  <p className="font-medium">
                    {courses.find((c) => c.id === formData.course)?.name || formData.course}
                    {formData.level && ` (${levels.find((l) => l.id === formData.level)?.name || formData.level})`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Dars turi:</p>
                  <p className="font-medium">
                    {formData.actionType === "individual" ? "Individual" : "Guruh"}
                    {formData.actionType === "group" &&
                      formData.groupId &&
                      ` - ${groups.find((g) => g.id === formData.groupId)?.name || formData.groupId}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">To'lov holati:</p>
                  <p className="font-medium">
                    {formData.paymentStatus === "paid" ? "To'langan" : formData.paymentStatus === "partial" ? "Qisman to'langan" : "To'lanmagan"}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                Orqaga
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    Saqlanmoqda...
                  </>
                ) : (
                  "Saqlash"
                )}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 3 && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Talaba muvaffaqiyatli qo'shildi</h2>
            <p className="text-gray-500">
              {formData.firstName} {formData.lastName} ma'lumotlari tizimga saqlandi
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
