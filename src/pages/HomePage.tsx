import { useEffect, useState } from "react";
import { CharityListComponent } from "../components/CharityListComponent";
import causes from "../data/causes.json";
import { LoadingElement } from "../components/LoadingElement";
import { searchCharityList } from "../api/charity";
import { CharityListItem } from "../interfaces/CharityListItem";

export function HomePage(): JSX.Element {
  const [charityList, setCharityList] = useState<CharityListItem[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCharity() {
      setLoading(true);
      const randomCause =
        causes.causes[Math.floor(Math.random() * causes.causes.length)];
      const result = await searchCharityList(randomCause);
      if (result.nonprofits && result.nonprofits.length > 0) {
        setCharityList(result.nonprofits);
      }
      setLoading(false);
    }
    getCharity();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingElement />
      ) : (
        <CharityListComponent charityList={charityList} />
      )}
    </>
  );
}
