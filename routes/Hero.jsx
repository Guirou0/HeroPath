import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../modules/hero.module.css';
import axios from 'axios'

import Status from '../componentes/Status.jsx'
import Biografia from '../componentes/Biografia.jsx';
import Aparencia from '../componentes/Aparencia.jsx';
import Trabalho from "../componentes/Trabalho.jsx";
import Conexoes from "../componentes/Conexoes.jsx";

const Hero = () => {
    const {key} = useContext(AuthContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [hero, setHero] = useState(null);
    const [page, setPage] = useState("Status");

    useEffect(() => {
        if(!key){
            navigate("/");
        }

        axios.get(`http://localhost:3000?param=${id}`, {
            headers: {
                key: key
            }
        })
        .then((response) => {
            setHero(response.data);
        })
        .catch((e) => {
            alert(e.message)
        })
    }, [])
    
    const handlePage = (e) => {
        setPage(e.target.value)
    }
    
    const pos = {
        "Status": "0%",
        "Biografia": "20%",
        "Aparencia": "40%",
        "Trabalho": "60%",
        "Conexoes": "80%"
    }

    const choosePage = () => {
        if (!hero) return (<></>)
        
        const nav = {
            "Status": <Status stats={hero.powerstats} />,
            "Biografia": <Biografia bio={hero.biography} />,
            "Aparencia": <Aparencia apar={hero.appearance} />,
            "Trabalho": <Trabalho work={hero.work} />,
            "Conexoes": <Conexoes conec={hero.connections} />
        }
        return nav[page]
    }

    return(
        hero &&
        <div className={styles.hero}>
            <div className={styles.image} style={{backgroundImage: `url(${hero.image.url})`}}>
                <label>{hero.name}</label>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>
                    {hero.name}
                </div>
                <div className={styles.pagination}>
                    <button className={styles.page} value={"Status"} onClick={handlePage} style={{textShadow: `${page=="Status"? "2px 2px 3px #B66136": "none"}`}} >Status</button>
                    <button className={styles.page} value={"Biografia"} onClick={handlePage} style={{textShadow: `${page=="Biografia"? "2px 2px 3px #B66136": "none"}`}} >Biografia</button>
                    <button className={styles.page} value={"Aparencia"} onClick={handlePage} style={{textShadow: `${page=="Aparencia"? "2px 2px 3px #B66136": "none"}`}} >Aparência</button>
                    <button className={styles.page} value={"Trabalho"} onClick={handlePage} style={{textShadow: `${page=="Trabalho"? "2px 2px 3px #B66136": "none"}`}} >Trabalho</button>
                    <button className={styles.page} value={"Conexoes"} onClick={handlePage} style={{textShadow: `${page=="Conexoes"? "2px 2px 3px #B66136": "none"}`}} >Conexões</button>
                    <div className={styles.ind} style={{left: `${pos[page]}`}}></div>
                </div>
                {choosePage()}
            </div>
        
        </div>
    )
}

export default Hero