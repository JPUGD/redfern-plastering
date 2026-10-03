import { cn } from "@/lib/utils";

export type IconName =
  | "wrench"
  | "home"
  | "hammer"
  | "droplets"
  | "layers"
  | "building";

const paths: Record<IconName, React.ReactNode> = {
  wrench: (
    <path
      d="M14.5 6.5a4.5 4.5 0 0 1-6 4.2L4.7 14.5a2 2 0 1 1-2.8-2.8L5.7 7.9a4.5 4.5 0 0 1 6-6L9 4.6 7.3 6.3 9.8 8.8l2.7-2.7a4.5 4.5 0 0 1 2-0.1Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  home: (
    <path
      d="M2.5 8.5 8 3.5l5.5 5M4 7.5V13h8V7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  hammer: (
    <path
      d="M2.5 13.5 7 9m1-5 1.5-1.5L14 7l-1.5 1.5L9.5 6.5 8 8l-1 1L2.5 13.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  droplets: (
    <>
      <path
        d="M5 2.5C6.3 4.4 7 5.6 7 6.6a2 2 0 1 1-4 0c0-1 .7-2.2 2-4.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M11 7c1.3 1.9 2 3.1 2 4.1a2 2 0 1 1-4 0c0-1 .7-2.2 2-4.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </>
  ),
  layers: (
    <path
      d="m8 2.5 6 3-6 3-6-3 6-3Zm6 6-6 3-6-3m12 3.2-6 3-6-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  building: (
    <path
      d="M3 14V2.5h7V14M10 6h3.5V14M1.5 14h13M5.5 5.5h1m1 0h1m-3 3h1m1 0h1m-3 3h1m1 0h1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}