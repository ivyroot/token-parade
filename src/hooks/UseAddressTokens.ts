import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { resolveSoa } from 'dns';

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

const parseSimpleHashInfo = (token: any, address: string): NftTokenInfo => {
    const ownerHistory = token.owners.find(t => t.owner_address == address)
    const purchaseDate = ownerHistory ? ownerHistory.first_acquired_date : '2022-09-27T00:00:00.000Z'
    const purchaseTimestamp = Date.parse(purchaseDate)
    return {
        id: token.nft_id,
        name: token.name,
        collectionName: token.collection.name,
        previewImageMedium: token.previews.image_medium_url,
        purchaseDate: purchaseDate,
        purchaseTimestamp: purchaseTimestamp,
    };
}

const callSimpleHashAPI = async (url: string) => {
    if (!url) {
        return new Promise((resolve, reject) => {
            const blankResult = {
                    nfts: [],
                    initialData: true
                }
            resolve({
                json: () => blankResult
            })
        });
    } else {
        console.log(`CALLING SIMPLE HASH API: ${url}`)
        return fetch(url,
                        {
                            headers: {
                            "Content-Type": "application/json",
                            "X-API-KEY": process.env.NEXT_PUBLIC_ANALYTICS_ID,
                            },
                        })
                    }
}

export const UseAddressTokens = (address: string): NftTokenResponse => {
    const fetchTokens = (url: string) => callSimpleHashAPI(url).then((res) => res.json());

    const queryKey1 = `tokensPage1${address}`;
    const urlStart = `https://api.simplehash.com/api/v0/nfts/owners?chains=ethereum&wallet_addresses=${address}`
    const { isLoading, isError, data, error } = useQuery([queryKey1], () => fetchTokens(urlStart));

    const query2Active = (data && data.next) ? true : false
    const page2Url = data ? data.next : null;
    const query2Key = `tokensPage2${address}-${query2Active}`;
    const { isLoading: isLoading2, isError: isError2, data: dataPageTwo, error: error2 } = useQuery([query2Key, query2Active], () => fetchTokens(page2Url));

    if (isLoading) {
        return { status: "progress", data: {} };
    }

    if (isError) {
        return { status: "error", error: error, data: {} };
    }

    const fullNfts = [ ...data.nfts, ...(dataPageTwo ? dataPageTwo.nfts : []) ]

    const tokens = fullNfts.map((token: any) => {
       return parseSimpleHashInfo(token, address);
    })

    const result = {
        nfts: tokens,
        more: false
    }

    return { status: "success", data: result };

}

