import { useGameStore } from '../../store/gameStore';

interface RackManagerProps {
    rackId: string;
    onClose: () => void;
}

export const RackManager = ({ rackId, onClose }: RackManagerProps) => {
    const inventory = useGameStore((state) => state.inventory);
    const placedItems = useGameStore((state) => state.placedItems);
    const equipItem = useGameStore((state) => state.equipItem);

    const rack = placedItems.find(i => i.instanceId === rackId);
    if (!rack) return null;

    const gpusInInventory = inventory.filter(i => i.type === 'GPU');

    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-2xl border border-neutral-700">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{rack.name}</h2>
                        <p className="text-gray-400 text-sm">Slots occupied: {rack.children?.length || 0} / {rack.slots}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Rack Contents */}
                    <div className="bg-neutral-900/50 p-4 rounded border border-neutral-700">
                        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Installed GPUs</h3>
                        {(!rack.children || rack.children.length === 0) ? (
                            <div className="text-gray-600 text-center py-8 border-2 border-dashed border-neutral-800 rounded">No GPUs installed</div>
                        ) : (
                            <div className="space-y-2">
                                {rack.children.map(gpu => (
                                    <div key={gpu.instanceId} className="bg-neutral-700 p-2 rounded flex justify-between items-center">
                                        <span className="text-sm font-medium">{gpu.name}</span>
                                        <span className="text-xs text-green-400">{gpu.hashrate} MH/s</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Available GPUs */}
                    <div className="bg-neutral-900/50 p-4 rounded border border-neutral-700">
                        <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3">Your Inventory</h3>
                        {gpusInInventory.length === 0 ? (
                            <div className="text-gray-600 text-center py-8 rounded">No GPUs available</div>
                        ) : (
                            <div className="space-y-2">
                                {gpusInInventory.map(gpu => (
                                    <button
                                        key={gpu.id}
                                        onClick={() => equipItem(rackId, gpu.id)}
                                        disabled={(rack.children?.length || 0) >= (rack.slots || 0)}
                                        className="w-full bg-neutral-700 hover:bg-neutral-600 disabled:opacity-30 p-2 rounded flex justify-between items-center transition-colors group"
                                    >
                                        <div className="text-left">
                                            <div className="text-sm font-medium group-hover:text-white">{gpu.name}</div>
                                            <div className="text-[10px] text-gray-400">{gpu.hashrate} MH/s</div>
                                        </div>
                                        <span className="bg-blue-600 text-[10px] px-1.5 py-0.5 rounded text-white font-bold">Install</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-2 px-6 rounded transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
