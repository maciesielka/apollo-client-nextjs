"use client";

import {
  GetPollDocument as QUERY,
  GetPollQuery,
} from "@/components/poll/documents.generated";
import { useFragment, useSuspenseQuery } from "@apollo/client";
import gql from "graphql-tag";

const FRAGMENT = gql`
  fragment PollFragment on Poll {
    id
    question
    totalVotes
    answers {
      id
      text
      votes
      percentage
    }
  }
`;

type PollDTO = NonNullable<GetPollQuery["poll"]>;

function Poll({ id, className }: { id: string; className?: string }) {
  const { data } = useFragment<PollDTO>({
    fragment: FRAGMENT,
    fragmentName: "PollFragment",
    from: {
      __typename: "Poll",
      id: id,
    },
  });

  return (
    <div className={`flex flex-col justify-center w-full ${className}`}>
      <h2>{data.question ?? "Loading..."}</h2>
      {data.totalVotes ? <p>Total votes: {data.totalVotes}</p> : null}
    </div>
  );
}

const POLL_ID = "1";

export default function Content({ count }: { count: number }) {
  useSuspenseQuery(QUERY, {
    variables: {
      id: POLL_ID,
      // use a lengthy delay just to demonstrate the working Suspense boundary
      delay: 3_000,
    },
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, idx) => (
        <Poll key={idx} id={POLL_ID} className="border rounded px-2 py-4" />
      ))}
    </div>
  );
}
