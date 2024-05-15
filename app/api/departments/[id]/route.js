import connectToDB from "@/lib/database";
import Department from "@/models/department";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    //connect to DB
    await connectToDB();
    //get the data using the model
    const department = await Department.findById(params.id);
    if (!department)
      return NextResponse.json("Department not found", { status: 404 });
    return NextResponse.json(
      {
        message: "Ok",
        data: department,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch the department",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export const PUT = async (request, { params: { id } }) => {
  try {
    //Get title and description from request
    const { name, description, departmentCode, departmentStatus } =
      await request.json();
    const newDepartment = {
      name,
      description,
      departmentCode,
      departmentStatus,
    };
    //connect to mongoDb
    await connectToDB();
    //Use the mongoose model to update
    await Department.findByIdAndUpdate(id, newDepartment);
    //return the response
    return NextResponse.json(
      {
        message: "Department successfully updated",
        data: newDepartment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update Department",
        error,
      },
      { status: 500 }
    );
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Department.findByIdAndDelete(params.id);
    return NextResponse("Recipe deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse("Failed to delete department", { status: 500 });
  }
};
