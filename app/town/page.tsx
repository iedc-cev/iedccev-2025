
import Roadmap from '@/components/Roadmap';
import React from 'react'

function Page() {
  const leaderBoard = [
    { id: 1, name: 'Amal', department: 'CSE', points: 23 },
    { id: 2, name: 'Ravi', department: 'ECE', points: 30 },
    { id: 3, name: 'Megha', department: 'EEE', points: 27 },
    { id: 1, name: 'Amal', department: 'CSE', points: 23 },
    { id: 2, name: 'Ravi', department: 'ECE', points: 30 },
    { id: 3, name: 'Megha', department: 'EEE', points: 27 }
    // Add more unique entries...
  ];

  return (
    <main>
      <section className='min-h-[100vh] bg-[#06042a] text-white flex items-center justify-center'>
        <h1 className='text-8xl font-[Bangers]'>Town Vibes</h1>
      </section>

      <section className='lg:px-20 px-6 mx-auto py-10'>
        <div className='max-w-[700px] mx-auto rounded-sm overflow-hidden shadow-md'>

          {/* Header */}
          <div className='flex justify-between items-center px-4 h-12 bg-gray-800 text-white font-medium'>
            <h1 className="w-1/4 text-center">Rank</h1>
            <h1 className="w-1/4 text-center">Name</h1>
            <h1 className="w-1/4 text-center">Department</h1>
            <h1 className="w-1/4 text-center">Points</h1>
          </div>

          {/* Leaderboard Rows */}
          {leaderBoard.map((entry, index) => (
            <div
              key={entry.id}
              className='flex justify-between items-center px-4 h-12 bg-white border-b border-gray-300 text-black'
            >
              <p className="w-1/4 text-center">{index + 1}</p>
              <p className="w-1/4 text-center">{entry.name}</p>
              <p className="w-1/4 text-center">{entry.department}</p>
              <p className="w-1/4 text-center">{entry.points}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Page;
