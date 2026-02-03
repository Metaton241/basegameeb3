export type ItemType = 'RACK' | 'GPU' | 'DECORATION' | 'TABLE' | 'WALL';

export interface GameStats {
    totalHashrate: number;
    powerUsage: number;
    temperature: number;
}


export interface Item {
    id: string;
    name: string;
    type: ItemType;
    price: number;
    description: string;
    // Mining stats
    hashrate?: number;
    powerConsumption?: number;
    heatOutput?: number;
    slots?: number;
}

export interface PlacedItem extends Item {
    instanceId: string;
    position: [number, number, number];
    rotation: [number, number, number];
    slots?: number; // How many items can fit inside
    children?: PlacedItem[]; // Items inside this item
}


export interface GameState {
    money: number;
    exp: number;
    level: number;

    crypto: {
        btc: number;
        eth: number;
    };

    stats: GameStats;
    inventory: Item[];
    placedItems: PlacedItem[];
    selectedItemId: string | null;
    selectedRackId: string | null;
    roomStyles: {
        wallColor: string;
        floorColor: string;
    };

    // Actions
    addMoney: (amount: number) => void;
    buyItem: (item: Item) => boolean;
    placeItem: (itemId: string, position: [number, number, number], rotation: [number, number, number]) => void;
    setSelectedItemId: (id: string | null) => void;
    setSelectedRackId: (id: string | null) => void;
    updateRoomStyles: (styles: Partial<{ wallColor: string; floorColor: string }>) => void;
    equipItem: (targetInstanceId: string, itemToEquipId: string) => void;
    sellCrypto: (coin: 'btc' | 'eth', amount: number, rate: number) => void;
    mine: (dt: number) => void;
}
