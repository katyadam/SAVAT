import SDGApi from "@/api/sdgs/api";
import { ChangedDto, Link } from "@/api/sdgs/types";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";

export const useSDG = (id: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => SDGApi.getSDG(id),
  });
};

export const useSDGChanges = (
  id: string
): UseQueryResult<ChangedDto[], Error> => {
  return useQuery({
    queryKey: ["SDGChanges", id],
    queryFn: () => SDGApi.getSDGChanges(id),
  });
};

export const useSDGChange = (
  changeId: string
): UseQueryResult<ChangedDto, Error> => {
  return useQuery({
    queryKey: ["SDGChange", changeId],
    queryFn: () => SDGApi.getSDGChange(changeId),
    enabled: !!changeId && changeId !== "None",
  });
};

export const useSDGSummary = (id: string) => {
  return useQuery({
    queryKey: ["SDGSummary", id],
    queryFn: () => SDGApi.getSummary(id)
  })
}

export const useSDGCreate = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SDGApi.createSDG,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sdgs", projectId] })
    }
  })
}

export const useSDGDelete = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["SDGDelete"],
    mutationFn: (payload: number) =>
      SDGApi.deleteSDG(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["sdgs", projectId],
      }),
  });
};

export const useSDGCompare = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (links: Link[]) =>
      SDGApi.compareSDGLinks(id, links),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SDGChanges", id] });
    },
  })
}