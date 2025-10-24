"use client";

import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useStore } from "@/store/store";

const Navbar = () => {
  const cart = useStore((state) => state.cart);
  console.log(cart.length, "cart");
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop:blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg">
          TastySarv
        </Link>
        {/* menu items for desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href={"/menu"} className="text-sm font-medium">
            Menu
          </Link>
          <Link href={"/about"} className="text-sm font-medium">
            About
          </Link>
          <Link href={"/admin/create"} className="text-sm font-medium">
            Admin
          </Link>
        </nav>
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 inset-y-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu...."
              className="pl-10 w-[160px] md:w-[250px]"
            />
          </div>
          <Link href={"/cart"} className="relative">
            <Button variant={"ghost"}>
              <ShoppingCart className="w-7 h-7" />
              {cart.length > 0 ? (
                <span className="absolute text-xs -top-0.5 -right-0.5 h-4 w-4 items-center justify-center bg-red-500 text-white rounded-full">
                  {cart.length}
                </span>
              ) : (
                <span className="absolute text-xs -top-0.5 -right-0.5 h-4 w-4 items-center justify-center bg-red-500 text-white rounded-full">
                  0
                </span>
              )}
            </Button>
          </Link>
          {/*User Auth */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          {/*Mobile device */}
          <Button
            size={"icon-sm"}
            variant={"ghost"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-2 border-t bg-background space-y-2">
          <Link href={"/menu"} className="text-sm font-medium block">
            Menu
          </Link>
          <Link href={"/about"} className="block text-sm font-medium">
            About
          </Link>
          <Link href={"/admin"} className="block text-sm font-medium">
            Admin
          </Link>
          <div className="relative">
            <Search className="absolute left-3 inset-y-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search menu...." className="pl-10 w-full" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
