import { Schema, model, models } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    departmentCode: String,
    departmentStatus: {
      type: String,
      enum: ["active", "deperecated"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Department = models.Department || model("Department", DepartmentSchema);

export default Department;
