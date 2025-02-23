import {
  ArrowDown,
  ArrowUp,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";
import { FC } from "react";

type HeaderWithSortType = {
  sortBy: "version" | "date";
  sortMethod: "dateAsc" | "dateDesc" | "versionAsc" | "versionDesc";
  header: string;
};

const HeaderWithSort: FC<HeaderWithSortType> = ({
  header,
  sortBy,
  sortMethod,
}) => {
  if (header === "version") {
    return sortMethod === "versionDesc" ? (
      <ArrowDown className={`${sortBy === "version" && "text-black"}`} />
    ) : (
      <ArrowUp className={`${sortBy === "version" && "text-black"}`} />
    );
  }
  if (header === "createdAt") {
    return sortMethod == "dateAsc" ? (
      <CalendarArrowUp className={`${sortBy === "date" && "text-black"}`} />
    ) : (
      <CalendarArrowDown className={`${sortBy === "date" && "text-black"}`} />
    );
  }
  return <></>;
};

export default HeaderWithSort;
