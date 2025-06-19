"use client";
import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Ref, useEffect, useRef } from "react";

const AddProblem = () => {
  const user = useUser();
  const email = user.user?.emailAddresses[0]?.emailAddress;

  const router = useRouter();

  useEffect(() => {
    if (email && email !== "9thbpunaykukreja@gmail.com") {
      router.push("/problems");
    }
  }, [email, router]);

  interface ProblemForm {
    title: Ref<HTMLInputElement> | null;
    description: Ref<HTMLTextAreaElement> | null;
    inputFormat: Ref<HTMLTextAreaElement> | null;
    outputFormat: Ref<HTMLTextAreaElement> | null;
    constraints: Ref<HTMLTextAreaElement> | null;
    examples: Ref<HTMLTextAreaElement> | null;
    difficulty: Ref<HTMLSelectElement> | null;
    tags: Ref<HTMLInputElement> | null;
  }

  const formRef = useRef<ProblemForm>({
    title: null,
    description: null,
    inputFormat: null,
    outputFormat: null,
    constraints: null,
    examples: null,
    difficulty: null,
    tags: null,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="bg-black h-full m-0 p-0">
      <Navbar />
      <div className="border border-slate-800 p-6 mt-10  mx-10 rounded-md min-w-[50%] min-h-[80%]">
        <h1 className="text-3xl text-yellow-500 font-bold">Add Problem</h1>
        <p className="text-md text-gray-400">
          Use this form to add a new coding problem to the platform.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300">Problem Title</label>
            <input
              ref={formRef.current.title}
              type="text"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              placeholder="Enter problem title"
            />
          </div>
          <div>
            <label className="block text-gray-300">Description</label>
            <textarea
              ref={formRef.current.description}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={4}
              placeholder="Enter problem description"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-300">Input Format</label>
            <textarea
              ref={formRef.current.inputFormat}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={2}
              placeholder="Describe the input format"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-300">Output Format</label>
            <textarea
              ref={formRef.current.outputFormat}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={2}
              placeholder="Describe the output format"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-300">Constraints</label>
            <textarea
              ref={formRef.current.constraints}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={2}
              placeholder="List the constraints for the problem"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-300">Examples</label>
            <textarea
              ref={formRef.current.examples}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              rows={4}
              placeholder="Provide examples of input and output"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-300">Difficulty</label>
            <select
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              ref={formRef.current.difficulty}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300">Tags</label>
            <input
              ref={formRef.current.tags}
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
