"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, FileText, Phone, Cpu } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add effects when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: <Home size={24} className={styles.icon} />,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <FolderOpen size={24} className={styles.icon} />,
    },
    {
      name: "Resume",
      href: "/resume",
      icon: <FileText size={24} className={styles.icon} />,
    },
    {
      name: "Skills",
      href: "/skills",
      icon: <Cpu size={24} className={styles.icon} />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Phone size={24} className={styles.icon} />,
    },
  ];

  return (
    <nav
      className={`${
        styles.navbarGlass
      } fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${
        isScrolled ? "opacity-90" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${styles.linkItem} ${styles.navHover} ${
                isActive ? styles.activeLink : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                {link.icon}
                <span className={`${styles.linkText} text-lg font-medium`}>
                  {link.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
