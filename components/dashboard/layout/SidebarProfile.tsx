"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "@/core/hooks/auth/use-session";
import { mediaUrl } from "@/core/lib/media-url";
import { useSwitchProfile } from "@/core/hooks/auth/use-switch-profile";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import { Check, ChevronUp, UserRound } from "lucide-react";

export function SidebarProfile() {
  const [showLogOut, setShowLogOut] = useState(false);
  const { data: user } = useSession();
  const profile = useSwitchProfile();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setShowLogOut(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
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
    <div ref={containerRef} className="relative z-20 px-3 pb-3">
      {showLogOut && <div className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden border border-[#e8e7f2] bg-white shadow-[0_16px_40px_rgba(37,50,75,0.16)]">
        <p className="px-4 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-60">Changer de profil</p>
        <ProfileChoice label={user?.profiles?.includes("COMPANY") ? "Entreprise" : "Ajouter un profil entreprise"} active={user?.activeProfile === "COMPANY"} pending={profile.isPending} onClick={() => changeProfile("COMPANY")}/>
        <ProfileChoice label={user?.profiles?.includes("CANDIDATE") ? "Candidat" : "Ajouter un profil candidat"} active={user?.activeProfile === "CANDIDATE"} pending={profile.isPending} onClick={() => changeProfile("CANDIDATE")}/>
        <LogoutButton />
      </div>}
      <button
        type="button"
        aria-expanded={showLogOut}
        onClick={() => setShowLogOut(!showLogOut)}
        className="flex w-full items-center gap-3 bg-white/85 p-2 text-left transition-colors hover:bg-white"
      >
        <Image
          src={mediaUrl(user?.avatar, "/team/person2.png")}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full shrink-0  w-[40px] h-[40px] bg-center object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#202430]">{user?.fullName || "Utilisateur"}</p>
          <p className="truncate text-[12px] text-gray-400">{user?.email}</p>
        </div>
        <ChevronUp size={16} className={`shrink-0 text-neutral-60 transition-transform ${showLogOut ? "rotate-180" : ""}`}/>
      </button>
    </div>
  );
}

function ProfileChoice({label,active,pending,onClick}:{label:string;active:boolean;pending:boolean;onClick:()=>void}) {
  return <button type="button" disabled={pending||active} onClick={onClick} className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm transition-colors ${active?"bg-accent-light-brand font-bold text-brand":"text-neutral-80 hover:bg-[#f8f8fc]"}`}><span className={`grid size-7 shrink-0 place-items-center ${active?"bg-brand text-white":"bg-[#f1f1f7] text-neutral-60"}`}><UserRound size={15}/></span><span className="min-w-0 flex-1 leading-5">{label}</span>{active&&<Check size={16} className="shrink-0"/>}</button>;
}
