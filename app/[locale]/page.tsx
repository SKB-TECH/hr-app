import React from 'react';
import ReusableButton from '@/components/ui/ReusableButton';
import { ArrowRight } from 'lucide-react';
import { ReusableTitle } from '@/components/ui/ReusableTitle';


const Page = () => {
    return (
      <div>
        <ReusableTitle
          firstTitle="mission"
          secondTitle="We’ve managed over 2.5 million candidates"
          text="Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate. Elit sit varius condimentum tempor vel commodo malesuada. "
        />
        <ReusableButton
          text="Submit"
          icon={<ArrowRight className="text-black ml-8 text-4xl" />}
        />
      <ContactSection />
    </main>
  );
};

export default Page;
