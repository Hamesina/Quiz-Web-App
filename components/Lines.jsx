"use client";

import { ResponsiveLine } from "@nivo/line";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: 36,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: -40,
      legendPosition: "middle",
      truncateTickAt: 0,
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

const Lines = () => {
  const data = [
    {
      id: "COSC",
      color: "hsl(0, 70%, 50%)", // Red
      data: [
        {
          x: "students",
          y: 96,
        },
        {
          x: "quizzes",
          y: 156,
        },
        {
          x: "teachers",
          y: 10,
        },
        {
          x: "courses",
          y: 8,
        },
      ],
    },
    {
      id: "BIO",
      color: "hsl(120, 70%, 50%)", // Green
      data: [
        {
          x: "students",
          y: 67,
        },
        {
          x: "quizzes",
          y: 45,
        },
        {
          x: "teachers",
          y: 5,
        },
        {
          x: "courses",
          y: 6,
        },
      ],
    },
    {
      id: "MATH",
      color: "hsl(240, 70%, 50%)", // Blue
      data: [
        {
          x: "students",
          y: 120,
        },
        {
          x: "quizzes",
          y: 200,
        },
        {
          x: "teachers",
          y: 12,
        },
        {
          x: "courses",
          y: 10,
        },
      ],
    },
    {
      id: "PHYS",
      color: "hsl(300, 70%, 50%)", // Purple
      data: [
        {
          x: "students",
          y: 85,
        },
        {
          x: "quizzes",
          y: 90,
        },
        {
          x: "teachers",
          y: 7,
        },
        {
          x: "courses",
          y: 5,
        },
      ],
    },
  ];

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Growth Stats </CardTitle>
          <CardDescription>stats of the year, growth stats</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 h-[200px]">
          <MyResponsiveLine data={data} />
        </CardContent>
        {/*  <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
      </Card>
    </div>
  );
};
export default Lines;
