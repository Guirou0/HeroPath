import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../modules/compare.module.css'
import Status from '../componentes/Status.jsx'

const url = import.meta.env.VITE_API

const Compare = () => {
    const [results1, setResults1] = useState(null)
    const [state1, setState1] = useState(null)
    const [results2, setResults2] = useState(null)
    const [state2, setState2] = useState(null)
    const {key} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!key) navigate("/");
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target[0].name == "hero1"){
            setState1("search");
            setResults1(null)
            axios.get(url + `/search?param=${e.target[0].value}`, {
                headers: {
                    key: key
                }
            })
            .then((response) => {
                if(response.data.error) {
                    setResults1("NF")
                    return ;
                }
                setResults1(response.data.results);
                e.target[0].value = "";
            })
            .catch((e) => {
                alert(e.message)
            })
        }
        else{
            setState2("search");
            setResults2(null)
            axios.get(url + `/search?param=${e.target[0].value}`, {
                headers: {
                    key: key
                }
            })
            .then((response) => {
                if(response.data.error) {
                    setResults2("NF")
                    return ;
                }
                setResults2(response.data.results);
                e.target[0].value = "";
            })
            .catch((e) => {
                alert(e.message)
            })
        }
    }

    const ResultContent = ({info, h}) => {

        return (
            
            <div className={styles.content} style={{backgroundImage: `url(${info.image.url})`}} onClick={()=>{renderHero(info, h)}}>
                <div className={styles.name}>{info.name}</div>
            </div>
        )
    }
    
    const check = (results, h) => {
        if (results == "NF"){
            return <div className={styles.nf}>Não encontramos nada :(</div>
        }

        if(!Array.isArray(results)) return <></>;

        return (
        <div className={styles.search}>
            {results ? results.map((result, i) => {
                return <ResultContent key={i} info={result} h={h}/>
            }): <div className={styles.loading}></div>}
        </div>
        )
    }

    const HeroContainer = ({hero}) => {

        return(
            <>
            <div className={styles.img} style={{backgroundImage: `url(${hero.image.url})`}}></div>
            <div className={styles.heroname}>{hero.name}</div>
            <Status stats={hero.powerstats} />
            </>
        )
    }


    const renderHero = (hero, n) => {
        if (n == 1){
            setState1("hero");
            setResults1(hero);
        }
        else{
            setState2("hero");
            setResults2(hero);
        }

    }

    const render1 = {
        null: (<></>),
        "search": check(results1, 1),
        "hero": <HeroContainer hero={results1} />
    }

    const render2 = {
        null: (<></>),
        "search": check(results2, 2),
        "hero": <HeroContainer hero={results2} />
    }

    return (
        <div className={styles.compare}>
            <div className={styles.searchcontent}>
                <form className={styles.searchform} onSubmit={handleSubmit}>
                    <label>Procure por um personagem: </label>
                    <input type="text" name="hero1" placeholder="Insira aqui..." autoComplete="off" required/>
                    <button type="submit">Enviar</button>
                </form>
                <div className={styles.results} style={{display: `${state1 == "search"? "grid": "flex"}`}}>
                    {results1 && render1[state1]}
                </div>
            </div>
            <div className={styles.searchcontent}>
                <form className={styles.searchform} onSubmit={handleSubmit}>
                    <label>Procure por um personagem: </label>
                    <input type="text" name="hero2" placeholder="Insira aqui..." autoComplete="off" required/>
                    <button type="submit">Enviar</button>
                </form>
                <div className={styles.results} style={{display: `${state2 == "search"? "grid": "flex"}`}}>
                {results2 && render2[state2]}
                </div>
            </div>
        </div>
    )
}

export default Compare