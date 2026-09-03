"use client";

import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useSession } from "@/core/hooks/auth/use-session";
import { useSwitchProfile } from "@/core/hooks/auth/use-switch-profile";
import { useEnableProfile } from "@/core/hooks/auth/use-enable-profile";
import { useRouter } from "@/i18n/routing";
import type { AccountProfile } from "@/core/services/auth/switch-profile.service";

function AccountType() {
  const t = useTranslations("candidateSettings.profile.accountType");
  const { data: user } = useSession();
  const switchProfile = useSwitchProfile();
  const enableProfile = useEnableProfile();
  const router = useRouter();

  const isPending = switchProfile.isPending || enableProfile.isPending;
  const isCompanyActive = user?.activeProfile === "COMPANY";

  const switchTo = (target: AccountProfile) => {
    if (isPending || user?.activeProfile === target) return;

    const goTo = () => {
      switchProfile.mutate(
        { profile: target },
        {
          onSuccess: () => {
            toast.success(
              target === "COMPANY"
                ? t("switchedToEmployer")
                : t("switchedToJobSeeker"),
            );
            router.replace(target === "COMPANY" ? "/company" : "/candidate");
          },
          onError: () => toast.error(t("switchError")),
        },
      );
    };

    if (target === "COMPANY" && !user?.profiles?.includes("COMPANY")) {
      enableProfile.mutate("COMPANY", {
        onSuccess: goTo,
        onError: () => toast.error(t("switchError")),
      });
      return;
    }

    goTo();
  };

  return (
    <div className="flex max-md:flex-col gap-6 md:gap-16 mb-8">
      <div className="shrink-0">
        <h2 className="text-[16px] font-semibold text-neutral-1000">
          {t("title")}
        </h2>
        <p className="text-[15px] text-gray-500 mt-1">{t("description")}</p>
      </div>

      <div className="flex-1 space-y-4">
        <AccountTypeOption
          title={t("jobSeekerTitle")}
          description={t("jobSeekerDescription")}
          isActive={!isCompanyActive}
          isPending={isPending}
          currentLabel={t("currentBadge")}
          switchLabel={t("switchButton")}
          onSwitch={() => switchTo("CANDIDATE")}
        />

        <AccountTypeOption
          title={t("employerTitle")}
          description={t("employerDescription")}
          isActive={isCompanyActive}
          isPending={isPending}
          currentLabel={t("currentBadge")}
          switchLabel={t("switchButton")}
          onSwitch={() => switchTo("COMPANY")}
        />
      </div>
    </div>
  );
}

function AccountTypeOption({
  title,
  description,
  isActive,
  isPending,
  currentLabel,
  switchLabel,
  onSwitch,
}: {
  title: string;
  description: string;
  isActive: boolean;
  isPending: boolean;
  currentLabel: string;
  switchLabel: string;
  onSwitch: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border border-brand-light-neutral rounded-none p-4">
      <div>
        <p className="text-[15px] font-semibold">{title}</p>
        <p className="text-[15px] text-gray-500">{description}</p>
      </div>

      {isActive ? (
        <span className="shrink-0 rounded-none bg-accent-light-brand px-3 py-1.5 text-[13px] font-semibold text-brand">
          {currentLabel}
        </span>
      ) : (
        <button
          type="button"
          disabled={isPending}
          onClick={onSwitch}
          className="shrink-0 rounded-none border border-brand px-3 py-1.5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand/5 disabled:opacity-60"
        >
          {switchLabel}
        </button>
      )}
    </div>
  );
}

export default AccountType;
