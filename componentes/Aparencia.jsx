import styles from '../modules/aparencia.module.css';


const Aparencia = ({apar}) => {


    return (
        <div className={styles.aparencia}>
            <div className={styles.topics}>
                <label>Genêro: </label> <p>{apar['gender']}</p>
            </div>
            <div className={styles.topics}>
                <label>Raça: </label> <p>{apar['race']}</p>
            </div>
            <div className={styles.topics}>
                <label>Altura: </label> <p>{apar['height'][1]}</p>
            </div>
            <div className={styles.topics}>
                <label>Peso: </label> <p>{apar['weight'][1]}</p>
            </div>
            <div className={styles.topics}>
                <label>Cor dos olhos: </label> <p style={{textShadow: `2px 2px 3px ${apar['eye-color']}`}}>{apar['eye-color']}</p>
            </div>
            <div className={styles.topics}>
                <label>Cor do cabelo: </label> <p style={{textShadow: `2px 2px 3px ${apar['hair-color']}`}}>{apar['hair-color']}</p>
            </div>
        </div>
    )
}

export default Aparencia