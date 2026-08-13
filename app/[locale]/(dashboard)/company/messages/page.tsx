import MessagesClient from "@/components/dashboard/Company/Messages/MessagesClient";

export default function CompanyMessagesPage() {
  return (
    <div className="h-full overflow-y-auto">
      <h1 className="text-[23px] py-3 px-3   sm:px-5 border-b border-brand-light-neutral font-bold text-neutral-100 tracking-tight">
        Messages
      </h1>
      <MessagesClient />
    </div>
  );
}
