import { create } from 'zustand';

interface MarketState {
    prices: {
        btc: number;
        eth: number;
    };
    history: {
        btc: number[];
        eth: number[];
    };
    updatePrices: () => void;
}

export const useMarketStore = create<MarketState>((set) => ({
    prices: {
        btc: 45000,
        eth: 3000,
    },
    history: {
        btc: [45000],
        eth: [3000],
    },
    updatePrices: () => set((state) => {
        // Simple random walk
        const changeBtc = (Math.random() - 0.5) * 500;
        const changeEth = (Math.random() - 0.5) * 50;

        const newBtc = Math.max(1000, state.prices.btc + changeBtc);
        const newEth = Math.max(100, state.prices.eth + changeEth);

        const newHistoryBtc = [...state.history.btc, newBtc].slice(-50); // Keep last 50 points
        const newHistoryEth = [...state.history.eth, newEth].slice(-50);

        return {
            prices: {
                btc: newBtc,
                eth: newEth,
            },
            history: {
                btc: newHistoryBtc,
                eth: newHistoryEth,
            },
        };
    }),
}));
