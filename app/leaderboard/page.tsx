'use client';

import { FC, useEffect, useState } from 'react';
import { Card } from '@tremor/react';
import io from 'socket.io-client';
import { Flipper, Flipped } from 'react-flip-toolkit';

interface PageProps {}

const App: FC<PageProps> = () => {
  const [leaders, setLeaders] = useState<Array<{ name: string; score: number }>>([

  ]);
  const [oldLeaders, setOldLeaders] = useState<Array<{ name: string; score: number }>>([

  ]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io('ec2-54-210-140-134.compute-1.amazonaws.com:80');
    setSocket(newSocket);

    newSocket.on('message', (message: string) => {
      try {

        const parsedMessage = JSON.parse(message);
        console.log("Pared Message:",parsedMessage);
        const newScores = []
        for (let i = 0; i < 10; i++) {
          newScores.push({
            name: parsedMessage[i].name,
            score: parseInt(parsedMessage[i].score)
          })
        }
        setLeaders(newScores.sort((a, b) => b.score - a.score));
      } catch (e) {
        console.error('Error parsing message: ', e);
      }
    });

    newSocket.emit('subscribe', 'data/leaderboard');

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className={'grid gap-5 grid-flow-row justify-center p-8 bg-gray-900 text-green-300'}>
      <h1 className={'text-2xl font-bold mb-4'}>
        Leaderboard
      </h1>

      <Flipper flipKey={leaders.map(l => l.name).join('')}>
        {leaders.map((leader, index) => (
          <Flipped key={leader.name} flipId={leader.name}>
            <div>
              <Card className={'bg-gray-700 p-2 mb-2 h-12 w-[300px] flex items-center justify-between'}>
                <h2 className={'text-lg font-semibold'}>
                  {leader.name}
                </h2>
                <p className={'text-md'}>
                  Score: {leader.score}
                </p>
              </Card>
            </div>
          </Flipped>
        ))}
      </Flipper>
    </div>
  );
};

export default App;
