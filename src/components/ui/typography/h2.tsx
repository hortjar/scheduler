import { HTMLAttributes, forwardRef } from "react";

export interface H2Props extends HTMLAttributes<HTMLHeadingElement> {}

const H2 = forwardRef<HTMLDivElement, H2Props>(({ ...props }, ref) => {
  return (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      ref={ref}
      {...props}
    >
      {props.children}
    </h2>
  );
});

H2.displayName = "h2";

export default H2;
