import { renderHook } from "@testing-library/react-hooks";
import { useGetDetailsId } from ".";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(),
}));

describe("useGetDetailsId", () => {
  it("useGetDetailsId: should return id", () => {
    const idMock = "1";
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: idMock },
    });
    const { result } = renderHook(() => useGetDetailsId());
    expect(result.current.id).toBe(idMock);
  });
  it("useGetDetailsId: should return empty string if id is not provided", () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
    const { result } = renderHook(() => useGetDetailsId());
    expect(result.current.id).toBe("");
  });
});
