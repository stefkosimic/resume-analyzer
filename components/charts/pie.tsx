"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function ChartPie({
  resume_key,
  color,
  description,
  label,
  value,
}: {
  color: string;
  resume_key: string;
  description: string;
  label: string;
  value: number;
}) {
  // Ensure value doesn't exceed 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const chartData = [
    {
      resume_key,
      value: clampedValue,
      fill: `hsl(var(--${color}))`, // Fixed template literal syntax
    },
  ];

  const chartConfig = {
    [resume_key]: {
      label,
      color: `hsl(var(--${color}))`, // Fixed template literal syntax
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(clampedValue / 100) * 360} // Scale to full circle
            innerRadius={80}
            outerRadius={110}
            barSize={10} // Added for better visibility
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="value"
              background
              cornerRadius={10}
              max={100} // Set maximum value for the bar
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {clampedValue}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
