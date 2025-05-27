import { subscribe, unsubscribe } from './resources/API';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

function getMessage(sourceId: string) {
    const [lastMessage, setLastMessage] = useState('-1');

    useEffect(() => {
        setLastMessage('-1');

        const handleNewMessage = function (message: any) {
            setLastMessage(message);
        };

        subscribe(sourceId, handleNewMessage);

        return () => {
            unsubscribe(sourceId, handleNewMessage);
        };
    }, [sourceId]);

    return { sourceId, lastMessage };
}

export function Effects(props: { sourceId: string }) {
    const { sourceId, lastMessage } = getMessage(props.sourceId);

    return (
        <div>
            {sourceId}: {lastMessage}
        </div>
    );
}

// ReactDOM.render(
//      <Effects sourceId="-1"/>,
//      document.getElementById('root')
//    );
