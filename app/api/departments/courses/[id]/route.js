import connectToDB from "@/lib/database";
import Course from "@/models/course";
import { NextResponse } from "next/server";

// GET endpoint to fetch courses by departmentId
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectToDB();

    // Query courses associated with the departmentId
    const courses = await Course.find({ departmentId: params.id });

    // Return courses as JSON response
    return NextResponse.json(
      {
        message: `Fetched courses for departmentId: ${params.id}`,
        data: courses,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Handle errors
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
