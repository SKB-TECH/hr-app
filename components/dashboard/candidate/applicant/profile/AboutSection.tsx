   
'use client';
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface AboutSectionProps {
  paragraphs?: string[];
}

const defaultParagraphs = [
  "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.",
  "For 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
];

export default function AboutSection({ paragraphs = defaultParagraphs }: AboutSectionProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 font-epilogue">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[20px] font-bold  text-[#202430]">About Me</h2>
        <button className="border border-gray-200 p-1.5   transition-colors">
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[16px] font-epilogue text-gray-500 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}