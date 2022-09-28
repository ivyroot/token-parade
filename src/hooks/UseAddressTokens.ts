
export interface NftTokenInfo {
    id: string;
    name: string;
    collectionName: string;
    previewImageMedium: string | null;
}

export enum ResponseStatus {
    Success = 'success',
    Error = 'error',
    Progress = 'progress'
}

export interface NftTokenResponse {
    status: ResponseStatus;
    data: NftTokenInfo[] | null;
}

export const UseAddressTokens = (address: string): NftTokenResponse => {
    const demoToken: NftTokenInfo = {
        "id": "iwefuhwiefuhiwefu:2",
        "name": "Demo Token 2",
        "collectionName": "Demo Collection",
        "previewImageMedium": "https://lh3.googleusercontent.com/oJiJI0fdxwHMw-JEpe-hr7sV75REOnxJ92UWhnk9r8xMQLa_eJY8YfHacL_HKcZiqgpDdahc2dErZ0HPJrSZQyl9lheFJhAsVQ"
    };
    const demoToken2: NftTokenInfo = {
        "id": "iwefuhwiefuhiwefu:34",
        "name": "Demo Token 34",
        "collectionName": "Demo Collection",
        "previewImageMedium": "https://lh3.googleusercontent.com/oJiJI0fdxwHMw-JEpe-hr7sV75REOnxJ92UWhnk9r8xMQLa_eJY8YfHacL_HKcZiqgpDdahc2dErZ0HPJrSZQyl9lheFJhAsVQ"
    };
    return {
        status: ResponseStatus['Success'],
        data: [demoToken, demoToken2]
    };
}

