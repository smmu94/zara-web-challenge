import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { useGetProductDetails } from ".";
import { ReactNode } from "react";
import { detailsMock } from "./dataMock";

type WrapperProps = { children: ReactNode };

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

global.fetch = jest.fn();

const id = 1;

describe("useGetProductDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("useGetProductDetails: should return data when successful", async () => {
    const mockFetchFunction = jest.fn().mockResolvedValue(detailsMock);
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: mockFetchFunction,
    });
    (useQuery as jest.Mock).mockImplementation((key, queryFn) => {
      queryFn(id.toString()).then(() => {});
      return {
        data: detailsMock,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockFetchFunction,
      };
    });
    const { result } = renderHook(() => useGetProductDetails(id), {
      wrapper,
    });
    expect(result.current.data).toEqual(detailsMock);
    expect(result.current.isLoading).toBe(false);
  });

  it("useGetProductDetails: should return error when unsuccessful", async () => {
    const mockFetchFunction = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch"));
    (fetch as jest.Mock).mockRejectedValueOnce({
      json: mockFetchFunction,
    });
    (useQuery as jest.Mock).mockImplementation((key, queryFn) => {
      queryFn(id.toString()).catch(() => {});
      return {
        data: null,
        isLoading: false,
        isError: true,
        error: new Error("Failed to fetch"),
        refetch: mockFetchFunction,
      };
    });
    const { result } = renderHook(() => useGetProductDetails(id), {
      wrapper,
    });
    expect(result.current.error).toEqual(new Error("Failed to fetch"));
    expect(result.current.isLoading).toBe(false);
  });
});
