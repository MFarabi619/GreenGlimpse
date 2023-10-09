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
  const topic = 'data/iot';
  useMemo(() => {
    const newSocket = io('ec2-54-162-23-240.compute-1.amazonaws.com:80');
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
    <Card className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="grid gap-5 grid-flow-row justify-center p-8">
        <h1 className="text-2xl font-bold text-green-500 mb-4">
          Live Data Display - sub to: data/testIOT1
        </h1>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 divide-y divide-gray-700">
            <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                Value
              </th>
            </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
            {messages.map((message, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {message.key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
