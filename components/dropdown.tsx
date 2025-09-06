import { useState, FC } from "react";
import Link from "next/link";
// import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: { label: string; href: string; onClick?: () => void }[];
  onSelect: (option: string) => void;
  placeholder: React.ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select Option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    // setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-between w-15 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm shadow-light-blue-200 hover:bg-opacity-90 focus:outline-none"
      >
        {placeholder}
        {/* <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        /> */}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#E0F2FE] shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) =>
              option.onClick ? (
                <button
                  key={option.href}
                  onClick={() => {
                    handleSelect(option.label);
                    option.onClick?.();
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-black"
                >
                  {option.label}
                </button>
              ) : (
                <Link
                  key={option.href}
                  href={option.href}
                  onClick={() => handleSelect(option.label)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-100 hover:text-black"
                >
                  {option.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
