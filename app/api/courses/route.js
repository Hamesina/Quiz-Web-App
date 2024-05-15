import connectToDB from "@/lib/database";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    //connect to DB
    await connectToDB();
    //get the data using the model
    const courses = await Course.find({});
    return NextResponse.json(
      {
        message: "Ok",
        data: courses,
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
    const { name, description, code, status, color, departmentId } =
      await request.json();

    // Check if a Course with the same name or code already exists
    const existingCourse = await Course.findOne({
      $or: [{ name }, { code }],
    });
    if (existingCourse) {
      return NextResponse.json(
        {
          message:
            "Course with the same name or code already exists. Please check name or code.",
        },
        { status: 400 }
      );
    }

    const newCourse = {
      name,
      description,
      code,
      status,
      color,
      departmentId,
    };

    // Connect to the DB
    await connectToDB();

    // Use the model to create
    await Course.create(newCourse);
    return NextResponse.json(
      {
        message: "Course created successfully",
        data: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create Course",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
