import {
  Card,
  Title,
  Text,
  DonutChart,
  ProgressBar,
  Flex,
  LineChart
} from '@tremor/react';

export const dynamic = 'force-dynamic';

// Generate random percentages that add up to the given total.
function generateRandomPercentages(num: number, total: number): number[] {
    let percentages: number[] = [];
    for(let i = 0; i < num; i++) {
        percentages.push(Math.random());
    }
    
    const sum = percentages.reduce((a, b) => a + b, 0);
    return percentages.map(value => Math.floor((value / sum) * total));
}

// Generate initial percentages for each category
const [rawMaterialExtractionPercent, manufacturingPercent, transportationPercent, operationsPercent, usagePercent, wastePercent] = generateRandomPercentages(6, 100);

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

type CategoryName = "Raw Material Extraction" | "Manufacturing" | "Transportation" | "Operations" | "Usage" | "Waste";

type EmissionData = {
    name: string;
    emissions: number;
}[];

// Define types for monthly data 
type MonthData = {
    month: string;
} & {
    [key in CategoryName]?: number;
}

// Generate the emission data for each category
const categoryData: Record<CategoryName, EmissionData> = {
  "Raw Material Extraction": generateData(rawMaterialExtractionPercent),
  "Manufacturing": generateData(manufacturingPercent),
  "Transportation": generateData(transportationPercent),
  "Operations": generateData(operationsPercent),
  "Usage": generateData(usagePercent),
  "Waste": generateData(wastePercent)
};

// Randomly adjust a given value within a range of 10 units.
function randomize(base: number): number {
    return base + Math.floor(Math.random() * 10);
}

// Function to randomly generate data for a month
function generate_month_data(month: string): MonthData {
    let monthData: MonthData = { month };
    for (const category in categoryData) {
        monthData[category as CategoryName] = randomize(categoryData[category as CategoryName][1].emissions);
    }
    return monthData;
}

const months: string[] = ["April", "May", "June", "July", "August", "September", "October"];
const chartdata: MonthData[] = months.map(month => generate_month_data(month));

// Function to determine the color based on the percentage
function getColorByPercentage(percentage: number): 'green' | 'yellow' | 'orange' | 'red' {
    if (percentage <= 25) return 'green';
    if (percentage <= 50) return 'yellow';
    if (percentage <= 75) return 'orange';
    return 'red';
}


// Main rendering function
export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center">
      {/* Render each category as a card */}
      <div className="flex justify-between flex-wrap w-full">
        {Object.keys(categoryData).map(category => (
          <Card className="max-w-sm flex flex-col items-center" key={category}>
            <Title>{category}</Title>
            <DonutChart
              className="mt-6"
              data={categoryData[category as CategoryName]}
              category="emissions"
              index="name"
              colors={['slate', getColorByPercentage(categoryData[category as CategoryName][1].emissions)]}
              label={`${categoryData[category as CategoryName][1].emissions}%`}
            />
          </Card>
        ))}
      </div>

      {/* Render the GGP progress bar */}
      <Card className="w-full mx-auto mt-5">
        <Title className="text-center">Green Glimpse Percentage (GGP)</Title>
        <Flex>
          <Text>0%</Text>
          <Text>100%</Text>
        </Flex>
        <ProgressBar value={58} color="teal" className="mt-3" />
      </Card>

      {/* Render the GGP chart for all categories */}
      <Card className="w-full mx-auto mt-5">
        <Title className="text-center text-3xl">GGP chart</Title>
        <LineChart
          className="mt-5"
          data={chartdata}
          index="month"
          categories={['Raw Material Extraction', 'Manufacturing', 'Transportation', 'Operations', 'Usage', 'Waste']}
          colors={['emerald', 'blue', 'yellow', 'purple', 'orange', 'red']}
          yAxisWidth={40}
          minValue={40}
          maxValue={80}
        />
      </Card>
      
    </main>
  );
}
