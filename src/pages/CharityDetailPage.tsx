import { NavLink, useLocation, useParams } from "react-router-dom";
import LocationIcon from "../assets/location_icon.svg";
import { ErrorComponent } from "../components/errors/ErrorComponent";
import { useEffect, useState } from "react";
import { CharityListItem } from "../interfaces/CharityListItem";
import { searchCharityDetail } from "../api/charity";
import { LoadingElement } from "../components/LoadingElement";

export function CharityDetailPage(): JSX.Element {
  const { state, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get("keyword");

  const { id } = useParams();

  async function getCharityDetail(id: string) {
    setLoading(true);

    try {
      const result = await searchCharityDetail(id ?? "");
      if (result.data && result.data.nonprofit) {
        setCharityState(result.data.nonprofit);
        setTagList(result.data.nonprofitTags.map((tag) => tag.tagName));
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const [charityState, setCharityState] = useState(state);
  const [tagList, setTagList] = useState((state && state.tags) ?? []);
  const [loading, setLoading] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);
  const [showAddToFavoriteMessage, setShowAddToFavoriteMessage] =
    useState(false);
  const [favoriteList, setFavoriteList] = useState<CharityListItem[]>(() => {
    const saved = localStorage.getItem("favoriteList");
    if (!saved) return [];
    return JSON.parse(saved) || [];
  });

  useEffect(() => {
    if (!charityState) {
      getCharityDetail(id ?? "");
    }

    if (
      charityState &&
      favoriteList
        .map((charity) => charity.profileUrl)
        .indexOf(charityState.profileUrl) > -1
    ) {
      setInFavorite(true);
    } else {
      setInFavorite(false);
    }
  }, [id, favoriteList, charityState]);

  const addToFavorite = () => {
    if (
      charityState &&
      favoriteList
        .map((charity) => charity.profileUrl)
        .indexOf(charityState.profileUrl) === -1
    ) {
      setFavoriteList((prev) => [
        ...prev,
        { ...charityState, slug: id, tags: tagList },
      ]);
      localStorage.setItem(
        "favoriteList",
        JSON.stringify([
          ...favoriteList,
          { ...charityState, slug: id, tags: tagList },
        ])
      );
      setShowAddToFavoriteMessage(true);
    }
  };

  const removeFromFavorite = () => {
    if (
      charityState &&
      favoriteList
        .map((charity) => charity.profileUrl)
        .indexOf(charityState.profileUrl) > -1
    ) {
      setFavoriteList((prev) =>
        prev.filter((charity) => charity.profileUrl !== charityState.profileUrl)
      );

      localStorage.setItem(
        "favoriteList",
        JSON.stringify(
          favoriteList.filter(
            (charity) => charity.profileUrl !== charityState.profileUrl
          )
        )
      );

      setShowAddToFavoriteMessage(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingElement />
      ) : (
        <>
          <div>
            <NavLink
              to={keyword ? `/search/${keyword}` : "/"}
              className="flex items-center gap-2 mb-4 mt-10 px-8"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M244 400L100 256l144-144M120 256h292"
                ></path>
              </svg>
              <p>Back</p>
            </NavLink>
          </div>
          <div className="container justify-center mb-8 px-4 grid grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3">
            <div className="col-span-2 rounded-md shadow-md">
              {charityState && charityState.coverImageUrl ? (
                <div>
                  <img
                    src={charityState.coverImageUrl}
                    className="rounded-t-lg w-full"
                    alt="cover image"
                  />
                </div>
              ) : (
                <ErrorComponent />
              )}
              <div className="p-8 bg-white">
                <h1 className="flex flex-wrap justify-center items-center text-3xl tracking-wide font-semibold text-gray-800 md:justify-normal">
                  {charityState && charityState.logoUrl && (
                    <img
                      src={charityState.logoUrl}
                      className="mr-3 mb-3 rounded-full md:mb-0"
                      alt="logo"
                    />
                  )}
                  {charityState && charityState.name}
                </h1>
                {charityState && charityState.location && (
                  <div className="flex items-center my-6">
                    <img src={LocationIcon} className="mr-2 w-5 h-5" alt="" />
                    <div>{charityState.location}</div>
                  </div>
                )}
                <div className="w-full">
                  <p className="text-fit">
                    {charityState && charityState.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 col-span-2 h-fit rounded-md shadow-md md:col-span-1 bg-white">
              <div>
                {showAddToFavoriteMessage && (
                  <div className="flex mb-6 justify-center font-bold">
                    This Charity Added to Your Favorite
                  </div>
                )}
                {inFavorite ? (
                  <button
                    className="w-full bg-[#2D59AF] rounded-sm py-4 text-white font-bold hover:bg-[#0F3D97] duration-300"
                    onClick={() => {
                      removeFromFavorite();
                    }}
                  >
                    Remove from favorites
                  </button>
                ) : (
                  <button
                    className="w-full bg-[#F14040] rounded-sm py-4 text-white font-bold hover:bg-[#D31616] duration-300"
                    onClick={() => {
                      addToFavorite();
                    }}
                  >
                    Add to favorites
                  </button>
                )}
              </div>
              <div className="mt-4">
                <NavLink to={charityState && charityState.profileUrl}>
                  <button className="w-full bg-emerald-800 rounded-sm py-4 text-white font-bold hover:bg-emerald-950 duration-300">
                    Check it on Every.org
                  </button>
                </NavLink>
              </div>
              <div className="mt-2 flex flex-wrap">
                {tagList && tagList.length > 0 && (
                  <div className="mt-6">
                    <span className="font-semibold text-lg pl-2">Tags</span>
                    <div className="flex flex-wrap mt-1">
                      {tagList.map((tag: string, index: number) => (
                        <NavLink
                          key={index}
                          className="bg-slate-500 text-white px-3 py-2 m-2 rounded-3xl shadow-md hover:bg-slate-600 duration-300"
                          to={`/search/${tag}`}
                        >
                          {tag}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
