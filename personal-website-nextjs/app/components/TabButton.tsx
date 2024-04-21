import React, { MouseEventHandler, ReactNode } from "react";

interface TabButtonType {
  active: boolean;
  selectTab: () => void;
}

interface TabButtonProps extends TabButtonType {
  children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({
  active,
  selectTab,
  children,
}: TabButtonProps) => {
  const buttonClasses = active
    ? "text-white border-b border-purple-500"
    : "text-[#ADB7BE] border-b";
  return (
    <button onClick={selectTab}>
      <p className={`mr-3 semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
    </button>
  );
};

export default TabButton;
