import { NextResponse } from "next/server";

import { ensureDatabase, prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { checkRateLimit, cleanupRateLimitBuckets, getClientAddress } from "@/lib/rate-limit";

const VALUES = new Set(["up", "down"]);
const MAX_REQUEST_BYTES = 12_000;
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

const REASONS = new Set([
  "incorrect",
  "did-not-answer",
  "too-vague",
  "too-long",
  "other",
]);

function clean(value: unknown, max = 4000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    cleanupRateLimitBuckets();
    const rateLimit = checkRateLimit(
      `feedback:${getClientAddress(request)}`,
      RATE_LIMIT,
      RATE_WINDOW_MS,
    );
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many feedback requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: "Request body is too large." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }
    await ensureDatabase();
    const body = await request.json();
    const messageId = clean(body.messageId, 120);
    const value = clean(body.value, 10);
    const question = clean(body.question, 1000);
    const answer = clean(body.answer, 6000);
    const reason = clean(body.reason, 40) || null;
    const comment = clean(body.comment, 1000) || null;

    if (!messageId || !VALUES.has(value) || !answer) {
      return NextResponse.json({ error: "Invalid feedback payload." }, { status: 400 });
    }

    if (reason && !REASONS.has(reason)) {
      return NextResponse.json({ error: "Invalid feedback reason." }, { status: 400 });
    }

    const feedback = await prisma.chatFeedback.upsert({
      where: { messageId },
      create: { messageId, value, question: question || null, answer, reason, comment },
      update: { value, question: question || null, answer, reason, comment },
      select: { id: true, messageId: true, value: true },
    });

    return NextResponse.json({ ok: true, feedback });
  } catch (error) {
    console.error("POST /api/feedback", error);
    return NextResponse.json({ error: "Unable to save feedback." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    cleanupRateLimitBuckets();
    const rateLimit = checkRateLimit(
      `feedback:${getClientAddress(request)}`,
      RATE_LIMIT,
      RATE_WINDOW_MS,
    );
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many feedback requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: "Request body is too large." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }
    await ensureDatabase();
    const body = await request.json();
    const messageId = clean(body.messageId, 120);
    if (!messageId) return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    await prisma.chatFeedback.deleteMany({ where: { messageId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/feedback", error);
    return NextResponse.json({ error: "Unable to remove feedback." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin.authorized) return NextResponse.json({ error: admin.error }, { status: admin.status });

  try {
    await ensureDatabase();
    const url = new URL(request.url);
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 100), 1), 250);
    const feedback = await prisma.chatFeedback.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    const [total, helpful, notHelpful] = await Promise.all([
      prisma.chatFeedback.count(),
      prisma.chatFeedback.count({ where: { value: "up" } }),
      prisma.chatFeedback.count({ where: { value: "down" } }),
    ]);
    return NextResponse.json(
      { feedback, stats: { total, helpful, notHelpful, helpfulRate: total ? Math.round((helpful / total) * 1000) / 10 : 0 } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("GET /api/feedback", error);
    return NextResponse.json({ error: "Unable to load feedback." }, { status: 500 });
  }
}
