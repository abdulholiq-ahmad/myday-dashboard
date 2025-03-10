"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import UserProfileService from "../services/user-profile.service";
import LoadingSpinner from "../components/features/loading";

interface UserProfile {
  first_name: string;
  last_name: string;
  position: string;
  profile_photo: string;
  phone_number_1: string;
  telegram_username: string;
  instagram_username: string;
  is_active: boolean;
}

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    position: "",
    profile_photo: "",
    phone_number_1: "",
    telegram_username: "",
    instagram_username: "",
    is_active: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const fetchedProfile = await UserProfileService.getUserProfile();
      setProfile(fetchedProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedImage = await UserProfileService.uploadProfilePhoto(file);
        setProfile((prev) => ({ ...prev, profile_photo: uploadedImage.profile_photo }));
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Rasm yuklashda xatolik yuz berdi");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { first_name, last_name, instagram_username, telegram_username, phone_number_1, profile_photo, position } = profile;

    console.log({ first_name, last_name, instagram_username, telegram_username, phone_number_1, profile_photo, position });

    try {
      const updatedProfile = await UserProfileService.updateUserProfile({
        first_name,
        last_name,
        position,
        instagram_username,
        telegram_username,
        phone_number_1,
        profile_photo,
      });
      setProfile(updatedProfile);
    } catch (err: any) {
      console.error("Error updating user profile:", err);
      setError(err.message || "Profilni yangilashda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Sozlamalar</h1>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-6">Profil</h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img src={profile.profile_photo || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <Button type="button" onClick={() => fileInputRef.current?.click()}>
                Rasm yuklash
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">Ism</Label>
                <Input id="first_name" name="first_name" value={profile.first_name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Familiya</Label>
                <Input id="last_name" name="last_name" value={profile.last_name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number_1">Telefon raqam</Label>
                <Input id="phone_number_1" name="phone_number_1" value={profile.phone_number_1} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Lavozim</Label>
                <Input
                  id="position"
                  name="position"
                  value={profile.position}
                  onChange={handleChange}
                  placeholder="Misol: asoschi yoki marketolog..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram_username">Telegram foydalanuvchi nomi</Label>
                <Input id="telegram_username" name="telegram_username" value={profile.telegram_username} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram_username">Instagram foydalanuvchi nomi</Label>
                <Input id="instagram_username" name="instagram_username" value={profile.instagram_username} onChange={handleChange} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={profile.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="is_active">Faol</Label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button" onClick={fetchUserProfile}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : "Saqlash"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
