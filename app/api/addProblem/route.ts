import connectDb from "@/lib/db";
import problemModel from "@/models/problems";
import { NextRequest } from "next/server";

function parseExamples(raw: string) {
  const exampleBlocks = raw
    .split(/input:/i)
    .map((block) => block.trim())
    .filter(Boolean);

  return exampleBlocks.map((block) => {
    const [inputPart, outputPart] = block
      .split(/output:/i)
      .map((s) => s.trim());
    return { input: inputPart, output: outputPart };
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();

    const {
      title,
      description,
      inputFormat,
      outputFormat,
      constraints,
      examples,
      difficulty,
      tags,
    } = body;

    if (
      !title ||
      !description ||
      !inputFormat ||
      !outputFormat ||
      !constraints ||
      !examples ||
      !difficulty ||
      !tags
    ) {
      return new Response("All fields are required", { status: 400 });
    }

    const existingProblem = await problemModel.findOne({ title });
    if (existingProblem) {
      return new Response("Problem already exists", { status: 409 });
    }

    const parsedExamples = parseExamples(examples);

    await problemModel.create({
      title,
      description,
      inputFormat,
      outputFormat,
      constraints,
      examples: parsedExamples,
      difficulty,
      tags: tags.map((tag: string) => tag.trim()),
    });

    return new Response("Problem added successfully", { status: 200 });
  } catch (error) {
    console.error("Error adding problem:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
