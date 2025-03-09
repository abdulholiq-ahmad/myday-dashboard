import { forwardRef, SelectHTMLAttributes, OptionHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export interface SelectTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {}

const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(({ className, ...props }, ref) => {
  return <span ref={ref} className={cn("block truncate", className)} {...props} />;
});

SelectValue.displayName = "SelectValue";

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {}

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
});

SelectContent.displayName = "SelectContent";

export interface SelectItemProps extends OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem = forwardRef<HTMLOptionElement, SelectItemProps>(({ className, ...props }, ref) => {
  return (
    <option
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
});

SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
