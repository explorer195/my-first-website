import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** The one page container: consistent width and side gutters everywhere. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12 2xl:max-w-8xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
