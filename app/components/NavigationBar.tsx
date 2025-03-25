"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NavigationBar = () => {
  const Links = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white text-black h-16 fixed w-full z-50">

      <div className="px-6 flex justify-between items-center h-full max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-xl font-semibold"
          onClick={() => setIsOpen(false)}
        >
          {isOpen ? "" : "Navbar"}
        </Link>
        {/* Desktop Links */}
        <ul className="hidden sm:flex sm:gap-x-4">
          {Links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${pathname === link.href
                  ? "text-sky-500"
                  : "hover:text-sky-600"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden flex flex-col justify-center items-center"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`bg-neutral-800 block transition-all duration-300 ease-out 
                    h-0.5 w-7 rounded-sm ${isOpen ?
              'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`} >
          </span>
          <span className={`bg-neutral-800 block transition-all duration-300 ease-out 
                    h-0.5 w-7 rounded-sm my-0.5 ${isOpen ?
              'opacity-0' : 'opacity-100'
            }`} >
          </span>
          <span className={`bg-neutral-800 block transition-all duration-300 ease-out
            h-0.5 w-7 rounded-sm ${isOpen ?
              '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`} >
          </span>
        </button>
      </div>

      {/* Mobile Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="sm:hidden bg-white"
          >
            <ul className="flex flex-col gap-y-2 px-6">
              {Links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${pathname === link.href
                      ? "text-sky-500"
                      : "hover:text-sky-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default NavigationBar;