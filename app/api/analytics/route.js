import connectToDB from "@/lib/database";
import Course from "@/models/course";
import Department from "@/models/department";
import { NextResponse } from "next/server";

// Define the API endpoint handler function
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDB();

    // Count the number of documents (departments) in the collection
    const departmentCount = await Department.countDocuments();
    const courseCount = await Course.countDocuments();

    const count = {
      department: departmentCount,
      course: courseCount,
    };

    // Return the count as a JSON response
    return NextResponse.json(
      {
        message: "Fetched number of departments",
        data: count,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      {
        message: "Failed to fetch",
        error,
      },
      {
        status: 200,
      }
    );
  }
}
