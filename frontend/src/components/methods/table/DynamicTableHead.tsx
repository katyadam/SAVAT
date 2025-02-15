import { CallGraphMethod } from "@/api/callgraphs/types";
import { TableHead } from "@/components/ui/table";
import { flexRender, Header, Table } from "@tanstack/react-table";
import { FC } from "react";

type DynamicTableHeadType = {
  table: Table<CallGraphMethod>;
  header: Header<CallGraphMethod, unknown>;
  selectedFilterArgument: string;
  setSelectedFilterArgument: (arg: string) => void;
};

const DynamicTableHead: FC<DynamicTableHeadType> = ({
  table,
  header,
  selectedFilterArgument,
  setSelectedFilterArgument,
}) => {
  return (
    <TableHead
      onClick={() => {
        table.getColumn(selectedFilterArgument)?.setFilterValue("");
        setSelectedFilterArgument(
          header.id === selectedFilterArgument ? "name" : header.id
        );
        table.getColumn(selectedFilterArgument)?.setFilterValue("");
      }}
      key={header.id}
      className={`${
        selectedFilterArgument === header.id ? "bg-slate-200" : ""
      } cursor-pointer text-black`}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
};

export default DynamicTableHead;
