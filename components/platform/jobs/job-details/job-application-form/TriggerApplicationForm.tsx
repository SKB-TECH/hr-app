"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ApplyOverlay from "./ApplyOverlay";
import { useSession } from "@/core/hooks/auth/use-session";
import { useRouter } from "@/i18n/routing";
import type { CompanyJob } from "@/core/types/job";

interface TriggerApplicationFormProps {
  job: CompanyJob;
}

function TriggerApplicationForm({ job }: TriggerApplicationFormProps) {
  const router = useRouter();
  const { data: session, isLoading } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const showForm = () => {
    if (isLoading) return;
    if (!session) {
      toast.error("Please sign in to apply for this job.");
      router.push("/sign-in");
      return;
    }
    setIsFormOpen(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={showForm}
        className="w-full md:w-auto bg-brand hover:bg-[#352fc9] transition-colors text-white font-semibold text-lg px-12 py-3 cursor-pointer"
      >
        Apply
      </button>
      {isFormOpen && (
        <ApplyOverlay
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          job={job}
        />
      )}
    </div>
  );
}

export default TriggerApplicationForm;
