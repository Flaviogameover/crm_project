import { TicketCard } from "../components/TicketCard";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoriesContext from "../context";
import funcs from "../functions/requests";

export const Dashboard = () => {
    const [tickets, setTickets] = useState(null);
    const {categories, setCategories} = useContext(CategoriesContext);

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

    const uniqueCategories = [
        ...new Set(tickets?.map((ticket) => ticket.category)),
    ];

    return (
        <div className="dashboard">
            <h1>My Projects</h1>
            <div className="ticket-container">
                {tickets &&
                    uniqueCategories?.map((uniqueCategory, categoryIndex) => {
                        return (
                            <div key={categoryIndex}>
                                <h3>{uniqueCategory}</h3>
                                {tickets
                                    .filter(
                                        (ticket) =>
                                            ticket.category === uniqueCategory
                                    )
                                    .map((ticket, ticketIndex) => {
                                        return (
                                            <TicketCard
                                                key={ticketIndex}
                                                id={ticketIndex}
                                                color={
                                                    colors[categoryIndex] ||
                                                    colors[0]
                                                }
                                                ticket={ticket}
                                            />
                                        );
                                    })}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
