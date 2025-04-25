import React from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function LyricsText3D({ text }) {
    const textRef = React.useRef();

    useFrame((state) => {
        if (textRef.current) {
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <Text
            ref={textRef}
            fontSize={0.5}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={'center'}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrE.woff2"
            color="#ff6b6b"
            anchorX="center"
            anchorY="middle"
        >
            {text}
            <meshStandardMaterial
                color="#ff6b6b"
                metalness={0.8}
                roughness={0.2}
            />
        </Text>
    );
} 