"use client";

import events from "../data/event";
import { format } from "date-fns";

const Roadmap = () => {
  const now = new Date();

  return (
    <div className="bg-gray-100 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
        📍 IEDC Event Roadmap
      </h2>

      <div className="relative border-l-4 border-dashed border-purple-500 ml-6 md:ml-10">
        {events.map((event, index) => {
          const date = new Date(event.datetime);
          const isCompleted = date < now;

          return (
            <div
              key={event.id}
              className="relative pl-8 md:pl-12 mb-12 group"
            >
              {/* Dot */}
              <div className="absolute -left-4 top-2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-md" />

              {/* Card */}
              <div
                className={`bg-white rounded-xl shadow-lg px-6 py-4 w-full md:w-2/3 transition-all border-l-4 ${
                  isCompleted
                    ? "border-green-400"
                    : "border-yellow-400"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Upcoming"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(date, "PP")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="text-sm text-gray-600">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
