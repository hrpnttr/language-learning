import React, { useState } from "react";

interface AccordionProps {
  key: string;
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ key, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-semibold"
        id={key}
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

export default Accordion;
