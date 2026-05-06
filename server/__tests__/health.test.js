const request = require("supertest");
const { app } = require("../app");

describe("health endpoints", () => {
  test("GET /health returns 200 OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  });

  test("GET /api/health returns JSON payload", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("timestamp");
  });
});

