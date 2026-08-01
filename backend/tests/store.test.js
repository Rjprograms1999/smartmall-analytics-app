const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Store = require("../models/Store");
const User = require("../models/User");

describe("Store API", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Store.deleteMany({});
  });

  it("should create a new store", async () => {
    const res = await request(app).post("/api/stores").set("Authorization", `Bearer ${token}`).send({
      name: "Test Store",
      category: "Fashion",
      floor: 1,
      manager: new mongoose.Types.ObjectId(),
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Test Store");
  });
});
