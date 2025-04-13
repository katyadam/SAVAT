import { ChangedLinksResponse, SDGDto, SDGFullDto } from "@/api/sdgs/types";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import InputsList from "./InputsList";
import { useSDGCompare } from "@/hooks/useSDG";
import CompareForm from "./CompareForm";

type LDAPanelType = {
  sdgDto: SDGFullDto;
  respFunc: (resp: ChangedLinksResponse) => void;
  projectId: string;
};

const LDAPanel: FC<LDAPanelType> = ({ sdgDto, respFunc, projectId }) => {
  const [activeWindow, setActiveWindow] = useState<"manual" | "selection">(
    "selection"
  );

  const [selected, setSelected] = useState<SDGDto | null>(null);

  const { mutateAsync } = useSDGCompare(sdgDto?.id.toString());
  const handleCompare = async () => {
    try {
      if (selected) {
        const res = await mutateAsync(selected?.id.toString());
        respFunc(res);
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Input Id.");
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-center gap-4 items-center">
        <h1 className="text-md font-bold">
          {activeWindow === "manual"
            ? "Manually Compare"
            : "Select Context Map Inputs"}
        </h1>
        <Button
          variant="link"
          onClick={() => {
            setActiveWindow(activeWindow === "manual" ? "selection" : "manual");
          }}
        >
          Or{" "}
          {activeWindow === "manual"
            ? "Select Context Map Input"
            : "Manually Compare"}
        </Button>
      </div>

      {activeWindow === "selection" ? (
        <>
          <div className="flex flex-col gap-2 w-full">
            <InputsList
              projectId={projectId}
              inputToOmit={sdgDto}
              selectedInput={selected}
              setSelectedInput={setSelected}
            />
            <Button onClick={handleCompare} variant="default">
              Compare
            </Button>
          </div>
        </>
      ) : (
        <CompareForm sdgId={sdgDto?.id.toString()} respFunc={respFunc} />
      )}
    </div>
  );
};

export default LDAPanel;
