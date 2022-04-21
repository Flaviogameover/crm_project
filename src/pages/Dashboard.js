import { TicketCard } from "../components/TicketCard";
import { TableCard } from "../components/TableCard";
import { useState, useEffect, useContext } from "react";
import CategoriesContext from "../context";
import funcs from "../functions/requests";

export const Dashboard = () => {
    const [tickets, setTickets] = useState(null);
    const { categories, setCategories } = useContext(CategoriesContext);

    useEffect(() => {
        (async () => {
            setTickets(await funcs.fetchTickets());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setCategories(await funcs.fetchCategories());
        })();
    }, [tickets]);

    const colors = [
        "rgb(255,179,186)",
        "rgb(255,223,186)",
        "rgb(255,255,186)",
        "rgb(186,255,201)",
        "rgb(186,255,255)",
    ];

    const orderTickets = (e) => {
        let order = e.target.value;

        if (order === "status") {
            (async () => {
                setTickets(await funcs.fetchTickets(order));
            })();
        } else if (order === "priority") {
            (async () => {
                setTickets(await funcs.fetchTickets(order));
            })();
        } else if (order === "progress") {
            (async () => {
                setTickets(await funcs.fetchTickets(order));
            })();
        }
    };

    return (
        <div className="dashboard">
            <div className="order-wrapper">
                <h1>My Projects</h1>
                <select name="order" id="order" onChange={orderTickets}>
                    <option value="">Order by</option>
                    <option value="priority">Priority</option>
                    <option value="progress">Progress</option>
                    <option value="status">Status</option>
                </select>
            </div>
            <div className="ticket-container">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Profile</th>
                                <th>Task Title</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Category</th>
                                <th>Progress</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets?.map((ticket, ticketIndex) => {
                                return (
                                    <TableCard
                                        key={ticketIndex}
                                        id={ticketIndex}
                                        color={colors[ticketIndex] || colors[0]}
                                        ticket={ticket}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
