import LocationIcon from "../../assets/location_icon.svg";
import { ErrorComponent } from "../errors/ErrorComponent";

type CharityCardProps = {
  name: string;
  description?: string;
  logoUrl: string;
  coverImageUrl: string;
  profileUrl?: string;
  slug?: string;
  location: string;
  tags?: string[];
};

export function CharityCard({
  name,
  logoUrl,
  coverImageUrl,
  location,
}: CharityCardProps): JSX.Element {
  return (
    <>
      <div className="h-1/2">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            className="object-cover rounded-t-md w-full h-full"
            alt={name}
          />
        ) : (
          <div className="h-1/2">
            <ErrorComponent />
          </div>
        )}
      </div>
      <div className="px-5 py-5 w-full rounded-b-md bg-white shadow-lg hover:bg-[#FBFBFB] min-h-[50%]">
        <span className="flex items-center text-lg font-semibold">
          <img src={logoUrl} className="mr-3 rounded-full" alt="" />
          <span className="min-w-min leading-6 limit-two-lines">
            <div>{name}</div>
          </span>
        </span>
        {location && (
          <>
            <div className="w-full my-3 border-b border-gray-300"></div>

            <span className="flex items-center">
              <img src={LocationIcon} className="mr-2 w-5 h-5" alt="" />
              <div>{location}</div>
            </span>
          </>
        )}
      </div>
    </>
  );
}
