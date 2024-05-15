"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const DepartmentInfoPage = ({ id }) => {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(`/api/departments/${id}`);
      const department = await response.json();
      setDepartment(department.data);
    };
    fetchDepartment();
  }, []);
  return (
    <div>
      <Card>
        <CardTitle>Deparrtment Info</CardTitle>
        <CardDescription>All the info you need</CardDescription>
        <CardContent>
          <div>{department.name}</div>
          <div>{department.description}</div>
        </CardContent>
      </Card>
    </div>
  );
};
export default DepartmentInfoPage;
