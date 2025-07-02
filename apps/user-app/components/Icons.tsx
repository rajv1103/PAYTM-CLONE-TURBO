import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

function baseIcon(pathData: string, className?: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className || "w-6 h-6"}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={pathData} />
    </svg>
  );
}

// Icons with baseIcon + className support
export function HomeIcon({ className }: { className?: string }) {
  return baseIcon(
    `M2.25 12L11.2 3.05c.44-.439 1.152-.439 1.591 0L21.75 12
     M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25
     c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25`,
    className
  );
}

export function TransferIcon({ className }: { className?: string }) {
  return baseIcon(
    `M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5
     m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5`,
    className
  );
}

export function TransactionsIcon({ className }: { className?: string }) {
  return baseIcon(`M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z`, className);
}

export function P2PTransferIcon({ className }: { className?: string }) {
  return baseIcon(
    `M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22
     m0 0-5.94-2.281m5.94 2.28-2.28 5.941`,
    className
  );
}

export function SettingsIcon({ className }: { className?: string }) {
  return baseIcon(
    `M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.591 1.066
     c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.066 2.592c1.756.426
     1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.591c.94 1.543-.826 3.31-2.37
     2.37a1.724 1.724 0 0 0-2.592 1.066c-.426 1.756-2.924 1.756-3.35
     0a1.724 1.724 0 0 0-2.591-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724
     1.724 0 0 0-1.066-2.592c-1.756-.426-1.756-2.924 0-3.35a1.724
     1.724 0 0 0 1.066-2.591c-.94-1.543.826-3.31 2.37-2.37.996.608
     2.296.07 2.591-1.066z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z`,
    className
  );
}

export function AccountIcon({ className }: { className?: string }) {
  return baseIcon(
    `M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z
     M4.501 20.118a7.5 7.5 0 0 1 14.998 0`,
    className
  );
}

export function HelpIcon({ className }: { className?: string }) {
  return baseIcon(
    `M12 18h.01
     M12 14.25v-.375a2.25 2.25 0 0 1 1.146-1.97l.858-.487A2.25 2.25 0 1 0 9.75 7.5`,
    className
  );
}

export function LogoutIcon({ className }: { className?: string }) {
  return baseIcon(
    `M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25
     2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15
     M18.75 12H9.75m0 0 3-3m-3 3 3 3`,
    className
  );
}

// Direct SVG-based icons with props
export function UserIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5zM21.75 12a9.75 9.75 0 1 1-19.5 0 9.75 9.75 0 0 1 19.5 0z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m-7.65-2.15a6 6 0 1 1 12 0 6 6 0 0 1-12 0z" />
    </svg>
  );
}

export const BellIcon = createIcon(
  `M14.25 17.25h-4.5m9-4.5v-3a6.75 6.75 0 00-13.5 0v3
   a2.25 2.25 0 01-2.25 2.25h18
   a2.25 2.25 0 01-2.25-2.25z`
);

export function PlusIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

function createIcon(pathData: string) {
  return function Icon({ className, ...props }: { className?: string } & React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className || "w-6 h-6"}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={pathData} />
      </svg>
    );
  };
}
