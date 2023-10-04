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
const transportationPercent = 50;
const wastePercent = 60;

const rawMaterialExtraction = [
  {
    name: 'Emission source',
    emissions: 100 - rawMaterialExtractionPercent
  },
  {
    name: 'Renewable source',
    emissions: rawMaterialExtractionPercent
  }
];

const transportation = [
  {
    name: 'Emission source',
    emissions: 100 - transportationPercent
  },
  {
    name: 'Renewable source',
    emissions: transportationPercent
  }
];

const waste = [
  {
    name: 'Emission source',
    emissions: 100 - wastePercent
  },
  {
    name: 'Renewable source',
    emissions: wastePercent
  }
];

const chartdata = [
  {
    month: 'May',
    "Raw Material Extraction": 50,
    Transportation: 64,
    Waste: 70
  },
  {
    month: 'June',
    "Raw Material Extraction": 60,
    Transportation: 53,
    Waste: 65
  },
  {
    month: 'July',
    "Raw Material Extraction": 75,
    Transportation: 56,
    Waste: 58
  },
  {
    month: 'August',
    "Raw Material Extraction": 70,
    Transportation: 48,
    Waste: 55
  },
  {
    month: 'September',
    "Raw Material Extraction": 60,
    Transportation: 45,
    Waste: 50
  }
];

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
          <Text>45%</Text>
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
          categories={['Raw Material Extraction', 'Transportation', 'Waste']}
          colors={['emerald', 'yellow', 'red']}
          yAxisWidth={40}
          minValue={40}
          maxValue={80}
        />
      </Card>
    </main>
  );
}
