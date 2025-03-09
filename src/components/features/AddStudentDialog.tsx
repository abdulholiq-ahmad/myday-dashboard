import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface StudentFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  actionType: "individual" | "group";
}

function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "John",
    lastName: "Anderson",
    phoneNumber: "+998",
    birthday: "",
    actionType: "individual", // individual or group
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, actionType: value as "individual" | "group" }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new Student</DialogTitle>
          <DialogDescription>Add or move selected students to a new group</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First name<span className="text-red-500">*</span>
              </Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last name<span className="text-red-500">*</span>
              </Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone number<span className="text-red-500">*</span>
              </Label>
              <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">
                Birthday<span className="text-red-500">*</span>
              </Label>
              <Select onVolumeChange={(value: any) => handleSelectChange("birthday", value)} value={formData.birthday}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Select</SelectItem>
                  <SelectItem value="1995-01-01">Jan 1, 1995</SelectItem>
                  <SelectItem value="2000-01-01">Jan 1, 2000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select type of action</Label>
            <RadioGroup value={formData.actionType} onValueChange={handleRadioChange} className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group">Add group</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentDialog;
