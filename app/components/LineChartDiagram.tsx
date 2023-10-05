'use client';

import { LineChart, Card, Flex, Button, Title } from '@tremor/react';
import { useEffect, useState, useMemo } from 'react';
import io from 'socket.io-client';

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

  const [messages, setMessages] = useState<any>([]);
  const [socket, setSocket] = useState<any>(null);
  const topic = 'data/testIOT1';
  useMemo(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('message', (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        const messageKey = Object.keys(parsedMessage)[3];
        const messageValue = parsedMessage[messageKey];
        setMessages((prevMessages: any) =>
          [{ key: messageKey, value: messageValue }, ...prevMessages].slice(
            0,
            50
          )
        );
        console.log(messages);
      } catch (e) {
        console.error('Error parsing message: ', e);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, ['']);

  const handleSubscribe = () => {
    if (socket) {
      socket.emit('subscribe', 'data/testIOT1');
    }
  };
  handleSubscribe();

  const chartdata: any = [];
  for (let i = 0; i < 10; i++) {
    chartdata.push({
      date: timeline[i],
      RawMaterialExtraction: messages[0].value[i],
      Manufacturing: messages[1].value[i],
      Transportation: messages[2].value[i],
      Operations: messages[3].value[i],
      Usage: messages[4].value[i],
      Waste: messages[5].value[i]
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
        minValue={30}
        maxValue={70}
      />
    </Card>
  );
}
