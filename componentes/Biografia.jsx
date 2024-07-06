import styles from '../modules/biografia.module.css'

const Biografia = ({bio}) => {
    
    const locate = {
        'good': ["Bom"," blue"],
        'neutral': ["Neutro", "yellow"],
        'bad': ["Mau", "red"]
    }

    return (
        <div className={styles.biografia}>
            <div className={styles.topics}>
                <label>Nome completo: </label> <p>{bio['full-name']}</p>
            </div>
            <div className={styles.topics}>
                <label>Alter Egos: </label> <p>{bio['alter-egos']=="No alter egos found."? "Nenhum alter ego encontrado": bio['alter-egos']}</p>
            </div>
            <div className={styles.topics}>
                <label>Apelidos: </label> <p>{bio['aliases'].toString()}</p>
            </div>
            <div className={styles.topics}>
                <label>Lugar de nascimento: </label> <p>{bio['place-of-birth']=="-"? "Desconhecido": bio['place-of-birth']}</p>
            </div>
            <div className={styles.topics}>
                <label>Primeira aparição: </label> <p>{bio['first-appearance']}</p>
            </div>
            <div className={styles.topics}>
                <label>Publicado pela: </label> <p>{bio['publisher']}</p>
            </div>
            <div className={styles.topics}>
                <label>Alinhamento: </label> <p style={{textShadow: `2px 2px 3px ${(locate[bio['alignment']])[1]}`}}>{(locate[bio['alignment']])[0]}</p>
            </div>
        </div>
    )
}

export default Biografia