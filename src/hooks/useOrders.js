import { useMemo, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import OrderRoutes from "../api/OrderRoutes";

export const getUserOrders = () => {
    const { data: orderData, error, fetchNextPage, status, hasNextPage, isLoading, refetch } = useInfiniteQuery(
        ['get-user-orders'],
        ({ pageParam = 1 }) => OrderRoutes.FetchOrders('',5, pageParam),
        {
            getNextPageParam: (lastPage) => {
                const previousPage = lastPage.prev_page_url ? +lastPage.prev_page_url.split('=')[1] : 0;
                const currentPage = previousPage + 1;
                if (currentPage === lastPage.last_page) return false;
                return currentPage + 1;
            }
        }
    )

    const tempData = useMemo(() => orderData?.pages.reduce((prev, page) => (
        { data: [...prev.data, ...page.data] }
    )), [orderData])

    return {
        error, fetchNextPage, status, hasNextPage,
        orderData, tempData, isLoading, refetch
    }
}