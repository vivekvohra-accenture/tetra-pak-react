import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserDb } from '../../types/users';
import type { RootState } from '../../app/store';

export interface QualityCheckRecord {
  id: string;
  line: string;
  samplingPoint: string;
  date: string;
  time: string;
  occasion: string;
  testArea: string;
  samples: string;
  productType: string;
  productBrandName: string;
  batchId: string;
  expectedInsertionDate: string;
  buc: boolean;
  status: string;
}


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
      // Automatically attach token if available
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'QualityCheck'], // Add tags for cache management

  endpoints: (builder) => ({
    getUsers: builder.query<UserDb[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserByEmail: builder.query<UserDb[], string>({
      query: (email) => `/users?email=${encodeURIComponent(email)}`,
    }),
    createUser: builder.mutation<UserDb, Partial<UserDb>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'], // Invalidate users list when a new user is created
    }),

    getQualityChecks: builder.query<QualityCheckRecord[], { 
      status: string; 
      lines?: string[];
      samplingPoint?: string;
      testArea?: string;
      occasion?: string;
      batchId?: string;
      productType?: string;
      productBrandName?: string;
    }>({
        query: (filters) => {
        // Start building the query string for json-server
        let queryString = '/qualityChecks?';

        // Filter by the active tab (New, Pending, Completed)
        if (filters.status) {
          queryString += `status=${filters.status}&`;
        }

        // If lines were selected in the drawer, append them (json-server handles multiple of the same parameter as an OR filter)
        if (filters.lines && filters.lines.length > 0) {
          filters.lines.forEach((line) => {
            queryString += `line=${encodeURIComponent(line)}&`;
          });
        }
        
        if (filters.samplingPoint) queryString += `samplingPoint=${encodeURIComponent(filters.samplingPoint)}&`;
        if (filters.testArea) queryString += `testArea=${encodeURIComponent(filters.testArea)}&`;
        if (filters.occasion) queryString += `occasion=${encodeURIComponent(filters.occasion)}&`;
        if (filters.batchId) queryString += `batchId=${encodeURIComponent(filters.batchId)}&`;
        if (filters.productType) queryString += `productType=${encodeURIComponent(filters.productType)}&`;
        if (filters.productBrandName) queryString += `productBrandName=${encodeURIComponent(filters.productBrandName)}&`;

        // Remove the trailing '&' or '?' for a clean URL
        return queryString.slice(0, -1);
      },
      providesTags: ['QualityCheck'],
    }),

    addQualityCheck: builder.mutation<QualityCheckRecord, Partial<QualityCheckRecord>>({
      query: (newCheck) => ({
        url: '/qualityChecks',
        method: 'POST',
        body: newCheck,
      }),
      invalidatesTags: ['QualityCheck'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUserByEmailQuery,
  useCreateUserMutation,
  useGetQualityChecksQuery,
  useAddQualityCheckMutation
} = apiSlice;
