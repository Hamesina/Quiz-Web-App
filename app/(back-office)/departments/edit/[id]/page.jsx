"use client";
import EditDepartmentForm from "@/components/Forms/EditDepartmentForm";
import { useEffect, useState } from "react";

const EditDepartment = ({ params }) => {
  return (
    <div>
      {params.id}
      <EditDepartmentForm id={params.id} />
    </div>
  );
};
export default EditDepartment;
