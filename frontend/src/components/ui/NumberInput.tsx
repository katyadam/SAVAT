import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type NumberInputType = {
  value: number;
  setValue: (arg: number) => void;
  min: number;
  max: number;
  step: number;
};

const NumberInput: FC<NumberInputType> = ({
  value,
  setValue,
  min,
  max,
  step,
}) => {
  const handleIncrement = () => {
    setValue(Math.min(value + step, max));
  };

  const handleDecrement = () => {
    setValue(Math.max(value - step, min));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="outline" onClick={handleDecrement}>
        <Minus className="w-4 h-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className="w-16 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button size="icon" variant="outline" onClick={handleIncrement}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NumberInput;
