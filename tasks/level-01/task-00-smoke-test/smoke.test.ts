import { describe, it, expect } from "vitest";

describe("setup smoke test", () => {
  it("vitest and typescript are working", () => {
    const greeting: string = "ready to learn";
    expect(greeting.length).toBeGreaterThan(0);
  });
});
