import { subscribe, unsubscribe } from './resources/API';
import { useState, useEffect } from 'react';

interface EffectsProps {
    sourceId: string;
}

export function Effects(props: EffectsProps) {
    const { sourceId } = props;
    const [lastMessage, setLastMessage] = useState<string | number>('-1'); // или другой тип, если нужно

    useEffect(() => {
        // Можно оставить setLastMessage('-1'), если требуется сброс при каждом изменении sourceId
        setLastMessage('-1');

        const handleNewMessage = (message: string | number) => {
            setLastMessage(message);
        };

        if (sourceId) {
            subscribe(sourceId, handleNewMessage);
        }

        return () => {
            if (sourceId) {
                unsubscribe(sourceId, handleNewMessage);
            }
        };
    }, [sourceId]);

    return (
        <div>
            {sourceId}: {lastMessage}
        </div>
    );
}
