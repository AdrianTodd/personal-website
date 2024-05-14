import React from "react";
import Icon from "tech-stack-icons";
import styles from "./StackIcon.module.css";

interface StackIconProps {
  iconName: string;
  title: string;
}

const StackIcon: React.FC<StackIconProps> = ({ iconName, title }) => {
  return (
    <li className='flex flex-col flex-wrap items-center text-xs'>
      <Icon name={iconName} className={styles.stackicon} />
      {title}
    </li>
  );
};

export default StackIcon;
