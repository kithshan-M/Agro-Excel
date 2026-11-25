import { getService } from "@/data/services";
import { pageMeta } from "@/i18n/meta";
import { GreenhousesView } from "@/views/greenhouses";

const service = getService("greenhouses");

export const metadata = pageMeta("en", "/greenhouses", {
  title: service.title,
  description: service.summary,
});

export default GreenhousesView;
