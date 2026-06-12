import React from "react";

export default function JobIdPage({ params }: { params: { jobId: string } }) {
  return (
    <div>
      <h1>Job ID: {params.jobId}</h1>
    </div>
  );
}
