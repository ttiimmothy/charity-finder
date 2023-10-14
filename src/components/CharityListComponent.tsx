import { NavLink } from "react-router-dom";
import { CharityListItem } from "../interfaces/CharityListItem";
import { CharityCard } from "./charityCard/CharityCard";

type CharityListComponentProps = {
  charityList: CharityListItem[];
  searchKeyword?: string;
};

export function CharityListComponent({
  charityList,
  searchKeyword,
}: CharityListComponentProps): JSX.Element {
  return (
    <div className="px-4 mt-5 mb-14 grid justify-items-center grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-3 md:px-20">
      {charityList.length > 0 &&
        charityList.map((charity, index) => (
          <NavLink
            to={`/charity/${charity.slug}${
              searchKeyword ? `?keyword=${searchKeyword}` : ""
            }`}
            className="mt-5 w-full h-80"
            state={charity}
            key={index}
          >
            <CharityCard
              name={charity.name}
              description={charity.description}
              coverImageUrl={charity.coverImageUrl}
              logoUrl={charity.logoUrl}
              profileUrl={charity.profileUrl}
              slug={charity.slug}
              location={charity.location}
              tags={charity.tags}
            />
          </NavLink>
        ))}
    </div>
  );
}
