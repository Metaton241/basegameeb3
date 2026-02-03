import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useMarketStore } from '../../store/marketStore';
import { Shop } from './Shop';
import { Inventory } from './Inventory';
import { Customization } from './Customization';
import { RackManager } from './RackManager';

export const Interface = () => {
    const { money, crypto, stats } = useGameStore();
    const { prices } = useMarketStore();
    const [showShop, setShowShop] = useState(false);
    const [showInventory, setShowInventory] = useState(false);
    const [showCustomization, setShowCustomization] = useState(false);
    const selectedItemId = useGameStore((state) => state.selectedItemId);
    const selectedRackId = useGameStore((state) => state.selectedRackId);
    const setSelectedRackId = useGameStore((state) => state.setSelectedRackId);

    return (
        <div className="w-full h-full p-4 pointer-events-auto flex flex-col justify-between">
            {/* Top HUD */}
            <div className="flex justify-between items-start">
                <div className="bg-black/50 p-4 rounded backdrop-blur-md">
                    <div className="text-2xl font-bold text-green-400">${money.toFixed(2)}</div>
                    <div className="text-sm text-gray-300">BTC: {crypto.btc.toFixed(6)} (<span className="text-yellow-400">${prices.btc.toFixed(0)}</span>)</div>
                    <div className="text-sm text-gray-300">ETH: {crypto.eth.toFixed(6)} (<span className="text-purple-400">${prices.eth.toFixed(0)}</span>)</div>
                </div>

                <div className="bg-black/50 p-4 rounded backdrop-blur-md text-right">
                    <div className="text-xl font-bold text-blue-400">{stats.totalHashrate} MH/s</div>
                    <div className="text-sm text-gray-300">{stats.powerUsage} W</div>
                    <div className="text-sm text-orange-400">{stats.temperature}°C</div>
                </div>
            </div>

            {/* Placement Mode Indicator */}
            {selectedItemId && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-yellow-600 px-4 py-2 rounded text-white font-bold animate-pulse">
                    PLACEMENT MODE - Click on floor to place
                </div>
            )}

            {/* Bottom Bar */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setShowShop(true)}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-bold transition-colors"
                >
                    Shop
                </button>
                <button
                    onClick={() => setShowInventory(true)}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-bold transition-colors"
                >
                    Inventory
                </button>
                <button
                    onClick={() => setShowCustomization(true)}
                    className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded font-bold transition-colors"
                >
                    Stylist
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold transition-colors">
                    Trade
                </button>
            </div>

            {/* Modals */}
            {showShop && <Shop onClose={() => setShowShop(false)} />}
            {showInventory && <Inventory onClose={() => setShowInventory(false)} />}
            {showCustomization && <Customization onClose={() => setShowCustomization(false)} />}
            {selectedRackId && (
                <RackManager
                    rackId={selectedRackId}
                    onClose={() => setSelectedRackId(null)}
                />
            )}
        </div>
    );
};
