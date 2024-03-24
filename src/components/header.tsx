"use client";

import { type FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { H4 } from "./ui/typography";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className="w-full border rounded-full px-5 py-2 mt-4 mb-10 ring-2 ring-ring">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <H4>Scheduler</H4>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
