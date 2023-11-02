import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingElement } from "../components/LoadingElement";
import { CharityListComponent } from "../components/CharityListComponent";
import { searchCharityList } from "../api/charity";
import { CharityListItem } from "../interfaces/CharityListItem";

export function SearchResultPage(): JSX.Element {
  const { keyword } = useParams();
  const [charityList, setCharityList] = useState<CharityListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCharity() {
      setLoading(true);
      const result = await searchCharityList(keyword ?? "");
      if (result.nonprofits && result.nonprofits.length > 0) {
        setCharityList(result.nonprofits);
      }
      setLoading(false);
    }
    getCharity();
  }, [keyword]);

  return (
    <>
      {loading ? (
        <LoadingElement />
      ) : (
        <>
          <h1 className="text-2xl pt-10 pl-6 tracking-wide font-semibold text-gray-800 md:px-20">
            Search Result for: {keyword}
          </h1>
          <CharityListComponent
            charityList={charityList}
            searchKeyword={keyword}
          />
        </>
      )}
    </>
  );
}
