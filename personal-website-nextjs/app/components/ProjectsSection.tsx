"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Next.js Personal Website",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, exercitationem sed modi aperiam eius laborum in quam neque veritatis repellat voluptate dolore alias ullam, animi nesciunt iure tempora, error cum?",
    image: "/images/projects/under-construction.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Project 2",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, exercitationem sed modi aperiam eius laborum in quam neque veritatis repellat voluptate dolore alias ullam, animi nesciunt iure tempora, error cum?",
    image: "/images/projects/under-construction.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Project 3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, exercitationem sed modi aperiam eius laborum in quam neque veritatis repellat voluptate dolore alias ullam, animi nesciunt iure tempora, error cum?",
    image: "/images/projects/under-construction.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Project 4",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, exercitationem sed modi aperiam eius laborum in quam neque veritatis repellat voluptate dolore alias ullam, animi nesciunt iure tempora, error cum?",
    image: "/images/projects/under-construction.png",
    tag: ["All", "Data"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Project 5",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, exercitationem sed modi aperiam eius laborum in quam neque veritatis repellat voluptate dolore alias ullam, animi nesciunt iure tempora, error cum?",
    image: "/images/projects/under-construction.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Project 6",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, exercitationem sed modi aperiam eius laborum in quam neque veritatis repellat voluptate dolore alias ullam, animi nesciunt iure tempora, error cum?",
    image: "/images/projects/under-construction.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection: React.FC = () => {
  const [tag, setTag] = useState<string>("All");
  const ref = useRef(null);
  const isInView: boolean = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter(project =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id='projects' className='pt-24'>
      <h2 className='flex justify left px-4 xl:px-16 text-center text-4xl font-bold text-white mt-4'>
        My Projects
      </h2>
      <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
        <ProjectTag
          onClick={handleTagChange}
          name='All'
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name='Web'
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name='Data'
          isSelected={tag === "Data"}
        />
      </div>
      <ul ref={ref} className='grid md:grid-cols-3 gap-8 md:gap-12'>
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial='initial'
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
            ref={ref}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
