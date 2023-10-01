"use client";
import { FC, useState, useEffect } from 'react';
import io from 'socket.io-client';

interface PageProps {}

const App: FC<PageProps> = () => {
    const [messages, setMessages] = useState<Array<{ key: string, value: string }>>([]);
    const [topic, setTopic] = useState<string>('');
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.on('message', (message: string) => {
            try {
                const parsedMessage = JSON.parse(message);
                const messageKey = Object.keys(parsedMessage)[0];
                const messageValue = parsedMessage[messageKey];
                setMessages(prevMessages => [{ key: messageKey, value: messageValue }, ...prevMessages].slice(0, 50));
            } catch (e) {
                console.error("Error parsing message: ", e);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSubscribe = () => {
        if (socket) {
            socket.emit('subscribe', "data/testIOT1");
        }
    };

    return (
        <div className={"grid gap-5 grid-flow-row justify-center p-8"}>
            <h1 className={"text-2xl font-bold mb-4"}>Live Data Display - sub to: data/testIOT1</h1>
            <div className={"grid gap-2 grid-flow-col items-center"}>
                <label className={"font-medium"}>
                    Topic Name:
                    <input
                        className={"border ml-2 p-1"}
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </label>
                <button className={"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"} onClick={handleSubscribe}>Subscribe</button>
            </div>
            <div className={"mt-4 overflow-x-auto"}>
                <table className={"min-w-full bg-white border border-gray-300 divide-y divide-gray-300"}>
                    <thead className={"bg-gray-50"}>
                    <tr>
                        <th className={"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Key</th>
                        <th className={"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Value</th>
                    </tr>
                    </thead>
                    <tbody className={"bg-white divide-y divide-gray-300"}>
                    {messages.map((message, index) => (
                        <tr key={index}>
                            <td className={"px-6 py-4 whitespace-nowrap"}>{message.key}</td>
                            <td className={"px-6 py-4 whitespace-nowrap"}>{message.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
