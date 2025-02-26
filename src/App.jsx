import {
  createBrowserRouter as BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  HomeLayout,
  About,
  Landing,
  Error,
  NewsLetter,
  Cocktail,
  SinglePageError,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { load as singleCocktailLoader } from "./pages/Cocktail";
import { action as actionNewsletter } from "./pages/NewsLetter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const App = () => {
  const router = BrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          loader: landingLoader,
          errorElement: <SinglePageError />,
          element: <Landing />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/newsletter",
          element: <NewsLetter />,
          action: actionNewsletter,
        },
        {
          path: "/cocktail/:id",
          element: <Cocktail />,
          loader: singleCocktailLoader,
          errorElement: <SinglePageError />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
