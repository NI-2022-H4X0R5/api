const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)

describe("Test /api/users/:id route", () => {
    it("should return a response", async () => {
        const response = await request.get("/api/users/1")
        expect(response.status).toBe(200)
    })
})
