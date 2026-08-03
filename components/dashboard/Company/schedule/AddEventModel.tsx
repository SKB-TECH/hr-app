import { CalEvent, Category } from "@/types/schedule";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { formatHour, HOURS } from "./WeekGrid";

const CATEGORY_BG: Record<string, string> = {
  interview: "bg-[#4640DE]",
  meeting:   "bg-[#56CDAD]",
  team:      "bg-[#7B61FF]",
  task:      "bg-[#F4A33C]",
  reminder:  "bg-[#F65160]",
};

export function AddEventModal({
  defaultDate,
  categories,
  onSave,
  onClose,
}: {
  defaultDate: string;
  categories: Category[];
  onSave: (e: CalEvent) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(10);
  const [category, setCategory] = useState(categories[0]?.id ?? "interview");

  function handleSave() {
    if (!title.trim()) return;
    onSave({
      id: Math.random().toString(36).slice(2),
      title,
      date,
      startHour: Number(startHour),
      endHour: Number(endHour),
      color: CATEGORY_BG[category] ?? "bg-indigo-500",
      category,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md   p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[17px] font-bold text-[#202430]">Create Event</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1 block">Event Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Interview session with..."
              className="w-full border border-gray-200 px-4 py-2.5 text-[14px] text-[#202430] outline-none focus:border-indigo-400 transition-colors rounded"
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-200 px-4 py-2.5 text-[14px] text-[#202430] outline-none focus:border-indigo-400 transition-colors rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-gray-500 mb-1 block">Start Time</label>
              <select
                value={startHour}
                onChange={e => setStartHour(Number(e.target.value))}
                className="w-full border border-gray-200 px-4 py-2.5 text-[14px] text-[#202430] outline-none focus:border-indigo-400 transition-colors rounded"
              >
                {HOURS.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-gray-500 mb-1 block">End Time</label>
              <select
                value={endHour}
                onChange={e => setEndHour(Number(e.target.value))}
                className="w-full border border-gray-200 px-4 py-2.5 text-[14px] text-[#202430] outline-none focus:border-indigo-400 transition-colors rounded"
              >
                {HOURS.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-gray-500 mb-1 block">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-200 px-4 py-2.5 text-[14px] text-[#202430] outline-none focus:border-indigo-400 transition-colors rounded"
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 font-semibold text-[14px] py-2.5 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-indigo-600 text-white font-semibold text-[14px] py-2.5 rounded hover:bg-indigo-700 transition-colors"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
}