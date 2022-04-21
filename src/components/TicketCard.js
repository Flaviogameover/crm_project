import {AvatarDisplay} from './AvatarDisplay';
import {StatusDisplay} from './StatusDisplay';
import {PriorityDisplay} from './PriorityDisplay';
import {ProgressDisplay} from './ProgressDisplay';
import { CategDisplay } from './CategDisplay';
import {DeleteBlock} from './DeleteBlock';

import {Link} from 'react-router-dom';

export const TicketCard = ({color,ticket}) => {
    return (
        <div className="ticket-card">
            <Link to={`/ticket/${ticket.documentId}`} id="link">
                <tr>
                <td className="ticket-color" style={{backgroundColor: color}}></td>
                <td>{ticket.title}</td>
                <AvatarDisplay ticket={ticket}/>
                <StatusDisplay status={ticket.status}/>
                <PriorityDisplay priority={ticket.priority}/>
                <CategDisplay category={ticket.category}/>
                <ProgressDisplay progress={ticket.progress}/>
                </tr>
            </Link>
            <DeleteBlock documentId={ticket.documentId}/>
        </div>
    );
}