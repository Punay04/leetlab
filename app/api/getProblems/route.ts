import connectDb from "@/lib/db";
import problemModel from "@/models/problems";

export async function GET() {
  try {
    await connectDb();
    const problems = await problemModel.find({}).sort({ difficulty: 1 });

    return new Response(JSON.stringify(problems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error fetching problems:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch problems" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
