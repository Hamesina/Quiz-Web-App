import connectToDB from "@/lib/database";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    //connect to DB
    await connectToDB();
    //get the data using the model
    const students = await Student.find({});
    return NextResponse.json(
      {
        message: "Students fetched successfully",
        data: students,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch students",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export const POST = async (request) => {
  try {
    const studentData = await request.json();
    await connectToDB();
    const student = new Student(studentData);
    const savedStudent = await student.save();
    return NextResponse.json(
      {
        message: "Student successfully created",
        data: savedStudent,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create student",
        error,
      },
      { status: 500 }
    );
  }
};
