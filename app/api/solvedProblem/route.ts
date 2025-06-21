import connectDb from "@/lib/db";
import SolvedProblem from "@/models/solvedProblems";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, problemId , code } = await request.json();

  if (!userId || !problemId || !code) {
    return new Response(
      JSON.stringify({ error: "User ID and Problem ID are required" }),
      { status: 400 }
    );
  }

  try {
    await connectDb();

    const alreadySolved = await SolvedProblem.findOne({ userId, problemId });

    if (alreadySolved) {
      return new Response(
        JSON.stringify({ error: "Problem already solved by this user" }),
        { status: 400 }
      );
    }

    await SolvedProblem.create({ userId, problemId , code });

    return new Response(
      JSON.stringify({ message: "Problem solved successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving solved problem:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save solved problem" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  const user = auth();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = (await user).userId;
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }
  try {
    await connectDb();

    const solvedProblems = await SolvedProblem.find({ userId }).populate(
      "problemId",
      "title difficulty description"
    );

    return new Response(JSON.stringify(solvedProblems), { status: 200 });
  } catch (error) {
    console.error("Error fetching solved problems:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch solved problems" }),
      { status: 500 }
    );
  }
}
