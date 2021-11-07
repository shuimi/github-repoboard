import { useEffect, useState } from 'react';
import { octokit } from '../client/octokit';
import { usePagination } from './pagination-hook';


const prepareQuery = (query: string) => query
    .split(' ')
    .filter(topic => !!topic)
    .map(topic => `topic:${ topic }+`)
    .reduce((query, topic) => query + topic);


export interface SearchFilters {
    order: 'asc' | 'desc',
    sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated',
}


export const useReposSearch = (defaultPageSize: number) => {

    const { pagination, setPagination } = usePagination(defaultPageSize);

    const [ fetching, setFetching ] = useState<boolean>(false);
    const [ fetchingError, setFetchingError ] = useState<string>('');

    const [ searchQuery, setSearchQuery ] = useState<string>('');
    const [ searchTopics, setSearchTopics ] = useState<string>('');

    const [ searchFilters, setSearchFilters ] = useState<SearchFilters>({
        order: 'asc',
        sort: undefined,
    });

    const [ repos, setRepos ] = useState<{
        totalCount: number, items?: Array<any> | null
    }>({
        totalCount: 0,
        items: null
    });

    const resetRepos = () => setRepos({ totalCount: 0, items: null });


    useEffect(() => {
        setFetchingError('');
        searchQuery && setFetching(true);

        searchQuery && octokit.rest.search.repos({
            q: searchQuery + ' ' + (searchTopics ?? prepareQuery(searchTopics)),
            order: searchFilters.order,
            sort: searchFilters.sort,
            per_page: pagination.pageSize,
            page: pagination.page
        })
            .then(repos => {
                setRepos({
                    totalCount: repos.data.total_count,
                    items: repos.data.items && repos.data.items || null
                });
            })
            .catch(error => {
                setFetchingError(error.code + ' ' + error.message);
            })
            .finally(() => {
                setFetching(false);
            });
    }, [ searchQuery, searchTopics, pagination, searchFilters ]);

    return {
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        searchTopics: searchTopics,
        setSearchTopics: setSearchTopics,
        pagination: pagination,
        setPagination: setPagination,
        searchFilters: searchFilters,
        setSearchFilters: setSearchFilters,
        fetching: fetching,
        fetchingError: fetchingError,
        repos: repos,
        resetRepos: resetRepos
    }

};