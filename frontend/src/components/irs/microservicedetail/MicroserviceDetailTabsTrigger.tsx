import { FC } from "react";
import { AllowedTabs } from "./MicroserviceDetailPanel";
import { TabsTrigger } from "@/components/ui/tabs";

type MicroserviceDetailTabsTriggerType = {
  value: AllowedTabs;
};

const MicroserviceDetailTabsTrigger: FC<MicroserviceDetailTabsTriggerType> = ({
  value,
}) => {
  return <TabsTrigger value={value}>{value}</TabsTrigger>;
};

export default MicroserviceDetailTabsTrigger;
