import { HTMLAttributes, forwardRef } from "react";

export interface H4Props extends HTMLAttributes<HTMLHeadingElement> {}

const H4 = forwardRef<HTMLDivElement, H4Props>(({ ...props }, ref) => {
  return (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight"
      ref={ref}
      {...props}
    >
      {props.children}
    </h4>
  );
});

H4.displayName = "h4";

export default H4;
