//src/components/layout/AppSidebar.jsx
"use client";
import { Home, Boxes, Rocket, Settings, Settings2, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ShoppingCart from "../cart/ShoppingCart";
import Logo from "./Logo";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Boxes,
  },
  {
    title: "Landing",
    url: "/landing",
    icon: Rocket,
  },
];

export function AppSidebar() {
  const { isSignedIn, sessionClaims } = useAuth();

  const isAdmin = sessionClaims?.metadata?.role === "admin";

  //console.log(sessionClaims);

  //console.log(isAdmin);

  return (
    <Sidebar>
      <SidebarContent className="bg-teal-50 text-teal-700 font-semibold flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator className="my-2" />

              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/products">
                      <Settings />
                      <span>Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <ShoppingCart />
            <SignOutButton>
              <Button className="bg-teal-700 text-white rounded-md shadow-md ml-12">
                Salir <LogOut />
              </Button>
            </SignOutButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
