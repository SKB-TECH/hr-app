import { MessageSquareMore } from 'lucide-react';

export default function ChatButton(){
  return (
    <div className="hidden md:block">
      {/* Floating chat button */}
      <button className=" fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-none bg-black text-white shadow-lg cursor-pointer">
        <MessageSquareMore size={24} />
      </button>
    </div>
  );
}
