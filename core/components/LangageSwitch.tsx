'use client';

import {useTransition} from 'react';
import {Check, ChevronDown} from 'lucide-react';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ReactCountryFlag from 'react-country-flag';

const languages = [
    {
        code: 'fr',
        label: 'Français',
        country: 'FR',
    },
    {
        code: 'en',
        label: 'English',
        country: 'US',
    },

];

export default function LanguageSwitcher() {
    const locale = useLocale();

    const router = useRouter();
    const pathname = usePathname();

    const [isPending, startTransition] = useTransition();

    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[0];

    const changeLanguage = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, {locale: newLocale});
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="
                        flex h-11 items-center gap-1 rounded-full
                        border border-slate-200 bg-white
                        px-4 shadow-none transition-all
                        hover:border-slate-300 hover:bg-slate-50
          "
                >
                    <ReactCountryFlag
                        svg
                        countryCode={currentLanguage.country}
                        style={{
                            width: '1.5em',
                            height: '1.5em',
                            borderRadius: '999px',
                            objectFit: 'cover',
                        }}
                    />
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="
          w-64 rounded border border-slate-200
          bg-white p-2 shadow-none
        "
            >
                {languages.map((lang) => {
                    const active = locale === lang.code;

                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            disabled={isPending}
                            className="
                                    flex cursor-pointer items-center
                                    justify-between rounded px-3 py-3
                                    outline-none transition-all
                                    hover:bg-slate-100
                                    "
                        >
                            <div className="flex items-center gap-3">
                                <ReactCountryFlag
                                    svg
                                    countryCode={lang.country}
                                    style={{
                                        width: '1.7em',
                                        height: '1.7em',
                                        borderRadius: '999px',
                                    }}
                                />

                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-slate-800">
                                    {lang.label}
                                  </span>
                                </div>
                            </div>

                            {active && (
                                <Check className="h-4 w-4 text-violet-600" />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
