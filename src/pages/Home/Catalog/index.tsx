import React, {useEffect, useState} from 'react';
import {Model, useAllModels, useHubModels} from '@app/store/models';
import {ModelList} from '@app/layout/ModelList';
import {useModelsFavorites} from '@app/store/favourites/actions';

const FilteredModelsCatalog: React.FC<{
    readonly models: Model[];
    readonly categories: string[];
}> = ({models, categories}) => {
    const favorites = useModelsFavorites();

    const allInCat = categories.indexOf('all') >= 0;
    const favInCat = categories.indexOf('favorites') >= 0;
    
    const filtered = models.filter(item => {
        if (allInCat) {
            return  true;
        }

        if (favInCat && favorites.isModelFavorite(item.id)) {
            return true;
        }

        for (let i = 0; i < categories.length; i++) {
            if (item.tags[categories[i]]) {
                return true;
            }
        }

        return false;
    })

    return (
        <ModelList items={filtered}></ModelList>
    );
}

const HubModelsCatalog: React.FC<{
    readonly hubId: string;
    readonly categories?: string[];
}> = ({hubId, categories}) => {
    const models = useHubModels(hubId);

    if (!models) {
        return null;
    }

    if (categories) {
        return <FilteredModelsCatalog models={models} categories={categories}/>
    }

    return <ModelList items={models}></ModelList>
};

const AllModelsCatalog: React.FC<{
    readonly categories?: string[];
}> = ({categories = []}) => {
    const models = useAllModels();

    if (!models) {
        return null;
    }

    if (categories) {
        return <FilteredModelsCatalog models={models} categories={categories}/>
    }

    return <ModelList items={models}></ModelList>
};

export const ModelsCatalog: React.FC<{
    readonly hubId?: string;
    readonly categories?: string[];
}> = ({hubId, categories}) => {

    if (hubId) {
        return (<HubModelsCatalog hubId={hubId} categories={categories}/>);
    }

    return (<AllModelsCatalog categories={categories}/>);
};
