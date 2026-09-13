// Booking Manager - Handles booking operations and prevents duplicates

export interface Booking {
  id: string;
  bookingCode: string;
  busName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seat: string;
  price: string;
  passengerName?: string;
  passengerEmail?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
  deletedAt?: string; // For soft deletes
}

class BookingManager {
  private storageKey = 'user_bookings';

  // Get all bookings for the current user
  getBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];
    
    const bookings = JSON.parse(stored);
    // Filter out deleted bookings
    return bookings.filter((b: Booking) => !b.deletedAt);
  }

  // Check if booking already exists (prevent duplicates)
  isDuplicate(bookingCode: string): boolean {
    const bookings = this.getBookings();
    return bookings.some(b => b.bookingCode === bookingCode);
  }

  // Add new booking (only if not duplicate)
  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking | null {
    if (this.isDuplicate(booking.bookingCode)) {
      console.warn(`Duplicate booking detected: ${booking.bookingCode}`);
      return null;
    }

    const newBooking: Booking = {
      ...booking,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    const bookings = this.getBookings();
    bookings.push(newBooking);
    this.saveBookings(bookings);
    
    return newBooking;
  }

  // Get booking by ID
  getBookingById(id: string): Booking | null {
    const bookings = this.getBookings();
    return bookings.find(b => b.id === id) || null;
  }

  // Get booking by code
  getBookingByCode(code: string): Booking | null {
    const bookings = this.getBookings();
    return bookings.find(b => b.bookingCode === code) || null;
  }

  // Update booking status
  updateBookingStatus(id: string, status: Booking['status']): boolean {
    const bookings = this.getAllBookingsIncludingDeleted();
    const index = bookings.findIndex(b => b.id === id);
    
    if (index === -1) return false;
    
    bookings[index].status = status;
    this.saveBookings(bookings);
    return true;
  }

  // Soft delete (mark as deleted but keep in storage)
  softDeleteBooking(id: string): boolean {
    const bookings = this.getAllBookingsIncludingDeleted();
    const index = bookings.findIndex(b => b.id === id);
    
    if (index === -1) return false;
    
    bookings[index].deletedAt = new Date().toISOString();
    this.saveBookings(bookings);
    return true;
  }

  // Hard delete (permanently remove)
  hardDeleteBooking(id: string): boolean {
    let bookings = this.getAllBookingsIncludingDeleted();
    const initialLength = bookings.length;
    bookings = bookings.filter(b => b.id !== id);
    
    if (bookings.length === initialLength) return false;
    
    this.saveBookings(bookings);
    return true;
  }

  // Delete by booking code (used when admin deletes)
  deleteBookingByCode(bookingCode: string): boolean {
    let bookings = this.getAllBookingsIncludingDeleted();
    const initialLength = bookings.length;
    bookings = bookings.filter(b => b.bookingCode !== bookingCode);
    
    if (bookings.length === initialLength) return false;
    
    this.saveBookings(bookings);
    return true;
  }

  // Sync with backend/admin deletions
  syncWithBackend(deletedBookingCodes: string[]): void {
    if (!deletedBookingCodes || deletedBookingCodes.length === 0) return;
    
    let bookings = this.getAllBookingsIncludingDeleted();
    const originalLength = bookings.length;
    
    // Remove all bookings that match deleted codes
    bookings = bookings.filter(b => !deletedBookingCodes.includes(b.bookingCode));
    
    if (bookings.length !== originalLength) {
      this.saveBookings(bookings);
      console.log(`Synced: Removed ${originalLength - bookings.length} deleted bookings`);
    }
  }

  // Get all bookings by status
  getBookingsByStatus(status: Booking['status']): Booking[] {
    return this.getBookings().filter(b => b.status === status);
  }

  // Clear all bookings
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }

  // Private methods
  private getAllBookingsIncludingDeleted(): Booking[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveBookings(bookings: Booking[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
  }

  private generateId(): string {
    return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const bookingManager = new BookingManager();

// Hook for React components
export function useBookings() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    // Load bookings on mount
    setBookings(bookingManager.getBookings());

    // Set up interval to check for backend sync
    const interval = setInterval(() => {
      setBookings(bookingManager.getBookings());
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking = bookingManager.addBooking(booking);
    if (newBooking) {
      setBookings(bookingManager.getBookings());
    }
    return newBooking;
  };

  const deleteBooking = (id: string) => {
    const success = bookingManager.hardDeleteBooking(id);
    if (success) {
      setBookings(bookingManager.getBookings());
    }
    return success;
  };

  const updateStatus = (id: string, status: Booking['status']) => {
    const success = bookingManager.updateBookingStatus(id, status);
    if (success) {
      setBookings(bookingManager.getBookings());
    }
    return success;
  };

  const syncDeleted = (deletedCodes: string[]) => {
    bookingManager.syncWithBackend(deletedCodes);
    setBookings(bookingManager.getBookings());
  };

  return {
    bookings,
    addBooking,
    deleteBooking,
    updateStatus,
    syncDeleted,
    upcoming: bookings.filter(b => b.status === 'upcoming'),
    completed: bookings.filter(b => b.status === 'completed'),
    cancelled: bookings.filter(b => b.status === 'cancelled')
  };
}

// For TypeScript React import
import React from 'react';
