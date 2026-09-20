import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runtimeEnv } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");

    return NextResponse.json({
      ok: true,
      service: "portfolio",
      database: "ok",
      ai: runtimeEnv().OPENROUTER_API_KEY ? "configured" : "missing",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("HEALTH CHECK DATABASE ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        service: "portfolio",
        database: "error",
        ai: runtimeEnv().OPENROUTER_API_KEY ? "configured" : "missing",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
