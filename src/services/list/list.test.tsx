import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { useGetProductList } from ".";
import { listMock, queryParamsMock } from "./dataMock";
import { ReactNode } from "react";

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

describe("useGetProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("useGetProductList: should return data when successful", async () => {
    const mockFetchFunction = jest.fn().mockResolvedValue(listMock);
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: mockFetchFunction,
    });
    (useQuery as jest.Mock).mockImplementation((key, queryFn) => {
      queryFn(queryParamsMock).then(() => {
      });
      return {
        data: listMock,
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockFetchFunction,
      };
    });
    const { result } = renderHook(() => useGetProductList(queryParamsMock), {
      wrapper,
    });
    expect(result.current.data).toEqual(listMock);
    expect(result.current.isLoading).toBe(false);
  });

  it("useGetProductList: should return error when unsuccessful", async () => {
    const mockFetchFunction = jest.fn().mockRejectedValue(new Error("Failed to fetch"));
    (fetch as jest.Mock).mockRejectedValueOnce({
      json: mockFetchFunction,
    });
    (useQuery as jest.Mock).mockImplementation((key, queryFn) => {
      queryFn(queryParamsMock).catch(() => {
      });
      return {
        data: null,
        isLoading: false,
        isError: true,
        error: new Error("Failed to fetch"),
        refetch: mockFetchFunction,
      };
    });
    const { result } = renderHook(() => useGetProductList(queryParamsMock), {
      wrapper,
    });
    expect(result.current.error).toEqual(new Error("Failed to fetch"));
    expect(result.current.isLoading).toBe(false);
  });
});
