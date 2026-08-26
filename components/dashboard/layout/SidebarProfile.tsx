"use client";
import Image from "next/image";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "@/core/hooks/auth/use-session";
import { mediaUrl } from "@/core/lib/media-url";
import { useSwitchProfile } from "@/core/hooks/auth/use-switch-profile";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";

export function SidebarProfile() {
  const [showLogOut, setShowLogOut] = useState(false);
  const { data: user } = useSession();
  const profile = useSwitchProfile();
  const router = useRouter();
  const changeProfile = (target: "CANDIDATE" | "COMPANY") => {
    if (target === user?.activeProfile) return;
    profile.mutate(
      { profile: target, enable: !user?.profiles?.includes(target) },
      {
        onSuccess: () => {
          setShowLogOut(false);
          toast.success(target === "COMPANY" ? "Profil entreprise activé" : "Profil candidat activé");
          router.replace(target === "COMPANY" ? "/company" : "/candidate");
        },
        onError: () => toast.error("Impossible de changer de profil"),
      },
    );
  };
  return (
    <div>
      {showLogOut && <div className="mx-3 mb-2 space-y-1 bg-white p-2 shadow-lg">
        <p className="px-3 py-2 text-xs font-bold uppercase text-gray-400">Profil actif</p>
        <button disabled={profile.isPending} onClick={() => changeProfile("COMPANY")} className={`w-full px-3 py-2 text-left text-sm ${user?.activeProfile === "COMPANY" ? "bg-accent-light-brand font-bold text-brand" : "hover:bg-gray-50"}`}>{user?.profiles?.includes("COMPANY") ? "Entreprise" : "+ Ajouter le profil entreprise"}</button>
        <button disabled={profile.isPending} onClick={() => changeProfile("CANDIDATE")} className={`w-full px-3 py-2 text-left text-sm ${user?.activeProfile === "CANDIDATE" ? "bg-accent-light-brand font-bold text-brand" : "hover:bg-gray-50"}`}>{user?.profiles?.includes("CANDIDATE") ? "Candidat" : "+ Ajouter le profil candidat"}</button>
        <LogoutButton setShowLogOut={setShowLogOut} />
      </div>}
      <div
        onClick={() => setShowLogOut(!showLogOut)}
        className="relative z-2 flex  justify-center items-center gap-3 p-2 rounded-lg hover:bg-[#e6e5fa] transition-colors duration-200"
      >
        <Image
          src={mediaUrl(user?.avatar, "/team/person2.png")}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full shrink-0  w-[40px] h-[40px] bg-center object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[16px] font-medium text-[#202430]">{user?.fullName || "Utilisateur"}</p>
          <p className="truncate text-[12px] text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
