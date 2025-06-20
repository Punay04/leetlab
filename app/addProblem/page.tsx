"use client";

import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const AddProblem = () => {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const router = useRouter();

  useEffect(() => {
    if (email && email !== "9thbpunaykukreja@gmail.com") {
      router.push("/problems");
    }
  }, [email, router]);

  // Individual refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const inputFormatRef = useRef<HTMLTextAreaElement>(null);
  const outputFormatRef = useRef<HTMLTextAreaElement>(null);
  const constraintsRef = useRef<HTMLTextAreaElement>(null);
  const examplesRef = useRef<HTMLTextAreaElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("/api/addProblem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        inputFormat: inputFormatRef.current?.value,
        outputFormat: outputFormatRef.current?.value,
        constraints: constraintsRef.current?.value,
        examples: examplesRef.current?.value, // should ideally be parsed into array of inputs/outputs
        difficulty: difficultyRef.current?.value,
        tags: tagsRef.current?.value?.split(",").map((tag) => tag.trim()), // converts to array
      }),
    });
    alert("Problem added successfully!");
    router.push("/problems");
  }

  return (
    <div className="bg-black h-full m-0 p-0">
      <Navbar />
      <div className="border border-slate-800 p-6 mt-10 mx-10 rounded-md min-w-[50%] min-h-[80%]">
        <h1 className="text-3xl text-yellow-500 font-bold">Add Problem</h1>
        <p className="text-md text-gray-400">
          Use this form to add a new coding problem to the platform.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300">Problem Title</label>
            <input
              ref={titleRef}
              type="text"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Enter problem title"
            />
          </div>

          <div>
            <label className="block text-gray-300">Description</label>
            <textarea
              ref={descriptionRef}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={4}
              placeholder="Enter problem description"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300">Input Format</label>
            <textarea
              ref={inputFormatRef}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={2}
              placeholder="Describe the input format"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300">Output Format</label>
            <textarea
              ref={outputFormatRef}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={2}
              placeholder="Describe the output format"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300">Constraints</label>
            <textarea
              ref={constraintsRef}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={2}
              placeholder="List the constraints for the problem"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300">Examples</label>
            <textarea
              ref={examplesRef}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={4}
              placeholder={`Provide examples of input and output like:\ninput: 4\\n2 7 11 15\\n9\noutput: 0 1`}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300">Difficulty</label>
            <select
              ref={difficultyRef}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300">Tags</label>
            <input
              ref={tagsRef}
              type="text"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Enter tags (comma separated)"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 font-semibold px-4 py-2 rounded-md text-black hover:bg-yellow-400 transition-all"
          >
            Submit Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
