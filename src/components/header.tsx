"use client";

import { type FC } from "react";
import { H4 } from "./ui/typography";
import Link from "next/link";
import { PlusIcon, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full border rounded-full px-5 py-2 mt-4 mb-10 ring-2 ring-ring">
      <Link href={"/"}>
        <H4>Scheduler</H4>
      </Link>
      <Link href={"/meeting/create"} className="flex flex-row gap-1">
        <PlusIcon className="text-muted-foreground" />
        <div>Create</div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex flex-row gap-1 items-center">
                <User className="text-muted-foreground" />
                <div>User</div>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>Name</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
