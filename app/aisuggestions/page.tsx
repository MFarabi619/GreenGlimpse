import {
  Card,
  Title,
  Text,
  DonutChart,
  ProgressBar,
  Flex,
  LineChart,
  BadgeDelta,
  Button
} from '@tremor/react';
import AiSuggestions from '../components/aiSuggestions';

export default async function IndexPage(data: string[]) {
  return (
    <main className="px-4 md:px-10 mx-auto max-w-7xl flex flex-col items-center">
      <AiSuggestions />
    </main>
  );
}
