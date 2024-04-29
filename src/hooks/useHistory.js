import { useMemo, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import userProfile from "../api/userProfile";

export const getHistoryList = () => {
    const { data: historyData, error, fetchNextPage, status, hasNextPage, isLoading, refetch } = useInfiniteQuery(
        ['get-history-list'],
        ({ pageParam = 1 }) => userProfile.getHistoryList('',5, pageParam),
        {
            getNextPageParam: (lastPage) => {
                const previousPage = lastPage.prev_page_url ? +lastPage.prev_page_url.split('=')[1] : 0;
                const currentPage = previousPage + 1;
                if (currentPage === lastPage.last_page) return false;
                return currentPage + 1;
            }
        }
    )

    const tempData = useMemo(() => historyData?.pages.reduce((prev, page) => (
        { data: [...prev.data, ...page.data] }
    )), [historyData])

    return {
        error, fetchNextPage, status, hasNextPage,
        historyData, tempData, isLoading, refetch
    }
}