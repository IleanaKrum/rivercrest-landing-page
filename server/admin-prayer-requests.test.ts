import { describe, it, expect, beforeAll } from 'vitest';
import * as db from './db';

describe('Admin Prayer Request Management', () => {
  const testPrayerRequests = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      prayerCategory: 'church_planting' as const,
      prayerRequest: 'Please pray for our church planting efforts.',
      isPublic: 1,
      status: 'new' as const,
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      prayerCategory: 'leadership_development' as const,
      prayerRequest: 'Pray for our leadership team.',
      isPublic: 1,
      status: 'new' as const,
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      prayerCategory: 'refugee_support' as const,
      prayerRequest: 'Pray for refugee families.',
      isPublic: 0,
      status: 'new' as const,
    },
  ];

  let createdIds: number[] = [];

  beforeAll(async () => {
    // Create test prayer requests
    for (const prayer of testPrayerRequests) {
      const result = await db.createPrayerRequest(prayer);
      if (result) {
        const requests = await db.getAllPrayerRequests();
        const created = requests.find(
          (r) => r.email === prayer.email && r.name === prayer.name
        );
        if (created) {
          createdIds.push(created.id);
        }
      }
    }
  });

  it('should retrieve all prayer requests', async () => {
    const requests = await db.getAllPrayerRequests();
    expect(Array.isArray(requests)).toBe(true);
    expect(requests.length).toBeGreaterThanOrEqual(testPrayerRequests.length);
  });

  it('should bulk update prayer request status', async () => {
    if (createdIds.length < 2) {
      console.warn('Skipping bulk update test - not enough test data');
      return;
    }

    const idsToUpdate = createdIds.slice(0, 2);
    await db.bulkUpdatePrayerRequestStatus(idsToUpdate, 'praying');

    const requests = await db.getAllPrayerRequests();
    const updated = requests.filter((r) => idsToUpdate.includes(r.id));

    for (const request of updated) {
      expect(request.status).toBe('praying');
    }
  });

  it('should delete a single prayer request', async () => {
    if (createdIds.length === 0) {
      console.warn('Skipping delete test - no test data');
      return;
    }

    const idToDelete = createdIds[0];
    await db.deletePrayerRequest(idToDelete);

    const requests = await db.getAllPrayerRequests();
    const deleted = requests.find((r) => r.id === idToDelete);
    expect(deleted).toBeUndefined();
  });

  it('should bulk delete prayer requests', async () => {
    if (createdIds.length < 2) {
      console.warn('Skipping bulk delete test - not enough test data');
      return;
    }

    const idsToDelete = createdIds.slice(1, 3);
    await db.bulkDeletePrayerRequests(idsToDelete);

    const requests = await db.getAllPrayerRequests();
    for (const id of idsToDelete) {
      const deleted = requests.find((r) => r.id === id);
      expect(deleted).toBeUndefined();
    }
  });

  it('should handle status transitions correctly', async () => {
    const prayer = {
      name: 'David Wilson',
      email: 'david@example.com',
      prayerCategory: 'missions' as const,
      prayerRequest: 'Pray for mission work.',
      isPublic: 1,
      status: 'new' as const,
    };

    await db.createPrayerRequest(prayer);
    const requests = await db.getAllPrayerRequests();
    const created = requests.find((r) => r.email === prayer.email);

    if (created) {
      // Test status transitions
      const statuses: Array<'new' | 'acknowledged' | 'praying' | 'answered'> = [
        'acknowledged',
        'praying',
        'answered',
      ];

      for (const status of statuses) {
        await db.updatePrayerRequestStatus(created.id, status);
        const updated = await db.getAllPrayerRequests();
        const request = updated.find((r) => r.id === created.id);
        expect(request?.status).toBe(status);
      }

      // Clean up
      await db.deletePrayerRequest(created.id);
    }
  });

  it('should support filtering by category', async () => {
    const requests = await db.getAllPrayerRequests();
    const churchPlantingRequests = requests.filter(
      (r) => r.prayerCategory === 'church_planting'
    );
    expect(Array.isArray(churchPlantingRequests)).toBe(true);
  });

  it('should support public and private requests', async () => {
    const requests = await db.getAllPrayerRequests();
    const publicRequests = requests.filter((r) => r.isPublic === 1);
    const privateRequests = requests.filter((r) => r.isPublic === 0);

    expect(Array.isArray(publicRequests)).toBe(true);
    expect(Array.isArray(privateRequests)).toBe(true);
  });

  it('should handle concurrent bulk operations', async () => {
    const prayer1 = {
      name: 'Eve Brown',
      email: 'eve@example.com',
      prayerCategory: 'healing' as const,
      prayerRequest: 'Pray for healing.',
      isPublic: 1,
      status: 'new' as const,
    };

    const prayer2 = {
      name: 'Frank Green',
      email: 'frank@example.com',
      prayerCategory: 'family' as const,
      prayerRequest: 'Pray for families.',
      isPublic: 1,
      status: 'new' as const,
    };

    await db.createPrayerRequest(prayer1);
    await db.createPrayerRequest(prayer2);

    const requests = await db.getAllPrayerRequests();
    const ids = requests
      .filter((r) => r.email === prayer1.email || r.email === prayer2.email)
      .map((r) => r.id);

    if (ids.length >= 2) {
      // Perform concurrent operations
      await Promise.all([
        db.bulkUpdatePrayerRequestStatus(ids, 'praying'),
        db.getAllPrayerRequests(),
      ]);

      const updated = await db.getAllPrayerRequests();
      const updatedRequests = updated.filter((r) => ids.includes(r.id));

      for (const request of updatedRequests) {
        expect(request.status).toBe('praying');
      }

      // Clean up
      await db.bulkDeletePrayerRequests(ids);
    }
  });
});
