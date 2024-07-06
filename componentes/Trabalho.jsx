import styles from '../modules/trabalho.module.css'

const Trabalho = ({work}) => {


    return (
        <div className={styles.trabalho}>
            <div className={styles.topics}>
                <label>Ocupação: </label> <p style={{fontSize: "clamp(.8rem, 1.3vw, 2.5vw)"}}>{work['occupation']}</p>
            </div>
            <div className={styles.topics}>
                <label>Base: </label> <p>{work['base']}</p>
            </div>
        </div>
    )
}

export default Trabalho