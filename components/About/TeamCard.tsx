import React from 'react'
import Image from "next/image";

interface TeamCardProps {
  image?: string;
  name?: string;
  position?: string;
}

export const TeamCard = ({image, name, position}: TeamCardProps) => {
  return (
    <div className="bg-white p-5">
      <div className="bg-white/90 rounded-lg p-4  gap-2">
        <div className="w-40 h-40 relative">
          {image && (
            <Image
              src={image}
              alt={name || "Team member"}
              fill
              className="object-cover"
            />
          )}
        </div>
        <h1>{name}</h1>
        <p>{position}</p>
      </div>
    </div>
  );
}
