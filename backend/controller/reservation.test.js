import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock the Reservation model
jest.mock('../models/reservationSchema.js', () => ({
  Reservation: {
    create: jest.fn(),
  },
}));

// Mock the error handler
jest.mock('../error/error.js', () => {
  return jest.fn().mockImplementation((message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.name = 'ErrorHandler';
    return error;
  });
});

// Import after mocking
import { sendReservation } from './reservation.js';
import { Reservation } from '../models/reservationSchema.js';
import ErrorHandler from '../error/error.js';

describe('Reservation Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('sendReservation', () => {
    it('should create a reservation successfully with all required fields', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        orderItems: [{ name: 'Pizza', quantity: 2 }],
        totalAmount: 25.99,
      };

      req.body = reservationData;
      Reservation.create.mockResolvedValue(reservationData);

      await sendReservation(req, res, next);

      expect(Reservation.create).toHaveBeenCalledWith({
        firstName: reservationData.firstName,
        lastName: reservationData.lastName,
        email: reservationData.email,
        date: reservationData.date,
        time: reservationData.time,
        phone: reservationData.phone,
        address: reservationData.address,
        orderItems: reservationData.orderItems,
        totalAmount: reservationData.totalAmount,
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Order placed successfully!',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should create a reservation with optional fields as defaults', async () => {
      const reservationData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        date: '2024-12-31',
        time: '20:00',
        phone: '9876543210',
        address: '456 Oak Avenue, Another City, State 67890',
      };

      req.body = reservationData;
      Reservation.create.mockResolvedValue(reservationData);

      await sendReservation(req, res, next);

      expect(Reservation.create).toHaveBeenCalledWith({
        firstName: reservationData.firstName,
        lastName: reservationData.lastName,
        email: reservationData.email,
        date: reservationData.date,
        time: reservationData.time,
        phone: reservationData.phone,
        address: reservationData.address,
        orderItems: [],
        totalAmount: 0,
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Order placed successfully!',
      });
    });

    it('should return error when firstName is missing', async () => {
      req.body = {
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next.mock.calls[0][0].message).toBe('Please fill all the fields');
      expect(next.mock.calls[0][0].statusCode).toBe(400);
    });

    it('should return error when lastName is missing', async () => {
      req.body = {
        firstName: 'John',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return error when email is missing', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return error when date is missing', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return error when time is missing', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return error when phone is missing', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        address: '123 Main Street, City, State 12345',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should return error when address is missing', async () => {
      req.body = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
      };

      await sendReservation(req, res, next);

      expect(Reservation.create).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should handle validation errors from mongoose', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      req.body = reservationData;
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';
      validationError.errors = {
        email: { message: 'Invalid email format' },
        phone: { message: 'Phone number must contain 10 digits' },
      };

      Reservation.create.mockRejectedValue(validationError);

      await sendReservation(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next.mock.calls[0][0].message).toContain('Invalid email format');
      expect(next.mock.calls[0][0].statusCode).toBe(400);
    });

    it('should handle general errors', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-12-31',
        time: '19:00',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
      };

      req.body = reservationData;
      const generalError = new Error('Database connection failed');
      Reservation.create.mockRejectedValue(generalError);

      await sendReservation(req, res, next);

      expect(next).toHaveBeenCalledWith(generalError);
    });
  });
});
