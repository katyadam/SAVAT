import { FC } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RenderType } from "./types";
import { Switch } from "@/components/ui/switch";
import { useEntitiesDiffs } from "@/hooks/useEntity";
import { Separator } from "../ui/separator";
import dayjs from "dayjs";

type NavbarType = {
  compareBtnClick: (val: boolean) => void;
  isolatedNodesBtnClick: () => void;
  setSelectedRenderType: (selectedRenderType: RenderType) => void;
  setShowComparisons: (val: boolean) => void;
  showComparisons: boolean;
  analysisInputId: string;
  setSelectedEntitiesDiff: (seletedEntitiesDiff: string) => void;
};

const Navbar: FC<NavbarType> = ({
  compareBtnClick,
  setSelectedRenderType,
  setShowComparisons,
  showComparisons,
  isolatedNodesBtnClick,
  analysisInputId,
  setSelectedEntitiesDiff,
}) => {
  const { data: entitiesDiffs, isLoading } = useEntitiesDiffs(analysisInputId);

  if (isLoading) return <p>Loading..</p>;

  const formatDate = (sample: string) => {
    return dayjs(sample).format("MMMM DD, YYYY, HH:mm:ss");
  };

  return (
    <div className="flex flex-row ml-5 gap-4 justify-start items-center w-full h-12">
      <Button
        onClick={() => {
          setShowComparisons(!showComparisons);
          setSelectedEntitiesDiff("None");
          setSelectedRenderType(RenderType.BASIC_GRAPH);
        }}
        variant="outline"
      >
        {showComparisons ? "Show graph" : "Show differences"}
      </Button>
      <Separator orientation="vertical" color="black" />
      {showComparisons ? (
        <>
          {entitiesDiffs && (
            <Select
              defaultValue="None"
              onValueChange={(value) => setSelectedEntitiesDiff(value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                {entitiesDiffs.map((diff) => (
                  <SelectItem key={diff.id} value={diff.id.toString()}>
                    {formatDate(diff.createdAt)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      ) : (
        <>
          <Button
            onClick={() => compareBtnClick(true)}
            className=""
            variant="outline"
          >
            Compare
          </Button>
          <Select
            defaultValue={RenderType.BASIC_GRAPH}
            onValueChange={(value) =>
              setSelectedRenderType(value as RenderType)
            }
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RenderType.BASIC_GRAPH}>
                Basic graph
              </SelectItem>
              <SelectItem value={RenderType.ENTITY_DETAILS}>
                Entity details
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col items-center mx-5">
            <label htmlFor="isolatedNodesSwitch" className="text-gray-500 mb-1">
              Show all nodes
            </label>
            <Switch
              id="isolatedNodesSwitch"
              onCheckedChange={isolatedNodesBtnClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
