import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



describe('User API', () => {
    describe('POST /users', () => {
      it('should create a new user', async () => {
        const createdUser = {
          id: 1,
          password: 'ashketchum',
          email: 'ash@example.com'
        };
  
        // Mock user creation
        prismaMock.users.create.mockResolvedValue(createdUser);
  
        const response = await request(app)
          .post('/users')
          .send({
            email: 'ash@example.com',
            password: 'pikachu123'
          });
  
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "Utilisateur créé", user: createdUser });
      });
    });
  
    describe('POST /users/login', () => {
      it('should login a user and return a token', async () => {
        const user = {
          id: 1,
          email: 'ash@example.com',
          password: 'hashedpassword'
        };
        const token = 'mockedToken';
  
        // Mock user lookup and password match
        prismaMock.users.findUnique.mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        // Mock your token generation function if separate (e.g., jwt.sign)
        (jwt.sign as jest.Mock).mockReturnValue(token);
  
        const response = await request(app)
          .post('/users/login')
          .send({
            email: 'ash@example.com',
            password: 'pikachu123'
          });
  
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          token
        });
      });
    });
  });
  