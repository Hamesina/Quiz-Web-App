"use client";

import Link from "next/link";
/* import UserItem from "./UserItem"; */
const UserItem = dynamic(() => import("useritem"), { ssr: false });
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  User,
  CircleGauge,
  Users,
  LayoutPanelTop,
  University,
  GraduationCap,
  UserCog,
} from "lucide-react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";

const Sidebar = () => {
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/dashboard",
          icon: <CircleGauge color="#1463ff" />,
          text: "Dashboard",
        },
        {
          link: "/dashboard/admin-profile",
          icon: <User color="#1463ff" />,
          text: "Profile",
        },
        {
          link: "/departments",
          icon: <LayoutPanelTop color="#1463ff" />,
          text: "Departments",
        },
        {
          link: "/courses",
          icon: <University color="#1463ff" />,
          text: "Courses",
        },
      ],
    },
    {
      group: "Users",
      items: [
        {
          link: "/dashboard/students",
          icon: <Users color="#1463ff" />,
          text: "Students",
        },
        {
          link: "/dashboard/teachers",
          icon: <GraduationCap color="#0041c2" />,
          text: "Teachers",
        },
        {
          link: "/dashboard/admins",
          icon: <UserCog color="#0041c2" />,
          text: "Admins",
        },
      ],
    },
  ];
  return (
    <div className=" fixed w-[300px] flex flex-col gap-4 min-w-[300px] min-h-screen p-4 text-black">
      <div>
        {/*  <UserItem /> */}
        <UserItem
          title="Hammasii Teshome"
          description="CNCS/UR21001/13"
          color="#1463ff"
          shadow={false}
          /*  style={{
            border: "1px solid blue",
          }} */
        />
      </div>
      <div className="grow text-black ">
        <Command style={{ overflow: "visible" }}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList style={{ overflow: "visible" }}>
            <CommandEmpty>No results found.</CommandEmpty>
            {menuList.map((menu, key) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option) => (
                  <Link href={option.link}>
                    <CommandItem
                      key={option.text}
                      className="flex gap-2 font-bold"
                    >
                      {option.icon}
                      <span className="text-black font-bold">
                        {option.text}
                      </span>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>

      <div className="flex items-center gap-2">Logout </div>
    </div>
  );
};
export default Sidebar;
