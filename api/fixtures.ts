import { test as base } from '@playwright/test';
import { RestfulBookerClient } from './RestfulBookerClient';
import { ApiData } from '../data/testData';

export type ApiFixtures = {
  bookerClient: RestfulBookerClient;
  bookingId: number;
};

export const test = base.extend<ApiFixtures>({
  bookerClient: async ({ request }, use) => {
    const auth = await request.post(`${ApiData.baseUrl}/auth`, {
      data: {
        username: ApiData.credentials.username,
        password: ApiData.credentials.password,
      },
    });

    const body = await auth.json();
    const token = body.token;
    const client = new RestfulBookerClient(request, token, ApiData.baseUrl);
    await use(client);
  },
  bookingId: async ({ bookerClient }, use) => {
    const res = await bookerClient.createBooking();
    const body = await res.json();
    const id = body.bookingid;
    await use(id);
  },
});

export const expect = test.expect;
