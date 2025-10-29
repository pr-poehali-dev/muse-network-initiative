import { useState } from 'react';
import Layout from '@/components/Layout';

export default function TestForms() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTests = async () => {
    setTesting(true);
    setResults(null);

    try {
      const response = await fetch('https://functions.poehali.dev/09643959-b383-4936-b05d-ff50dee69d64', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults({ error: String(error) });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Тестирование форм</h1>
        
        <button
          onClick={runTests}
          disabled={testing}
          className="px-6 py-3 bg-[#d4af37] text-black font-bold rounded-lg hover:bg-[#b8941f] disabled:opacity-50"
        >
          {testing ? 'Тестирование...' : 'Запустить тестирование форм'}
        </button>

        {results && (
          <div className="mt-8 p-6 bg-gray-900 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Результаты тестирования:</h2>
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
