import { Suspense } from "react";
import Content from "./content";

export const dynamic = "force-dynamic";

export default function Page({
  params: { count },
}: {
  params: { count: string };
}) {
  const parsed = parseInt(count);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-xl">
        Number of cells to render: {parsed}
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Content count={parsed} />
      </Suspense>
    </div>
  );
}
