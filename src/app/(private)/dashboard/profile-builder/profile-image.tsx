"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Store {
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface ProfileImageUploaderProps {
  store: Store;
  onUpload: (url: string) => void;
}

const CLOUD_NAME = "dolfgr1q5"; // 🔧 Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "dev_rank"; // 🔧 Replace with your unsigned preset

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ store, onUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        onUpload(data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 font-poppins">
      <Avatar className="w-20 h-20">
        <AvatarImage src={store.profileImage} />
        <AvatarFallback>
          {store.firstName?.[0]}
          {store.lastName?.[0]}
        </AvatarFallback>
      </Avatar>

      <div>
        <Button variant="outline" className="gap-2" disabled={loading}>
          <Upload className="w-4 h-4" />
          <label htmlFor="upload-photo" className="cursor-pointer">
            {loading ? "Uploading..." : "Upload Photo"}
          </label>
        </Button>

        <input
          id="upload-photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
