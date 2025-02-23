import { useMemo, useState } from "react";

export type VersionSortMethod = "versionAsc" | "versionDesc";
export type DateSortMethod = "dateAsc" | "dateDesc"

interface HasCreatedAt {
    createdAt: string;
}

interface HasVersion {
    version: string;
}

export function useSortingByDate<TData>(data: TData[]) {
    const [dateSortMethod, setDateSortMethod] = useState<DateSortMethod>("dateDesc");

    const dateSortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            const dateA = new Date((a as HasCreatedAt).createdAt).getTime();
            const dateB = new Date((b as HasCreatedAt).createdAt).getTime();

            if (dateSortMethod === "dateAsc") return dateA - dateB;
            if (dateSortMethod === "dateDesc") return dateB - dateA;

            return 0;
        });
    }, [data, dateSortMethod]);

    return { dateSortedData, dateSortMethod, setDateSortMethod };
}

export function useSortingByVersion<TData>(data: TData[]) {
    const [versionSortMethod, setVersionSortMethod] = useState<VersionSortMethod>("versionDesc");

    const versionSortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            if (versionSortMethod === "versionDesc") return (a as HasVersion).version.localeCompare((b as HasVersion).version);
            if (versionSortMethod === "versionAsc") return (b as HasVersion).version.localeCompare((a as HasVersion).version);

            return 0;
        });
    }, [data, versionSortMethod]);

    return { versionSortedData, versionSortMethod, setVersionSortMethod };
}