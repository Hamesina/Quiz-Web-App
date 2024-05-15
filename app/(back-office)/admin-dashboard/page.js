"use client";

const UserItem = dynamic(() => import("useritem"), { ssr: false });

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import dynamic from "next/dynamic";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

export function ComboboxForm() {
  const form =
    useForm <
    z.infer <
    typeof FormSchema >>
      {
        resolver: zodResolver(FormSchema),
      };

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value);
                          }}
                        >
                          {language.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function generateRandomHexColor() {
  // Generate a random hexadecimal color code
  const colorCode = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure the color code is always six digits by padding with zeros if necessary
  const paddedColorCode = colorCode.padStart(6, "0");

  // Construct the hexadecimal color string
  const hexColor = `#${paddedColorCode}`;

  return hexColor;
}

// Example usage:
const randomHexColor = generateRandomHexColor();
console.log(randomHexColor); // Output: e.g., "#a1b2c3"

const Departments = () => {
  const [members, setMembers] = useState([
    {
      email: "anotheremail@example.com",
      name: "Jane Smith",
      color: "#123456",
      role: "User",
      status: "active",
    },
    {
      email: "user1234@gmail.com",
      name: "David Johnson",
      color: "#c83264",
      role: "User",
      status: "deactivated",
    },
    {
      email: "testuser@email.com",
      name: "Emily Brown",
      color: "#96c832",
      role: "User",
      status: "active",
    },
    {
      email: "user5678@gmail.com",
      name: "Alex Rodriguez",
      color: "#3296c8",
      role: "User",
      status: "active",
    },
    {
      email: "sampleuser@example.com",
      name: "Sophia Garcia",
      color: "#6464c8",
      role: "User",
      status: "deactivated",
    },
    {
      email: "exampleuser@gmail.com",
      name: "Daniel Martinez",
      color: "#c86464",
      role: "User",
      status: "active",
    },
    {
      email: "randomuser@example.com",
      name: "Ella Thompson",
      color: "#abcdef",
      role: "User",
      status: "deactivated",
    },
  ]);
  return (
    <div className="grid ">
      <div className="flex items-center gap-6 flex-col">
        <Card className="sm:col-span-2 ">
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create New Order</Button>
          </CardFooter>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create New Order</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4">
        <header>
          <h2 className="text-[36px] font-[700]">Team settings</h2>
        </header>
        <div className="grid gap-4">
          {" "}
          <div className="flex items-center justify-between">
            <Command className="rounded-lg border">
              <CommandInput
                className="border-none "
                placeholder="Type a name.."
              />
            </Command>
            <Button>Add New</Button>
          </div>
          <div className="border rounded">
            {members.map((member, key) => (
              <div
                className="border-b last:border-b-0 grid grid-cols-6 items-center justify-between pr-3"
                key={key}
              >
                {" "}
                {/* {member.email} */}
                <div className="col-span-2">
                  <UserItem
                    title={member.name}
                    color={member.color}
                    description={member.email}
                    shadow={false}
                    border={false}
                  />
                </div>
                <Button variant="ghost">Remove</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Departments;
