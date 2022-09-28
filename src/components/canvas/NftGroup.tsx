import React, { useRef, useEffect, useState } from 'react'
import { NftDisplay } from '@/components/canvas/NftDisplay'


import { UseAddressTokens, NftTokenInfo, ResponseStatus, NftTokenResponse } from '@/hooks/UseAddressTokens'


export const NftGroup = (props) => {
    const groupMesh = useRef(null);
    const initialPos = props.initialPos ?  props.initialPos : [0, 0, 0]
    const [groupPosition, setGroupPosition] = useState(initialPos)
    // NB: need to turn ENS into address in order to check owner history in response
    const tokenResults = UseAddressTokens("0x50F27CdB650879A41fb07038bF2B818845c20e17");
    if (!tokenResults) {
        return null;
    }
    if (tokenResults.status != 'success') {
        return null;
    }
    const tokenInfoArray = tokenResults.data.nfts;
    const nftDisplayArray = tokenInfoArray.map((tokenInfo, index) => {
        const column = index % 3;
        const columnOffset = column * 2;
        const row = Math.floor(index / 3);
        const rowOffset = row * -2.5;
        return <NftDisplay key={tokenInfo.id} tokenInfo={tokenInfo} initialPos={[columnOffset, 0, rowOffset]} />
    })
    return (
        <>
            <group ref={groupMesh} position={groupPosition}>
                {nftDisplayArray}
            </group>
        </>        
    );
}