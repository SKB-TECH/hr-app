import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOTES } from "@/data/dashboard-applicants";
import { Note } from "@/types/company-applicants";
import Image from "next/image";

function NoteCard({ note }: { note: Note }) {
  return (
    <div className="border border-brand-light-neutral  p-3 bg-background">
      <div className="flex items-start gap-3">
        <Image
          alt={"profile image for " + note.authorName}
          src={note.avatarImage}
          width={20}
          height={20}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
          )}
        />

        <div className="flex-1 min-w-0 font-epilogue">
          <div className="flex max-md:items-start max-md:flex-col items-center justify-between gap-2 max-md:gap-0 mb-1 max-md:mb-2">
            <p className="text-[16px] font-semibold text-foreground">
              {note.authorName}
            </p>
            <p className="text-xs text-neutral-100 whitespace-nowrap">
              {note.date}
            </p>
          </div>

          <p className="text-[16px]  text-neutral-80 leading-relaxed">
            {note.message}
          </p>

          {note.replyCount && (
            <button className="mt-2 text-sm font-semibold cursor-pointer hover:text-indigo-800 font-epilogue text-brand hover:underline">
              {note.replyCount} Replies
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotesList() {
  return (
    <div>
      <div className="flex items-center justify-between my-6 font-epilogue">
        <h3 className="text-[16px]  text-neutral-100 font-semibold">Notes</h3>
        <button className="flex items-center gap-1   text-[16px]  font-semibold text-brand hover:text-indigo-800 cursor-pointer transition-colors">
          <Plus className="w-4 h-4" />
          Add Notes
        </button>
      </div>

      <div className="space-y-3">
        {NOTES.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
