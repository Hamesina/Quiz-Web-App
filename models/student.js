import { Schema, model, models } from "mongoose";

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    color: String,
    password: {
      type: String,
      required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"], // Adjust roles as needed
      default: "student",
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },
    class: {
      type: String,
      enum: [
        "first year",
        "second year",
        "third year",
        "fourth year",
        "fifth year",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Student = models.Student || model("Student", StudentSchema);

export default Student;
