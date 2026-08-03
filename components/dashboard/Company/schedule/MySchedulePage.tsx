"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MiniCalendar, toDateStr, today } from "./MiniCalendar";
import { CalEvent, Category } from "@/types/schedule";
import { CategoryPanel } from "./CategoryPanel";
import { WeekGrid } from "./WeekGrid";
import { AddEventModal } from "./AddEventModel";

type ViewMode = "Day" | "Week" | "Month";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getWeekDays(anchor: Date): Date[] {
  const d = new Date(anchor);
  d.setDate(d.getDate() - d.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    return day;
  });
}

const todayDate = today();
const todayStr = toDateStr(todayDate);

const INIT_CATEGORIES: Category[] = [
  {
    id: "interview",
    label: "Interview Schedule",
    color: "#4640DE",
    checked: true,
  },
  { id: "meeting", label: "Internal Meeting", color: "#56CDAD", checked: true },
  { id: "team", label: "Team Schedule", color: "#7B61FF", checked: false },
  { id: "task", label: "My Task", color: "#F4A33C", checked: false },
  { id: "reminder", label: "Reminders", color: "#F65160", checked: false },
];

const CATEGORY_BG: Record<string, string> = {
  interview: "bg-[#26a4ff]",
  meeting: "bg-[#56CDAD]",
  team: "bg-[#7B61FF]",
  task: "bg-[#F4A33C]",
  reminder: "bg-[#F65160]",
};

const SEED_EVENTS: CalEvent[] = [
  {
    id: "e1",
    title: "Interview session with Kathryn Murphy",
    date: todayStr,
    startHour: 2,
    endHour: 5,
    color: CATEGORY_BG["interview"],
    category: "interview",
    avatars: ["/team/kathryn.png", "/team/jake.png"],
  },
  {
    id: "e2",
    title: "Interview sess...",
    date: todayStr,
    startHour: 8,
    endHour: 9,
    color: CATEGORY_BG["interview"],
    category: "interview",
  },
];

export default function MySchedulePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("Week");
  const [anchor, setAnchor] = useState<Date>(todayDate);
  const [events, setEvents] = useState<CalEvent[]>(SEED_EVENTS);
  const [categories, setCategories] = useState<Category[]>(INIT_CATEGORIES);
  const [showModal, setShowModal] = useState(false);
  const [newEventDefaults, setNewEventDefaults] = useState({
    date: todayStr,
    hour: 9,
  });

  // Mobile-specific UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [monthDropOpen, setMonthDropOpen] = useState(false);

  const weekDays = useMemo(() => getWeekDays(anchor), [anchor]);
  const currentMonthLabel = MONTHS[anchor.getMonth()];
  const currentMonthLabelFull = `${MONTHS[anchor.getMonth()].toUpperCase()} ${anchor.getFullYear()}`;
  const enabledCategories = useMemo(
    () => categories.filter((c) => c.checked).map((c) => c.id),
    [categories],
  );
  const visibleEvents = useMemo(
    () => events.filter((e) => enabledCategories.includes(e.category)),
    [events, enabledCategories],
  );

  function prevPeriod() {
    const d = new Date(anchor);
    d.setDate(d.getDate() - 7);
    setAnchor(d);
  }
  function nextPeriod() {
    const d = new Date(anchor);
    d.setDate(d.getDate() + 7);
    setAnchor(d);
  }
  function goToday() {
    setAnchor(today());
  }
  function openNewEvent(date: string, hour: number) {
    setNewEventDefaults({ date, hour });
    setShowModal(true);
  }
  function saveEvent(ev: CalEvent) {
    setEvents((prev) => [...prev, ev]);
  }
  function toggleCategory(id: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)),
    );
  }

  return (
    <div className="flex flex-col h-screen  overflow-hidden">
      <div className=" border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0 relative z-20">
        <div className="flex items-center   justify-between w-full sm:hidden">
          {/* Month name + chevron dropdown */}
          <div className="relative">
            <button
              onClick={() => setMonthDropOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[18px] font-extrabold text-[#202430]"
            >
              {currentMonthLabel}
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </button>

            {/* Month picker dropdown */}
            {monthDropOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2 min-w-[160px]">
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => {
                      const d = new Date(anchor);
                      d.setMonth(i);
                      setAnchor(d);
                      setMonthDropOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors
                      ${
                        anchor.getMonth() === i
                          ? "text-indigo-600 font-bold bg-indigo-50"
                          : "text-[#202430] hover:bg-gray-50"
                      }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 flex items-center justify-center border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
              aria-label="Open filters"
            >
              <Bars3BottomLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => openNewEvent(todayStr, 9)}
              className="w-9 h-9 flex items-center justify-center border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
              aria-label="Create event"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── DESKTOP header ── */}
        <div className="hidden   sm:flex items-center justify-between w-full">
          {/* Left: title + today */}
          <div className="flex items-center mb-3- gap-4">
            <h1 className="text-[24px] font-extrabold text-[#202430]">
              My Schedule
            </h1>
            <button
              onClick={goToday}
              className="border border-[#CCCCF5] text-indigo-600 text-[13px] font-semibold px-4 py-1.5  hover:bg-indigo-50 transition-colors"
            >
              Today
            </button>
          </div>

          {/* Center: month nav */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevPeriod}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <span className="text-[14px] font-bold text-[#202430] tracking-wide min-w-[160px] text-center">
              {currentMonthLabelFull}
            </span>
            <button
              onClick={nextPeriod}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* view tabs */}
          <div className="flex items-center gap-1">
            {(["Day", "Week", "Month"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`px-4 pt-1.5 pb-0 text-[13px] font-medium transition-colors relative ${
                  viewMode === v
                    ? "text-[#202430] font-bold"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {v}
                {viewMode === v && (
                  <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex  flex-1 overflow-hidden relative">
        {/* ── MOBILE: sidebar drawer overlay ── */}
        {sidebarOpen && (
          <div
            className="sm:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar (desktop: static | mobile: slide-in drawer) ── */}
        <div
          className={`
            bg-white border-r border-gray-200 flex flex-col overflow-y-auto
            /* Desktop */
            sm:relative sm:translate-x-0 sm:w-[280px] sm:flex-shrink-0 sm:z-auto
            /* Mobile drawer */
            fixed top-0 left-0 h-full z-50 w-[280px] transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:!translate-x-0
          `}
        >
          {/* Mobile close button */}
          <div className="sm:hidden flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-[15px] font-bold text-[#202430]">
              Filters
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Create Event button */}
          <div className="p-4 border-b border-gray-100">
            <button
              onClick={() => {
                openNewEvent(todayStr, 9);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 border border-[#CCCCF5] text-indigo-600 font-bold text-[14px] py-3 hover:bg-indigo-50 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Create Event
            </button>
          </div>

          {/* Mini calendar */}
          <MiniCalendar
            selected={anchor}
            onSelect={(d) => {
              setAnchor(d);
              setSidebarOpen(false);
            }}
          />

          {/* Categories */}
          <CategoryPanel
            categories={categories}
            onToggle={toggleCategory}
            onAddCategory={() => {
              openNewEvent(todayStr, 9);
              setSidebarOpen(false);
            }}
          />
        </div>

        {/* ── Week grid ── */}
        <WeekGrid
          weekDays={weekDays}
          events={visibleEvents}
          onAddEvent={openNewEvent}
        />
      </div>

      {showModal && (
        <AddEventModal
          defaultDate={newEventDefaults.date}
          categories={categories}
          onSave={saveEvent}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
