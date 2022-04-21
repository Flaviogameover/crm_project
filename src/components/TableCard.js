import { AvatarDisplay } from "./AvatarDisplay";
import { StatusDisplay } from "./StatusDisplay";
import { PriorityDisplay } from "./PriorityDisplay";
import { ProgressDisplay } from "./ProgressDisplay";
import { CategDisplay } from "./CategDisplay";
import { DeleteBlock } from "./DeleteBlock";

import { Link } from "react-router-dom";

export const TableCard = ({ color, ticket }) => {
    return (
        <tr>
            <td
                className="ticket-color"
                style={{ backgroundColor: color }}
            ></td>
            <AvatarDisplay ticket={ticket} />
            <td>{ticket.title}</td>
            <StatusDisplay status={ticket.status} />
            <PriorityDisplay priority={ticket.priority} />
            <CategDisplay category={ticket.category} />
            <ProgressDisplay progress={ticket.progress} />
            <td>
            <Link to={`/ticket/${ticket.documentId}`} id="link">
                &#128393;
            </Link>
            </td>
            <DeleteBlock documentId={ticket.documentId} />
        </tr>
    );
};

// criar sistema de login com foto de user
// ao logar e postar ticket, o user vai ter a foto do user configurada automaticamente

// <tr className="ticket-card">
//             <td className="ticket-color" style={{backgroundColor: color}}></td>
//             <td>{ticket.title}</td>
//             <AvatarDisplay ticket={ticket}/>
//             <StatusDisplay status={ticket.status}/>
//             <PriorityDisplay priority={ticket.priority}/>
//             <CategDisplay category={ticket.category}/>
//             <ProgressDisplay progress={ticket.progress}/>
//             <DeleteBlock documentId={ticket.documentId}/>
//         </tr>
