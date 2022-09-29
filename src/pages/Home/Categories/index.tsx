import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles.scss';

import {RoundButton} from '@app/components/Button';
import {useAllHubTags, useHubTags} from '@app/store/hubs/actions';
import {log} from '@app/utils/debug';

export interface CategoryItem {
    readonly id: string;
    readonly name: string;
}

export interface CategoriesProps {
    readonly categories: CategoryItem[];
    readonly selected?: string[];
    readonly onSelect: (categoryId: string) => void;
}

export const Categories: React.FC<{
    readonly categories: CategoryItem[];
    readonly selected: string[];
    readonly onSelect: (categories: string[]) => void;
}> = ({categories, selected, onSelect}) => {
    useEffect(() => {
        onSelect(selected);
    }, [selected])

    function onCategorySelected(categoryId: string) {
        if (categoryId === 'all') {
            onSelect(['all'])
        } else {
            const newSelected = selected.indexOf(categoryId) >= 0
                ? selected.filter(item => item !== categoryId)
                : [...selected.filter(item => item !== 'all'), categoryId];

            if (newSelected.length) {
                onSelect(newSelected);
            } else {
                onSelect(['all'])
            }
        }
    }

    const isSelected = (categoryId: string) => selected?.indexOf(categoryId) >= 0;

    return (
        <div className={styles.categories}>
            {categories.map((item) => (
                <RoundButton
                    key={item.id}
                    title={item.name}
                    isSelected={isSelected(item.id)}
                    onClick={() => onCategorySelected(item.id)}
                />
            ))}
        </div>
    );
}


export const HubCategories: React.FC<{
    readonly hubId: string;
    readonly selected: string[];
    readonly onSelect: (categories: string[]) => void;
}> = ({hubId, selected, onSelect}) => {
    const tags = useHubTags(hubId);

    const categories = useMemo(() => [
        {id: 'all', name: 'All'},
        {id: 'favorites', name: 'Favorites'},
        ...tags || []
    ], [tags]);

    return <Categories categories={categories} selected={selected} onSelect={onSelect}/>
}

export const AllHubCategories: React.FC<{
    readonly selected: string[];
    readonly onSelect: (categories: string[]) => void;
}> = ({selected, onSelect}) => {
    const tags = useAllHubTags();

    const categories = useMemo(() => [
        {id: 'all', name: 'All'},
        {id: 'favorites', name: 'Favorites'},
        ...tags || []
    ], [tags]);

    return <Categories categories={categories} selected={selected} onSelect={onSelect}/>
}
