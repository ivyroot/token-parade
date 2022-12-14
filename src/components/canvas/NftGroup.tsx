import React, { useRef, useEffect, useState } from 'react'
import { NftDisplay } from '@/components/canvas/NftDisplay'
import { useFrame } from '@react-three/fiber'
import { UseParadeState, ParadeState  } from '@/hooks/UseParadeState'
import { UseEns } from '@/hooks/UseEns'

import { UseAddressTokens, NftTokenInfo, NftTokenResponse } from '@/hooks/UseAddressTokens'


export const NftGroup = (props) => {
    const groupMesh = useRef(null);
    const initialPos = props.initialPos ?  props.initialPos : [0, 0, 0]
    const [startTime, setstartTime] = useState(Date.now());
    if (props.startedAt && props.startedAt != startTime) {
        if (groupMesh.current) {
            groupMesh.current.position.z = 0;
        }
        setstartTime(props.startedAt);
    }

    useFrame((state, delta) => {
        if (groupMesh.current) {
            groupMesh.current.position.z = groupMesh.current.position.z += 0.01
        }
    })
    const paradeOwner = UseParadeState((state) => state.addressValue)
    // NB: need to turn ENS into address in order to check owner history in SimpleHash response
    const ensLookup = UseEns(paradeOwner)
    const paradeOwnerAddress = (ensLookup && ensLookup.address) ? ensLookup.address : null

    const tokenResults = UseAddressTokens(paradeOwnerAddress);
    if (!tokenResults) {
        return null;
    }
    if (tokenResults.status != 'success') {
        return null;
    }

    const nftDisplayArray = tokenResults.nfts.map((tokenInfo, index) => {
        const column = index % 3;
        const columnOffset = 2.25 + column * 3.5;
        const row = Math.floor(index / 3);
        const rowOffset = row * -4;
        return <NftDisplay key={tokenInfo.id} onFocus={props.onFocus} tokenInfo={tokenInfo} initialPos={[columnOffset, 0, rowOffset]} />
    })
    return (
        <>
            <group ref={groupMesh} position={initialPos}>
                {nftDisplayArray}
            </group>
        </>        
    );
}