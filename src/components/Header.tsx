import { NavLink } from "react-router-dom";
import CharityIcon from "../assets/charity_icon.svg";
import Heart from "../assets/heart.svg";

import { SearchComponent } from "./SearchComponent";
export function Header(): JSX.Element {
  return (
    <header>
      <nav className="py-6 bg-[#515151] font-ubuntu">
        <div className="container mx-auto items-center justify-around md:flex md:flex-wrap">
          <NavLink to={"/"}>
            <div className="flex justify-center w-full items-center lg:w-14">
              <img
                src={CharityIcon}
                className="w-10 h-10 mr-3"
                alt="charity finder home"
              />
              <span className="self-center text-2xl text-white font-bold whitespace-nowrap">
                Charity Finder
              </span>
            </div>
          </NavLink>
          <SearchComponent />
          <div className="flex mt-6 justify-center md:my-auto">
            <NavLink to={"/favorite"}>
              <button className="space-x-2 items-center border-0 rounded-full p-3 bg-white hover:bg-[#E2E2E2] duration-300">
                <img src={Heart} className="w-5 h-5" alt="" />
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
