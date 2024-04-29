import { useMemo, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
// import dashboardRoutes from '../../../api/admin/AccountAdminRoutes'
import dashboardRoutes from '../../../api/dashboardRoutes'


export const getAllNotifs = () => {
    const { data: notfisData, error, fetchNextPage, status, hasNextPage, isLoading, refetch } = useInfiniteQuery(
        ['get-all-notifs'],
        ({ pageParam = 1 }) => dashboardRoutes.fetchMyNotification(pageParam, 4),
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
    const tempData = useMemo(() => notfisData?.pages.reduce((prev, page) => (
        { data: [...prev.data, ...page.data] }
    )), [notfisData])

    return {
        error, fetchNextPage, status, hasNextPage,
        notfisData, tempData, isLoading, refetch
    }
}