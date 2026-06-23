import { APIRequestContext } from '@playwright/test';
import { ApiData } from '../data/testData';

export class RestfulBookerClient {
  readonly api: APIRequestContext;
  readonly token: string;
  readonly baseUrl: string;

  constructor(api: APIRequestContext, token: string, baseUrl: string) {
    this.api = api;
    this.token = token;
    this.baseUrl = baseUrl;
  }

  get authHeaders() {
    return { Cookie: `token=${this.token}` };
  }

  async getBookingList() {
    return this.api.get(`${this.baseUrl}/booking`);
  }

  async createBooking(data = ApiData.bookingPayload) {
    return this.api.post(`${this.baseUrl}/booking`, { data });
  }

  async getBooking(bookingId: number) {
    return this.api.get(`${this.baseUrl}/booking/${bookingId}`);
  }

  async updateBooking(bookingId: number, data = ApiData.updatedBookingPayload) {
    return this.api.put(`${this.baseUrl}/booking/${bookingId}`, {
      headers: this.authHeaders,
      data,
    });
  }

  async deleteBooking(bookingId: number, withAuth = true) {
    return this.api.delete(`${this.baseUrl}/booking/${bookingId}`, withAuth ? { headers: this.authHeaders } : undefined);
  }
}
