import General from "@/components/Cards/General";
import Lines from "@/components/Lines";
import TableComponent from "@/components/Table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import connectToDB from "@/lib/database";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <General />
        <div className="grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Total Students </CardTitle>
                <CardDescription>Enrolled in the system</CardDescription>
              </CardHeader>
              <CardContent className="font-bold text-xl">500</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Students </CardTitle>
                <CardDescription>Enrolled in the system</CardDescription>
              </CardHeader>
              <CardContent className="font-bold text-xl">500</CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Students </CardTitle>
                <CardDescription>Enrolled in the system</CardDescription>
              </CardHeader>
              <CardContent className="font-bold text-xl">500</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Students </CardTitle>
                <CardDescription>Enrolled in the system</CardDescription>
              </CardHeader>
              <CardContent className="font-bold text-xl">500</CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <Lines />
        <div className="md:h-[300px] overflow-hidden">
          <Card className="p-4 md:p-8 overflow-y-scroll">
            <CardTitle className="text-lg md:text-xl">Orders</CardTitle>
            <CardDescription className="text-sm md:text-base">This is the description</CardDescription>
            <TableComponent />
          </Card>
        </div>
        <div className="md:h-[300px] overflow-hidden">
          <Card className="p-4 md:p-8 overflow-y-scroll">
            <CardTitle className="text-lg md:text-xl">Hello</CardTitle>
            <CardDescription className="text-sm md:text-base">This is another description</CardDescription>
            {/* Content */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
