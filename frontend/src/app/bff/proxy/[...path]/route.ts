import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = process.env.BACKEND_URL || "http://65.0.107.90:8080";

async function forward(req: NextRequest, path: string[]) {
  const url = `${UPSTREAM}/${path.join("/")}${req.nextUrl.search}`;
  const headers = new Headers(req.headers);
  headers.delete("host"); headers.delete("connection"); headers.delete("content-length");
  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.text();
  try {
    const r = await fetch(url, { method: req.method, headers, body, cache: "no-store" });
    const buf = await r.arrayBuffer();
    const res = new NextResponse(buf, { status: r.status });
    r.headers.forEach((v, k) => {
      if (!/^(content-encoding|transfer-encoding|connection)$/i.test(k)) res.headers.set(k, v);
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: "proxy_error", message: String(e) }, { status: 502 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) { return forward(req, (await params).path); }
export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) { return forward(req, (await params).path); }
export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) { return forward(req, (await params).path); }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) { return forward(req, (await params).path); }
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) { return forward(req, (await params).path); }
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
