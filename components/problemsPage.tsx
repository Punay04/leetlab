"use client";
import React from "react";

const ProblemsPage = () => {
  const [problems, setProblems] = React.useState([]);

  React.useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("/api/getProblems");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const difficultyStyle = {
    Easy: "text-green-400 font-semibold",
    Medium: "text-blue-400 font-semibold",
    Hard: "text-red-400 font-semibold",
  };

  return (
    <div className="bg-black min-h-screen py-10 px-4 md:px-10">
      <div className="bg-gray-900 border border-slate-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-500 mb-2">
          Practice Questions
        </h1>
        <p className="text-md text-gray-400 mb-6">
          Browse and solve coding problems to improve your coding skills.
        </p>

        <div className="overflow-x-auto rounded-md">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-gray-800 text-gray-400 text-sm">
                <th className="px-4 py-3 border-b border-slate-700">Title</th>
                <th className="px-4 py-3 border-b border-slate-700">
                  Difficulty
                </th>
                <th className="px-4 py-3 border-b border-slate-700">Tags</th>
              </tr>
            </thead>
            <tbody>
              {problems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 py-6">
                    No problems available.
                  </td>
                </tr>
              ) : (
                problems.map((problem) => (
                  <tr
                    key={problem._id}
                    className="hover:bg-gray-800 transition-all duration-150"
                  >
                    <td
                      className="px-4 py-3 text-yellow-500 hover:text-yellow-400 hover:underline
                    cursor-pointer"
                      onClick={() => {
                        window.location.href = `/problems/${problem._id}`;
                      }}
                    >
                      {problem.title}
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        difficultyStyle[problem.difficulty]
                      }`}
                    >
                      {problem.difficulty}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {problem.tags.join(", ")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;
