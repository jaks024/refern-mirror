import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <section
      className={`w-full max-w-[80rem] mx-auto p-8 sm:p-12 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
