import React from 'react'


interface TeamCardProps {
  image?: string;
  name?: string;
  position?: string;
}

export const TeamCard = ({image, name, position}: TeamCardProps) => {
  return (
    <div className="bg-white p-5">
      <div className="bg-white/90 rounded-lg p-4  gap-2">
        <div className="w-40 h-40 justify-center">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h1>{name}</h1>
        <p>{position}</p>
      </div>
    </div>
  );
}
