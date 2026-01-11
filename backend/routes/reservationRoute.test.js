import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';

// Mock the database connection
jest.mock('../database/dbConnection.js', () => ({
  dbConnection: jest.fn(() => Promise.resolve()),
}));

// Mock the Reservation model
jest.mock('../models/reservationSchema.js', () => ({
  Reservation: {
    create: jest.fn(),
  },
}));

// Import after mocking
import { Reservation } from '../models/reservationSchema.js';

describe('Reservation Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/reservation/send', () => {
    const validReservationData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      date: '2024-12-31',
      time: '19:00',
      phone: '1234567890',
      address: '123 Main Street, City, State 12345',
      orderItems: [{ name: 'Pizza', quantity: 2, price: 12.99 }],
      totalAmount: 25.98,
    };

    it('should create a reservation successfully', async () => {
      Reservation.create.mockResolvedValue(validReservationData);

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(validReservationData)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: 'Order placed successfully!',
      });

      expect(Reservation.create).toHaveBeenCalledWith({
        firstName: validReservationData.firstName,
        lastName: validReservationData.lastName,
        email: validReservationData.email,
        date: validReservationData.date,
        time: validReservationData.time,
        phone: validReservationData.phone,
        address: validReservationData.address,
        orderItems: validReservationData.orderItems,
        totalAmount: validReservationData.totalAmount,
      });
    });

    it('should return 400 error when firstName is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.firstName;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: 'Please fill all the fields',
      });

      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should return 400 error when lastName is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.lastName;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should return 400 error when email is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.email;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should return 400 error when date is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.date;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should return 400 error when time is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.time;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should return 400 error when phone is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.phone;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should return 400 error when address is missing', async () => {
      const incompleteData = { ...validReservationData };
      delete incompleteData.address;

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(incompleteData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    it('should handle validation errors from mongoose', async () => {
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      validationError.errors = {
        email: { message: 'Plzz enter a valid email' },
        phone: { message: 'Phone number must contain 10 digits' },
      };

      Reservation.create.mockRejectedValue(validationError);

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send({
          ...validReservationData,
          email: 'invalid-email',
          phone: '123',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Plzz enter a valid email');
    });

    it('should handle server errors', async () => {
      const serverError = new Error('Database connection failed');
      Reservation.create.mockRejectedValue(serverError);

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(validReservationData)
        .expect(500);

      expect(response.body.success).toBe(false);
    });

    it('should create reservation with default orderItems and totalAmount when not provided', async () => {
      const dataWithoutOptionalFields = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        date: '2024-12-31',
        time: '20:00',
        phone: '9876543210',
        address: '456 Oak Avenue, Another City, State 67890',
      };

      Reservation.create.mockResolvedValue(dataWithoutOptionalFields);

      const response = await request(app)
        .post('/api/v1/reservation/send')
        .send(dataWithoutOptionalFields)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Reservation.create).toHaveBeenCalledWith({
        ...dataWithoutOptionalFields,
        orderItems: [],
        totalAmount: 0,
      });
    });
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/').expect(200);

      expect(response.body).toEqual({
        message: 'Welcome to Zestora API',
      });
    });
  });
});
