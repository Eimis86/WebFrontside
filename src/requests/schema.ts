/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
    readonly '/api/admin/hubAccess/assignBulk': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
            /** Request Data */
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminHubUserAssignOperation'];
                };
            };
        };
    };
    readonly '/api/admin/hubAccess/assignToHub': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminHubAccessRequest'];
                };
            };
        };
    };
    readonly '/api/admin/hubAccess/assignToUser': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminUserAccessRequest'];
                };
            };
        };
    };
    readonly '/api/admin/hubAccess/hub/{hubId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    /** Hub Id */
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminHubAccessResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/hubAccess/user/{userId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    /** User Id */
                    readonly userId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminUserAccessResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/ixr/create': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminIXRPackageResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminIXRCreateRequest'];
                };
            };
        };
    };
    readonly '/api/admin/ixr/{ixrId}': {
        readonly put: {
            readonly parameters: {
                readonly path: {
                    readonly ixrId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminIXRPackageResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminIXRCreateRequest'];
                };
            };
        };
    };
    readonly '/api/admin/ixr/{packageId}/finalize': {
        readonly post: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminIXRPackageResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/ixr/{packageId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['IXRPackageResponse'];
                    };
                };
            };
        };
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/admin/ixr/{packageId}/asset/{assetType}': {
        readonly post: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                    readonly assetType: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminIXRAssetCreateResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/ixr/{packageId}/asset/{assetId}': {
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                    readonly assetId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/admin/ixr/assetTypes': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminIXRGetAssetTypes'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/tags/forHub/{HubId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['TagListResponse'];
                    };
                };
            };
        };
        readonly post: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['TagResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminTagRequest'];
                };
            };
        };
    };
    readonly '/api/admin/tags/{TagId}': {
        readonly put: {
            readonly parameters: {
                readonly path: {
                    readonly tagId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['TagResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminTagRequest'];
                };
            };
        };
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly tagId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/favourites/hub': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['HubListResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/favourites/hub/{hubId}': {
        readonly post: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/favourites/package': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['FavouritePackagesResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/favourites/package/{packageId}': {
        readonly post: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/hub/all': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['HubListResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/hub/my': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['HubListResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/hub/{hubId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['HubDetailsResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/hub/{hubId}/byTag/{tagId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                    readonly tagId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['HubDetailsResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/hub/all': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminHubListResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/admin/hub/{hubId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminHubResponse'];
                    };
                };
            };
        };
        readonly put: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminHubResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminHubRequest'];
                };
            };
        };
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/admin/hub/create': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['AdminHubResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['AdminHubRequest'];
                };
            };
        };
    };
    readonly '/api/ixr/{packageId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly packageId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['IXRPackageResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/notification/share/model': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['NotificationShareModelRequest'];
                };
            };
        };
    };
    readonly '/api/service/populateDatabase': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/service/error': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['HubListResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/stepByStep/create': {
        readonly post: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['StepByStepResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['StepByStepCreateRequest'];
                };
            };
        };
    };
    readonly '/api/stepByStep/{entryId}': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly entryId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['StepByStepResponse'];
                    };
                };
            };
        };
        readonly put: {
            readonly parameters: {
                readonly path: {
                    readonly entryId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['StepByStepResponse'];
                    };
                };
            };
            readonly requestBody: {
                readonly content: {
                    readonly 'application/json': components['schemas']['StepByStepCreateRequest'];
                };
            };
        };
        readonly delete: {
            readonly parameters: {
                readonly path: {
                    readonly entryId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: unknown;
            };
        };
    };
    readonly '/api/stepByStep': {
        readonly get: {
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['StepByStepResponse'];
                    };
                };
            };
        };
    };
    readonly '/api/tags/byHub/{HubId}/list': {
        readonly get: {
            readonly parameters: {
                readonly path: {
                    readonly hubId: string;
                };
            };
            readonly responses: {
                /** Success */
                readonly 200: {
                    readonly content: {
                        readonly 'application/json': components['schemas']['TagListResponse'];
                    };
                };
            };
        };
    };
};

export type components = {
    readonly schemas: {
        readonly AdminHubAccessRequest: {
            readonly data?: components['schemas']['AdminHubAccessRequestStruct'];
        };
        readonly AdminHubAccessRequestPair: {
            /** Format: uuid */
            readonly userId?: string;
            readonly access?: components['schemas']['HubAccessLevel'];
        };
        readonly AdminHubAccessRequestStruct: {
            /** Format: uuid */
            readonly hubId?: string;
            readonly setAsDefault?: boolean;
            readonly replaceAllExisting?: boolean;
            readonly users?:
                | readonly components['schemas']['AdminHubAccessRequestPair'][]
                | null;
        };
        readonly AdminHubAccessResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['AdminHubAccessResponseStruct'][]
                | null;
        };
        readonly AdminHubAccessResponseStruct: {
            /** Format: uuid */
            readonly userId?: string;
            readonly userName?: string | null;
            readonly userEmail?: string | null;
            readonly access?: components['schemas']['HubAccessLevel'];
            readonly isDefault?: boolean;
            /** Format: date-time */
            readonly lastChange?: string;
        };
        readonly AdminHubListResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['AdminHubStruct'][]
                | null;
        };
        readonly AdminHubRequest: {
            readonly data?: components['schemas']['AdminHubStruct'];
        };
        readonly AdminHubResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: components['schemas']['AdminHubStruct'];
        };
        readonly AdminHubStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            /** Format: byte */
            readonly imagePreview?: string | null;
            readonly defaultAccess?: components['schemas']['HubAccessLevel'];
            /** Format: int32 */
            readonly order?: number;
        };
        readonly AdminHubUserAssignOperation: {
            readonly data?:
                | readonly components['schemas']['HubAssignOperationStruct'][]
                | null;
        };
        readonly AdminIXRAssetCreateResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: components['schemas']['IXRAssetCreateStruct'];
        };
        readonly AdminIXRCreateRequest: {
            readonly data?: components['schemas']['IXRCreateData'];
        };
        readonly AdminIXRGetAssetTypes: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: {readonly [key: string]: string} | null;
        };
        readonly AdminIXRPackageResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: components['schemas']['IXRAdminPackageStruct'];
        };
        readonly AdminTagRequest: {
            readonly data?: components['schemas']['AdminTagRequestStruct'];
        };
        readonly AdminTagRequestStruct: {
            readonly name?: string | null;
            readonly description?: string | null;
        };
        readonly AdminUserAccessRequest: {
            readonly data?: components['schemas']['AdminUserAccessRequestStruct'];
        };
        readonly AdminUserAccessRequestPair: {
            /** Format: uuid */
            readonly hubId?: string;
            readonly access?: components['schemas']['HubAccessLevel'];
            readonly setAsDefault?: boolean;
        };
        readonly AdminUserAccessRequestStruct: {
            /** Format: uuid */
            readonly userId?: string;
            readonly replaceAllExisting?: boolean;
            readonly hubs?:
                | readonly components['schemas']['AdminUserAccessRequestPair'][]
                | null;
        };
        readonly AdminUserAccessResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['AdminUserAccessResponseStruct'][]
                | null;
        };
        readonly AdminUserAccessResponseStruct: {
            /** Format: uuid */
            readonly hubId?: string;
            readonly hubName?: string | null;
            readonly access?: components['schemas']['HubAccessLevel'];
            readonly isDefault?: boolean;
            /** Format: date-time */
            readonly lastChange?: string;
        };
        /** @enum {string} */
        readonly AssetEnum:
            | 'Undefined'
            | 'Audio'
            | 'Model'
            | 'Image'
            | 'Video'
            | 'Manual'
            | 'Scene'
            | 'Simulation'
            | 'Preview'
            | 'UnitypackageAndroid'
            | 'UnitypackageIos'
            | 'SingleGltf'
            | 'UnitypackageWeb';
        readonly FavouritePackagesResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['IXRPackageStruct'][]
                | null;
        };
        /**
         * @description Hubs access level types
         * @enum {string}
         */
        readonly HubAccessLevel: 'NoAccess' | 'List' | 'Read' | 'Write';
        readonly HubAssignOperationStruct: {
            /** Format: uuid */
            readonly userId?: string;
            /** Format: uuid */
            readonly hubId?: string;
            readonly accessLevel?: components['schemas']['HubAccessLevel'];
            readonly setDefault?: boolean;
        };
        readonly HubDetailsResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: components['schemas']['HubDetailsStruct'];
        };
        readonly HubDetailsStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            /** Format: byte */
            readonly imagePreview?: string | null;
            readonly packages?:
                | readonly components['schemas']['IXRPackageStruct'][]
                | null;
        };
        readonly HubListResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['HubStruct'][]
                | null;
        };
        readonly HubStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            /** Format: byte */
            readonly imagePreview?: string | null;
            readonly isDefault?: boolean;
        };
        readonly IXRAdminPackageStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            /** Format: uuid */
            readonly hubId?: string;
            readonly preview?: components['schemas']['IXRAssetStruct'];
            readonly prefabName?: string | null;
            readonly flags?: {readonly [key: string]: string} | null;
            readonly isFinalized?: boolean;
            readonly tags?: {readonly [key: string]: string} | null;
            readonly assets?:
                | readonly components['schemas']['IXRAssetStruct'][]
                | null;
        };
        readonly IXRAssetCreateStruct: {
            /** Format: uuid */
            readonly id?: string;
        };
        readonly IXRAssetStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly hash?: string | null;
            readonly description?: string | null;
            readonly url?: string | null;
            readonly contentType?: string | null;
            /** Format: int32 */
            readonly size?: number;
            readonly type?: components['schemas']['AssetEnum'];
            /** Format: date-time */
            readonly createdAt?: string;
            /** Format: int64 */
            readonly version?: number;
        };
        readonly IXRCreateData: {
            /** Format: uuid */
            readonly hub?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            readonly tags?: readonly string[] | null;
            readonly flags?: {readonly [key: string]: string} | null;
        };
        readonly IXRPackageResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: components['schemas']['IXRPackageStruct'];
        };
        readonly IXRPackageStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            /** Format: uuid */
            readonly hubId?: string;
            readonly preview?: components['schemas']['IXRAssetStruct'];
            readonly prefabName?: string | null;
            readonly flags?: {readonly [key: string]: string} | null;
            readonly tags?: {readonly [key: string]: string} | null;
            readonly assets?:
                | readonly components['schemas']['IXRAssetStruct'][]
                | null;
            readonly scenes?:
                | readonly components['schemas']['IXRAssetStruct'][]
                | null;
            readonly manuals?:
                | readonly components['schemas']['IXRAssetStruct'][]
                | null;
            readonly simulations?:
                | readonly components['schemas']['IXRAssetStruct'][]
                | null;
        };
        readonly NotificationShareModelRequest: {
            readonly auth?: string | null;
            readonly data?: components['schemas']['NotificationShareModelRequestData'];
        };
        readonly NotificationShareModelRequestData: {
            readonly emailList?: readonly string[] | null;
            readonly modelId?: string | null;
        };
        readonly StepByStepCreateRequest: {
            readonly data?: components['schemas']['StepByStepCreateRequestData'];
        };
        readonly StepByStepCreateRequestData: {
            readonly name?: string | null;
            readonly description?: string | null;
            readonly data?: string | null;
            readonly platform?: string | null;
        };
        readonly StepByStepResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['StepByStepResponseStruct'][]
                | null;
        };
        readonly StepByStepResponseStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            readonly fileUrl?: string | null;
        };
        readonly TagListResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?:
                | readonly components['schemas']['TagStruct'][]
                | null;
        };
        readonly TagResponse: {
            /** Format: int32 */
            readonly code?: number;
            readonly message?: string | null;
            readonly messageTitle?: string | null;
            readonly data?: components['schemas']['TagStruct'];
        };
        readonly TagStruct: {
            /** Format: uuid */
            readonly id?: string;
            readonly name?: string | null;
            readonly description?: string | null;
            /** Format: int32 */
            readonly count?: number;
        };
    };
};

export type operations = {};

export type external = {};

export enum ApiPaths {
    PostApiAdminHubAccessAssignBulk = '/api/admin/hubAccess/assignBulk',
    PostApiAdminHubAccessAssignToHub = '/api/admin/hubAccess/assignToHub',
    PostApiAdminHubAccessAssignToUser = '/api/admin/hubAccess/assignToUser',
    GetApiAdminHubAccessHub = '/api/admin/hubAccess/hub/:hubId',
    GetApiAdminHubAccessUser = '/api/admin/hubAccess/user/:userId',
    PostApiAdminIxrCreate = '/api/admin/ixr/create',
    PutApiAdminIxr = '/api/admin/ixr/:ixrId',
    PostApiAdminIxrFinalize = '/api/admin/ixr/:packageId/finalize',
    DeleteApiAdminIxr = '/api/admin/ixr/:packageId',
    GetApiAdminIxr = '/api/admin/ixr/:packageId',
    PostApiAdminIxrAsset = '/api/admin/ixr/:packageId/asset/:assetType',
    DeleteApiAdminIxrAsset = '/api/admin/ixr/:packageId/asset/:assetId',
    GetApiAdminIxrAssetTypes = '/api/admin/ixr/assetTypes',
    GetApiAdminTagsForHub = '/api/admin/tags/forHub/:HubId',
    PostApiAdminTagsForHub = '/api/admin/tags/forHub/:HubId',
    PutApiAdminTags = '/api/admin/tags/:TagId',
    DeleteApiAdminTags = '/api/admin/tags/:TagId',
    GetApiFavouritesHub = '/api/favourites/hub',
    PostApiFavouritesHub = '/api/favourites/hub/:hubId',
    DeleteApiFavouritesHub = '/api/favourites/hub/:hubId',
    GetApiFavouritesPackage = '/api/favourites/package',
    PostApiFavouritesPackage = '/api/favourites/package/:packageId',
    DeleteApiFavouritesPackage = '/api/favourites/package/:packageId',
    GetApiHubAll = '/api/hub/all',
    GetApiHubMy = '/api/hub/my',
    GetApiHub = '/api/hub/:hubId',
    GetApiHubByTag = '/api/hub/:hubId/byTag/:tagId',
    GetApiAdminHubAll = '/api/admin/hub/all',
    GetApiAdminHub = '/api/admin/hub/:hubId',
    PutApiAdminHub = '/api/admin/hub/:hubId',
    DeleteApiAdminHub = '/api/admin/hub/:hubId',
    PostApiAdminHubCreate = '/api/admin/hub/create',
    GetApiIxr = '/api/ixr/:packageId',
    PostApiNotificationShareModel = '/api/notification/share/model',
    GetApiServicePopulateDatabase = '/api/service/populateDatabase',
    GetApiServiceError = '/api/service/error',
    PostApiStepByStepCreate = '/api/stepByStep/create',
    PutApiStepByStep = '/api/stepByStep/:entryId',
    DeleteApiStepByStep = '/api/stepByStep/:entryId',
    GetApiStepByStep = '/api/stepByStep/:entryId',
    GetApiStepByStepList = '/api/stepByStep',
    GetApiTagsByHubList = '/api/tags/byHub/:HubId/list',
}