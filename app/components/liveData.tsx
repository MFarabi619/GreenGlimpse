'use client';

import { FC, useMemo, useState } from 'react';
import { Card } from '@tremor/react';
import io from 'socket.io-client';

interface pageProps {}

const App: FC<pageProps> = ({}) => {
  const [messages, setMessages] = useState<
    Array<{ key: string; value: string }>
  >([]);
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
        setMessages((prevMessages) =>
          [{ key: messageKey, value: messageValue }, ...prevMessages].slice(
            0,
            50
          )
        );
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
      socket.emit('subscribe', 'data/iot');
    }
  };
  handleSubscribe();

  return (
    <Card className={''}>
      <div className={'grid gap-5 grid-flow-row justify-center p-8'}>
        <h1 className={'text-2xl font-bold mb-4'}>
          Live Data Display - sub to: data/testIOT1
        </h1>

        <div className={'mt-4 overflow-x-auto'}>
          <table
            className={
              'min-w-full bg-white border border-gray-300 divide-y divide-gray-300'
            }
          >
            <thead className={'bg-gray-50'}>
              <tr>
                <th
                  className={
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  }
                >
                  Key
                </th>
                <th
                  className={
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  }
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody className={'bg-white divide-y divide-gray-300'}>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td className={'px-6 py-4 whitespace-nowrap'}>
                    {message.key}
                  </td>
                  <td className={'px-6 py-4 whitespace-nowrap'}>
                    {message.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default App;
