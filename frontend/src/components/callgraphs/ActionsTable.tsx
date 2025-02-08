import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CircleX } from "lucide-react";
import { Action } from "@/pages/CallGraphPage";

type ActionsTableType = {
  setActionsStorage: (actionsStorage: Action[]) => void;
  actionsStorage: Action[];
  setRemovedAction: (action: Action) => void;
};

const ActionsTable: FC<ActionsTableType> = ({
  setActionsStorage,
  actionsStorage,
  setRemovedAction,
}) => {
  const handleRemove = (actionId: number) => {
    const actionToRemove = actionsStorage.find(
      (action) => action.id == actionId
    );
    if (actionToRemove) {
      setRemovedAction(actionToRemove);
      setActionsStorage(
        actionsStorage.filter((action) => action.id != actionId)
      );
    }
  };

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actionsStorage.map((action) => (
            <TableRow key={action.id}>
              <TableCell>{action.id}</TableCell>
              <TableCell className="flex items-center gap-2">
                {action.timestamp}
              </TableCell>
              <TableCell className="cursor-pointer">
                <CircleX color="red" onClick={() => handleRemove(action.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActionsTable;
