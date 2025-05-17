import React from "react";
import Link from "next/link";

const CommunityLogo = () => (
  <span className="flex items-center gap-1">
    <span className="flex h-10 w-10 rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300 items-center justify-center text-white text-2xl drop-shadow-lg ring-2 ring-orange-200 mr-1">
      🤝
    </span>
    <span className="font-extrabold text-2xl bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-tight">
      Connectify
    </span>
  </span>
);

const NavbarButton = ({
  children,
  href,
  className = "",
  gradient = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  gradient?: boolean;
}) => (
  <Link href={href}>
    <button
      className={`px-5 py-2 rounded-full font-semibold border-2 transition text-base shadow-sm ${
        gradient
          ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white border-transparent hover:brightness-110"
          : "border-orange-300 text-orange-700 bg-white/90 dark:bg-orange-50/20 hover:bg-orange-50 hover:text-orange-900"
      } ${className}`}
    >
      {children}
    </button>
  </Link>
);

const Navbar: React.FC = () => {
  return (
    <nav className="relative w-full px-3 md:px-10 py-3 z-10 bg-pink-500">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-yellow-100/70 to-pink-100/70 dark:from-gray-900 dark:to-gray-900"></div>
      <div className="container mx-auto flex items-center gap-4 justify-between">
        <CommunityLogo />
        <div className="mx-auto flex-1 max-w-lg hidden md:block">
          <input
            type="search"
            placeholder="Search people or topics…"
            className="w-full rounded-full border border-orange-200 bg-white/60 px-5 py-2 text-base focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner transition placeholder-pink-300"
            aria-label="Search"
          />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <NavbarButton href="/signin">Sign In</NavbarButton>
          <NavbarButton href="/signup" gradient>
            Join Now
          </NavbarButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
