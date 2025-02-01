import { detailsMock } from "@services/details/dataMock";
import { useGetQueryDetails } from ".";
import { renderHook } from "@testing-library/react-hooks";

const idMock = "1";

jest.mock("../useGetDetailsId", () => ({
  useGetDetailsId: () => ({ id: idMock }),
}));

const mockDetails = detailsMock;

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...originalModule,
    useQueryClient: () => ({
      getQueryData: jest.fn().mockReturnValue(mockDetails),
    }),
    useQuery: jest.fn().mockImplementation(({ queryFn }) => {
      return {
        data: queryFn(),
        error: null,
        isLoading: false,
        isError: false,
      };
    }),
  };
});

describe("useGetQueryDetails", () => {
  it("useGetQueryDetails: should return product", () => {
    const { result } = renderHook(() => useGetQueryDetails());
    expect(result.current.product).toEqual(mockDetails);
  });
});
