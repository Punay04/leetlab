"use client";

import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

export default function Dashboard() {
  const user = useUser();
  const name = user.user?.fullName;

  const [totalProblems, setTotalProblems] = React.useState([]);
  const [easyProblems, setEasyProblems] = React.useState(0);
  const [mediumProblems, setMediumProblems] = React.useState(0);
  const [hardProblems, setHardProblems] = React.useState(0);
  const [solvedProblems, setSolvedProblems] = React.useState(0);

  useEffect(() => {
    const fetchTotalProblems = async () => {
      try {
        const response = await fetch("/api/getProblems");
        if (!response.ok) throw new Error("Failed to fetch total problems");
        const data = await response.json();
        setTotalProblems(data.length);

        const easyCount = data.filter(
          (problem) => problem.difficulty === "Easy"
        ).length;
        const mediumCount = data.filter(
          (problem) => problem.difficulty === "Medium"
        ).length;
        const hardCount = data.filter(
          (problem) => problem.difficulty === "Hard"
        ).length;
        setEasyProblems(easyCount);
        setMediumProblems(mediumCount);
        setHardProblems(hardCount);
      } catch (error) {
        console.error("Error fetching total problems:", error);
      }
    };

    fetchTotalProblems();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="mt-8">
        <div className="p-5">
          <h1 className="text-3xl text-white">
            Welcome to your dashboard{" "}
            <span className="text-yellow-500 font-bold">{name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-4 grid-rows-1 gap-4 p-5">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-yellow-500 mr-50 text-3xl font-bold">
                0
              </span>
              /{totalProblems}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Total Solved</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-green-500 mr-50 text-3xl font-bold">0</span>
              /{easyProblems}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Easy</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-blue-500 mr-50 text-3xl font-bold">0</span>
              /{mediumProblems}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Medium</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-red-500 mr-50 text-3xl font-bold">0</span>
              /{hardProblems}
            </h1>
            <p className="text-gray-500 text-xl font-medium-white">Hard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
