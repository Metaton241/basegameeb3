import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlacedItem } from '../types';

interface MinerRigProps {
    item: PlacedItem;
    onClick?: () => void;
}

export const MinerRig = ({ item, onClick }: MinerRigProps) => {
    const fan1Ref = useRef<THREE.Mesh>(null);
    const fan2Ref = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (fan1Ref.current) fan1Ref.current.rotation.z += delta * 15;
        if (fan2Ref.current) fan2Ref.current.rotation.z += delta * 15;
    });

    return (
        <group
            position={item.position}
            rotation={item.rotation}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            {/* Rack Frame */}
            <Box args={[1, 2, 0.5]} position={[0, 1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </Box>

            {/* Shelves/GPUs Area */}
            <group position={[0, 0.5, 0]}>
                {/* Visual Fans */}
                <mesh position={[0.3, 0.4, 0.26]} rotation={[0, 0, 0]} ref={fan1Ref}>
                    <circleGeometry args={[0.2, 8]} />
                    <meshStandardMaterial color="#111" side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[-0.3, 0.4, 0.26]} rotation={[0, 0, 0]} ref={fan2Ref}>
                    <circleGeometry args={[0.2, 8]} />
                    <meshStandardMaterial color="#111" side={THREE.DoubleSide} />
                </mesh>

                {/* Installed GPUs */}
                {item.children?.map((child, idx) => (
                    <group key={child.instanceId} position={[0, idx * 0.35, 0]}>
                        <mesh>
                            <boxGeometry args={[0.8, 0.1, 0.4]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                        <mesh position={[0.35, 0, 0.21]}>
                            <boxGeometry args={[0.05, 0.05, 0.01]} />
                            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
                        </mesh>
                    </group>
                ))}
            </group>

            <Html position={[0, 2.2, 0]} center>
                <div className="bg-black/90 text-white px-2 py-1 rounded text-[10px] whitespace-nowrap border border-blue-500/30 flex items-center gap-2">
                    <span className="font-bold text-blue-400">{item.name}</span>
                    <span className="bg-blue-500/20 px-1 rounded">{item.children?.length || 0} / {item.slots || 0}</span>
                </div>
            </Html>
        </group>
    );
};
