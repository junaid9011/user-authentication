const request = require('supertest');
const app = require('../app'); // assuming your Express app is exported from this file
const mongoose = require('mongoose');

// Set up a temporary in-memory database for testing
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test-auth');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Drop the database after tests
  await mongoose.connection.close(); // Close the database connection
});

describe('Auth API', () => {
  let accessToken;

  // Test sign up route
  it('should sign up a user and return a token', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '12345678901',
      password: 'password123',
    };

    const response = await request(app)
      .post('/auth/register')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.accessToken).toBeDefined(); // check if token is returned
    accessToken = response.body.accessToken; // store token for use in later tests
  });

    // Test login route
    it('should log in a user and return a token', async () => {
        const userData = {
            email:'john@example.com',
            password:'password123'
        };

        const response = await request(app)
            .post('/auth/login')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.accessToken).toBeDefined(); // check if token is returned

        accessToken = response.body.accessToken; // store token for use in later tests
    });

    // Test protected route (example: get user profile)
    it('should get user profile with valid token', async () => {
        const response = await request(app)
            .get('/auth/me')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user).toBeDefined(); // check if user data is returned
    });

    // Test protected route with invalid token

    it('should return 401 for protected route with invalid token', async () => {
        const response = await request(app)
            .get('/auth/me')
            .set('Authorization', `Bearer invalidtoken`);

        expect(response.status).toBe(401);

    });
    



 
});
