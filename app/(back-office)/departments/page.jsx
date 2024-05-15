import AddDepartmentForm from "@/components/Forms/AddDepartmentForm";
import DepartmentTable from "../../../components/Lists/DepartmentList";
import DepartmentInfo from "./[id]/page";

const Departments = () => {
  return (
    <>
      <div></div>
      <div className="flex flex-col  justify-between max-md:flex-col gap-8">
        <DepartmentTable />
        <AddDepartmentForm />
      </div>
    </>
  );
};
export default Departments;
