import { Schema, model, models } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Course already exists!"],
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: [true, "Course code already exists!"],
    },
    status: {
      type: String,
      enum: ["active", "deprecated"],
      default: "active",
      required: true,
    },
    color: {
      type: String,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model("Course", courseSchema);

export default Course;
