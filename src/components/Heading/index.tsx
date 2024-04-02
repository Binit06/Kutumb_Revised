import { any } from "bluebird";
import React from "react";

type Sizes = {
    [key: string]: string;
};

const sizes: Sizes = {};

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  size = "",
  as,
  ...restProps
}) => {
  const Component = as || "h6";

  return (
    <Component className={` ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
