'use client';
import React, { useEffect, useState } from 'react';
import Preloader from '@/components/preloader';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image'
function Page() {
  const [loading, setLoading] = useState(true);

  const leaderBoard = [
    {  name: 'Amarnath', department: 'CSE', points:1 },
    {  name: 'Prajith', department: 'ECE', points: 2 },
    {  name: 'Abhinav', department: 'EEE', points: 3 },
    {  name: 'Maheswar', department: 'IT', points: 4 },
    {  name: 'Abay', department: 'MCA', points: 5},
    {  name: 'Jomin', department: 'CSE', points: 6 },
    {  name: 'Sangeeth', department: 'ECE', points: 7 },
    {  name: 'Amal', department: 'EEE', points: 8 },
    {  name: 'Arjun', department: 'IT', points: 9 },
    {  name: 'ArjunK', department: 'MCA', points: 10 },
    {  name: 'Sayanth', department: 'CSE', points: 11 },
    {  name: 'Sethu', department: 'ECE', points: 12 },
    {  name: 'Ryan', department: 'EEE', points: 13 },
    {  name: 'Badshah', department: 'IT', points: 14 }
  ];
  const sortedLeaderBoard = [...leaderBoard].sort((a, b) => b.points - a.points);
  const topThree = sortedLeaderBoard.slice(0, 3);
  const remLeaderBoard=sortedLeaderBoard.slice(3,15)

  return (
    <>
        <main className='w-full min-h-screen lg:px-20 px-6 mx-auto py-10 bg-[#1a1929]'>
          <section>
            <h1 className='text-center text-white text-7xl font-[Bangers]'>LeaderBoard</h1>
            <div className='flex items-center justify-center mt-24 mb-8'>
              <div className='relative w-[450px] md:w-[560px]'>
                {/* Podium image */}
                <Image
                  src='/pod.png'
                  width={500}
                  height={100}
                  alt='podium'
                  className='w-full z-10'
                />

                {/* 🥇 First place */}
                <div className='absolute left-[40%] bottom-[98%] text-white text-lg font-medium text-center'>
                  <p>{topThree[0]?.name}</p>
                </div>

                {/* 🥈 Second place */}
                <div className='absolute left-[10%] bottom-[64%] text-white text-lg font-medium text-center'>
                  <p>{topThree[1]?.name}</p>
                </div>

                {/* 🥉 Third place */}
                <div className='absolute left-[73%] bottom-[58%] text-white text-lg font-medium text-center'>
                  <p>{topThree[2]?.name}</p>
                </div>
              </div>
            </div>

            <div className='max-w-[750px] mx-auto overflow-hidden shadow-md bg-[#292833] rounded-3xl text-white flex flex-col items-center py-6'>
              {remLeaderBoard.map((entry, index) => (
                <div
                  key={`${entry.name}-${index}`}
                  className={`flex justify-between w-[80%] items-center mb-1 border-b border-[#434242] h-12 py-10`}
                >
                  <p className="w-1/6 text-center">{index + 4}</p>
                  <p className="w-1/6 text-center">{entry.name}</p>
                  <p className="w-1/6 text-center">{entry.department}</p>
                  <p className="w-1/6 text-center">{entry.points}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
    </>
  );
}

export default Page;
