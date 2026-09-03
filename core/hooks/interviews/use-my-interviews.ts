"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyInterviews } from "@/core/services/interviews/get-my-interviews.service";

export const useMyInterviews = () =>
  useQuery({ queryKey: ["interviews", "mine"], queryFn: getMyInterviews });
