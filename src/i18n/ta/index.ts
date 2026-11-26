import { common } from "./common";
import { consulting } from "./consulting";
import { greenhouses } from "./greenhouses";
import { irrigation } from "./irrigation";
import { pages } from "./pages";

/** English to Tamil. Run "npm run check-tamil" to see what is missing. */
export const ta: Record<string, string> = {
  ...common,
  ...pages,
  ...greenhouses,
  ...irrigation,
  ...consulting,
};
