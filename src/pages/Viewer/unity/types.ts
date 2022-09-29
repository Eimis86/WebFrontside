export enum UnityFeatures {
    'xRay' = 'x-ray',
    'highlight' = 'highlight',
    'expand' = 'expand',
    'crossSection' = 'cross-section',
    'manual' = 'manual'
}


export interface UnityState {
    readonly model?: string;
    readonly isReady: boolean;
    readonly loading: {
        state: 'empty' | 'progress' | 'loaded';
        progress: number;
    };
}

export interface PlayerPosition {
    readonly chapter: number;
    readonly step: number;
}
export interface PlayerState{
    readonly isReady: boolean;
    readonly isPlaying: boolean;
    readonly position?: PlayerPosition;
}

export type FeaturesState = {
    [key in UnityFeatures]?: boolean;
}
