import {ApiTypes} from '@app/requests/types';
import {Model, ModelAsset, ModelManual} from '@app/store/models';

export function modelFromApi(model: ApiTypes['IXRPackageStruct']): Model {
    return {
        id: model.id!,
        name: model.name || '',
        description: model.description || '',
        prefab: model.prefabName || '',
        tags: model.tags || {},
        image: model.preview!.url || '',
        manual: model.assets?.find(item => item.contentType==='application/json')?.url || '',
        hasModel: !!model.flags && (model.flags['hasModel'] === 'true'),
        hasManual: !!model.flags && (model.flags['hasManual'] === 'true'),
        hubId: model.hubId!
    };
}


export function parseManual(manualSrc: {Manuals: string[];}) {
    const manual: ModelManual = {
        chapters: [],
        index: []
    };

    manualSrc.Manuals.forEach(item => {
        const data = item.split('^');

        if (data[0] === 'I' && data[1] === 'Index') {
            manual.index.push({
                name: data[2],
                chapters: data.slice(3, data.length)
            });
        }

        if (Number.isFinite(Number(data[0]))) {
            manual.chapters.push({
                heading: data[1],
                steps: data.slice(2, data.length)
            });
        }
    });

    return manual;
}
