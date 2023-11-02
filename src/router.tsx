import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./pages/errors/NotFoundPage";
import { CharityDetailPage } from "./pages/CharityDetailPage";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { FavoritePage } from "./pages/FavouritePage";
import { SearchResultPage } from "./pages/SearchResultPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "search/:keyword",
          element: <SearchResultPage />,
        },
        {
          path: "charity/:id",
          element: <CharityDetailPage />,
        },
        {
          path: "favorite",
          element: <FavoritePage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
