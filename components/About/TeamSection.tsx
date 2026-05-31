import React from "react";
import { TeamCard } from "./TeamCard";
import { ReusableTittle } from "../ui/ReusableTittle";

const defaultUsers = [
  {
    image: "/images/image1.png",
    name: "Emil Yancy",
    position: "Team Leader",
  },
  {
    image: "/images/image2.png",
    name: "Coty Robin",
    position: "Senior Recruitor",
  },
  {
    image: "/images/image3.png",
    name: "Missie Moira",
    position: "Senior Recruitor",
  },
  {
    image: "/images/image4.png",
    name: "Presley Kiera",
    position: "Senior Recruitor",
  },
  {
    image: "/images/image5.png",
    name: "Dave Jools",
    position: "Junior Recruitor",
  },
  {
    image: "/images/image6.png",
    name: "Ilene Leone",
    position: "Junior Recruitor",
  },
];

interface TeamSectionProps {
  users?: {
    image: string;
    name: string;
    position: string;
  }[];
}

export const TeamSection = ({ users = defaultUsers }: TeamSectionProps) => {
  return (
    <section className="bg-white/90">
      <div className="flex justify-center text-center">
        <ReusableTittle
          firstTittle="our team"
          secondTittle="We are Career specialists"
        />
      </div>

      <div className="flex flex-wrap justify-center  mt-10 max-w-[900px] mx-auto">
        {users.map((user, index) => (
          <div
            key={index}
            className={`
              w-full
              sm:w-[20%]
              md:w-[20%]
              lg:w-[22%]
              ${index >= 4 ? "lg:mx-0" : ""}
            `}
          >
            <TeamCard
              image={user.image}
              name={user.name}
              position={user.position}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
