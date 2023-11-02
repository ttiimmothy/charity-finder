import { useEffect, useState } from "react";
import SearchIcon from "../assets/search_icon.svg";
import causes from "../data/causes.json";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export function SearchComponent(): JSX.Element {
  const [charityCauseName, setCharityCauseName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const { keyword } = useParams();
  const handleClick = () => {
    if (charityCauseName && causes.causes.indexOf(charityCauseName) > -1) {
      navigate(`search/${charityCauseName}`);
      setCharityCauseName("");
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      setCharityCauseName(keyword);
    } else {
      setCharityCauseName("");
    }
  }, [keyword]);

  return (
    <div className="drop-shadow-md mt-4 px-4 md:my-auto">
      <div className="relative">
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3.5"
          onClick={handleClick}
        >
          <img src={SearchIcon} className="w-5 h-5" alt="search" />
        </button>
        <input
          type="text"
          className="px-4 py-3 border border-gray-300 rounded-md w-full lg:w-[28rem] hover:outline outline-1 outline-[#32C8BB] focus:outline outline-offset-0"
          placeholder="Find a charity"
          value={charityCauseName}
          onChange={(e) => {
            setCharityCauseName(e.target.value);
            setIsTyping(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          name=""
          id=""
        />
        {isTyping &&
          causes.causes
            .filter((cause) => cause.includes(charityCauseName))
            .filter((_, i) => i <= 9).length > 0 && (
            <div className="flex flex-wrap absolute w-full h-fit bg-white border mx-auto rounded-b-lg p-2 lg:w-[28rem]">
              {causes.causes
                .filter((cause) => cause.includes(charityCauseName))
                .filter((_, i) => i <= 9)
                .map((cause) => {
                  return (
                    <NavLink
                      className="px-3 py-4 rounded-3xl hover:bg-slate-200 duration-300 font-bold"
                      to={`/search/${cause}`}
                      key={cause}
                      onClick={() => setIsTyping(false)}
                    >
                      {cause}
                    </NavLink>
                  );
                })}
            </div>
          )}
      </div>
    </div>
  );
}
