"use client";

import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
  createdAt?: string;
  code?: string;
}

export default function Dashboard() {
  const user = useUser();
  const name = user.user?.fullName;

  const [totalProblems, setTotalProblems] = React.useState<Problem[]>([]);
  const [solvedProblems, setSolvedProblems] = React.useState<Problem[]>([]);

  const [isOpen, setIsOpen] = React.useState(false);

  const [openedProblem, setOpenedProblem] = React.useState<Problem | null>(
    null
  );

  useEffect(() => {
    const fetchTotalProblems = async () => {
      try {
        const response = await fetch("/api/getProblems");
        if (!response.ok) throw new Error("Failed to fetch total problems");
        const data = await response.json();
        setTotalProblems(data);
      } catch (error) {
        console.error("Error fetching total problems:", error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const response = await fetch("/api/solvedProblem");
        if (!response.ok) throw new Error("Failed to fetch solved problems");
        const data = await response.json();

        interface SolvedProblemEntry {
          problemId: Problem;
          createdAt?: string;
          code?: string;
        }

        interface ExtractedProblem extends Problem {
          createdAt?: string;
          code?: string;
        }

        const extracted: ExtractedProblem[] = (data as SolvedProblemEntry[]).map((entry: SolvedProblemEntry): ExtractedProblem => ({
          ...entry.problemId,
          createdAt: entry.createdAt,
          code: entry.code,
        }));

        setSolvedProblems(extracted);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    fetchTotalProblems();
    fetchSolvedProblems();
  }, []);

  const easyCount = solvedProblems.filter(
    (p) => p.difficulty === "Easy"
  ).length;
  const mediumCount = solvedProblems.filter(
    (p) => p.difficulty === "Medium"
  ).length;
  const hardCount = solvedProblems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const problemId = e.currentTarget.textContent;
    const problem = solvedProblems.find((p) => p.title === problemId);
    if (problem) {
      setOpenedProblem(problem);
      setIsOpen(true);
    }
  }

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

        <div className="grid sm:grid-cols-4 sm:grid-rows-1   gap-4 p-5">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-yellow-500 text-3xl font-bold">
                {solvedProblems.length}
              </span>
              /{totalProblems.length}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Total Solved</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-green-500 text-3xl font-bold">
                {easyCount}
              </span>
              /{totalProblems.filter((p) => p.difficulty === "Easy").length}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Easy</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-blue-500 text-3xl font-bold">
                {mediumCount}
              </span>
              /{totalProblems.filter((p) => p.difficulty === "Medium").length}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Medium</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-gray-400">
              <span className="text-red-500 text-3xl font-bold">
                {hardCount}
              </span>
              /{totalProblems.filter((p) => p.difficulty === "Hard").length}
            </h1>
            <p className="text-gray-500 text-xl font-medium">Hard</p>
          </div>
        </div>

        <div>
          <div className="p-5">
            <h1 className="text-3xl text-white">Solved Problems</h1>
          </div>
          <div className=" gap-4 p-5">
            {solvedProblems.map((problem) => (
              <div
                key={problem._id}
                className="p-6 bg-gray-800 rounded-lg shadow-lg w-full flex justify-between mb-1"
              >
                <button
                  onClick={handleClick}
                  className="text-xl text-yellow-500 font-medium hover:text-yellow-400 hover:underline cursor-pointer"
                >
                  {problem.title}
                </button>
                <p className="text-sm text-gray-400">
                  {problem.createdAt &&
                    new Date(problem.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {solvedProblems.length === 0 && (
              <div className="col-span-3 p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-gray-400 text-center">
                  No problems solved yet.
                </h1>
              </div>
            )}

            {isOpen && solvedProblems.length > 0 && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
                  <h2 className="text-xl text-yellow-500 font-medium mb-4">
                    {openedProblem?.title}
                  </h2>

                  <div className="max-h-96 overflow-y-auto overflow-x-auto scroll-smooth rounded bg-gray-900 p-4">
                    <pre className="text-gray-400 whitespace-pre-wrap">
                      {openedProblem?.code}
                    </pre>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cutrsor-pointer "
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
