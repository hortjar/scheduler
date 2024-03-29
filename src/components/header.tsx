"use client";

import { type FC } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { H4 } from "./ui/typography";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className="w-full border rounded-full px-5 py-2 mt-4 mb-10 ring-2 ring-ring">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={"/"}>
              <H4>Scheduler</H4>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"/meeting/create"}>Create</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
