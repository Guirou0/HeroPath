import styles from '../modules/search.module.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const Search = () => {
    const [results, setResults] = useState(null);
    const {key} = useContext(AuthContext);
    const navigate = useNavigate();
    const {name} = useParams();

    useEffect(() => {
        if (!key) {
            navigate("/");
        }
        setResults(null)
        axios.get(`http://localhost:3000/search?param=${name}`, {
            headers: {
                key: key
            }
        })
        .then((response) => {
            if (response.data.error){
                setResults("NF");
            }
            else{
                setResults(response.data.results);
            }
        })
        .catch((e) => {
            alert(e.message);
        })

    }, [name])
    
    const ResultContent = ({info}) => {

        return (
            
            <div className={styles.content} style={{backgroundImage: `url(${info.image.url})`}} onClick={()=>{navigate(`/hero/${info.id}`)}}>
                <div className={styles.name}>{info.name}</div>
            </div>
        )
    }
    
    const check = () => {
        if (results == "NF"){
            return <div className={styles.nf}>Não encontramos nada :(</div>
        }

        return (
        <div className={styles.search}>
            {results ? results.map((result, i) => {
                return <ResultContent key={i} info={result} />
            }): <div className={styles.loading}></div>}
        </div>
        )
    }

    return (
        check()
    )
}

export default Search