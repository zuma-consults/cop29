import React, { useState } from "react";
import "aos/dist/aos.css";

// Define types for the props of AccordionItem
interface AccordionItemProps {
  title: string;
  content: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// Define the AccordionItem component
const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  index,
  activeIndex,
  setActiveIndex
}) => {
  const isActive = index === activeIndex;

  return (
    <div
      className="border-b border-gray-200 bg-gray-50 p-3"
    >
      <button
        className="w-full py-3 px-4 text-left focus:outline-none flex justify-between items-center"
        onClick={() => setActiveIndex(isActive ? null : index)}
      >
        <span className="font-semibold text-gray-800 text-[20px]">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isActive && (
        <div className="p-10 text-gray-600 bg-green-100 text-[16px]">
          {content}
        </div>
      )}
    </div>
  );
};

// Define types for the props of Accordion
interface AccordionProps {
  items: { title: string; content: string }[];
}

// Define the Accordion component
const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full mx-auto mt-10">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          title={item.title}
          content={item.content}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      ))}
    </div>
  );
};

export default Accordion;
