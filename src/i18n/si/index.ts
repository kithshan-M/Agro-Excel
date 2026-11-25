import { common } from "./common";
import { consulting } from "./consulting";
import { greenhouses } from "./greenhouses";
import { irrigation } from "./irrigation";
import { pages } from "./pages";

/** English to Sinhala. Run "npm run check-sinhala" to see what is missing. */
export const si: Record<string, string> = {
  ...common,
  ...pages,
  ...greenhouses,
  ...irrigation,
  ...consulting,
};
