import { NextResponse } from "next/server";
import { describe, it, expect } from "vitest";
import { GET } from "./check";

describe("GET /api/auth/check", () => {
  it("should return authenticated: true", async () => {
    const response = await GET({} as Request);

    expect(response).toBeInstanceOf(NextResponse);

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ authenticated: true });
  });

  it("should have the correct content type", async () => {
    const response = await GET({} as Request);

    expect(response.headers.get("content-type")).toBe("application/json");
  });

  it("should have a 200 status code", async () => {
    const response = await GET({} as Request);

    expect(response.status).toBe(200);
  });
});
