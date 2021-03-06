import React, { ReactElement } from 'react';
import { Alert, Divider, Empty, Input, Row, Select, Spin } from 'antd';
import RepositoryCard from './../common/repository-card';
import { useReposSearch } from '../../hooks/repos-search-hook';
import Section from './helpers/section';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/media-query-hook';
import { Pagination } from '../common/pagination';


const TopicsSelectStyle = { width: '100%', marginTop: '0.2em', marginBottom: '0.5em' };

const RepoCardsBox = styled(Row)({
    justifyContent: 'center',
});

const FiltersWrapper = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1em',
});

const OverflowNotification = styled.p({
    fontSize: '0.7em',
    lineHeight: '1em',
    color: '#7c7c7c'
});

const FilterSelectWrapper = (props: { children?: ReactElement, title: string }) => {
    return (
        <div style={ { display: 'flex', verticalAlign: 'middle' } }>
            <div style={ { lineHeight: '2.165em', verticalAlign: 'middle', color: '#8d8d8d' } }>
                { props.title }
            </div>
            { props.children }
        </div>
    );
}

const SearchBox = styled.div`
    z-index: 40;
    position: fixed;
    top: 3em;
    left: 0;
    padding: 1em 4em;
    padding-top: 2em;
    border-radius: 0.15em;
    width: 100vw;
    background: rgb(250, 250, 250);
    box-shadow: 0 0.01em 0.5em #DDDDDD;
    @media (max-width: 520px) {
        padding: 2em 2em;
    }
`;

const ContentBox = styled.div`
    width: 90vw;
    margin-top: 12.5em;
`;

const RepositoriesBoardTab = () => {

    const defaultPageSize = 10;
    const pageSizeOptions = [ '5', `${ defaultPageSize }` ];

    const {
        setSearchQuery,
        pagination,
        searchFilters,
        setSearchFilters,
        setSearchTopics,
        setPagination,
        fetching,
        fetchingError,
        repos
    } = useReposSearch(defaultPageSize);

    const onPageChange = (page: number, pageSize?: number) => {
        setPagination({ page: page, pageSize: pageSize ?? defaultPageSize });
    }

    const onSearchInput = (value: string) => {
        setSearchQuery(value);
    }

    const onOrderSelect = (value: 'asc' | 'desc') => {
        setSearchFilters({ ...searchFilters, order: value })
    }

    const onSortSelect = (value: '' | 'stars' | 'forks' | 'help-wanted-issues' | 'updated') => {
        setSearchFilters({ ...searchFilters, sort: value || undefined });
    }

    const onTopicSelect = (topics: string) => {
        setSearchTopics(topics);
    }

    const onTopicsClear = () => {
        setSearchTopics('');
    }

    const { Option } = Select;

    const isMobileDevice = useMediaQuery('(min-width: 280px)');
    const SelectStyle = { width: '9em', margin: `0 ${ isMobileDevice && 2 || 0.5 }em` };


    return (
        <Section>
            <SearchBox>
                <Input.Search onSearch={ onSearchInput } size='large' placeholder='Search for repos'/>
                <Select placeholder='Topics' mode='tags' size='middle' tokenSeparators={ [ ' ' ] }
                        style={ TopicsSelectStyle }
                        onChange={ onTopicSelect } onClear={ onTopicsClear }
                />
                <FiltersWrapper>
                    <FilterSelectWrapper title={ 'Sort by' }>
                        <Select style={ SelectStyle } bordered={ false } defaultValue={ searchFilters.sort ?? '' }
                                onSelect={ onSortSelect }>
                            <Option value=''>Best match</Option>
                            <Option value='stars'>Stars</Option>
                            <Option value='forks'>Forks</Option>
                            <Option value='help-wanted-issues'>Help wanted</Option>
                            <Option value='updated'>Update rate</Option>
                        </Select>
                    </FilterSelectWrapper>
                    {
                        searchFilters.sort &&
                        <FilterSelectWrapper title={ 'Order by' }>
                            <Select style={ SelectStyle } bordered={ false } defaultValue={ searchFilters.order }
                                    onSelect={ onOrderSelect }>
                                <Option value='asc'>Ascending</Option>
                                <Option value='desc'>Descending</Option>
                            </Select>
                        </FilterSelectWrapper>
                    }
                </FiltersWrapper>
            </SearchBox>
            <ContentBox>
                {
                    fetchingError && (
                        <Alert message='Error loading data!' description={ fetchingError } type='error' closable/>
                    ) || (
                        <Divider orientation='left'>
                            { repos && 'Found: ' + repos.totalCount || 'Repositories' }
                        </Divider>
                    )
                }
                <RepoCardsBox gutter={ { xs: 1, sm: 2, md: 4 } }>
                    {
                        !fetchingError && fetching && <Spin/>
                        || (
                            repos.items && repos.items.map(
                                repo => <RepositoryCard
                                    key={ repo.id }
                                    name={ repo.name }
                                    description={ repo.description }
                                    language={ repo.language }
                                    license={ repo.license && repo.license.name || null }
                                    licenseURL={ repo.license && repo.license.url || null }
                                    imageURL={ repo.name }
                                />
                            ) || (
                                !fetchingError && !fetching && <Empty description={
                                    'To search for repositories, enter your query in the search bar above'
                                }/>
                            )
                        )
                    }
                </RepoCardsBox>
                {
                    !fetchingError && repos.items && repos.items.length > 1 && repos.totalCount >= 1000 &&
                    <OverflowNotification>
                        Only first 1000 results available ({ 1000 / pagination.pageSize } pages) according github API
                        docs.
                    </OverflowNotification>
                }
                {
                    !fetchingError && repos.items && repos.items.length > 1 &&
                    <Pagination
                        total={ repos.totalCount >= 1000 ? 1000 : repos.totalCount }
                        pageSizeOptions={ pageSizeOptions }
                        onChange={ onPageChange }
                        responsive={ false }
                        showSizeChanger
                        showLessItems
                    />
                }
            </ContentBox>
        </Section>
    );
}

export default RepositoriesBoardTab;