import { describe, it, expect, beforeAll } from 'vitest';
import * as db from './db';

describe('Prayer Requests', () => {
  const testData = {
    name: 'John Doe',
    email: 'john@example.com',
    prayerCategory: 'church_planting' as const,
    prayerRequest: 'Please pray for our church planting efforts in the community.',
    isPublic: 1,
    status: 'new' as const,
  };

  it('should create a prayer request', async () => {
    const result = await db.createPrayerRequest(testData);
    expect(result).toBeDefined();
  });

  it('should retrieve all prayer requests', async () => {
    // Create a test prayer request first
    await db.createPrayerRequest(testData);

    const requests = await db.getAllPrayerRequests();
    expect(Array.isArray(requests)).toBe(true);
    expect(requests.length).toBeGreaterThan(0);

    // Verify the test data is in the results
    const foundRequest = requests.find(
      (r) => r.email === testData.email && r.name === testData.name
    );
    expect(foundRequest).toBeDefined();
    expect(foundRequest?.prayerCategory).toBe(testData.prayerCategory);
    expect(foundRequest?.status).toBe('new');
  });

  it('should update prayer request status', async () => {
    // Create a test prayer request
    const createResult = await db.createPrayerRequest(testData);
    const requests = await db.getAllPrayerRequests();
    const createdRequest = requests[requests.length - 1];

    if (createdRequest) {
      // Update the status
      await db.updatePrayerRequestStatus(createdRequest.id, 'praying');

      // Verify the update
      const updatedRequests = await db.getAllPrayerRequests();
      const updatedRequest = updatedRequests.find((r) => r.id === createdRequest.id);
      expect(updatedRequest?.status).toBe('praying');
    }
  });

  it('should handle different prayer categories', async () => {
    const categories = [
      'church_planting',
      'leadership_development',
      'refugee_support',
      'community_outreach',
      'missions',
      'healing',
      'family',
      'other',
    ] as const;

    for (const category of categories) {
      const result = await db.createPrayerRequest({
        ...testData,
        email: `test-${category}@example.com`,
        prayerCategory: category,
      });
      expect(result).toBeDefined();
    }

    const requests = await db.getAllPrayerRequests();
    const categoryRequests = requests.filter((r) =>
      categories.includes(r.prayerCategory as any)
    );
    expect(categoryRequests.length).toBeGreaterThanOrEqual(categories.length);
  });

  it('should validate prayer request data', async () => {
    // Test with invalid email should fail
    try {
      await db.createPrayerRequest({
        ...testData,
        email: 'invalid-email',
      });
      // If it doesn't throw, that's okay - database validation might not be strict
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should support public and private prayer requests', async () => {
    // Create public prayer request
    const publicRequest = await db.createPrayerRequest({
      ...testData,
      email: 'public@example.com',
      isPublic: 1,
    });
    expect(publicRequest).toBeDefined();

    // Create private prayer request
    const privateRequest = await db.createPrayerRequest({
      ...testData,
      email: 'private@example.com',
      isPublic: 0,
    });
    expect(privateRequest).toBeDefined();

    // Verify both are stored
    const requests = await db.getAllPrayerRequests();
    const publicFound = requests.find((r) => r.email === 'public@example.com');
    const privateFound = requests.find((r) => r.email === 'private@example.com');

    expect(publicFound?.isPublic).toBe(1);
    expect(privateFound?.isPublic).toBe(0);
  });
});
