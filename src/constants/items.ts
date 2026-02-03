import { Item } from '../types';

export const SHOP_ITEMS: Item[] = [
    {
        id: 'rack_basic',
        name: 'Basic Rack',
        type: 'RACK',
        price: 200,
        description: 'A simple rack that holds up to 4 GPUs.',
        slots: 4,
    },
    {
        id: 'gpu_gtx_1060',
        name: 'GTX 1060',
        type: 'GPU',
        price: 300,
        description: 'Entry level mining GPU.',
        hashrate: 20,
        powerConsumption: 100,
        heatOutput: 10,
    },
    {
        id: 'gpu_rtx_3080',
        name: 'RTX 3080',
        type: 'GPU',
        price: 1200,
        description: 'High performance mining GPU.',
        hashrate: 95,
        powerConsumption: 250,
        heatOutput: 30,
    },
    {
        id: 'plant_potted',
        name: 'Potted Plant',
        type: 'DECORATION',
        price: 50,
        description: 'Adds some green to your room.',
    },
];
