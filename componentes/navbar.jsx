import { useState, useContext } from "react";
import styles from '../modules/navbar.module.css';
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const {key} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const req = `/search/${search}`;
        setSearch("");
        navigate(req);
    }

    return (
         <div className={styles.navbar}>
           <img alt="Logo" src="./src/assets/logo.png" className={styles.logo}/>
           <Link to="/home" className={styles.pages}>
                <label>Página inicial</label>
           </Link>
           <Link to="/discover" className={styles.pages}>
                <label>Descubra novos heróis</label>
           </Link>
           <Link to="/compare" className={styles.pages}>
                <label>Compare seus heróis favoritos</label>
           </Link>
           <form className={styles.searchbox} onSubmit={handleSubmit}>
                <label>Pesquise sobre algum herói ou vilão: </label>
                <div className={styles.inputbox}>
                    <input type="text" placeholder={"Digite aqui..."} value={search} onChange={(e) => {setSearch(e.target.value)}} required />
                    <button type="submit"></button>
                </div>
           </form>
        </div>
    )
}

export default Navbar