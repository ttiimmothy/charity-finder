export interface CharityListItem {
  name: string;
  profileUrl: string;
  description: string;
  ein: string;
  logoCloudinaryId: string;
  logoUrl: string;
  coverImageUrl: string;
  matchedTerms: string[];
  slug: string;
  location: string;
  tags?: string[];
}
