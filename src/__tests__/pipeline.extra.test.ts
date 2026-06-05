import { describe, expect, it, vi } from "vitest";
import { generate } from "../lib/pipeline";

describe("pipeline review failure handling", () => {
  it("does not hand off a draft that never passes review", async () => {
    const advanceToNextStage = vi.fn(async () => {
      /* should not be called for a failed review */
    });

    const res = await generate({
      behavior: "ok",
      advanceToNextStage,
      reviewPasses: () => false,
    });

    expect(res.status).toBe("error");
    expect(advanceToNextStage).not.toHaveBeenCalled();
  });
});
