import { Button } from "@/components/ui/button";
import { FC } from "react";

type ListingDetailType = {
  msName: string;
  openOrClose: () => void;
};

const ListingDetail: FC<ListingDetailType> = ({
  msName: usedByMsName,
  openOrClose,
}) => {
  return (
    <Button onClick={openOrClose} variant="ghost" className="bg-slate-200">
      {usedByMsName}
    </Button>
  );
};

export default ListingDetail;
