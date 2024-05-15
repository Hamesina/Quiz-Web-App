"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";
import { RocketIcon } from "lucide-react";

const EditDepartmentForm = ({ id }) => {
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const [department, setDepartment] = useState({
    name: "",
    description: "",
    departmentCode: "",
    departmentStatus: "",
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await fetch(`/api/departments/${id}`);
      const singleDepartment = await response.json();

      setDepartment(singleDepartment.data);
    };
    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/departments/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: department.name,
          description: department.description,
          departmentCode: department.departmentCode,
          departmentStatus: department.departmentStatus,
        }),
      });
      console.log(res);
      if (res.ok) {
        console.log("posted successfully", res.message);
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 4000); // Hide success toast after 3 seconds
      } else {
        setErrorToast(true);
        setTimeout(() => setErrorToast(false), 4000); // Hide error toast after 3 seconds
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Card className="p-8 w-full max-w-md">
        <CardTitle className="mb-3">Edit Department</CardTitle>
        <div className="m-2">
          {successToast && (
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Department edited successfully
              </AlertDescription>
            </Alert>
          )}
          {errorToast && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>"Uh oh! Something went wrong."</AlertTitle>
              <AlertDescription>
                Please make sure you are not adding an existing department
              </AlertDescription>
            </Alert>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Name</Label>
            <Input
              type="text"
              name="depName"
              placeholder="Department name"
              value={department.name}
              onChange={(e) => {
                setDepartment({ ...department, name: e.target.value });
              }}
            />
            {/*   {errors.depName && touched.depName && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.depName}</AlertDescription>
              </Alert>
            )} */}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Code</Label>
            <Input
              type="text"
              name="depCode"
              placeholder="Department Code"
              value={department.departmentCode}
              onChange={(e) => {
                setDepartment({
                  ...department,
                  departmentCode: e.target.value,
                });
              }}
            />
            {/*  {errors.depCode && touched.depCode && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.depCode}</AlertDescription>
              </Alert>
            )} */}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="depDesc">Description</Label>
            <Textarea
              placeholder="Department Description"
              name="depDesc"
              value={department.description}
              onChange={(e) => {
                setDepartment({
                  ...department,
                  description: e.target.value,
                });
              }}
            />
            {/*   {errors.depDesc && touched.depDesc && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.depDesc}</AlertDescription>
              </Alert>
            )} */}
          </div>
          {submitting ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">Edit</Button>
          )}
        </form>
      </Card>
    </div>
  );
};
export default EditDepartmentForm;
