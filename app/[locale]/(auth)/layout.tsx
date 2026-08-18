import React from "react";
import Image from "next/image";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function LayoutAuth({
                                       children,
                                   }: {
    children?: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full bg-white">
            <LanguageSwitcher className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6" />
            <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-5">
                {/* Partie gauche */}
                <div className="AuthLogin relative hidden md:col-span-2 md:block">
                    <div className="AuthLoginContent flex min-h-screen flex-col p-6 lg:p-10">
                        <div className="flex items-center">
                            <Image
                                src="/logo/lgo.png"
                                alt="Fast2Hire"
                                width={180}
                                height={60}
                                className="h-auto w-[140px] object-contain lg:w-[180px]"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Partie droite */}
                <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8 sm:px-6 md:col-span-3 md:px-8 lg:px-12 xl:px-16">
                    <div className="w-full max-w-xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
