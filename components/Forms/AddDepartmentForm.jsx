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
import { useToast } from "../ui/use-toast";
import { RocketIcon } from "lucide-react";

const initialValues = {
  depName: "",
  depCode: "",
  depDesc: "",
};

const AddDepartmentForm = () => {
  const { toast } = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const departmentValidationSchema = Yup.object().shape({
    depName: Yup.string()
      .required("Department name is required")
      .min(3, "Department name must be at least 2 characters long"),
    depCode: Yup.string()
      .required("Department code is required")
      .min(2, "Department code must be at least 2 characters long"),
    depDesc: Yup.string().required("Department description is required"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: departmentValidationSchema,
      onSubmit: async (values) => {
        console.log("dep name", values.depName);
        console.log("dep desc", values.depDesc);
        console.log("dep code", values.depCode);
        setSubmitting(true);
        try {
          const res = await fetch("/api/departments", {
            method: "POST",
            body: JSON.stringify({
              name: values.depName,
              description: values.depDesc,
              departmentCode: values.depCode,
              departmentStatus: "active",
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

  console.log(errorToast);

  console.log(errors);

  return (
    <>
      {" "}
      {/*       <Card className="p-8 w-full max-w-xl max-md:max-w-sm ">
        <CardTitle className="mb-3">Add Department</CardTitle>
        <form className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Name</Label>
            <Input type="text" id="depName" placeholder="Department name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Code</Label>
            <Input type="text" id="depCode" placeholder="Department Code" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="depDesc">Description</Label>
            <Textarea placeholder="Department Description" id="depDesc" />
          </div>
          <Button>Add</Button>
        </form>
      </Card> */}
      <Card className="p-8 w-full max-w-md">
        <CardTitle className="mb-3">Add Department</CardTitle>
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
            <Input
              type="text"
              name="depName"
              placeholder="Department name"
              value={values.depName}
              onChange={handleChange}
            />
            {errors.depName && touched.depName && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.depName}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="text">Code</Label>
            <Input
              type="text"
              name="depCode"
              placeholder="Department Code"
              value={values.depCode}
              onChange={handleChange}
            />
            {errors.depCode && touched.depCode && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.depCode}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="depDesc">Description</Label>
            <Textarea
              placeholder="Department Description"
              name="depDesc"
              value={values.depDesc}
              onChange={handleChange}
            />
            {errors.depDesc && touched.depDesc && (
              <Alert variant="destructive" className="border-none">
                <AlertDescription>{errors.depDesc}</AlertDescription>
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
export default AddDepartmentForm;
