import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

export interface NftTokenInfo {
    id: string;
    name: string;
    collectionName: string;
    previewImageMedium: string | null;
    purchaseDate: string;
    purchaseTimestamp: number;
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
    const fetchTokens = () =>
        fetch(
        `https://api.simplehash.com/api/v0/nfts/owners?chains=ethereum&wallet_addresses=${address}`,
        {
            headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_ANALYTICS_ID,
            },
        }
        ).then((res) => res.json());

    const queryKey = `tokens.${address}`;
    const { isLoading, isError, data, error } = useQuery([queryKey], fetchTokens);

    if (isLoading) {
        return { status: "progress", data: {} };
    }

    if (isError) {
        return { status: "error", error: error, data: {} };
    }

    const tokens = data.nfts.map((token: any) => {
        const ownerHistory = token.owners.find(t => t.owner_address == address)
        const purchaseDate = ownerHistory ? ownerHistory.first_acquired_date : '2022-09-27T00:00:00.000Z'
        const purchaseTimestamp = Date.parse(purchaseDate)
        return {
            id: token.token_id,
            name: token.name,
            collectionName: token.collection.name,
            previewImageMedium: token.previews.image_medium_url,
            purchaseDate: purchaseDate,
            purchaseTimestamp: purchaseTimestamp,
        };
    })

    const result = {
        nfts: tokens,
        more: false
    }

    return { status: "success", data: result };

}

