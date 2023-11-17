import { useProfile } from "@/components/hooks/useProfile";
import Image from "next/image";
import React from "react";
export const HeaderProfile: React.FC = () => {
  const { profile } = useProfile();
  return (
    <div>
      {profile?.avatarPath && (
        <Image
          width={43}
          height={44}
          src={profile?.avatarPath}
          alt={"Profile"}
          className="rounded-full border border-primary border-solid animatep-opacity"
        />
      )}
    </div>
  );
};
