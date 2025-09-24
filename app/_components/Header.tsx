import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];
function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      {/* Logo */}
      <div className="flex flex-row items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={30} height={30} />
        <h2 className="text-2xl font-bold">AI Trip Planner</h2>
      </div>
      {/* Menu options */}
      <div className="flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Get started button */}
      <SignInButton mode="modal">
        <Button className="cursor-pointer">Get started</Button>
      </SignInButton>
    </div>
  );
}

export default Header;
