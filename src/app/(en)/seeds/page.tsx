import { getService } from "@/data/services";
import { pageMeta } from "@/i18n/meta";
import { SeedsView } from "@/views/seeds";

const service = getService("seeds");

export const metadata = pageMeta("en", "/seeds", {
  title: service.title,
  description: service.summary,
});

export default SeedsView;
