import React from "react";
import ReusableButton from "@/components/ui/ReusableButton";
import { ArrowRight, Fullscreen } from "lucide-react";
import { ReusableTittle } from "@/components/ui/ReusableTittle";
import Image from "next/image";

export const Misson = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
      <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
        <div className="w-full lg:w-1/2 flex items-center justify-center py-10 md:py-0">
          <div className=" md:text-left">
            <ReusableTittle
              firstTittle="misson"
              secondTittle="We’ve managed over 2.5 million candidates"
              text="Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate. Elit sit varius condimentum tempor vel commodo malesuada."
            />
            <ReusableButton icon={<ArrowRight />} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[600px] lg:h-auto">
          <img
            src="/images/image.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
