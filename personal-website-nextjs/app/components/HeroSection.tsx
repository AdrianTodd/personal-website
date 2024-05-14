"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import OpenCV from "./OpenCV";

const HeroSection: React.FC = () => {
  return (
    <section className='py-10 xl:py-16'>
      <div className='grid grid-cols-1 lg:grid-cols-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-8 place-self-center text-center sm:text-left justify-self-start'
        >
          <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-700'>
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                "Adrian Todd",
                1200,
                "Software Developer",
                1000,
                "Data Enthusiast",
                1000,
                "UX/UI Designer",
                1000,
              ]}
              wrapper='span'
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className='text-[#ADB7BE]  text-base sm:text-lg lg:text-xl mb-6'>
            Looking to apply my knowledge, curiosity, and desire to learn to a
            talented software development team.
          </p>
          <div>
            <Link
              href='/home#contact'
              className='px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br hover:bg-gradient-to-tl from-primary-500 to-secondary-950 hover:bg-slate-800 text-white'
            >
              Hire Me
            </Link>
            <OpenCV />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-4 place-self-center mt-4 lg:mt-0'
        >
          <Image
            src='/images/hero-image.png'
            alt='hero image'
            className='rounded-full relative lg:mt-12 transform -translate-x-1/2 top-1/6 left-1/2 '
            width={300}
            height={300}
          ></Image>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
//<div className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative'></div>
