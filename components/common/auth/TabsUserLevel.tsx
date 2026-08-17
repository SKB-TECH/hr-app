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
        <div className="flex w-full items-center justify-center">
            <button
                type="button"
                onClick={() => onChange("job-seeker")}
                className={`px-5 py-2.5 font-epilogue font-medium transition-all ${
                    value === "job-seeker"
                        ? "bg-purple-100 text-indigo-600"
                        : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
                Job Seeker
            </button>

            <button
                type="button"
                onClick={() => onChange("company")}
                className={`px-5 py-2.5 font-epilogue font-medium transition-all ${
                    value === "company"
                        ? "bg-purple-100 text-indigo-600"
                        : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
                Company
            </button>
        </div>
    );
}