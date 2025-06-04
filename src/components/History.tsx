
// // // import React, { useEffect, useState } from 'react';

// // // interface HistoryItem {
// // //   _id: string;
// // //   userId: string;
// // //   query: string;
// // //   response: string;
// // //   type: 'summary' | 'qa';
// // //   createdAt: string;
// // // }

// // // const History: React.FC = () => {
// // //   const [summaries, setSummaries] = useState<HistoryItem[]>([]);
// // //   const [qas, setQas] = useState<HistoryItem[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   useEffect(() => {
// // //     const fetchHistory = async () => {
// // //       setLoading(true);
// // //       setError(null);
// // //       try {
// // //         const userStr = localStorage.getItem('user');
// // //         if (!userStr) {
// // //           setError('User not found');
// // //           return;
// // //         }

// // //         const user = JSON.parse(userStr);
// // //         const res = await fetch(`http://localhost:5000/api/history/${user.userId}`);
// // //         const data = await res.json();
// // //         console.log('Fetched history:', data);

// // //         const summaries = data.filter((item: HistoryItem) => item.type === 'summary');
// // //         const qas = data.filter((item: HistoryItem) => item.type === 'qa');

// // //         setSummaries(summaries);
// // //         setQas(qas);
// // //       } catch (err: any) {
// // //         console.error('Error fetching history:', err);
// // //         setError('Failed to fetch history');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchHistory();
// // //   }, []);

// // //   if (loading) return <p className="text-center mt-10">Loading...</p>;
// // //   if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;

// // //   return (
// // //     <div className="p-4 max-w-4xl mx-auto">
// // //       <h1 className="text-2xl font-bold mb-6 text-center">History</h1>

// // //       <section className="mb-10">
// // //         <h2 className="text-xl font-semibold mb-3">Summary</h2>
// // //         {summaries.length === 0 ? (
// // //           <p>No summary history yet.</p>
// // //         ) : (
// // //           <ul className="space-y-4">
// // //             {summaries.map((item) => (
// // //               <li key={item._id} className="bg-gray-100 p-4 rounded-lg shadow">
// // //                 <p className="font-medium text-sm text-gray-700">Query:</p>
// // //                 <p className="mb-2">{item.query}</p>
// // //                 <p className="font-medium text-sm text-gray-700">Summary:</p>
// // //                 <p>{item.response}</p>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </section>

// // //       <section>
// // //         <h2 className="text-xl font-semibold mb-3">Question & Answer</h2>
// // //         {qas.length === 0 ? (
// // //           <p>No QA history yet.</p>
// // //         ) : (
// // //           <ul className="space-y-4">
// // //             {qas.map((item) => (
// // //               <li key={item._id} className="bg-gray-100 p-4 rounded-lg shadow">
// // //                 <p className="font-medium text-sm text-gray-700">Question:</p>
// // //                 <p className="mb-2">{item.query}</p>
// // //                 <p className="font-medium text-sm text-gray-700">Answer:</p>
// // //                 <p>{item.response}</p>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </section>
// // //     </div>
// // //   );
// // // };


// // // export default History;


// // import React, { useEffect, useState } from 'react';
// // import { Clock, FileText, HelpCircle } from 'lucide-react';

// // interface HistoryItem {
// //   _id: string;
// //   userId: string;
// //   query: string;
// //   response: string;
// //   type: 'summary' | 'qa';
// //   createdAt: string;
// // }

// // const History: React.FC = () => {
// //   const [summaries, setSummaries] = useState<HistoryItem[]>([]);
// //   const [qas, setQas] = useState<HistoryItem[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const userStr = localStorage.getItem('user');
// //         if (!userStr) {
// //           setError('User not found');
// //           return;
// //         }

// //         const user = JSON.parse(userStr);
// //         const res = await fetch(`http://localhost:5000/api/history/${user.userId}`);
// //         const data = await res.json();
// //         console.log('Fetched history:', data);

// //         const summaries = data.filter((item: HistoryItem) => item.type === 'summary');
// //         const qas = data.filter((item: HistoryItem) => item.type === 'qa');

// //         setSummaries(summaries);
// //         setQas(qas);
// //       } catch (err: any) {
// //         console.error('Error fetching history:', err);
// //         setError('Failed to fetch history');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchHistory();
// //   }, []);

// //   if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;
// //   if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;

// //   return (
// //     <div className="p-6 max-w-5xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-10 text-center">🕘 Your Activity History</h1>

// //       {/* Summary Section */}
// //       <section className="mb-12">
// //         <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
// //           <FileText className="w-6 h-6 text-blue-500" /> Summaries
// //         </h2>
// //         {summaries.length === 0 ? (
// //           <p className="text-gray-500 italic">No summary history yet.</p>
// //         ) : (
// //           <div className="grid gap-4">
// //             {summaries.map((item) => (
// //               <div key={item._id} className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition">
// //                 <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
// //                   <Clock className="w-4 h-4" />
// //                   {new Date(item.createdAt).toLocaleString()}
// //                 </p>
// //                 <p className="font-medium text-gray-700">📝 Query:</p>
// //                 <p className="mb-3 text-gray-800">{item.query}</p>
// //                 <p className="font-medium text-gray-700">✅ Summary:</p>
// //                 <p className="text-gray-800">{item.response}</p>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* QA Section */}
// //       <section>
// //         <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
// //           <HelpCircle className="w-6 h-6 text-purple-500" /> Questions & Answers
// //         </h2>
// //         {qas.length === 0 ? (
// //           <p className="text-gray-500 italic">No Q&A history yet.</p>
// //         ) : (
// //           <div className="grid gap-4">
// //             {qas.map((item) => (
// //               <div key={item._id} className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition">
// //                 <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
// //                   <Clock className="w-4 h-4" />
// //                   {new Date(item.createdAt).toLocaleString()}
// //                 </p>
// //                 <p className="font-medium text-gray-700">❓ Question:</p>
// //                 <p className="mb-3 text-gray-800">{item.query}</p>
// //                 <p className="font-medium text-gray-700">💡 Answer:</p>
// //                 <p className="text-gray-800">{item.response}</p>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // };

// // export default History;

// import React, { useEffect, useState } from 'react';
// import { Clock, FileText, HelpCircle } from 'lucide-react';

// interface HistoryItem {
//   _id: string;
//   userId: string;
//   query: string;
//   response: string;
//   type: 'summary' | 'qa';
//   createdAt: string;
// }

// const History: React.FC = () => {
//   const [summaries, setSummaries] = useState<HistoryItem[]>([]);
//   const [qas, setQas] = useState<HistoryItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [view, setView] = useState<'summary' | 'qa'>('summary'); // toggle view

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const userStr = localStorage.getItem('user');
//         if (!userStr) {
//           setError('User not found');
//           return;
//         }

//         const user = JSON.parse(userStr);
//         const res = await fetch(`http://localhost:5000/api/history/${user.userId}`);
//         const data = await res.json();
//         console.log('Fetched history:', data);

//         setSummaries(data.filter((item: HistoryItem) => item.type === 'summary'));
//         setQas(data.filter((item: HistoryItem) => item.type === 'qa'));
//       } catch (err: any) {
//         console.error('Error fetching history:', err);
//         setError('Failed to fetch history');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const renderItems = (items: HistoryItem[], label: string) => (
//     <div className="grid gap-4">
//       {items.map((item) => (
//         <div
//           key={item._id}
//           className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition"
//         >
//           <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
//             <Clock className="w-4 h-4" />
//             {new Date(item.createdAt).toLocaleString()}
//           </p>
//           <p className="font-medium text-gray-700">
//             {label === 'summary' ? '📝 Query:' : '❓ Question:'}
//           </p>
//           <p className="mb-3 text-gray-800">{item.query}</p>
//           <p className="font-medium text-gray-700">
//             {label === 'summary' ? '✅ Summary:' : '💡 Answer:'}
//           </p>
//           <p className="text-gray-800">{item.response}</p>
//         </div>
//       ))}
//     </div>
//   );

//   if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;
//   if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">🕘 Your History</h1>

//       {/* Toggle Buttons */}
//       <div className="flex justify-center gap-4 mb-10">
//         <button
//           onClick={() => setView('summary')}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             view === 'summary'
//               ? 'bg-green-600 text-white shadow'
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           <FileText className="inline-block w-4 h-4 mr-1" />
//           Summary
//         </button>
//         <button
//           onClick={() => setView('qa')}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             view === 'qa'
//               ? 'bg-green-600 text-white shadow'
//               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//           }`}
//         >
//           <HelpCircle className="inline-block w-4 h-4 mr-1" />
//           Q&A
//         </button>
//       </div>

//       {/* Conditionally Render Based on View */}
//       {view === 'summary' ? (
//         summaries.length === 0 ? (
//           <p className="text-center text-gray-500 italic">No summary history yet.</p>
//         ) : (
//           renderItems(summaries, 'summary')
//         )
//       ) : qas.length === 0 ? (
//         <p className="text-center text-gray-500 italic">No Q&A history yet.</p>
//       ) : (
//         renderItems(qas, 'qa')
//       )}
//     </div>
//   );
// };

// export default History;



import React, { useEffect, useState } from 'react';
import { Clock, FileText, HelpCircle } from 'lucide-react';

interface HistoryItem {
  _id: string;
  userId: string;
  query: string;
  response: string;
  type: 'summary' | 'qa';
  createdAt: string;
}

const History: React.FC = () => {
  const [summaries, setSummaries] = useState<HistoryItem[]>([]);
  const [qas, setQas] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'summary' | 'qa'>('summary');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          setError('User not found');
          return;
        }

        const user = JSON.parse(userStr);
        const res = await fetch(`http://localhost:5000/api/history/${user.userId}`);
        const data = await res.json();

        setSummaries(data.filter((item: HistoryItem) => item.type === 'summary'));
        setQas(data.filter((item: HistoryItem) => item.type === 'qa'));
      } catch (err: any) {
        console.error('Error fetching history:', err);
        setError('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const renderItems = (items: HistoryItem[], label: string) => (
    <div className="grid gap-4 ">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition dark:bg-gray-700"
        >
          <p className="text-sm text-gray-500 flex items-center gap-1 mb-2 dark:text-white">
            <Clock className="w-4 h-4" />
            {new Date(item.createdAt).toLocaleString()}
          </p>
          <p className="font-medium text-gray-700 dark:text-white">
            {label === 'summary' ? '📝 Query:' : '❓ Question:'}
          </p>
          <p className="mb-3 text-gray-800 dark:text-white">{item.query}</p>
          <p className="font-medium text-gray-700 dark:text-white">
            {label === 'summary' ? '✅ Summary:' : '💡 Answer:'}
          </p>
          <p className="text-gray-800 dark:text-white">{item.response}</p>
        </div>
      ))}
    </div>
  );

  if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-6 max-w-5xl mx-auto w-full ">
        <h1 className="text-3xl font-bold mb-6 text-center">🕘 Your History</h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10 ">
          <button
            onClick={() => setView('summary')}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-1 ${
              view === 'summary'
                ? 'bg-green-600 text-white shadow '
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4 " />
            Summary
          </button>
          <button
            onClick={() => setView('qa')}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-1 ${
              view === 'qa'
                ? 'bg-green-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Q&A
          </button>
        </div>

        {/* Render based on selected view */}
        {view === 'summary' ? (
          summaries.length === 0 ? (
            <p className="text-center text-gray-500 italic">You haven't generated any summaries yet. Start exploring legal documents to see them here!</p>
          ) : (
            renderItems(summaries, 'summary')
          )
        ) : qas.length === 0 ? (
          <p className="text-center text-gray-500 italic">No questions asked yet. Use our Q&A tool and your history will appear here!</p>
        ) : (
          renderItems(qas, 'qa')
        )}
      </div>
    </div>
  );
};

export default History;
