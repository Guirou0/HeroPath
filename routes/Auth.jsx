import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from '../modules/auth.module.css'

const Auth = () => {
    const [inputkey, setInputkey] = useState(""); 
    const {key, setKey} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setKey(inputkey);
        navigate("/home");
    }

    return (
        <div className={styles.auth}>
            <div className={styles.metropolis}>
                <img alt="Superman" src="../assets/superman.png" className={styles.superman} />
            </div>
            <div className={styles.keycontent}>
                <h1>Calma aí, paizão...</h1>
                <p>Antes de poder aproveitar o site ao máximo, é necessário que você obtenha uma chave de API.</p>
                <p>Talvez você esteja se perguntando: "Tá, mas o que é isso?". De forma resumida, uma API é uma ferramenta
                   que os desenvolvedores usam para trocar informação entre o seu computador e o servidor. Algumas API's
                   são privadas, mas também existem API's são abertas ao público, desde que você se cadastre nela e obtenha 
                   uma chave para acessá-la.
                </p>
                <p>No nosso caso, a chave server para ter acesso a API que vai nos fornecer os dados dos heróis e vilões e,
                   consequentemente, permitir que esse site rode a todo vapor.
                </p>
                <p>Você poder obter a chave da API nesse <a href={"https://www.superheroapi.com/"}>link aqui</a> e, 
                   logo após, inseri-la logo abaixo.
                </p>
                <form onSubmit={handleSubmit} className={styles.keyform}>
                    <input placeholder="Insira a chave aqui" type="text" value={inputkey} onChange={(e) => {setInputkey(e.target.value)}} required/>
                    <button type="submit"></button>
                </form>
            </div>
        </div>
    )
}

export default Auth