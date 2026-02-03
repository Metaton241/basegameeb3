import { useGameStore } from '../../store/gameStore';
import { SHOP_ITEMS } from '../../constants/items';

interface ShopProps {
    onClose: () => void;
}

export const Shop = ({ onClose }: ShopProps) => {
    const buyItem = useGameStore((state) => state.buyItem);
    const money = useGameStore((state) => state.money);

    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-neutral-800 p-6 rounded-lg w-3/4 max-w-4xl max-h-[80%] overflow-auto border border-neutral-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Shop</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SHOP_ITEMS.map((item) => (
                        <div key={item.id} className="bg-neutral-700 p-4 rounded flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <span className="text-green-400 font-mono">${item.price}</span>
                            </div>
                            <p className="text-sm text-gray-300 flex-grow">{item.description}</p>

                            {item.hashrate && (
                                <div className="text-xs text-blue-300">
                                    Hashrate: {item.hashrate} MH/s
                                </div>
                            )}

                            <button
                                disabled={money < item.price}
                                onClick={() => buyItem(item)}
                                className={`px-4 py-2 rounded font-bold mt-2 ${money >= item.price
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Buy
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
