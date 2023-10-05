'use client';

import { LineChart, Card, Flex, Button, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

export default function LineChartDiagram() {
  //const [chartData, setChartData] = useState([]);
  const [timeline, setTimeline] = useState<String[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState<number[]>([]);

  useEffect(() => {
    getLastNTimeUnits(10, 'months');
  }, []);

  function getLastNTimeUnits(n: number, unit: string) {
    const currentDate = new Date();
    const result = [];

    for (let i = 0; i < n; i++) {
      switch (unit) {
        case 'months':
          currentDate.setMonth(currentDate.getMonth() - 1);
          result.push(
            currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric'
            })
          );
          break;
        case 'days':
          currentDate.setDate(currentDate.getDate() - 1);
          result.push(currentDate.toLocaleDateString());
          break;
        case 'minutes':
          currentDate.setMinutes(currentDate.getMinutes() - 1);
          result.push(currentDate.toLocaleTimeString());
          break;
        case 'seconds':
          currentDate.setSeconds(currentDate.getSeconds() - 10);
          result.push(currentDate.toLocaleTimeString());
          break;
      }
    }
    setTimeline(result);
  }

  // Randomly adjust a given value within a range of 10 units.
  function randomize(base: number): number {
    return base + Math.floor(Math.random() * 10);
  }

  const chartdata: any = [];
  for (let i = 0; i < 10; i++) {
    chartdata.push({
      date: timeline[i],
      'Raw Material Extraction': randomize(79),
      Manufacturing: randomize(70),
      Transportation: randomize(87),
      Operations: randomize(53),
      Usage: randomize(67),
      Waste: randomize(35)
    });
  }

  return (
    <Card className="w-full mx-auto my-5">
      <Flex>
        <Title className="text-3xl">GGP chart</Title>
        <div className="flex space-x-4">
          <Button onClick={() => getLastNTimeUnits(10, 'months')}>Month</Button>
          <Button onClick={() => getLastNTimeUnits(10, 'days')}>Days</Button>
          <Button onClick={() => getLastNTimeUnits(10, 'minutes')}>
            Minutes
          </Button>
          <Button onClick={() => getLastNTimeUnits(10, 'seconds')}>
            Seconds
          </Button>
        </div>
      </Flex>
      <LineChart
        className="mt-5"
        data={chartdata}
        index="date"
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
  );
}
