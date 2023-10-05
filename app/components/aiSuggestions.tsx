"use client"
import React, { FC, useState, useEffect } from 'react';
import { Card } from '@tremor/react';

interface PageProps {

}

const App: FC<PageProps> = ({}) => {
  const [suggestions, setSuggestions] = useState<Array<{name: string, cost: number, grant: number, scoreImpact: number}>>([]);
  const [showResults, setShowResults] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const grants = ['Kanata Office Solar Panel Installation', 'Replace Near End-of-Life Fleet Vehicles ID101-ID110'];

  useEffect(() => {
    if (showResults && typewriterIndex < suggestions.length) {
      setTimeout(() => {
        setTypewriterIndex(typewriterIndex + 1);
      }, 500); // 500ms delay for typewriter effect
    }
  }, [showResults, typewriterIndex]);

  const generateResults = () => {
    const newSuggestions = [
      { name: 'Plant Trees in Toronto Park', cost: 200, grant: 0, scoreImpact: 5 },
      { name: 'Kanata Office Solar Panel Installation', cost: 5000, grant: 2000, scoreImpact: 20 },
      { name: 'Water Recycling in Vancouver Facility', cost: 100, grant: 0, scoreImpact: 2 },
      { name: 'Replace Near End-of-Life Fleet Vehicles ID101-ID110', cost: 30000, grant: 5000, scoreImpact: 15 },
      { name: 'Implement Recycling Program in San Francisco Office', cost: 50, grant: 0, scoreImpact: 1 }
    ];

    newSuggestions.sort((a, b) => {
      if (grants.includes(a.name) && !grants.includes(b.name)) {
        return -1;
      }
      if (!grants.includes(a.name) && grants.includes(b.name)) {
        return 1;
      }
      return 0;
    });

    setSuggestions(newSuggestions);
    setShowResults(true);
  };

  return (
    <div className="bg-gray-900 text-white w-full my-5">
      <Card className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-green-500 mb-4">GreenGlimpseAI</h1>
        <button onClick={generateResults} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Generate Results
        </button>
        {showResults && (
          <ol className="list-decimal list-inside mt-4">
            {suggestions.slice(0, typewriterIndex).map((suggestion, index) => (
              <li key={index} className="my-2">
                {suggestion.name} - Cost: ${suggestion.cost}, Grant: ${suggestion.grant}, GreenGlimpse Score Impact: +{suggestion.scoreImpact} {grants.includes(suggestion.name) && <span className="text-green-400">(Government Grant Available)</span>}
              </li>
            ))}
          </ol>
        )}
      </Card>
    </div>
  );
};

export default App;
