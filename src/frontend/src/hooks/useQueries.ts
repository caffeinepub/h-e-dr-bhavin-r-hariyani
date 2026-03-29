// This file is intentionally minimal as the backend has no methods.
// It's here for future expansion when backend functionality is added.

import { useActor } from "./useActor";

// Example query hook structure for future use:
// export function useExampleQuery() {
//   const { actor, isFetching } = useActor();
//   return useQuery({
//     queryKey: ['example'],
//     queryFn: async () => {
//       if (!actor) return null;
//       return actor.exampleMethod();
//     },
//     enabled: !!actor && !isFetching,
//   });
// }

export function useBackendReady() {
  const { actor, isFetching } = useActor();
  return { isReady: !!actor && !isFetching };
}
