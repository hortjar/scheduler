import { HTMLAttributes, forwardRef } from "react";

export interface H2Props extends HTMLAttributes<HTMLHeadingElement> {}

const H3 = forwardRef<HTMLDivElement, H2Props>(({ ...props }, ref) => {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      ref={ref}
      {...props}
    >
      {props.children}
    </h3>
  );
});

H3.displayName = "h3";

export default H3;
