import React, { useState } from "react";

interface DropdownProps {
  title: string;
  items: { title: string; path: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        className="px-3 py-2 rounded-small text-white  font-normal"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && (
        <div className="absolute right-0 w-[300px] shadow-lg rounded-md z-[5000] bg-green-900 ">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="block px-4 py-4 text-white hover:bg-green-700"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
