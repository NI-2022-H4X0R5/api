const app = require("../app")
const supertest = require("supertest")
const request = supertest(app)

describe("Test /api/users/:id route", () => {
    it("should return a response", async () => {
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2OTkzNzkzNywiZXhwIjoxNjcwMDI0MzM3fQ.9SVHcfa-wMrpT3FynJ9tM7VgCFZlaNJMRVTXfjfhA5M`;
        const response = await request.get("/api/users/1").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200)
    })
})
