import { HTMLAttributes, forwardRef } from "react";

export interface H2Props extends HTMLAttributes<HTMLHeadingElement> {}

const H4 = forwardRef<HTMLDivElement, H2Props>(({ ...props }, ref) => {
  return (
    <h3
      className="scroll-m-20 text-xl font-semibold tracking-tight"
      ref={ref}
      {...props}
    >
      {props.children}
    </h3>
  );
});

H4.displayName = "h4";

export default H4;
