import React from "react";
import ReusableButton from "@/components/ui/ReusableButton";
import { ArrowRight, Fullscreen } from "lucide-react";
import { ReusableTittle } from "@/components/ui/ReusableTittle";
import Image from "next/image";

export const Misson = () => {
  return (
    <div className="items-center ">
      <div className="flex flex-col lg:flex-row items-center mx-auto">
        <div className="w-full lg:w-1/2 lg:px-18 px-6 py-16 md:px-12 max-w-7xl mx-auto">
          <ReusableTittle
            firstTittle="misson"
            secondTittle="We’ve managed over 2.5 million candidates"
            text="Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate. Elit sit varius condimentum tempor vel commodo malesuada."
          />
        </div>

        <div className="w-full lg:w-1/2 h-full md:h-full  ">
          <img
            src="/images/image.png"
            alt="image"
            className="w-full h-full  md:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
