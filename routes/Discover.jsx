import styles from '../modules/discover.module.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Discover = () => {
    const [heroes, setHeroes] = useState(null);
    const [finished, setFinished] = useState(false);
    const {key} = useContext(AuthContext);
    const navigate = useNavigate();
    const slides = useRef(null)

    useEffect(() => {
        if (!key) navigate("/");

    })

    const randomheroes = (n) => {
        return Array(n).fill(null).map((hero) => {
            return Math.floor(Math.random()*731)+1
        }
        )}

    const getHeroData = async(promises) => {
        try{
            const response = await Promise.all(promises)
            const data = response.map((r) => r.data)
            //setHeroes(data)
            return data
        }catch(e){
            console.log(e.message)
        }
    }

    const startRoll = async () => {
        setHeroes(null)
        setFinished(false)
        const newHeroes = randomheroes(7);
        const promises = newHeroes.map((hero) => {
            return axios.get(`http://localhost:3000/image?param=${hero}`, {
                headers: {
                    key: key
                }
            })
        })

        getHeroData(promises).then((response) => {
            
                let i = response;
                setHeroes(i)
                const interval = setInterval(() => {
                    const nH = [i[1], i[2], i[3], i[4], i[5], i[6], i[0]]
                    console.log(nH)
                    i = nH;
                    setHeroes(i);
                }, 3000)
    
                setTimeout(() => {
                    clearInterval(interval)
                    setFinished(true)
                }, 3000*(Math.floor(Math.random()*10)+1))
            
        })
        
    }


    const RenderHero = ({hero, i}) => {
        
        return (
            <div className={styles.slide} style={{backgroundImage: `url(${hero.url})`, transform: `scaleX(${i==3? 1.3: 0.8 })`, cursor: `${i==3? "pointer": "default"}`}} onClick={() => {if(i==3) navigate(`/hero/${hero.id}`)}}>
                {i==3? <div className={styles.info}>{hero.name}</div>: <></>}
            </div>
        )
    }

    return (
        <div className={styles.discover}>
            <button className={styles.roll} onClick={startRoll}>Descubra um personagem aleatório</button>
            {heroes && 
            <div className={styles.slides}>
                {heroes.map((hero, i) => {
                    return <RenderHero key={i} hero={hero} i={i} />
                })}
            </div>}
            {finished && 
            <div className={styles.finish}></div>}
        </div>
    )
}

export default Discover