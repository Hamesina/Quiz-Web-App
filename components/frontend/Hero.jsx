"use client";
import { arrowRight } from "@/assets/icons";
import Button from "../Button";
import { heroImages, statistics } from "@/constants";
import Image from "next/image";
import { bigShoe1, exam } from "@/assets/images";
import { collectionbackground } from "@/assets/images";
import HeroCard from "./HeroCard";
import { useState } from "react";

const Hero = () => {
  /* const [heroImg, setHeroImg] = useState(bigShoe1); */

  const [heroImage, setHeroImage] = useState(exam);

  const changeHeroImage = (newHeroImage) => {
    setHeroImage(newHeroImage);
  };

  return (
    <div>
      <section className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
        <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x ml-5 pt-28">
          <p className="text-2xl font-montserrat font-bold text-brightblue-9">
            Test your knowledge
          </p>
          <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px]  gap-2 font-extrabold">
            <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
              Your Educational
            </span>
            <br />
            <span className="text-brightblue-9 inline-block mt-3 mr-5 ">
              Quiz
            </span>
            Platform
          </h1>
          <p className="font-montserrat text-slate-gray text-xl leading-8 mt-6 mb-14">
            Get ready to explore, learn, and conquer. Let the challenge begin!
            Discover questions prepared by your teachers and embark on an
            educational journey like no other.
          </p>
          <Button
            label="Get Started"
            iconUrl={arrowRight}
            buttonType="filled"
          />

          <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
            {statistics.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-palanquin font-bold ">
                  {stat.value}
                </p>
                <p className="leading-7 font-montserrat text-slate-gray">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center ">
          <Image
            src={exam}
            alt="image"
            width={610}
            height={500}
            className="object-contain relative z-10"
          />

          <div className="flex sm:gap-6 gap-4 absolute -bottom-[1%] sm:left-[18%] max-sm:px-6">
            <Button buttonType="outlined" label="Accessible" iconUrl="" />
            <Button buttonType="outlined" label="Eaxy to use" iconUrl="" />
            <Button buttonType="outlined" label="Educational" iconUrl="" />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
