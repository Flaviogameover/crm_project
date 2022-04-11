import axios from "axios";

const fetchTickets = async () => {
    const response = await axios.get("http://localhost:8000/tickets");

    const dataObject = response.data.data;

    const arrayOfKeys = Object.keys(dataObject);
    const arrayOfData = Object.keys(dataObject).map((key) => {
        return dataObject[key];
    });

    const formattedArray = [];
    arrayOfKeys.forEach((key, index) => {
        const formattedData = { ...arrayOfData[index] };
        formattedData.documentId = key;
        formattedArray.push(formattedData);
    });

    return formattedArray;
};

const fetchCategories = async () => {
    const tickets = await fetchTickets();
    const categs = [...new Set(tickets?.map((ticket) => ticket.category))];
    return categs;
};


const funcs = {
    fetchTickets,
    fetchCategories
};


export default funcs;