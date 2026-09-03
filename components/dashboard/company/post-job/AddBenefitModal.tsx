"use client";

import { Dispatch, SetStateAction } from "react";
import {
  HeartPulse,
  Laptop,
  Plane,
  Dumbbell,
  GraduationCap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export interface BenefitForm {
  id?: number;
  title: string;
  description: string;
  icon: string;
}

interface AddBenefitModalProps {
  open: boolean;
  form: BenefitForm;
  setForm: Dispatch<SetStateAction<BenefitForm>>;
  onClose: () => void;
  onSave: () => void;
}

const icons = [
  {
    name: "Healthcare",
    icon: <HeartPulse className="h-6 w-6" />,
  },
  {
    name: "Remote",
    icon: <Laptop className="h-6 w-6" />,
  },
  {
    name: "Vacation",
    icon: <Plane className="h-6 w-6" />,
  },
  {
    name: "Gym",
    icon: <Dumbbell className="h-6 w-6" />,
  },
  {
    name: "Learning",
    icon: <GraduationCap className="h-6 w-6" />,
  },
];

export default function AddBenefitModal({
  open,
  form,
  setForm,
  onClose,
  onSave,
}: AddBenefitModalProps) {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-lg rounded-none">
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit Benefit" : "Add Benefit"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Benefit Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Healthcare"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe this benefit..."
              className="w-full rounded-lg border border-gray-300 p-4 outline-none transition focus:border-indigo-600"
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Choose Icon
            </label>

            <div className="grid grid-cols-5 gap-3">
              {icons.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      icon: item.name,
                    }))
                  }
                  className={`flex h-14 items-center justify-center rounded-lg border transition ${
                    form.icon === item.name
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={onSave} disabled={!form.title.trim()}>
            {form.id ? "Update Benefit" : "Save Benefit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
