import axios from "axios";

const fetchTickets = async (order = null) => {
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

    if (order === "status") {
        let status = [
            {
                status: "not started",
            },
            {
                status: "stuck",
            },
            {
                status: "working on it",
            },
            {
                status: "done",
            },
        ];

        const sortedArray = formattedArray.sort((a, b) => {
            const aIndex = status.findIndex(
                (status) => status.status === a.status
            );
            const bIndex = status.findIndex(
                (status) => status.status === b.status
            );


            if (aIndex < bIndex) return -1;
            if (aIndex > bIndex) return 1;
            return 0;
        });
        return sortedArray;
    } else if (order === "priority") {
        const sortedArray = formattedArray.sort((a, b) => {
            a = parseInt(a.priority);
            b = parseInt(b.priority);
            console.log(a, b);

            if (a < b) return 1;
            if (a > b) return -1;
            return 0;
        });
        return sortedArray;
    } else if(order === "progress"){
        const sortedArray = formattedArray.sort((a, b) => {
            a = parseInt(a.progress);
            b = parseInt(b.progress);

            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        return sortedArray;
    }
    
    
    
    else {
        return formattedArray;
    }
};

const fetchCategories = async () => {
    const tickets = await fetchTickets();
    const categs = [...new Set(tickets?.map((ticket) => ticket.category))];
    return categs;
};

const funcs = {
    fetchTickets,
    fetchCategories,
};

export default funcs;
