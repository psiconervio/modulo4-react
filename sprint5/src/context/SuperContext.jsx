import { useContextl,useState } from "react";
import { apidbmongo } from "../services/jugadoresapi";


const SuperContext = createContext();

const SuperProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState(() => {
        return JSON.parse(localStorage.getItem("items")) || [];
    });
    
    const getItem = async (id) => {
        setLoading(true);
        try {
        const data = await apidbmongo(id);
        setItems(data);
        setError(null);
        } catch (error) {
        console.error("Error fetching items:", error);
        setError(error);
        } finally {
        setLoading(false);
        }
    };
    
    return (
        <SuperContext.Provider value={{ loading, error, items,getItem }}>
        {children}
        </SuperContext.Provider>
    );
}