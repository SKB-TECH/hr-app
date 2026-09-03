"use client";

import { useTranslations } from "next-intl";

interface OverlayFooterProps {
  isPending: boolean;
  onSubmit: () => void;
}

export default function OverlayFooter({ isPending, onSubmit }: OverlayFooterProps) {
  const t = useTranslations("findJobs");

  return (
    <div className="apply-overlay__footer">
      <button type="button" className="apply-overlay__submit" onClick={onSubmit} disabled={isPending}>
        {isPending ? t("apply.footer.submitting") : t("apply.footer.submit")}
      </button>
      <p className="apply-overlay__terms">
        {t.rich("apply.footer.terms", {
          terms: (chunks) => <a href="#">{chunks}</a>,
          privacy: (chunks) => <a href="#">{chunks}</a>,
        })}
      </p>
    </div>
  );
}
