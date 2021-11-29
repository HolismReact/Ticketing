import { PagePadding, get, app } from '@Panel';
import React, { useState, useEffect } from 'react';

const ViewTicket = () => {

    const [progress, setProgress] = useState(false);
    const [ticket, setTicket] = useState();

    const loadTicket = () => {
        setProgress(true);
        get('/ticket/view')
            .then((data) => {
                setProgress(false);
                setTicket(data);
            }, (error) => {
                setProgress(false);
                app.error(error);
            });
    }

    useEffect(() => {
        loadTicket();
        app.emit(app.componentLoaded, {pageTitle: 'View ticket '});
    }, []);

    return <div
        className={PagePadding}
    >
        <div className="ticket">Ticket</div>
        <div className="posts">

        </div>
    </div>
}

export default ViewTicket;