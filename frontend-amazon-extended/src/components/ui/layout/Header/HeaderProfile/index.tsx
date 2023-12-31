import { useProfile } from "@/components/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const HeaderProfile: React.FC = () => {
  const { profile } = useProfile();
  return (
    <div>
      <Link href="/orders">
        {profile?.avatarPath && (
          <Image
            width={43}
            height={44}
            src={profile?.avatarPath}
            alt={"Profile"}
            className="rounded-full border border-primary border-solid animatep-opacity"
          />
        )}
      </Link>
    </div>
  );
};
