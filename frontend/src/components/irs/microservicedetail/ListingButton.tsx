import { Button } from "@/components/ui/button";
import { FC } from "react";

type ListingButtonType = {
  msName: string;
  openOrClose: () => void;
};

const ListingButton: FC<ListingButtonType> = ({
  msName: usedByMsName,
  openOrClose,
}) => {
  return (
    <Button onClick={openOrClose} variant="ghost" className="bg-slate-200">
      {usedByMsName}
    </Button>
  );
};

export default ListingButton;
