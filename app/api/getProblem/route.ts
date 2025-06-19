import connectDb from "@/lib/db";
import problemModel from "@/models/problems";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    // Get problemId from query string
    const { searchParams } = new URL(req.url);
    const problemId = searchParams.get("problemId");

    if (!problemId) {
      return new Response("Problem ID is required", { status: 400 });
    }

    const problem = await problemModel.findById(problemId);

    if (!problem) {
      return new Response("Problem not found", { status: 404 });
    }

    return Response.json(problem); // Automatically sets status 200 and Content-Type
  } catch (error) {
    console.error("Error fetching problem:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch problem" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
