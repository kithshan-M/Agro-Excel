import { getService } from "@/data/services";
import { pageMeta } from "@/i18n/meta";
import { IrrigationView } from "@/views/irrigation";

const service = getService("irrigation");

export const metadata = pageMeta("ta", "/irrigation", {
  title: service.title,
  description: service.summary,
});

export default IrrigationView;
