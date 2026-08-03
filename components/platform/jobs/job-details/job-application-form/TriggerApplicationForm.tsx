"use client";

import { useState } from "react";
import ApplyOverlay from "./ApplyOverlay";

function TriggerApplicationForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const showForm = () => setIsFormOpen(true);

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
        />
      )}
    </div>
  );
}

export default TriggerApplicationForm;
