import React, { ReactNode } from "react";

type OverlayProps = {
  children: ReactNode;
  closeFunc: () => void;
  width: string;
};

const Overlay: React.FC<OverlayProps> = ({ children, closeFunc, width }) => {
  return (
    <>
      <button
        onClick={closeFunc}
        className="z-30 bg-black opacity-50 fixed top-0 left-0 w-full h-full"
      ></button>
      <div
        className={`${width} max-h-[90vh] overflow-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-50 text-center`}
      >
        {children}
      </div>
    </>
  );
};

export default Overlay;
