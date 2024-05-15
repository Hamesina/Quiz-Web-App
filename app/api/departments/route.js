import connectToDB from "@/lib/database";
import Department from "@/models/department";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    //connect to DB
    await connectToDB();
    //get the data using the model
    const departments = await Department.find({});
    return NextResponse.json(
      {
        message: "Ok",
        data: departments,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch courses",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    // Get the data from the request
    const { name, description, departmentCode, departmentStatus } =
      await request.json();

    // Check if a department with the same name or code already exists
    const existingDepartment = await Department.findOne({
      $or: [{ name }, { departmentCode }],
    });
    if (existingDepartment) {
      return NextResponse.json(
        {
          message:
            "Department with the same name or code already exists. Please check name or code.",
        },
        { status: 400 }
      );
    }

    const newDepartment = {
      name,
      description,
      departmentCode,
      departmentStatus,
    };

    // Connect to the DB
    await connectToDB();

    // Use the model to create
    await Department.create(newDepartment);
    return NextResponse.json(
      {
        message: "Department created successfully",
        data: newDepartment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create department",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
