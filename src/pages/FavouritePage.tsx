import { CharityListItem } from "../interfaces/CharityListItem";
import { CharityListComponent } from "../components/CharityListComponent";

export function FavoritePage(): JSX.Element {
  const saved = localStorage.getItem("favoriteList");
  const favoriteCharityList: CharityListItem[] = JSON.parse(saved ? saved : "");

  return (
    <div className="my-10">
      {favoriteCharityList && favoriteCharityList.length > 0 && (
        <CharityListComponent charityList={favoriteCharityList} />
      )}
    </div>
  );
}
