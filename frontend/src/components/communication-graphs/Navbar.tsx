import { FC } from "react";
import { Button } from "../ui/button";
import { useEntitiesDiffs } from "@/hooks/useEntity";

type NavbarType = {
  compareBtnClick: (val: boolean) => void;
  analysisInputId: string;
};

const Navbar: FC<NavbarType> = ({ compareBtnClick, analysisInputId }) => {
  const { data: entitiesDiffs, isLoading } = useEntitiesDiffs(analysisInputId);

  if (isLoading) return <p>Loading..</p>;

  return (
    <div className="flex flex-row ml-5 gap-4 justify-start items-center w-full h-12">
      <Button
        onClick={() => compareBtnClick(true)}
        className=""
        variant="outline"
      >
        Compare
      </Button>
    </div>
  );
};

export default Navbar;
