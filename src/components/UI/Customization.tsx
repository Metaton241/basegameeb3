import { useGameStore } from '../../store/gameStore';

interface CustomizationProps {
    onClose: () => void;
}

export const Customization = ({ onClose }: CustomizationProps) => {
    const { wallColor, floorColor } = useGameStore((state) => state.roomStyles);
    const updateRoomStyles = useGameStore((state) => state.updateRoomStyles);

    const colors = [
        '#333333', '#555555', '#777777', '#999999',
        '#2d3436', '#636e72', '#b2bec3', '#dfe6e9',
        '#1e272e', '#485460', '#808e9b', '#d2dae2',
        '#574b90', '#904e95', '#e95950', '#fdbb2d',
        '#1abc9c', '#2ecc71', '#3498db', '#9b59b6'
    ];

    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-3/4 max-w-lg border border-neutral-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Room Stylist</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-bold text-gray-300 mb-3">Wall Color</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => updateRoomStyles({ wallColor: color })}
                                    className={`w-full aspect-square rounded border-2 ${wallColor === color ? 'border-yellow-400' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-gray-300 mb-3">Floor Color</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => updateRoomStyles({ floorColor: color })}
                                    className={`w-full aspect-square rounded border-2 ${floorColor === color ? 'border-yellow-400' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded mt-8"
                >
                    Done
                </button>
            </div>
        </div>
    );
};
