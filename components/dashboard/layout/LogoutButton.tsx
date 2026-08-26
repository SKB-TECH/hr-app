"use client";
import { useLogout } from "@/core/hooks/auth/use-logout";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

function LogoutButton() {
  const logout = useLogout();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={logout.isPending}
      onClick={() => logout.mutate(undefined, { onSuccess: () => { toast.success("Déconnexion réussie"); router.replace("/sign-in"); }, onError: () => toast.error("Déconnexion impossible") })}
      className="flex w-full items-center gap-2.5 border-t border-[#e8e7f2] px-3 py-3 text-left text-sm font-semibold text-[#ff6550] transition-colors hover:bg-[#fff3f1] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LogOut size={18} aria-hidden="true" />
      <span>{logout.isPending ? "Déconnexion…" : "Se déconnecter"}</span>
    </button>
  );
}

export default LogoutButton;
