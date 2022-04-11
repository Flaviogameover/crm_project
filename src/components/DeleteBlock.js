import axios from "axios";


export const DeleteBlock = ({documentId}) => {
    const deleteTicket = async () => {
        //async axios
        const response = await axios.delete(`http://localhost:8000/tickets/${documentId}`);
        const success = response.status === 200;
        if(success) window.location.reload();
    };

    return (
        <div className="delete-block">
            <div className="delete-icon" onClick={deleteTicket}>X</div>
        </div>
    );
};
