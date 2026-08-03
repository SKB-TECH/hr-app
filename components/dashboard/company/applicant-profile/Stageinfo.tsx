import { Badge } from "@/components/ui/badge";
import { ASSIGNEES } from "@/data/dashboard-applicants";
import { cn } from "@/lib/utils";
import { Assignee } from "@/types/company-applicants";
import Image from "next/image";

function InfoCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-md:grid max-md:grid-cols-2 ">
      <p className="text-[16px]  text-muted-foreground mb-1">{label}</p>
      {children}
    </div>
  );
}

function Avatar({ avatar }: Assignee) {
  return (
    <Image
      src={avatar}
      width={20}
      height={20}
      alt="avatar image"
      className={cn(
        "w-11 h-11 object-cover bg-gray-500 rounded-full flex items-center justify-center text-xs font-semibold  -ml-5 duration-600 ease-in-out transition-all hover:-ml-2 hover:scale-110 cursor-pointer first:ml-0",
      )}
    />
  );
}

export function StageInfo() {
  return (
    <div>
      <p className="text-[16px] text-neutral-100 font-semibold   mb-4">
        Stage Info
      </p>

      <div className="grid max-md:grid-cols-1 grid-cols-2 gap-x-6 gap-y-5">
        <InfoCell label="Interview Date">
          <p className="text-[16px] font-medium text-neutral-100 place-items-start ">
            10 – 13 July 2021
          </p>
        </InfoCell>

        <InfoCell label="Interview Status">
          <Badge
            variant="secondary"
            className="bg-accent-light-yellow text-accent-yellow font-medium text-md p-4"
          >
            On Progress
          </Badge>
        </InfoCell>

        <InfoCell label="Interview Location">
          <p className="text-[16px] text-neutral-100 leading-relaxed">
            Silver Crysta Room, Nomad Office
            <br />
            3517 W. Gray St. Utica,
            <br />
            Pennsylvania 57867
          </p>
        </InfoCell>

        <InfoCell label="Assigned to">
          <div className="flex items-center">
            {ASSIGNEES.map((a) => (
              <Avatar key={a.initials} {...a} />
            ))}
          </div>
        </InfoCell>
      </div>
    </div>
  );
}
