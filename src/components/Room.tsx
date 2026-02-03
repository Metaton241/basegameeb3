import { useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { MinerRig } from './MinerRig';

export const Room = () => {
    const placedItems = useGameStore((state) => state.placedItems);
    const selectedItemId = useGameStore((state) => state.selectedItemId);
    const placeItem = useGameStore((state) => state.placeItem);
    const setSelectedItemId = useGameStore((state) => state.setSelectedItemId);
    const setSelectedRackId = useGameStore((state) => state.setSelectedRackId);
    const { wallColor, floorColor } = useGameStore((state) => state.roomStyles);

    const handleFloorClick = (e: any) => {
        if (selectedItemId) {
            e.stopPropagation();
            const [x, , z] = e.point;
            // Simple grid snapping
            const snappedX = Math.round(x);
            const snappedZ = Math.round(z);
            placeItem(selectedItemId, [snappedX, 0, snappedZ], [0, 0, 0]);
            setSelectedItemId(null);
        }
    };

    return (
        <group>
            {/* Floor */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.01, 0]}
                receiveShadow
                onClick={handleFloorClick}
                onPointerMissed={() => {
                    setSelectedItemId(null);
                    setSelectedRackId(null);
                }}
            >
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={selectedItemId ? "#444" : floorColor} />
            </mesh>

            {/* Walls */}
            <mesh position={[0, 2.5, -5]}>
                <boxGeometry args={[10, 5, 0.2]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>
            <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[10, 5, 0.2]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            {/* Placed Items */}
            {placedItems.map((item) => (
                <MinerRig
                    key={item.instanceId}
                    item={item}
                    onClick={() => {
                        if (item.type === 'RACK') {
                            setSelectedRackId(item.instanceId);
                        }
                    }}
                />
            ))}
        </group>
    );
};
