const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Store = require("../models/Store");
const TelcoTrend = require("../models/TelcoTrend");
const WalkInLog = require("../models/WalkInLog");

describe("Recommendation API", () => {
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

  it("should generate recommendations", async () => {
    const store = await Store.create({
      name: "Test Store",
      category: "Fashion",
      floor: 1,
      manager: new mongoose.Types.ObjectId(),
    });
    await TelcoTrend.create({ category: "Fashion", trendScore: 70 });
    await WalkInLog.create({ store: store._id, estimatedCustomerCount: 20 });

    const res = await request(app).get("/api/stores/recommendations").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty("recommendation");
  });
});
