import { forwardRef, HTMLAttributes, InputHTMLAttributes, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

const RadioGroupContext = createContext<{ value: string; onValueChange: (value: string) => void } | null>(null);

function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroup components must be used within a RadioGroupProvider");
  }
  return context;
}

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn("grid gap-2", className)} {...props} />
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(({ className, value, ...props }, ref) => {
  const { value: groupValue, onValueChange } = useRadioGroup();
  const checked = value === groupValue;

  return (
    <input
      type="radio"
      ref={ref}
      className={cn("h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary", className)}
      value={value}
      checked={checked}
      onChange={() => onValueChange(value)}
      {...props}
    />
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
