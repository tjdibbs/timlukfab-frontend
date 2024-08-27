"use client";

import { FacebookFilled, InstagramFilled, XOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { CSSProperties, useEffect, useCallback, memo } from "react";
import { X } from "react-feather";

interface LinkItem {
  name: string;
  path: string;
}

const links: LinkItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Shop",
    path: "/shop",
  },
];

const style: CSSProperties = {
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
};

interface NavLinkProps extends LinkItem {
  isActive: boolean;
  closeFn: () => void;
}

const NavLink: React.FC<NavLinkProps> = memo(
  ({ path, name, isActive, closeFn }) => (
    <li>
      <Link
        href={path}
        className={`block cursor-pointer border-b px-3 py-4 text-[0.85rem] font-semibold uppercase transition-all delay-200 ease-linear hover:bg-gray-100 ${
          isActive ? "bg-gray-100" : ""
        }`}
        onClick={closeFn}
      >
        {name}
      </Link>
    </li>
  ),
);

NavLink.displayName = "NavLink";

interface NavProps {
  isOpen: boolean;
  closeFn: () => void;
}

const Nav: React.FC<NavProps> = ({ isOpen, closeFn }) => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (e.target === e.currentTarget) {
        closeFn();
      }
    },
    [closeFn],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center bg-black/50 md:hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={style}
            className="h-full w-[75%] max-w-[500px] bg-white shadow-md"
          >
            <header className="px-3 py-3">
              <button onClick={closeFn}>
                <X className="w-8 text-black" />
              </button>
            </header>
            <ul className="no-scrollbar h-full overflow-y-scroll">
              {links.map((item) => (
                <NavLink
                  key={item.path}
                  {...item}
                  isActive={pathname === item.path}
                  closeFn={closeFn}
                />
              ))}
            </ul>
            <footer className="flex items-center gap-4 p-3">
              <a href="/">
                <XOutlined style={{ fontSize: "1rem", color: "#808080" }} />
              </a>
              <a href="/">
                <InstagramFilled
                  style={{ fontSize: "1rem", color: "#808080" }}
                />
              </a>
              <a href="/">
                <FacebookFilled
                  style={{ fontSize: "1rem", color: "#808080" }}
                />
              </a>
            </footer>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default memo(Nav);
