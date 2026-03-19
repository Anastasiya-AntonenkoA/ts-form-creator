import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { GraphQLClient, ClientError } from 'graphql-request';

export const client = new GraphQLClient('http://localhost:3001/graphql');

type GraphQLRequestArgs = {
  document: string;
  variables?: Record<string, unknown>;
};

type GraphQLRequestError = {
  status: number;
  data: unknown;
};

const graphqlBaseQuery: BaseQueryFn<
  GraphQLRequestArgs,
  unknown,
  GraphQLRequestError
> = async ({ document, variables }) => {
  try {
    const result = await client.request(document, variables);
    return { data: result };
  } catch (error) {
    if (error instanceof ClientError) {
      return {
        error: {
          status: error.response.status,
          data: error.response.errors,
        },
      };
    }

    return {
      error: {
        status: 500,
        data: error,
      },
    };
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery,
  tagTypes: ['Forms', 'Responses'],
  endpoints: () => ({}),
});