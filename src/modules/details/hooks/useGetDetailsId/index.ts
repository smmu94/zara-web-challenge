import { useRouter } from "next/router";

export const useGetDetailsId = () => {
  const router = useRouter();
  const currentId = router.query.id;
  return { id: currentId?.toString() ?? "" };
};
