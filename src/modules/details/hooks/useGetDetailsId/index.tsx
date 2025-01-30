import { useRouter } from "next/router";

export const useValidId = () => {
  const router = useRouter();
  const currentId = router.query.id;
  return { id: currentId?.toString() ?? "" };
};
