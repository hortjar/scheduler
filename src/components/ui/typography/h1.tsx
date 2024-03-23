import { HTMLAttributes, forwardRef } from "react";

export interface H2Props extends HTMLAttributes<HTMLHeadingElement> {}

const H1 = forwardRef<HTMLDivElement, H2Props>(({ ...props }, ref) => {
  return (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      ref={ref}
      {...props}
    >
      {props.children}
    </h1>
  );
});

H1.displayName = "h1";

export default H1;
