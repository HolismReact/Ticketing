import TicketCreate from './Ticketing/Ticket/Create';
import TicketList from './Ticketing/Ticket/List';

const routes = [
    {
        path: '/tickets',
        component: TicketList
    },
    {
        path: '/create-ticket',
        component: TicketCreate
    }
];

export default routes;