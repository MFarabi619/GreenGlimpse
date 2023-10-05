'use client';

import {
  Card,
  Title,
  Text,
  DonutChart,
  ProgressBar,
  Flex,
  LineChart,
  BadgeDelta,
  Button
} from '@tremor/react';

import LineChartDiagram from '../components/LineChartDiagram';
import { useSearchParams } from 'next/navigation';

// Generate random percentages that add up to the given total.

// Main rendering function
export default async function IndexPage(data: string[]) {
  const router = useSearchParams();
  const stringName: string = router.get('data')!;
  const names: any = stringName?.split(',');

  const categoryData: Record<string, any> = {};
  for (let i = 0; i < names.length; i++) {
    categoryData[names[i]] = generateData(generatePercentage());
  }
  console.log(categoryData);

  function generatePercentage(): number {
    return Math.ceil(Math.random() * 100);
  }

  // Create emission data based on a given percentage
  function generateData(emissionPercent: number) {
    return [
      {
        name: 'Emission source',
        emissions: 100 - emissionPercent
      },
      {
        name: 'Renewable source',
        emissions: emissionPercent
      }
    ];
  }

  // Function to determine the color based on the percentage
  function getColorByPercentage(
    percentage: number
  ): 'green' | 'yellow' | 'orange' | 'red' {
    if (percentage >= 75) return 'green';
    else if (percentage >= 50) return 'yellow';
    else if (percentage >= 25) return 'orange';
    else return 'red';
  }

  return (
    <main className="px-4 md:px-10 mx-auto max-w-7xl flex flex-col items-center">
      {/* Render each category as a card */}
      <div className="flex sm:justify-around flex-wrap w-full lg:justify-between">
        {Object.keys(categoryData).map((category) => (
          <Card
            className="mt-6 max-w-sm flex flex-col items-center"
            key={category}
          >
            <Title>{category}</Title>
            <DonutChart
              className="mt-6"
              data={categoryData[category]}
              category="emissions"
              index="name"
              colors={[
                'slate',
                getColorByPercentage(categoryData[category][1].emissions)
              ]}
              label={`${categoryData[category][1].emissions}%`}
            />
          </Card>
        ))}
      </div>

      {/* Render the GGP chart for all categories */}
      <LineChartDiagram />
    </main>
  );
}
