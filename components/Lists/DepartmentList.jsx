"use client";
const UserItem = dynamic(() => import("useritem"), { ssr: false });

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, Trash2Icon, View } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function DepartmentTable() {
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function generateRandomHexColor() {
    // Generate a random hexadecimal color code
    const colorCode = Math.floor(Math.random() * 16777215).toString(16);
    const paddedColorCode = colorCode.padStart(6, "0");
    const hexColor = `#${paddedColorCode}`;
    return hexColor;
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch("/api/departments", {
        cache: "no-store",
      });
      const departments = await response.json();
      setDepartments(departments.data);
    };
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-8 w-full max-w-3xl  ">
      <CardHeader className="px-7">
        <CardTitle>Departments</CardTitle>
        <CardDescription>Manage and View</CardDescription>
        <Input
          type="text"
          placeholder="Search departments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Code</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((department) => (
              <TableRow key={department._id}>
                <TableCell>
                  <UserItem
                    title={department.name}
                    color={generateRandomHexColor()}
                    description={department.departmentCode}
                    shadow={false}
                    border={false}
                    small={true}
                  />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {department.departmentCode}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {department.departmentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-center items-end gap-3 text-xs mt-3">
                  <Link href={`/departments/${department._id}`}>
                    <View />
                  </Link>
                  <Link href={`/departments/edit/${department._id}`}>
                    <EditIcon />
                  </Link>
                  <Trash2Icon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
