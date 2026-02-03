import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useMarketStore } from '../store/marketStore';

export const useGameLoop = () => {
    const mine = useGameStore((state) => state.mine);
    const updatePrices = useMarketStore((state) => state.updatePrices);

    useEffect(() => {
        const miningInterval = setInterval(() => {
            mine(1); // 1 second
        }, 1000);

        const marketInterval = setInterval(() => {
            updatePrices();
        }, 3000); // Update prices every 3 seconds

        return () => {
            clearInterval(miningInterval);
            clearInterval(marketInterval);
        };
    }, [mine, updatePrices]);
};
