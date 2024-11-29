import { FC } from "react";
import { Button } from "../ui/button";

type NavbarType = {
  compareBtnClick: (val: boolean) => void;
};

const Navbar: FC<NavbarType> = ({ compareBtnClick }) => {
  return (
    <div className="w-full">
      <Button
        onClick={() => compareBtnClick(true)}
        className="mx-5 mt-2"
        variant="outline"
      >
        Compare
      </Button>
    </div>
  );
};

export default Navbar;
