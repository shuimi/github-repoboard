import { useState } from "react";

export const usePagination = (defaultPageSize: number) => {
    const [ pagination, setPagination ] = useState<{
        page: number,
        pageSize: number
    }>({
        page: 1,
        pageSize: defaultPageSize
    });
    return {
        pagination,
        setPagination
    };
}