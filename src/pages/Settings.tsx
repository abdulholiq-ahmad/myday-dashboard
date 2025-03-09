import { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { FormData } from "../types";

function ProfileUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {preview ? (
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img src={preview || "/placeholder.svg"} alt="Profile preview" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">A</div>
      )}

      <p className="text-sm text-gray-500 mb-2">File Upload Label</p>

      <div
        className={`border-2 border-dashed rounded-md p-6 w-full max-w-md text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-500 mb-2">Drag and drop here or</p>
        <Button type="button" variant="outline" className="text-blue-500">
          Browse Files
        </Button>
        <input type="file" className="hidden" accept="image/*" />
      </div>
    </div>
  );
}

function Settings() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "Anderson",
    lastName: "Anderson",
    phoneNumber: "+998",
    employeeRole: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-6">Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <ProfileUpload />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First name<span className="text-red-500">*</span>
                </label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last name<span className="text-red-500">*</span>
                </label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium">
                  Phone number<span className="text-red-500">*</span>
                </label>
                <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="employeeRole" className="block text-sm font-medium">
                  Who is the employee?
                </label>
                <Input
                  id="employeeRole"
                  name="employeeRole"
                  value={formData.employeeRole}
                  onChange={handleChange}
                  placeholder="Example: founder or marketer..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;
