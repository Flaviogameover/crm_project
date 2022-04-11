import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesContext from "../context";
import funcs from "../functions/requests";

export const TicketPage = ({ editMode }) => {
    const { categories, setCategories } = useContext(CategoriesContext);
    const [formData, setFormData] = useState({
        status: "not started",
        progress: 0,
        category: "New Category",
        timestamp: new Date().toISOString(),
        avatar: "",
        description: "",
        owner: "",
        priority: 1,
        title: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/tickets/${id}`);
        setFormData(response.data.data);
    };

    useEffect(() => {
        (async () => {
            setCategories(await funcs.fetchCategories());
        })();
        if (editMode) {
            fetchData();
        }
    }, []);
    

    const handleSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();
        if (!editMode) {
            const response = await axios.post("http://localhost:8000/tickets", {
                formData,
            });
            if (response.status === 200) {
                navigate("/");
            }
        } else {
            const response = await axios.put(
                `http://localhost:8000/tickets/${id}`,
                {
                    formData,
                }
            );
            if (response.status === 200) {
                navigate("/");
            }
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value =
            name === "progress" || name === "priority"
                ? parseInt(e.target.value)
                : e.target.value;

        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    //create dummy categories

    return (
        <div className="ticket">
            <h1>{editMode ? "Update your Ticket" : "Create a Ticket"}</h1>
            <div className="ticket-container">
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            required={true}
                            value={formData.title}
                        />

                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            onChange={handleChange}
                            required={true}
                            value={formData.description}
                        />

                        <label htmlFor="select-category">Category</label>
                        <select
                            id="select-category"
                            name="category"
                            onChange={handleChange}
                        >
                            {categories?.map((category, _) => {
                                return (
                                    <option key={_} value={category}>
                                        {category}
                                    </option>
                                );
                            })}
                        </select>

                        <label htmlFor="new-category">New Category</label>
                        <input
                            type="text"
                            id="new-category"
                            name="category"
                            onChange={handleChange}
                            value={formData.category}
                        />

                        <label>Priority</label>
                        <div className="multiple-input-container">
                            <input
                                type="radio"
                                id="priority-1"
                                name="priority"
                                value={1}
                                onChange={handleChange}
                                checked={formData.priority == 1}
                            />
                            <label htmlFor="priority-1">1</label>
                            <input
                                type="radio"
                                id="priority-2"
                                name="priority"
                                value={2}
                                onChange={handleChange}
                                checked={formData.priority == 2}
                            />
                            <label htmlFor="priority-2">2</label>
                            <input
                                type="radio"
                                id="priority-3"
                                name="priority"
                                value={3}
                                onChange={handleChange}
                                checked={formData.priority == 3}
                            />
                            <label htmlFor="priority-3">3</label>
                            <input
                                type="radio"
                                id="priority-4"
                                name="priority"
                                value={4}
                                onChange={handleChange}
                                checked={formData.priority == 4}
                            />
                            <label htmlFor="priority-4">4</label>
                            <input
                                type="radio"
                                id="priority-5"
                                name="priority"
                                value={5}
                                onChange={handleChange}
                                checked={formData.priority == 5}
                            />
                            <label htmlFor="priority-5">5</label>
                        </div>

                        {editMode && (
                            <>
                                <label>Progress</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={handleChange}
                                    name="progress"
                                    id="progress"
                                />
                                <label htmlFor="progress">Progress</label>

                                <label>Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option
                                        defaultValue={
                                            formData.status === "done"
                                        }
                                        value="done"
                                    >
                                        Done
                                    </option>
                                    <option
                                        defaultValue={
                                            formData.status === "working on it"
                                        }
                                        value="working on it"
                                    >
                                        Working on it
                                    </option>
                                    <option
                                        defaultValue={
                                            formData.status === "stuck"
                                        }
                                        value="stuck"
                                    >
                                        Stuck
                                    </option>
                                    <option
                                        defaultValue={
                                            formData.status === "not started"
                                        }
                                        value="not started"
                                    >
                                        Not Started
                                    </option>
                                </select>
                            </>
                        )}

                        <input type="submit" value="Submit" />
                    </section>
                    <section>
                        <label htmlFor="owner">Owner</label>
                        <input
                            type="text"
                            id="owner"
                            name="owner"
                            onChange={handleChange}
                            required={true}
                            value={formData.owner}
                        />
                        <label htmlFor="avatar">Avatar</label>
                        <input
                            type="url"
                            id="avatar"
                            name="avatar"
                            onChange={handleChange}
                            required={true}
                            value={formData.avatar}
                        />
                        <div className="img-preview">
                            {formData.avatar && (
                                <img
                                    src={formData.avatar}
                                    alt="image preview"
                                />
                            )}
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
};
