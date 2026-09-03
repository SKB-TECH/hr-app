import ChatButton from "@/components/dashboard/candidate/help-center/ChatButton";
import HelpSideBar from "@/components/dashboard/candidate/help-center/helpSideBar";

export default function HelpPage() {
  return (
    <main className='mx-auto max-w-[1200px]'>
      <HelpSideBar />
      <ChatButton />
    </main>
  );
}
