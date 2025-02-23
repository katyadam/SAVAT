import { FC, ReactNode } from "react";
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
  body?: ReactNode;
};

const ConfirmWindow: FC<ConfirmWindowType> = ({
  options,
  width,
  title,
  closeFunc,
  body,
}) => {
  return (
    <Overlay width={width} closeFunc={closeFunc}>
      <h1 className="flex mb-5">{title}</h1>
      <>{body}</>
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
