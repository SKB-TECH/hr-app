"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { apiRequest } from "@/core/lib/api-client";
import type { OAuthProvider } from "@/core/services/auth/get-google-auth-url.service";
import { ApiError } from "@/core/types/api";

type ConnectedAccountsData = {
  accounts: Record<OAuthProvider, boolean>;
  hasPassword: boolean;
};

const providers: OAuthProvider[] = ["google"];

export default function ConnectedAccounts() {
  const t = useTranslations("candidateSettings.loginDetails.connectedAccounts");
  const locale = useLocale();
  const [accounts, setAccounts] = useState<ConnectedAccountsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<OAuthProvider | null>(null);
  const [failed, setFailed] = useState(false);

  const fetchAccounts = useCallback(async () => {
    const result = await apiRequest<ConnectedAccountsData>("auth/connected-accounts");
    return result.data;
  }, []);

  const loadAccounts = useCallback(async (): Promise<boolean> => {
    try {
      setAccounts(await fetchAccounts());
      setFailed(false);
      return true;
    } catch (error) {
      setFailed(true);
      toast.error(error instanceof ApiError ? error.message : t("loadFailed"));
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchAccounts, t]);

  useEffect(() => {
    let active = true;
    fetchAccounts()
      .then((data) => {
        if (active) {
          setAccounts(data);
          setFailed(false);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setFailed(true);
          toast.error(error instanceof ApiError ? error.message : t("loadFailed"));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchAccounts, t]);

  async function link(provider: OAuthProvider) {
    setBusy(provider);
    try {
      const result = await apiRequest<{ authorizationUrl: string }>(
        `auth/connected-accounts/${provider}/link`,
        {
          method: "POST",
          body: JSON.stringify({
            locale,
            returnTo: window.location.pathname,
          }),
        },
      );
      window.location.assign(result.data.authorizationUrl);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("actionFailed"));
      setBusy(null);
    }
  }

  async function unlink(provider: OAuthProvider) {
    if (!window.confirm(t("confirmUnlink", { provider: t(provider) }))) return;
    setBusy(provider);
    try {
      await apiRequest(`auth/connected-accounts/${provider}`, { method: "DELETE" });
      if (await loadAccounts()) {
        toast.success(t("unlinkSuccess", { provider: t(provider) }));
      }
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("actionFailed"));
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-[16px] font-epilogue font-semibold text-neutral-100">
        {t("title")}
      </h2>
      <p className="mt-1 text-[15px] font-epilogue text-gray-500">
        {t("description")}
      </p>
      <div className="mt-4 space-y-3">
        {failed && !accounts ? (
          <p role="alert" className="text-sm text-red-600">{t("loadFailed")}</p>
        ) : (
          providers.map((provider) => {
            const connected = accounts?.accounts[provider] ?? false;
            return (
              <div
                key={provider}
                className="flex items-center justify-between gap-4 border border-gray-200 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-800">{t(provider)}</p>
                  <p className="text-sm text-slate-500">
                    {connected ? t("connected") : t("notConnected")}
                  </p>
                </div>
                {connected ? (
                  <button
                    type="button"
                    disabled={loading || busy !== null}
                    onClick={() => void unlink(provider)}
                    className="text-sm font-semibold text-red-600 disabled:opacity-50"
                  >
                    {busy === provider ? t("working") : t("disconnect")}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={loading || busy !== null}
                    onClick={() => void link(provider)}
                    className="text-sm font-semibold text-indigo-600 disabled:opacity-50"
                  >
                    {busy === provider ? t("working") : t("connect")}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
