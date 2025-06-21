"use client";

import CodeEditor from "@/components/codeEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const difficultyStyle = {
  Easy: "text-green-400 font-semibold",
  Medium: "text-blue-400 font-semibold",
  Hard: "text-red-400 font-semibold",
};

export default function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = React.use(params);
  type Difficulty = "Easy" | "Medium" | "Hard";
  type Problem = {
    title: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    difficulty: Difficulty;
    examples: Array<{ input: string; output: string }>;
  };
  const [problem, setProblem] = useState<Problem | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/getProblem?problemId=${problemId}`);
        if (!res.ok) throw new Error("Failed to fetch problem");
        setProblem(await res.json());
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };
    fetchProblem();
  }, [problemId]);

  return (
    <div className="bg-black min-h-screen text-white">
      <div className=" top-0 left-0 w-full z-50 p-4">
        <Link
          href={"/problems"}
          className=" top-4 left-4 text-yellow-500 hover:text-white "
        >
          {<ArrowLeft />}
        </Link>
      </div>
      {problem ? (
        <div className="flex flex-col lg:flex-row h-full">
          <aside className="lg:w-1/2 lg:border-r border-gray-800 p-6 overflow-y-auto h-screen">
            <h1 className="text-3xl font-bold text-yellow-500 mb-4">
              {problem.title}
              <span
                className={`p-1 ml-4 rounded-md text-[20px] border border-slate-800 ${
                  difficultyStyle[problem.difficulty]
                }`}
              >
                {problem.difficulty}
              </span>
            </h1>
            <p className="text-gray-300 mb-6">{problem.description}</p>

            <h2 className="font-semibold text-lg mt-4 text-gray-200">
              Input Format:
            </h2>
            <pre className="whitespace-pre-wrap text-gray-400">
              {problem.inputFormat}
            </pre>

            <h2 className="font-semibold text-lg mt-4 text-gray-200">
              Output Format:
            </h2>
            <pre className="whitespace-pre-wrap text-gray-400">
              {problem.outputFormat}
            </pre>

            <h2 className="font-semibold text-lg mt-4 text-gray-200">
              Constraints:
            </h2>
            <pre className="whitespace-pre-wrap text-gray-400">
              {problem.constraints}
            </pre>

            <h2 className="font-semibold text-lg mt-6 mb-2 text-gray-200">
              Examples
            </h2>
            {problem.examples?.map(
              (ex: { input: string; output: string }, idx: number) => (
                <div
                  key={idx}
                  className="mb-4 border border-gray-700 rounded-md overflow-hidden"
                >
                  <div className="px-4 py-2 bg-gray-800 text-sm text-gray-400">
                    Input
                  </div>
                  <pre className="px-4 py-2 bg-gray-900 text-sm">
                    {ex.input}
                  </pre>
                  <div className="px-4 py-2 bg-gray-800 text-sm text-gray-400">
                    Output
                  </div>
                  <pre className="px-4 py-2 bg-gray-900 text-sm">
                    {ex.output}
                  </pre>
                </div>
              )
            )}
          </aside>

          <main className="lg:w-1/2 p-6 overflow-y-auto h-screen">
            <CodeEditor examples={problem.examples} problemId={problemId} />
          </main>
        </div>
      ) : (
        <div className="p-10 text-gray-500 animate-pulse">Loading problem…</div>
      )}
    </div>
  );
}
