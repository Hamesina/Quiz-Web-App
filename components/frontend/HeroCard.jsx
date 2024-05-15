import Image from "next/image";
import React from "react";

const HeroCard = ({ imgURL, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`border-2 rounded-xl ${
        isSelected ? "border-brightblue-8" : "border-transparent"
      } cursor-pointer max-sm:flex-1`}
    >
      <div className="p-5 bg-white ">
        <Image
          src={imgURL.thumbnail}
          alt="Hero Thumbnail"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default HeroCard;
