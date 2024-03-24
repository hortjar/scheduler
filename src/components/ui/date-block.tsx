import { HTMLAttributes, forwardRef } from "react";

export interface DateBlockProps extends HTMLAttributes<HTMLDivElement> {
  date: Date;
}

const DateBlock = forwardRef<HTMLDivElement, DateBlockProps>(
  ({ date, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {date.getMonth()}
      </div>
    );
  }
);
DateBlock.displayName = "DateBlock";

export default DateBlock;
