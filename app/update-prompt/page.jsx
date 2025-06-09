import { Suspense } from "react";
import EditPrompt from "./EditPrompt";
// import your client component

// Optional: tell Next.js not to statically prerender this page
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading edit form…</div>}>
      <EditPrompt />
    </Suspense>
  );
}
