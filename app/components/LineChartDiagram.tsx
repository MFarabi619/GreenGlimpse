'use client';

import { LineChart, Card, Flex, Button, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

export default function LineChartDiagram(chartData: any) {
  const [timeline, setTimeline] = useState<String[]>([]);

  useEffect(() => {
    setTimeline(getLastNTimeUnits(10, 'months'));
  }, []);

  function getLastNTimeUnits(n: number, unit: string): string[] {
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
    return result;
  }
  return (
    <Card className="w-full mx-auto my-5">
      <Flex>
        <Title className="text-3xl">GGP chart</Title>
        <div className="flex space-x-4">
          <Button onClick={() => getLastNTimeUnits(10, 'year')}>Year</Button>
          <Button>Month</Button>
          <Button>Day</Button>
        </div>
      </Flex>
      <LineChart
        className="mt-5"
        data={chartData}
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
  );
}
