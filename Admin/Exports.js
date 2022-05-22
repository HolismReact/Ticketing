import { Tickets } from './Ticket/List'
import { ViewTicket } from './Ticket/View'
import SupportIcon from '@mui/icons-material/Support';

const TicketingRoutes = [
    {
        "path": "/tickets",
        "component": Tickets
    },
    {
        "path": "/ticket",
        "component": PostContent
    }
]

const TicketingMenu = [
    {
        "title": "Tickets",
        "icon": SupportIcon,
        "url": "/posts",
    }
]

export { Tickets }
export { ViewTicket }
export { TicketingRoutes }
export { TicketingMenu }