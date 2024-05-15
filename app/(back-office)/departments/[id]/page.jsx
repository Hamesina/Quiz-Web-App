"use client";

import DepartmentInfoPage from "@/components/Info/DepartmentInfoPage";
import { useEffect, useState } from "react";

const DepartmentInfo = ({ params }) => {
  return (
    <div>
      <DepartmentInfoPage id={params.id} />
    </div>
  );
};
export default DepartmentInfo;
