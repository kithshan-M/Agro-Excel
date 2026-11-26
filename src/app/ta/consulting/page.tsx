import { getService } from "@/data/services";
import { pageMeta } from "@/i18n/meta";
import { ConsultingView } from "@/views/consulting";

const service = getService("consulting");

export const metadata = pageMeta("ta", "/consulting", {
  title: service.title,
  description: service.summary,
});

export default ConsultingView;
