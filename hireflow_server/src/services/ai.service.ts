import OpenAI from "openai";
import { supabase } from "../db/supabase.js";
import {
  MatchCandidateJobDto,
  MatchCandidateJobResult,
} from "../types/ai.types.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL;
if (!MODEL) {
  throw new Error("OPENAI_MODEL is not set");
}

export const matchCandidateToJob = async (
  companyId: string,
  payload: MatchCandidateJobDto,
): Promise<MatchCandidateJobResult> => {
  const { data: candidate, error: candidateError } = await supabase
    .from("candidates")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", payload.candidate_id)
    .is("deleted_at", null)
    .single();

  if (candidateError || !candidate) {
    throw new Error("Candidate not found");
  }

  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("*")
    .eq("company_id", companyId)
    .eq("id", payload.job_id)
    .is("deleted_at", null)
    .single();

  if (jobError || !job) {
    throw new Error("Job not found");
  }

  const response = await openai.responses.create({
    model: MODEL,
    input: [
      {
        role: "system",
        content:
          "You are an ATS assistant. Return only valid JSON with keys: score, verdict, summary, strengths, gaps, recommendation.",
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            candidate,
            job,
          },
          null,
          2,
        ),
      },
    ],
  });

  const text = response.output_text?.trim();
  if (!text) {
    throw new Error("AI returned empty response");
  }

  let parsed: MatchCandidateJobResult;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON");
  }

  return parsed;
};
