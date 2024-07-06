import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from '../modules/home.module.css';
import { Bounce, toast } from "react-toastify";
import axios from 'axios'

const Home = () => {
    const [herobar, setHerobar] = useState([])
    const {key} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const randomheroes = (n) => {
        return Array(n).fill(null).map((hero) => {
            return Math.floor(Math.random()*731)+1
        }
        )}

    const getHeroData = async(promises) => {
        try{
            const response = await Promise.all(promises)
            const data = response.map((r) => r.data)
            setHerobar(data)
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(() => {
        if (!key) {
            //alert("Insira uma chave antes, por favor")
            navigate("/");
        }
        const heroes = randomheroes(8)
        const promises = heroes.map((hero) => {
            return axios.get(`http://localhost:/image?param=${hero}`, {
                headers : {
                    key: key
                }
            })
        })
        getHeroData(promises)
    },[])
    
    const Slide = ({hero}) => {
        return (
            <div onClick={()=>{navigate(`/hero/${hero.id}`)}} className={styles.hero} style={{backgroundImage: `url(${hero.url})`}}>
                <div className={styles.name}>
                    {hero.name}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.home}>
            <div className={styles.info}>
                <h1>Bem vindo!</h1>
                <p>Este é um projeto feito com propósitos de aprendizado, porém que foi feito por um grande fan de superheróis em geral.
                   Neste site, você pode pesquisar sobre algum herói em particular ou conhecer um novo de forma aleatória. Além disso, você
                   também pode comparar dois heróis de seu interesse. </p>
            </div>
            <div className={styles.herocontainer}>
                {herobar.map((hero) => {
                    return <Slide hero={hero} />
                })}
            </div>
        </div>
    )
}

export default Home