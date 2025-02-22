import { FC } from "react";
import { Button } from "./button";
import Overlay from "./Overlay";

type ConfirmWindowType = {
  options: {
    title: string;
    callback: () => void;
    btnVariant:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null
      | undefined;
  }[];
  width: string;
  title: string;
  closeFunc: () => void;
};

const ConfirmWindow: FC<ConfirmWindowType> = ({
  options,
  width,
  title,
  closeFunc,
}) => {
  return (
    <Overlay width={width} closeFunc={closeFunc}>
      <h1 className="flex mb-5">{title}</h1>
      <div className="flex flex-row gap-3">
        {options.map((option) => (
          <Button variant={option.btnVariant} onClick={option.callback}>
            {option.title}
          </Button>
        ))}
      </div>
    </Overlay>
  );
};

export default ConfirmWindow;
