import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";
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

describe("useGetProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: listMock,
      isLoading: false,
      isError: false,
      error: null,
    });
  });
  it("useGetProductList: should return data", async () => {
    const { result } = renderHook(() => useGetProductList(queryParamsMock), {
      wrapper,
    });
    await waitFor(() => !result.current.isLoading);
    expect(result.current.data).toEqual(listMock);
    expect(result.current.isLoading).toBe(false);
  });
});
