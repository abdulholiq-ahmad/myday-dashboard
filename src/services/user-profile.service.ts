import api from "./api";

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

const UserProfileService = {
  async getUserProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>("/api/v1/user/me");
    return response.data;
  },

  async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.patch<UserProfile>("/api/v1/user/me", profileData);
    return response.data;
  },

  async replaceUserProfile(profileData: UserProfile): Promise<UserProfile> {
    const response = await api.put<UserProfile>("/api/v1/user/me", profileData);
    return response.data;
  },

  async uploadProfilePhoto(file: File): Promise<{ profile_photo: string }> {
    const formData = new FormData();
    formData.append("profile_photo", file);
    const response = await api.post<{ profile_photo: string }>("/api/v1/user/me/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default UserProfileService;
