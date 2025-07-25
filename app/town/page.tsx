import React from 'react'
import Image from 'next/image'
import CartoonJourney from '@/components/Roadmap'
import Roadmap from '@/components/Roadmap'
function page() {
  return (
    <main>
        <section className='min-h-[100vh] bg-[#06042a] text-white flex items-center justify-center'>
            <h1 className='text-8xl font-[Bangers]'>Town Vibes</h1>
        </section>
        <section className='lg:px-20 px-6'>
            <div className="max-w-7xl lg:py-20 py-8 mx-auto">
                <h1 className='text-5xl font-semibold my-4'>Town Vibez.</h1>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, qui quidem. Repellendus placeat expedita error qui, molestias necessitatibus explicabo tenetur quia cumque, praesentium ad distinctio eaque neque. Fuga, recusandae molestiae.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet magni libero, ipsam incidunt maiores voluptas repudiandae sunt voluptatum aliquid ullam? Reiciendis praesentium animi architecto? Natus tenetur nulla laboriosam qui corrupti!
                </p> */}
                <Roadmap/>
            </div>
        </section>
    </main>
  )
}

export default page
