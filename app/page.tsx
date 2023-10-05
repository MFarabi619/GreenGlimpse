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

import LiveDataCard from './components/liveData';

import LineChartDiagram from './components/LineChartDiagram';

export const dynamic = 'force-dynamic';

// Generate random percentages that add up to the given total.
function receivePercentages(num: number): number[] {
  let percentages: number[] = [];
  for (let i = 0; i < num; i++) {
    percentages.push(Math.ceil(Math.random() * 100));
  }

  return percentages;
}

// Generate initial percentages for each category
const [
  rawMaterialExtractionPercent,
  manufacturingPercent,
  transportationPercent,
  operationsPercent,
  usagePercent,
  wastePercent
] = receivePercentages(6);

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

type CategoryName =
  | 'Raw Material Extraction'
  | 'Manufacturing'
  | 'Transportation'
  | 'Operations'
  | 'Usage'
  | 'Waste';

type EmissionData = {
  name: string;
  emissions: number;
}[];

// Define types for monthly data
type MonthData = {
  month: string;
} & {
  [key in CategoryName]?: number;
};

// Generate the emission data for each category
const categoryData: Record<CategoryName, EmissionData> = {
  'Raw Material Extraction': generateData(rawMaterialExtractionPercent),
  Manufacturing: generateData(manufacturingPercent),
  Transportation: generateData(transportationPercent),
  Operations: generateData(operationsPercent),
  Usage: generateData(usagePercent),
  Waste: generateData(wastePercent)
};

// Randomly adjust a given value within a range of 10 units.
function randomize(base: number): number {
  return base + Math.floor(Math.random() * 10);
}

// Function to randomly generate data for a month
function generate_month_data(month: string): MonthData {
  let monthData: MonthData = { month };
  for (const category in categoryData) {
    monthData[category as CategoryName] = randomize(
      categoryData[category as CategoryName][1].emissions
    );
  }
  return monthData;
}

const months: string[] = [
  'January',
  'Febuary',
  'march',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October'
];
const chartdata: MonthData[] = months.map((month) =>
  generate_month_data(month)
);

// Function to determine the color based on the percentage
function getColorByPercentage(
  percentage: number
): 'green' | 'yellow' | 'orange' | 'red' {
  if (percentage >= 75) return 'green';
  else if (percentage >= 50) return 'yellow';
  else if (percentage >= 25) return 'orange';
  else return 'red';
}

// function to determine green glimpse percent
function getGGP(data: Record<CategoryName, EmissionData>): number {
  let total = 0;
  let num = 0;
  for (const category in data) {
    total += data[category as CategoryName][1].emissions;
    num++;
  }
  return total / num;
}

//function for setting timeline for graph

// Main rendering function
export default async function IndexPage() {
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
              data={categoryData[category as CategoryName]}
              category="emissions"
              index="name"
              colors={[
                'slate',
                getColorByPercentage(
                  categoryData[category as CategoryName][1].emissions
                )
              ]}
              label={`${categoryData[category as CategoryName][1].emissions}%`}
            />
          </Card>
        ))}
      </div>

      {/* Render the GGP progress bar */}
      <div className="flex sm:justify-around flex-wrap w-full lg:justify-between">
        <Flex className="flex-wrap justify-center md:flex-nowrap">
          <Card className="w-full mx-auto mt-5 md:mr-4 h-28">
            <Title className="text-center">
              Green Glimpse Percentage (GGP)
            </Title>
            <Flex>
              <Text>0%</Text>
              <Text>100%</Text>
            </Flex>
            <ProgressBar
              value={getGGP(categoryData)}
              color="teal"
              className="mt-3"
            />
          </Card>
          <Card className="md:max-w-sm mt-5 md:ml-4 h-28 flex items-center justify-between">
            <Title>LeaderBoard Ranking:</Title>
            <div className="flex items-center">
              <Title className="text-4xl mr-2 text-green-400">#50</Title>
              <Flex>
                <BadgeDelta deltaType="increase">3</BadgeDelta>
              </Flex>
            </div>
          </Card>
        </Flex>
      </div>

      {/* Render the GGP chart for all categories */}
      <Card className="w-full mx-auto mt-5">
        <Title className="text-center text-3xl">GGP chart</Title>
        <LineChart
          className="mt-5"
          data={chartdata}
          index="month"
          categories={[
            'Raw Material Extraction',
            'Manufacturing',
            'Transportation',
            'Operations',
            'Usage',
            'Waste'
          ]}
          colors={['emerald', 'blue', 'yellow', 'purple', 'orange', 'red']}
          yAxisWidth={40}
          minValue={40}
          maxValue={80}
        />
      </Card>
      <LiveDataCard />

      <LineChartDiagram />
    </main>
  );
}
