import { Scene } from './components/Scene';
import { Interface } from './components/UI/Interface';
import { useGameLoop } from './hooks/useGameLoop';

function App() {
    useGameLoop();

    return (
        <div className="w-full h-screen bg-neutral-900 text-white relative">
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Interface />
            </div>
        </div>
    )
}

export default App
