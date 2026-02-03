import { create } from 'zustand';
import { GameState, Item, PlacedItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useGameStore = create<GameState>((set, get) => ({
    money: 1000,
    exp: 0,
    level: 1,

    crypto: {
        btc: 0,
        eth: 0,
    },

    stats: {
        totalHashrate: 0,
        powerUsage: 0,
        temperature: 20, // Celcius
    },

    inventory: [],
    placedItems: [],
    selectedItemId: null,
    selectedRackId: null,
    roomStyles: {
        wallColor: '#555555',
        floorColor: '#333333',
    },

    addMoney: (amount) => set((state) => ({ money: state.money + amount })),

    setSelectedItemId: (id) => set({ selectedItemId: id }),

    setSelectedRackId: (id) => set({ selectedRackId: id }),

    updateRoomStyles: (styles) => set((state) => ({
        roomStyles: { ...state.roomStyles, ...styles }
    })),

    buyItem: (item: Item) => {
        const { money } = get();
        if (money >= item.price) {
            set((state) => ({
                money: state.money - item.price,
                inventory: [...state.inventory, { ...item, id: uuidv4() }] // Assign unique ID on purchase? Or keep ref? 
                // Actually inventory should store "instances" or just types?
                // Let's store instances for simplicity
            }));
            return true;
        }
        return false;
    },

    placeItem: (itemId, position, rotation) => {
        set((state) => {
            const itemIndex = state.inventory.findIndex((i) => i.id === itemId);
            if (itemIndex === -1) return state;

            const item = state.inventory[itemIndex];
            const newPlacedItem: PlacedItem = {
                ...item,
                instanceId: uuidv4(),
                position,
                rotation,
            };

            // Recalculate stats
            const newStats = { ...state.stats };
            if (item.hashrate) newStats.totalHashrate += item.hashrate;
            if (item.powerConsumption) newStats.powerUsage += item.powerConsumption;

            return {
                inventory: state.inventory.filter((_, i) => i !== itemIndex),
                placedItems: [...state.placedItems, newPlacedItem],
                stats: newStats,
            };
        });
    },

    sellCrypto: (coin, amount, rate) => {
        set((state) => {
            if (state.crypto[coin] >= amount) {
                return {
                    crypto: { ...state.crypto, [coin]: state.crypto[coin] - amount },
                    money: state.money + (amount * rate),
                };
            }
            return state;
        });
    },

    mine: (dt: number) => {
        const { stats } = get();
        if (stats.totalHashrate === 0) return;

        const btcReward = (stats.totalHashrate * dt) * 0.0000001;

        set((state) => ({
            crypto: {
                ...state.crypto,
                btc: state.crypto.btc + btcReward
            },
        }));
    },

    equipItem: (targetInstanceId, itemToEquipId) => {
        set((state) => {
            const itemToEquipIndex = state.inventory.findIndex((i) => i.id === itemToEquipId);
            if (itemToEquipIndex === -1) return state;

            const itemToEquip = state.inventory[itemToEquipIndex];
            const newPlacedItems = [...state.placedItems];
            const targetItemIndex = newPlacedItems.findIndex(i => i.instanceId === targetInstanceId);

            if (targetItemIndex === -1) return state;

            const targetItem = newPlacedItems[targetItemIndex];
            if (!targetItem.slots || (targetItem.children?.length || 0) >= targetItem.slots) return state;

            const equippedItem: PlacedItem = {
                ...itemToEquip,
                instanceId: uuidv4(),
                position: [0, 0.2 + (targetItem.children?.length || 0) * 0.3, 0],
                rotation: [0, 0, 0],
            };

            newPlacedItems[targetItemIndex] = {
                ...targetItem,
                children: [...(targetItem.children || []), equippedItem]
            };

            const newStats = { ...state.stats };
            if (itemToEquip.hashrate) newStats.totalHashrate += itemToEquip.hashrate;
            if (itemToEquip.powerConsumption) newStats.powerUsage += itemToEquip.powerConsumption;

            return {
                inventory: state.inventory.filter((_, i) => i !== itemToEquipIndex),
                placedItems: newPlacedItems,
                stats: newStats,
            };
        });
    },
}));
