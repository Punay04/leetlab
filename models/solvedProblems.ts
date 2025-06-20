import mongoose from "mongoose";

const solvedProblemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SolvedProblem =
  mongoose.models.SolvedProblems ||
  mongoose.model("SolvedProblems", solvedProblemSchema);
export default SolvedProblem;
