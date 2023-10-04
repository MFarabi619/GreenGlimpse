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

const rawMaterialExtractionPercent = 80;
const manufacturingPercent = 40;
const transportationPercent = 10;
const operationsPercent = 10;
const usagePercent = 10;
const wastePercent = 10;

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

const rawMaterialExtraction = generateData(rawMaterialExtractionPercent);
const manufacturing = generateData(manufacturingPercent);
const transportation = generateData(transportationPercent);
const operations = generateData(operationsPercent);
const usage = generateData(usagePercent);
const waste = generateData(wastePercent);


type MonthData = {
  "month": string;
  "Raw Material Extraction": number;
  "Manufacturing": number;
  "Transportation": number;
  "Operations": number;
  "Usage": number;
  "Waste": number;
}

function randomize(base: number): number {
    return base + Math.floor(Math.random() * 10); // randomize within a range of 10 units
}

// Function to randomly generate data for a month
function generate_month_data(month_name: string, base_value: number): MonthData {
    return {
        "month": month_name,
        "Raw Material Extraction": randomize(base_value),
        "Manufacturing": randomize(base_value + 2),
        "Transportation": randomize(base_value + 14),
        "Operations": randomize(base_value - (base_value % 10)),
        "Usage": randomize(base_value - (base_value % 10) + 5),
        "Waste": randomize(base_value + 10)
    }
}

const months: string[] = ["April", "May", "June", "July", "August", "September", "October"]

const chartdata: MonthData[] = months.map((month, i) => generate_month_data(month, 50 + i));

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center">
      <div className="flex justify-between flex-wrap w-full">
        <Card className="max-w-sm flex flex-col items-center">
          <Title>Raw Material Extraction</Title>
          <DonutChart
            className="mt-6"
            data={rawMaterialExtraction}
            category="emissions"
            index="name"
            colors={['slate', 'green']}
            label={rawMaterialExtraction[1].emissions.toString() + '%'}
          />
        </Card>

        <Card className="max-w-sm flex flex-col items-center">
          <Title>Manufacturing</Title>
          <DonutChart
            className="mt-6"
            data={manufacturing}
            category="emissions"
            index="name"
            colors={['slate', 'green']}
            label={manufacturing[1].emissions.toString() + '%'}
          />
        </Card>

        <Card className="max-w-sm flex flex-col items-center">
          <Title>Transportation:</Title>
          <DonutChart
            className="mt-6"
            data={transportation}
            category="emissions"
            index="name"
            colors={['slate', 'green']}
            label={transportation[1].emissions.toString() + '%'}
          />
        </Card>

        <Card className="max-w-sm flex flex-col items-center">
          <Title>Operations</Title>
          <DonutChart
            className="mt-6"
            data={operations}
            category="emissions"
            index="name"
            colors={['slate', 'green']}
            label={operations[1].emissions.toString() + '%'}
          />
        </Card>

        <Card className="max-w-sm flex flex-col items-center">
          <Title>Usage</Title>
          <DonutChart
            className="mt-6"
            data={usage}
            category="emissions"
            index="name"
            colors={['slate', 'green']}
            label={usage[1].emissions.toString() + '%'}
          />
        </Card>

        <Card className="max-w-sm flex flex-col items-center">
          <Title>Waste:</Title>
          <DonutChart
            className="mt-6"
            data={waste}
            category="emissions"
            index="name"
            colors={['slate', 'green']}
            label={waste[1].emissions.toString() + '%'}
          />
        </Card>


      </div>
      <Card className="w-full mx-auto mt-5">
        <Title className="text-center">Green Glimpse Percentage (GGP)</Title>
        <Flex>
          <Text>0%</Text>
          <Text>100%</Text>
        </Flex>
        <ProgressBar value={58} color="teal" className="mt-3" />
      </Card>
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
