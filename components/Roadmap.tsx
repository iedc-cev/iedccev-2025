"use client";

import events from "../data/event";
import { format } from "date-fns";

const icons = ["🎤", "💻", "🛠️", "📢"];

const Roadmap = () => {
  const now = new Date();

  return (
    // <div className="bg-gradient-to-br from-pink-50 to-blue-100 p-10 rounded-xl shadow-xl max-w-full overflow-x-auto">
    //   <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">
    //     🗺️ IEDC Cartoon Roadmap
    //   </h2>

    //   <div className="relative h-[300px] w-[1600px] mx-auto">
    //     {/* Cartoon Wavy Road using SVG */}
    //     <svg
    //       className="absolute top-[130px] left-0 w-full h-40 z-0"
    //       viewBox="0 0 1600 200"
    //       fill="none"
    //     >
    //       <path
    //         d="M 0 100 Q 200 0 400 100 T 800 100 T 1200 100 T 1600 100"
    //         stroke="url(#gradientRoad)"
    //         strokeWidth="24"
    //         strokeLinecap="round"
    //         fill="transparent"
    //       />
    //       <defs>
    //         <linearGradient id="gradientRoad" x1="0" y1="0" x2="1600" y2="0">
    //           <stop offset="0%" stopColor="#f472b6" />
    //           <stop offset="100%" stopColor="#8b5cf6" />
    //         </linearGradient>
    //       </defs>
    //     </svg>

    //     {/* Checkpoints */}
    //     {events.map((event, index) => {
    //       const date = new Date(event.datetime);
    //       const isCompleted = date < now;
    //       const icon = icons[index] || "⭐";

    //       const x = 100 + index * 320;
    //       const y = index % 2 === 0 ? 40 : 180;

    //       return (
    //         <div
    //           key={event.id}
    //           className="absolute w-52 text-center z-10"
    //           style={{ left: x, top: y }}
    //         >
    //           <div className="text-5xl drop-shadow-lg">{icon}</div>
    //           <div
    //             className={`mt-2 rounded-xl border-4 px-4 py-2 text-sm shadow-lg ${
    //               isCompleted
    //                 ? "bg-green-200 border-green-500 text-green-900"
    //                 : "bg-yellow-100 border-yellow-400 text-yellow-800"
    //             }`}
    //           >
    //             <p className="font-bold">{event.title}</p>
    //             <p className="text-xs">{format(date, "PPpp")}</p>
    //             <p>{isCompleted ? "✅ Completed" : "⏳ Upcoming"}</p>
    //           </div>
    //         </div>
    //       );
    //     })}

    //     {/* Start and Finish Icons */}
    //     <div className="absolute left-0 top-[105px] text-5xl">🚀</div>
    //     <div className="absolute right-0 top-[105px] text-5xl">🏁</div>
    //   </div>
    // </div>
    <div>hello world</div>
  );
};

export default Roadmap;
