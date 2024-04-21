"use client";
import React, { useTransition, useState, ReactElement } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

interface TabData {
  title: string;
  id: string;
  content: ReactElement;
}

const TAB_DATA: TabData[] = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul>
        <li>
          Python
          <ul className='px-5 text-xs'>
            <li>Kivy</li>
            <li>Bleak</li>
            <li>Pandas</li>
            <li>Seaborn</li>
          </ul>
        </li>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>
          React
          <ul className='px-5 text-xs'>
            <li>Next.js</li>
          </ul>
        </li>
        <li>Tailwind CSS</li>
        <li>C#</li>
        <li>MSSQL</li>
        <li>MongoDB</li>
        <li>GraphQL</li>
        <li>ChatGPT</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul>
        <li>Bow Valley College, Software Development Diploma</li>
        <li>MOOCS</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul>
        <li>Jr. Software Developer R&D, Orpyx Medical Technologies</li>
        <li>Software Development Projects, Bow Valley College</li>
      </ul>
    ),
  },
];

interface Props {}

const AboutSection: React.FC<Props> = (props: Props) => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const tabContent = TAB_DATA.find(t => t.id === tab)?.content;

  return (
    <section className='text-white'>
      <div className='md:grid md:grid-cols2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image
          src='/images/about-image.png'
          width={500}
          height={500}
          alt='about-image'
        />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
          <p className='text-base lg:text-lg'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
            ipsa doloribus officiis quas dicta, ex minus error assumenda
            veritatis quo laudantium facilis porro asperiores, totam repellat
            impedit suscipit officia incidunt.
          </p>
          <div className='flex flex-row justify-start mt-8'>
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              Experience
            </TabButton>
          </div>
          <div className='mt-8'>{tabContent}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
