import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Dropdown from "./dropdown";
import { useRouter } from "next/router";

const Nav = () => {
  const [navSticky, setNavSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        setIsLoggedIn(!!userData);
      }
    };

    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  // Generate nav links based on authentication status
  const getNavLinks = () => {
    const commonLinks = [
      { label: "Placement Test", href: "/placement_test" },
      { label: "Courses", href: "/courses" },
    ];

    if (isLoggedIn) {
      return [
        ...commonLinks,
        { label: "My Course", href: "/my_courses" },
        // { label: "Schedules", href: "/schedule" },
        { label: "Profile", href: "/profile" },
        { label: "Logout", href: "#", onClick: handleLogout },
      ];
    } else {
      return [...commonLinks, { label: "Login", href: "/login" }];
    }
  };

  const navLinks = getNavLinks();

  // Handle dropdown selection
  const handleMenuSelect = (option: string) => {
    if (option === "Logout") {
      handleLogout();
    }
  };

  const stickyStyle = navSticky
    ? "bg-white/20 backdrop-blur-md shadow-md"
    : "bg-[transparent]";

  const textStyle = navSticky ? "text-[#212529]" : "";

  // Handle scroll for sticky nav
  useEffect(() => {
    const handler = () => {
      setNavSticky(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      className={`fixed w-[100%] ${stickyStyle} transition-all duration-300 z-[1000]`}
    >
      <header className="mx-auto flex h-[12vh] w-[80%] items-center justify-between">
        {/* Logo */}
        <div className="font-logo text-[18px] text-black">
          <Link href="/">
            <Image
              src="/images/2_no.png"
              alt="b1"
              width={150}
              height={80}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`hidden items-center gap-16 text-[25px] font-semibold md:flex ${textStyle}`}
          aria-label="Primary"
        >
          <Link href="/placement_test">Placement Test</Link>
          <Link href="/courses">Courses</Link>
          {isLoggedIn && <Link href="/my_courses">My Courses</Link>}
          {/* {isLoggedIn && <Link href="/schedule">Schedules</Link>} */}
        </nav>

        {/* Desktop Auth (Profile dropdown) */}
        <div className={`hidden items-center md:flex ${textStyle}`}>
          {isLoggedIn ? (
            <Dropdown
              placeholder={<UserCircleIcon className="size-10 text-black" />}
              onSelect={() => {}}
              options={[
                { label: "Profile", href: "/profile" },
                { label: "Logout", href: "#", onClick: handleLogout },
              ]}
            />
          ) : (
            <Link href="/login" className="text-[25px] font-semibold">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Dropdown
            options={navLinks}
            onSelect={handleMenuSelect}
            placeholder={<Bars3Icon className="size-6 text-black" />}
          />
        </div>
      </header>
    </div>
  );
};

export default Nav;
