export type ModelAssetType =
    |'Undefined'
    |'Audio'
    |'Model'
    |'Image'
    |'Video'
    |'Manual'
    |'Scene'
    |'Simulation'
    |'Preview'
    |'UnitypackageAndroid'
    |'UnitypackageIos'
    |'SingleGltf';

export type ModelAsset = {
    readonly id: string;
    readonly hash: string;
    readonly description?: string;
    readonly url: string;
    readonly contentType: string;
    readonly size: number;
    readonly type: ModelAssetType;
}

export type Model = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly prefab: string;
    readonly image: string;
    readonly tags: Record<string, string>;
    readonly manual: string;
    readonly hasModel: boolean
    readonly hasManual: boolean
    readonly hubId: string;
}

export type Models = Model[];

export type IndexTerm = {
    readonly name: string;
    readonly chapters: string[];
};
export type IndexTerms = IndexTerm[];

export type Chapter = {
    heading: string;
    steps: string[];
};

export type Chapters = Chapter[];

export type ModelManual = {
    readonly chapters: Chapters;
    readonly index: IndexTerms;
}
