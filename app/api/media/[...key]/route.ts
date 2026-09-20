import { NextResponse } from "next/server";

import { getPortfolioAssetsBucket } from "@/lib/r2";

type RouteContext = {
  params: Promise<{ key: string[] }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: RouteContext) {
  const bucket = getPortfolioAssetsBucket();

  if (!bucket) {
    return new NextResponse("R2 is not configured.", { status: 503 });
  }

  const { key } = await context.params;
  const objectKey = key.join("/");

  if (!objectKey || objectKey.includes("..")) {
    return new NextResponse("Not found.", { status: 404 });
  }

  const object = await bucket.get(objectKey, {
    onlyIf: request.headers,
    range: request.headers,
  });

  if (!object) {
    return new NextResponse("Not found.", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new NextResponse("body" in object ? object.body : null, {
    status: "body" in object ? 200 : 412,
    headers,
  });
}
