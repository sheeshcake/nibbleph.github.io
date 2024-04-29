import { useMemo, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import AccountAdminRoutes from '../api/admin/AccountAdminRoutes'

export const getAllVa = () => {
    const { data: VaData, error, fetchNextPage, status, hasNextPage, isLoading, refetch } = useInfiniteQuery(
        ['get-all-company'],
        ({ pageParam = 1 }) => AccountAdminRoutes.getVirtualAssistants(pageParam, 4),
        {
            getNextPageParam: (lastPage) => {
                const previousPage = lastPage.prev_page_url ? +lastPage.prev_page_url.split('=')[1] : 0;
                const currentPage = previousPage + 1;
                if (currentPage === lastPage.last_page) return false;
                return currentPage + 1;
            }
        }
    )
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const tempData = useMemo(() => VaData?.pages.reduce((prev, page) => (
        { data: [...prev.data, ...page.data] }
    )), [VaData])

    return {
        error, fetchNextPage, status, hasNextPage,
        VaData, tempData, isLoading, refetch
    }
}