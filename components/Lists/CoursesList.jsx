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

export default function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses", {
        cache: "no-store",
      });
      const coursesData = await response.json();
      setCourses(coursesData.data);
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-8 w-full max-w-3xl  ">
      <CardHeader className="px-7">
        <CardTitle>Courses</CardTitle>
        <CardDescription>Manage and View</CardDescription>
        <Input
          type="text"
          placeholder="Search Courses..."
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
            {filteredCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <UserItem
                    title={course.name}
                    color={course.color}
                    description={course.code}
                    shadow={false}
                    border={false}
                    small={true}
                  />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {course.code}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex justify-center items-end gap-3 text-xs mt-3">
                  <Link href={`/courses/${course._id}`}>
                    <View />
                  </Link>
                  <Link href={`/courses/edit/${course._id}`}>
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
