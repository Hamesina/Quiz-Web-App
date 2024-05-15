"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { ArrowBigDown, RocketIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const initialValues = {
  courseName: "",
  courseCode: "",
  courseDesc: "",
  departmentId: "",
};

const AddCoursesForm = ({ departments }) => {
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  function generateRandomHexColor() {
    // Generate a random hexadecimal color code
    const colorCode = Math.floor(Math.random() * 16777215).toString(16);
    const paddedColorCode = colorCode.padStart(6, "0");
    const hexColor = `#${paddedColorCode}`;
    return hexColor;
  }

  const courseValidationSchema = Yup.object().shape({
    courseName: Yup.string()
      .required("Course name is required")
      .min(3, "Course name must be at least 2 characters long"),
    courseCode: Yup.string()
      .required("Course code is required")
      .min(2, "Course code must be at least 2 characters long"),
    courseDesc: Yup.string().required("Course description is required"),
    departmentId: Yup.string().required("Choose the department it belongs to"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: courseValidationSchema,
      onSubmit: async (values) => {
        console.log(values);

        setSubmitting(true);
        try {
          const res = await fetch("/api/courses", {
            method: "POST",
            body: JSON.stringify({
              name: values.courseName,
              description: values.courseDesc,
              code: values.courseCode,
              status: "active",
              color: generateRandomHexColor(),
              departmentId: values.departmentId,
            }),
          });
          console.log(res);
          if (res.ok) {
            console.log("posted successfully");
            setSuccessToast(true);
            setTimeout(() => setSuccessToast(false), 4000); // Hide success toast after 3 seconds
          } else {
            setErrorToast(true);
            setTimeout(() => setErrorToast(false), 4000); // Hide error toast after 3 seconds
            console.log(res.message);
          }
        } catch (error) {
          console.log(error);

          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        } finally {
          setSubmitting(false);
        }
      },
    });

  /*   console.log(errorToast);

  console.log(errors); */
  console.log(values.departmentId);

  return (
    <>
      <Card className="p-8 w-full max-w-md">
        <CardTitle className="mb-3">Add Course</CardTitle>
        <div className="m-2">
          {successToast && (
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Department added successfully</AlertDescription>
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
            {errors.courseName && touched.courseName && (
              <Alert variant="destructive" className="border-none p-0">
                <AlertDescription>{errors.courseName}</AlertDescription>
              </Alert>
            )}
            <Input
              type="text"
              name="courseName"
              placeholder="Course name"
              value={values.courseName}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Code</Label>
            <Input
              type="text"
              name="courseCode"
              placeholder="Course Code"
              value={values.courseCode}
              onChange={handleChange}
            />
            {errors.courseCode && touched.courseCode && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.courseCode}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="depDesc">Description</Label>
            <Textarea
              placeholder="Department Description"
              name="courseDesc"
              value={values.courseDesc}
              onChange={handleChange}
            />
            {errors.courseDesc && touched.courseDesc && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.courseDesc}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="departmentId">Department</Label>
            <div className="flex flex-col mb-4 relative">
              <select
                name="departmentId"
                value={values.departmentId}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 appearance-none text-sm font-bold"
              >
                <option value="" disabled>
                  Select a department
                </option>
                {departments.map((department) => (
                  <option
                    className="flex gap-2 py-3"
                    key={department._id}
                    value={department._id}
                  >
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.departmentId && touched.departmentId && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.courseDesc}</AlertDescription>
              </Alert>
            )}
          </div>

          {submitting ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">Add</Button>
          )}
        </form>
      </Card>
    </>
  );
};
export default AddCoursesForm;
