import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const Character = () => {
    const ref = useRef<Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            // Simple idle animation
            ref.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <mesh ref={ref} position={[0, 1, 0]} castShadow>
            <capsuleGeometry args={[0.5, 2, 4, 8]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};
