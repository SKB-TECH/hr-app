"use client";

import { useState } from "react";
import { CalEvent } from "@/types/schedule";
import {
  getRwandaHolidayLabel,
  toDateStr,
  today,
  isRwandaPublicHoliday,
} from "./MiniCalendar";
import Image from "next/image";

export function formatHour(h: number) {
  if (h === 0) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

function formatEventTime(start: number, end: number) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const label = end <= 12 ? "AM" : "PM";
  return `${pad(start)}.00 - ${pad(end)}.00 ${label}`;
}

export const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const ROW_H_MOBILE = 64;
const ROW_H_DESKTOP = 56;

function AvatarStack({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex items-center mt-2">
      {avatars.map((src, i) => (
        <div
          key={i}
          className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-300 flex-shrink-0"
          style={{
            marginLeft: i === 0 ? 0 : "-8px",
            zIndex: avatars.length - i,
          }}
        >
          <Image
            src={src}
            alt="avatar"
            width={24}
            height={24}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      ))}
    </div>
  );
}

function isHolidayDate(date: string, events: CalEvent[]) {
  const hasHolidayEvent = events.some(
    (event) =>
      event.date === date &&
      (event.category.toLowerCase() === "holiday" ||
        event.title.toLowerCase().includes("holiday")),
  );
  return hasHolidayEvent || isRwandaPublicHoliday(date);
}

export function WeekGrid({
  weekDays,
  events,
  onAddEvent,
}: {
  weekDays: Date[];
  events: CalEvent[];
  onAddEvent: (date: string, hour: number) => void;
}) {
  const todayS = toDateStr(today());
  const defaultDay =
    weekDays.find((d) => toDateStr(d) === todayS) ?? weekDays[0];
  const [selectedDay, setSelectedDay] = useState<Date>(defaultDay);
  const selectedDs = toDateStr(selectedDay);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex-shrink-0">
        {/* Desktop 7-col header */}
        <div
          className="hidden sm:grid"
          style={{ gridTemplateColumns: "64px repeat(7, 1fr)" }}
        >
          <div className="px-2 py-3 text-[11px] text-gray-400 font-medium text-center border-r border-gray-100">
            GMT+07
          </div>
          {weekDays.map((d) => {
            const ds = toDateStr(d);
            const isToday = ds === todayS;
            const isHoliday = isHolidayDate(ds, events);
            const holidayLabel = getRwandaHolidayLabel(ds);
            return (
              <div
                key={ds}
                className={`py-3 text-center border-r border-gray-100 ${isHoliday ? "bg-[#FF65501A]" : isToday ? "bg-orange-50/40" : ""}`}
              >
                <p className="text-[12px] text-gray-400 font-medium">
                  {DAYS_SHORT[d.getDay()]}
                </p>
                <div
                  className={`w-8 h-8 mx-auto mt-1 flex items-center justify-center rounded-full text-[14px] font-bold
                  ${isHoliday ? "bg-[#FF6550] text-white" : isToday ? "bg-indigo-600 text-white" : "text-[#202430]"}`}
                >
                  {d.getDate()}
                </div>
                {isHoliday && (
                  <span className="mt-2 inline-flex items-center bg-[#FF6550] px-2 py-0.5 text-[10px] font-semibold text-white">
                    {holidayLabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: day-tab row */}
        <div className="sm:hidden">
          <div className="grid grid-cols-7 border-b border-gray-100">
            {weekDays.map((d) => {
              const ds = toDateStr(d);
              const isToday = ds === todayS;
              const isSel = ds === selectedDs;
              const isHoliday = isHolidayDate(ds, events);
              const holidayLabel = getRwandaHolidayLabel(ds);
              return (
                <button
                  key={ds}
                  onClick={() => setSelectedDay(d)}
                  className={`flex flex-col items-center py-3 focus:outline-none ${isHoliday ? "bg-[#FF65501A]" : ""}`}
                >
                  <span
                    className={`text-[12px] font-medium ${isSel ? "text-indigo-600" : "text-gray-400"}`}
                  >
                    {DAYS_SHORT[d.getDay()]}
                  </span>
                  <span
                    className={`w-8 h-8 mt-1 flex items-center justify-center rounded-full text-[14px] font-bold
                    ${isHoliday ? "bg-[#FF6550] text-white" : isToday ? "bg-indigo-600 text-white" : ""}
                    ${isSel && !isToday && !isHoliday ? "text-indigo-600 font-extrabold" : ""}
                    ${!isToday && !isSel && !isHoliday ? "text-[#202430]" : ""}`}
                  >
                    {d.getDate()}
                  </span>
                  {isHoliday && (
                    <span className="mt-1 bg-[#FF6550] px-2 py-0.5 text-[10px] font-semibold text-white">
                      {holidayLabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* GMT +07 sub-header row */}
          <div className="grid" style={{ gridTemplateColumns: "64px 1fr" }}>
            <div className="px-2 py-2 text-[12px] font-semibold text-[#202430] border-r border-gray-100">
              GMT +07
            </div>
            <div />
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE ROWS ── */}
      <div className="flex-1 overflow-y-auto">
        {HOURS.map((hour) => (
          <div key={hour}>
            {/* ── Desktop row ── */}
            <div
              className="hidden sm:grid border-b border-gray-50"
              style={{
                gridTemplateColumns: "64px repeat(7, 1fr)",
                height: `${ROW_H_DESKTOP}px`,
              }}
            >
              <div className="px-2 pt-1 text-[11px] text-gray-400 text-right border-r border-gray-100 select-none">
                {formatHour(hour)}
              </div>
              {weekDays.map((d) => {
                const ds = toDateStr(d);
                const isToday = ds === todayS;
                const isHoliday = isHolidayDate(ds, events);
                const cellEvts = events.filter(
                  (e) => e.date === ds && e.startHour === hour,
                );
                return (
                  <div
                    key={ds}
                    onClick={() => onAddEvent(ds, hour)}
                    className={`relative border-r border-gray-100 cursor-pointer
                      ${isHoliday ? "bg-[#FF65501A]" : isToday ? "" : "hover:bg-indigo-50/20"}`}
                    style={{ height: `${ROW_H_DESKTOP}px` }}
                  >
                    {cellEvts.map((ev) => {
                      const span = Math.max(1, ev.endHour - ev.startHour);
                      return (
                        <div
                          key={ev.id}
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute left-0.5 right-0.5 top-0 ${ev.color}  px-2 py-1.5 z-10 overflow-hidden`}
                          style={{ height: `${span * ROW_H_DESKTOP - 4}px` }}
                        >
                          <p className="text-white text-[11px] font-semibold leading-tight truncate">
                            {ev.title}
                          </p>
                          <p className="text-white/80 text-[10px] mt-0.5">
                            {formatEventTime(ev.startHour, ev.endHour)}
                          </p>
                          {ev.avatars && ev.avatars.length > 0 && (
                            <div className="absolute bottom-2 left-2">
                              <AvatarStack avatars={ev.avatars} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* ── Mobile row: time label + single day ── */}
            <div
              className="sm:hidden grid border-b border-gray-100"
              style={{
                gridTemplateColumns: "64px 1fr",
                height: `${ROW_H_MOBILE}px`,
              }}
            >
              {/* Time label — vertically centered */}
              <div className="border-r border-gray-100 flex items-center justify-end pr-3 select-none">
                <span className="text-[12px] text-gray-400">
                  {formatHour(hour)}
                </span>
              </div>

              {/* Event cell — full width, zero gap from time column */}
              <div
                onClick={() => onAddEvent(selectedDs, hour)}
                className={`relative ${isHolidayDate(selectedDs, events) && selectedDs === todayS ? "bg-[#FF65501A]" : ""}`}
                style={{ height: `${ROW_H_MOBILE}px` }}
              >
                {isHolidayDate(selectedDs, events) && hour === 0 && (
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-2 top-2 z-20 rounded-full bg-[#FF6550] px-2.5 py-1 text-[12px] font-semibold text-white"
                  >
                    {getRwandaHolidayLabel(selectedDs)}
                  </button>
                )}
                {events
                  .filter((e) => e.date === selectedDs && e.startHour === hour)
                  .map((ev) => {
                    const span = Math.max(1, ev.endHour - ev.startHour);
                    return (
                      <div
                        key={ev.id}
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute  left-0 right-0 top-0  ${ev.color} px-4 py-3 z-10 overflow-hidden`}
                        style={{ height: `${span * ROW_H_MOBILE}px` }}
                      >
                        <p className="text-white text-[15px] font-semibold leading-snug">
                          {ev.title}
                        </p>
                        <p className="text-white/85 text-[13px] mt-2">
                          {formatEventTime(ev.startHour, ev.endHour)}
                        </p>
                        {ev.avatars &&
                          ev.avatars.length > 0 && ( // ← add this
                            <div className="absolute bottom-3 left-4">
                              <AvatarStack avatars={ev.avatars} />
                            </div>
                          )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
