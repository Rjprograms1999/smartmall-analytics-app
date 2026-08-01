const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new admin user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin User",
        email: "admin@test.com",
        password: "password123",
        role: "admin",
      })
      .set("Authorization", `Bearer ${process.env.ADMIN_TOKEN}`); // Assume admin token is set in env for testing
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login a user", async () => {
    await User.create({
      name: "Test User",
      email: "test@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
    });
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
