import React from "react";

interface HeaderProps {
  label: string;
  keyword: string;
  num?: string;
  category?: string;
}

const Header: React.FC<HeaderProps> = ({
  label,
  keyword,
  num,
  category = "Topic",
}) => {
  return (
    <div className="grow shrink basis-0 h-8 justify-start items-center flex">
      <div className="justify-start items-center gap-2 flex">
        <h3 className="text-zinc-800 font-bold leading-loose">
          {label} : "{keyword}"
        </h3>
        <div className="mix-blend-multiply justify-start items-start flex">
          {num && (
            <div className="px-3 py-1 bg-rose-100 rounded-2xl justify-center items-center flex">
              <div className="text-rose-800 text-sm font-medium font-['Inter'] leading-tight">
                {num} {category}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
