import {
    List,
    Text,
    Enum,
    Ascending,
    ListAction,
    ItemAction,
    post,
    ValueWithTitle,
    app
} from '@List';
import DoneIcon from '@material-ui/icons/Done';
import MessageIcon from '@material-ui/icons/Message';
import CreateTicket from './Create';

const filters =
    <>
        <Text column='title' placeholder='Title' />
        <Enum column='stateId' placeholder='State' entity='state' />
    </>

const sorts = [
    {
        caption: "Newest",
        column: "date",
        direction: "desc"
    },
    {
        caption: "Most important",
        key: "MostImportant"
    }
]

const listActions = () => {
    const closeAll = () => {
        console.log('close all');
    };

    return <>
        <ListAction
            title='Close all'
            icon={DoneIcon}
            click={() => closeAll()} />
    </>
}

const itemActions = (item) => {
    const closeTicket = ({ setProgress, setItem }) => {
        setProgress(true);
        post(`/ticket/close?ticketId=${item.id}`)
            .then(data => {
                app.success('Ticket is closed');
                setProgress(false);
                setItem(data);
            }, error => {
                app.error(error);
                setProgress(false);
            });
    }

    return <>
        <ItemAction
            title='View'
            icon={<MessageIcon />}
            goTo={`/ticket/view?ticketId=${item.id}`}
        />
        {
            item.stateKey === 'Closed'
                ?
                null
                :
                <ItemAction
                    title='Close'
                    icon={DoneIcon}
                    click={(params) => closeTicket(params)}
                />
        }
    </>
}

const headers =
    <>
        <th>#</th>
        <th> User </th>
        <th>Title</th>
        <th>Creation date</th>
        <th>State</th>
    </>

const row = (item) => {
    return <>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.title}</td>
        <td>
            <ValueWithTitle
                value={new Date(item.date).toDateString()}
                title={item.relatedItems.TimeAgo + ' ago'}
            />
        </td>
        <td>{item.stateKey}</td>
    </>
}

const card = (item) => {
    return <div className="ticket bg-orange-200 m-2">
        <div>{item.title}</div>
    </div>
}

const breadcrumbItems = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Tickets',
        url: '/tickets',
    },
    {
        title: 'List',
        url: '/tickets'
    }
]

const Tickets = (props) => {

    return (
        <List
            title="Tickets"
            //subtitle="We are here for you. Create a new ticket to get support."
            //breadcrumbItems={breadcrumbItems}
            entity="ticket"
            filters={filters}
            sorts={sorts}
            listActions={listActions}
            headers={headers}
            row={row}
            //card={card}
            create={CreateTicket}
            itemActions={itemActions}
        />
    );
}

export default Tickets;