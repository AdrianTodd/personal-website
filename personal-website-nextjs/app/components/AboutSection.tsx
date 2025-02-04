"use client";
import React, { useTransition, useState, ReactElement } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import StackIcon from "./StackIcon";
import MSSQLLogo from "../../public/logos/microsoft-sql-server-logo.png";
import expressjs from "../../public/logos/expressjs-icon.svg";
import styles from "./StackIcon.module.css";

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
      <ul className='flex flex-row flex-wrap align-items-center '>
        <StackIcon iconName='python' title='Python' />
        <StackIcon iconName='js' title='JavaScript' />
        <StackIcon iconName='typescript' title='TypeScript' />
        <StackIcon iconName='nodejs' title='Node.js' />
        <li className='flex flex-col flex-wrap items-center text-xs'>
          <Image
            src={expressjs}
            alt='Express JS logo'
            className={(styles.stackicon, styles.color)}
          />
          Express.js
        </li>
        <StackIcon iconName='reactjs' title='React' />
        <StackIcon iconName='nextjs' title='Next.js' />
        <StackIcon iconName='tailwindcss' title='Tailwind CSS' />
        <StackIcon iconName='bootstrap5' title='Bootstrap5' />
        <StackIcon iconName='csharp' title='C# .NET' />
        <li className='flex flex-col flex-wrap items-center text-xs'>
          <Image
            src={MSSQLLogo}
            className={styles.stackicon}
            alt='Microsoft SQL Server logo'
          />
          MSSQL
        </li>
        <StackIcon iconName='mongodb' title='mongoDB' />
        <StackIcon iconName='graphql' title='graphQL' />
        <StackIcon iconName='postman' title='Postman' />
        <StackIcon iconName='figma' title='Figma' />
        <StackIcon iconName='copilotms' title='MS Copilot' />
        <StackIcon iconName='java' title='Java' />
        <StackIcon iconName='php' title='PHP' />
        <StackIcon iconName='vscode' title='VS Code' />
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className='list-disc mx-4'>
        <li>
          Currently in 3rd Year of Post Diploma BSc in Computer Science,
          University of Lethbridge Calgary Campus
        </li>
        <li>Bow Valley College, Software Development Diploma</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className='list-disc mx-4'>
        <li>Academic Projects, University of Lethbridge</li>
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
    <section id='about' className='text-white pt-2'>
      <div className='grid-cols-1 md:grid md:grid-cols-3 gap-8 justify-items py-8 lg:mt-16 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image
          className='col-span-1'
          src='/images/about-image.png'
          width={500}
          height={500}
          alt='about-image'
        />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full col-span-2'>
          <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
          <p className='text-base text-[#ADB7BE] lg:text-lg'>
            I&apos;m a full stack developer who enjoys creating cool things with
            code. I&apos;m a continuos learner, always looking to expand my
            knowledge and skill set. Here are some of my technical skills and
            experience.
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
