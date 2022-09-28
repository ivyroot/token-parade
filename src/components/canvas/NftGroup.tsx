import React, { useRef, useEffect, useState } from 'react'
import { NftDisplay } from '@/components/canvas/NftDisplay'
import { NftTokenInfo, ResponseStatus, NftTokenResponse } from '@/hooks/UseAddressTokens'

export const NftGroup = (props) => {
    const groupMesh = useRef(null);
    if (!props.tokenResponse) {
        return null;
    }
    if (props.tokenResponse.status != 'success') {
        return null;
    }
    const initialPos = props.initialPos ?  props.initialPos : [0, 0, 0]
    const [groupPosition, setGroupPosition] = useState(initialPos)
    const tokenInfoArray = props.tokenResponse.data;
    const nftDisplayArray = tokenInfoArray.map((tokenInfo, index) => {
        return <NftDisplay key={tokenInfo.id} tokenInfo={tokenInfo} initialPos={[index * 2, 0, 0]} />
    })
    return (
        <>
            <group ref={groupMesh} position={groupPosition}>
                {nftDisplayArray}
            </group>
        </>        
    );
}