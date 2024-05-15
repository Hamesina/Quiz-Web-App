"use client";
import AddCoursesForm from "@/components/Forms/AddCoursesForm";
import CoursesTable from "@/components/Lists/CoursesList";
import { useEffect, useState } from "react";

const Courses = () => {
  const [departments, setDepartments] = useState([]);
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
  return (
    <div>
      <AddCoursesForm departments={departments} />
      <CoursesTable />
    </div>
  );
};
export default Courses;
