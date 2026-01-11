import { jest, describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import { Reservation } from './reservationSchema.js';
import validator from 'validator';

// Mock validator
jest.mock('validator', () => ({
  isEmail: jest.fn((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }),
}));

describe('Reservation Schema', () => {
  beforeAll(async () => {
    // Connect to a test database
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/zestora_test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Reservation.deleteMany({});
  });

  describe('Valid Reservation', () => {
    it('should create a reservation with all valid fields', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
        orderItems: [{ name: 'Pizza', quantity: 2 }],
        totalAmount: 25.99,
      };

      const reservation = await Reservation.create(reservationData);

      expect(reservation.firstName).toBe(reservationData.firstName);
      expect(reservation.lastName).toBe(reservationData.lastName);
      expect(reservation.email).toBe(reservationData.email);
      expect(reservation.phone).toBe(reservationData.phone);
      expect(reservation.address).toBe(reservationData.address);
      expect(reservation.time).toBe(reservationData.time);
      expect(reservation.orderItems).toEqual(reservationData.orderItems);
      expect(reservation.totalAmount).toBe(reservationData.totalAmount);
    });

    it('should create a reservation with default values for optional fields', async () => {
      const reservationData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '9876543210',
        address: '456 Oak Avenue, Another City, State 67890',
        date: new Date('2024-12-31'),
        time: '20:00',
      };

      const reservation = await Reservation.create(reservationData);

      expect(reservation.orderItems).toEqual([]);
      expect(reservation.totalAmount).toBe(0);
    });
  });

  describe('Validation Errors', () => {
    it('should fail when firstName is missing', async () => {
      const reservationData = {
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });

    it('should fail when firstName is too short', async () => {
      const reservationData = {
        firstName: 'Jo',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow(
        'First name must be at least 3 characters'
      );
    });

    it('should fail when firstName is too long', async () => {
      const reservationData = {
        firstName: 'A'.repeat(31),
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow(
        'First name cannot exceed 30 characters'
      );
    });

    it('should fail when lastName is missing', async () => {
      const reservationData = {
        firstName: 'John',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });

    it('should fail when email is missing', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });

    it('should fail when email is invalid', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow(
        'Plzz enter a valid email'
      );
    });

    it('should fail when phone is missing', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });

    it('should fail when phone is too short', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123456',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow(
        'Phone number must contain 7 digits'
      );
    });

    it('should fail when phone is too long', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '12345678901',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow(
        'Phone number must contain 10 digits'
      );
    });

    it('should fail when address is missing', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });

    it('should fail when address is too short', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: 'Short',
        date: new Date('2024-12-31'),
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow(
        'Address must be at least 10 characters'
      );
    });

    it('should fail when date is missing', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        time: '19:00',
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });

    it('should fail when time is missing', async () => {
      const reservationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main Street, City, State 12345',
        date: new Date('2024-12-31'),
      };

      await expect(Reservation.create(reservationData)).rejects.toThrow();
    });
  });
});
