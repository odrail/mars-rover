import request from 'supertest'
import app from './app'

describe("Test POST /init", () => {
  test("It should set cookie", async () => {
    const response = await request(app).post("/init");
    expect(response.header['set-cookie']).not.toBeNull()
  });

  test("It should response 404 if body is wrong", async () => {
    const response = await request(app).post("/init");
    expect(response.statusCode).toBe(400)
  });

  test("It should response 200 if body is correct", async () => {
    const body = {
      map: {
        lats: 10,
        longs: 8,
        obstacles: [
          { long: 2, lat: 1 }
        ]
      },
      initialPosition: {
        long: 8, lat: 1, direction: 'N'
      }
    }
    const response = await request(app)
      .post("/init")
      .send(body)
    expect(response.statusCode).toBe(200)
  })
});

describe("Test POST /run", () => {
  test("It should response 403 if no session", async () => {
    const response = await request(app)
      .post("/run")
    expect(response.statusCode).toBe(403)
  })

  test("It should response 400 if body is not valid", async () => {
    const initBody = {
      map: {
        lats: 10,
        longs: 8,
        obstacles: [
          { long: 2, lat: 1 }
        ]
      },
      initialPosition: {
        long: 8, lat: 1, direction: 'N'
      }
    }
    const initResponse = await request(app)
      .post("/init")
      .send(initBody)
    expect(initResponse.statusCode).toBe(200)
    expect(initResponse.headers['set-cookie']).not.toBeNull()
    const cookieMarsRover = initResponse.headers['set-cookie'].find((c: string) => c.includes('rover-mars'))

    const response = await request(app)
      .post("/run")
      .set('Cookie', cookieMarsRover)
    expect(response.statusCode).toBe(400)
  })

  test("It should response 200 if session and body are valid", async () => {
    const initBody = {
      map: {
        lats: 10,
        longs: 8,
        obstacles: [
          { long: 2, lat: 1 }
        ]
      },
      initialPosition: {
        long: 8, lat: 1, direction: 'N'
      }
    }
    const initResponse = await request(app)
      .post("/init")
      .send(initBody)
    expect(initResponse.statusCode).toBe(200)
    expect(initResponse.headers['set-cookie']).not.toBeNull()
    const cookieMarsRover = initResponse.headers['set-cookie'].find((c: string) => c.includes('rover-mars'))

    const response = await request(app)
      .post("/run")
      .set('Cookie', cookieMarsRover)
      .send({
        commands: ['R']
      })
    expect(response.statusCode).toBe(200)
  })

  test("It should response with new position of rover", async () => {
    const initBody = {
      map: {
        lats: 10,
        longs: 8,
        obstacles: [
          { long: 2, lat: 1 }
        ]
      },
      initialPosition: {
        long: 8, lat: 1, direction: 'N'
      }
    }
    const initResponse = await request(app)
      .post("/init")
      .send(initBody)
    expect(initResponse.statusCode).toBe(200)
    expect(initResponse.headers['set-cookie']).not.toBeNull()
    const cookieMarsRover = initResponse.headers['set-cookie'].find((c: string) => c.includes('rover-mars'))

    const response = await request(app)
      .post("/run")
      .set('Cookie', cookieMarsRover)
      .send({
        commands: ['R']
      })
    expect(response.statusCode).toBe(200)
    const expectedBody = {
      currentPosition: { long: 8, lat: 1, direction: 'E' },
      obstacleDetected: false,
      obstaclePosition: null
    }
    expect(response.body).toStrictEqual(expectedBody)
  })
})