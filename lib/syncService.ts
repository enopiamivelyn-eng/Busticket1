// Sync Service - Syncs local bookings with Django backend

import { bookingManager } from './bookingManager';

class SyncService {
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL = 60000; // Sync every 60 seconds

  // Start automatic sync
  startAutoSync() {
    if (this.syncInterval) return; // Already running

    console.log('Starting automatic sync with backend...');
    
    // Initial sync
    this.syncDeletedBookings();

    // Set up periodic sync
    this.syncInterval = setInterval(() => {
      this.syncDeletedBookings();
    }, this.SYNC_INTERVAL);
  }

  // Stop automatic sync
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('Stopped automatic sync');
    }
  }

  // Sync deleted bookings from Django
  async syncDeletedBookings() {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'get_deleted' }),
      });

      if (!response.ok) {
        console.error('Failed to fetch deleted bookings');
        return;
      }

      const { deletedCodes } = await response.json();
      
      if (deletedCodes && deletedCodes.length > 0) {
        console.log(`Syncing ${deletedCodes.length} deleted bookings...`);
        bookingManager.syncWithBackend(deletedCodes);
      }
    } catch (error) {
      console.error('Sync error:', error);
    }
  }

  // Manual sync - call this when needed
  async manualSync() {
    console.log('Manual sync triggered');
    await this.syncDeletedBookings();
  }
}

// Export singleton instance
export const syncService = new SyncService();

// React hook for sync
export function useSyncService() {
  React.useEffect(() => {
    syncService.startAutoSync();

    return () => {
      syncService.stopAutoSync();
    };
  }, []);

  return {
    manualSync: () => syncService.manualSync(),
  };
}

import React from 'react';
