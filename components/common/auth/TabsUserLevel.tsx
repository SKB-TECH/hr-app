"use client";

export type UserLevel = "job-seeker" | "company";

type Props = {
    value: UserLevel;
    onChange: (value: UserLevel) => void;
};

export default function TabsUserLevel({
                                          value,
                                          onChange,
                                      }: Props) {
    return (
        <div className="mx-auto flex w-fit items-center justify-center border border-brand-light-neutral bg-white p-1">
            <button
                type="button"
                onClick={() => onChange("job-seeker")}
                className={`border px-5 py-2.5 font-epilogue font-medium transition-all ${
                    value === "job-seeker"
                        ? "border-brand bg-purple-100 text-indigo-600"
                        : "border-transparent bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
                Job Seeker
            </button>

            <button
                type="button"
                onClick={() => onChange("company")}
                className={`border px-5 py-2.5 font-epilogue font-medium transition-all ${
                    value === "company"
                        ? "border-brand bg-purple-100 text-indigo-600"
                        : "border-transparent bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
                Company
            </button>
        </div>
    );
}
