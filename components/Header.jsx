"use client";

import { Bell } from "lucide-react";
import { CommandDemo } from "./Command";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [notifications, setNotifications] = useState([
    {
      text: "This is a notification",
      date: "02-01-2015",
      read: true,
    },
    {
      text: "This is another notification",
      date: "02-01-2017",
      read: false,
    },
  ]);
  return (
    <div className="grid grid-cols-2 gap-4 border-b p-4">
      <CommandDemo />
      <div className="flex items-center justify-end">
        {" "}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((item, key) => (
              <DropdownMenuItem
                key={key}
                className="py-2 px-3 cursor-poointor hover:bg-neutral-50 transition flex items-start gap-2"
              >
                <div
                  className={`h-3 w-3 rounded-full my-1 ${
                    !item.read ? "bg-green-500" : "bg-neutral-200"
                  }`}
                ></div>
                <div>
                  <p>{item.text}</p>
                  <p className="text-xs text-neutral-500"> {item.date}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default Header;
