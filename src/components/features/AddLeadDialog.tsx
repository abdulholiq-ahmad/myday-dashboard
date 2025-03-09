import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CheckCircle2 } from "lucide-react";

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LeadFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  subject: string;
  lessonType: string;
  teacher: string;
  lessonTime: string;
  leadSource: string;
  addToLeadBoard: boolean;
}

function AddLeadDialog({ open, onOpenChange }: AddLeadDialogProps) {
  const [step, setStep] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: "John",
    lastName: "Anderson",
    phoneNumber: "+998",
    subject: "",
    lessonType: "",
    teacher: "",
    lessonTime: "",
    leadSource: "",
    addToLeadBoard: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, addToLeadBoard: checked }));
  };

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
      // Auto close after success message
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        setShowMore(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else {
      onOpenChange(false);
      setStep(1);
      setShowMore(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Add new lead</DialogTitle>
              <DialogDescription>By creating a new lead, you will also be adding a new customer to customer base</DialogDescription>
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
                  <Label htmlFor="subject">
                    Select subject<span className="text-red-500">*</span>
                  </Label>
                  <Select onVolumeChange={(value) => handleSelectChange("subject", value)} value={formData.subject}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="button" variant="link" onClick={() => setShowMore(!showMore)} className="justify-start px-0">
                {showMore ? "Hide" : "Show more"}
              </Button>

              {showMore && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lessonType">Select lesson type</Label>
                    <Select onVolumeChange={(value) => handleSelectChange("lessonType", value)} value={formData.lessonType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teacher">Select teacher</Label>
                    <Select onVolumeChange={(value) => handleSelectChange("teacher", value)} value={formData.teacher}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="johnson">Mr. Johnson</SelectItem>
                        <SelectItem value="alibek">Mr. Alibek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lessonTime">Select lesson time</Label>
                    <Select onVolumeChange={(value) => handleSelectChange("lessonTime", value)} value={formData.lessonTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">08:00 - 09:00</SelectItem>
                        <SelectItem value="afternoon">14:00 - 15:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leadSource">Select lead source</Label>
                    <Select onChange={(value) => handleSelectChange("leadSource", value)} value={formData.leadSource}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox id="addToLeadBoard" checked={formData.addToLeadBoard} onChange={(e) => handleCheckboxChange(e.target.checked)} />
                <label
                  htmlFor="addToLeadBoard"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add to lead board
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Confirm</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm add a new lead</DialogTitle>
              <DialogDescription>Do you confirm the addition of a new lead to the system?</DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-center">
              <Button variant="outline" onClick={handleCancel}>
                Go back
              </Button>
              <Button onClick={handleSubmit}>Yes</Button>
            </DialogFooter>
          </>
        )}

        {step === 4 && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">New lead has been added</h2>
            <p className="text-gray-500">A new lead has been successfully added to the system</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddLeadDialog;
