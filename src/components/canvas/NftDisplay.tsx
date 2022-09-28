// ThreeJS component which displays image on a box with a texture
// Language: typescript
import { NftTokenInfo, ResponseStatus, NftTokenResponse } from '@/hooks/UseAddressTokens'

import React, { useRef, useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'


export const NftDisplay = (props) => {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const imageUrl: string = props.tokenInfo.previewImageMedium;
    const colorMap = useLoader(TextureLoader, imageUrl)

    console.log(`RENDERING NFT FISPLAY ${imageUrl}`);

    return (
        <>
            <mesh
                ref={mesh}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                scale={hovered ? 1.1 : 1}
            >
                <boxBufferGeometry args={[0.1, 2, 1]} />
                <meshPhysicalMaterial map={colorMap} />
            </mesh>
        </>
    )
}