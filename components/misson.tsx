import React from "react";
import ReusableButton from "@/components/ui/ReusableButton";
import { ArrowRight } from "lucide-react";
import { ReusableTittle } from "@/components/ui/ReusableTittle";
import Image from "next/image";

export const Misson = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center bg-white/50">
      
      <div className="w-full lg:w-1/2 p-5 sm:p-8 md:p-10 lg:p-20">
        <ReusableTittle
          firstTittle="Misson"
          secondTittle="We’ve managed over 2.5 million candidates"
          text="Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate. Elit sit varius condimentum tempor vel commodo malesuada."
        />

        <div className="mt-6">
          <ReusableButton icon={<ArrowRight />} />
        </div>
      </div>

      
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Image
          src="/images/image.png"
          alt="Mission Image"
          width={700}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};
