import React, { ReactElement } from 'react';
import { Alert, Divider, Empty, Input, Pagination, Row, Select, Spin } from 'antd';
import RepositoryCard from './repository-card';
import { useReposSearch } from '../services/repos-search-hook';
import Section from './section';
import styled from "styled-components";


const TopicsSelectStyle = { width: '100%', marginTop: '0.2em', marginBottom: '0.5em' };
const SelectStyle = { width: '9em', margin: '0 2em' };

const RepoCardsBox = styled(Row)({
    justifyContent: 'center',
});

const FiltersWrapper = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '1em',
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


const RepositoriesBoard = () => {

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


    return (
        <Section>
            <Input.Search onSearch={ onSearchInput } size='large' placeholder='Search for repos'/>
            <Select placeholder='Topics' mode="tags" size='large' tokenSeparators={ [ ' ' ] }
                    style={ TopicsSelectStyle }
                    onChange={ onTopicSelect } onClear={ onTopicsClear }
            />
            <FiltersWrapper>
                <FilterSelectWrapper title={ 'Order by' }>
                    <Select style={ SelectStyle } bordered={ false } defaultValue={ searchFilters.order }
                            onSelect={ onOrderSelect }>
                        <Option value='asc'>Ascending</Option>
                        <Option value='desc'>Descending</Option>
                    </Select>
                </FilterSelectWrapper>
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

            </FiltersWrapper>
            {
                fetchingError
                &&
                <Alert message='Error loading data!' description={ fetchingError } type='error' closable/>
                ||
                <Divider orientation='left'>
                    { repos && 'Found: ' + repos.totalCount || 'Repositories' }
                </Divider>
            }
            <RepoCardsBox gutter={ { xs: 1, sm: 2, md: 4 } }>
                { !fetchingError && fetching && <Spin/> }
                {
                    !fetchingError && !fetching && repos.items
                    &&
                    repos.items.map(
                        repo => <RepositoryCard
                            key={ repo.id }
                            name={ repo.name }
                            description={ repo.description }
                            language={ repo.language }
                            license={ repo.license && repo.license.name || null }
                            licenseURL={ repo.license && repo.license.url || null }
                            imageURL={ repo.name }
                        />
                    )
                    ||
                    !fetchingError && !fetching && <Empty description={ false }/>
                }
            </RepoCardsBox>
            {
                !fetchingError && repos.items && repos.items.length > 1 && repos.totalCount >= 1000
                &&
                `Only first 1000 results available (${ 1000 / pagination.pageSize } pages) according github API docs.`
            }
            {
                !fetchingError && repos.items && repos.items.length > 1
                &&
                <Pagination
                    style={ { display: 'inline', marginLeft: 'auto', marginRight: 'auto' } }
                    total={ repos.totalCount >= 1000 ? 1000 : repos.totalCount }
                    pageSizeOptions={ pageSizeOptions }
                    onChange={ onPageChange }
                    responsive={ false }
                    showSizeChanger
                />
            }
        </Section>
    );
}

export default RepositoriesBoard;