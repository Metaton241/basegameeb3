import { useGameStore } from '../../store/gameStore';

interface InventoryProps {
    onClose: () => void;
}

export const Inventory = ({ onClose }: InventoryProps) => {
    const inventory = useGameStore((state) => state.inventory);
    const setSelectedItemId = useGameStore((state) => state.setSelectedItemId);

    const handleSelect = (itemId: string) => {
        setSelectedItemId(itemId);
        onClose();
    };

    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-3/4 max-w-4xl max-h-[80%] overflow-auto border border-neutral-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Inventory</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>

                {inventory.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Your inventory is empty.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {inventory.map((item) => (
                            <div key={item.id} className="bg-neutral-700 p-4 rounded flex flex-col gap-2">
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-300 flex-grow">{item.description}</p>

                                <button
                                    onClick={() => handleSelect(item.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold mt-2"
                                >
                                    Place
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
