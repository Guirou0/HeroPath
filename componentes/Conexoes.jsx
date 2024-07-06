import styles from '../modules/conexoes.module.css'

const Conexoes = ({conec}) => {


    return (
        <div className={styles.conexoes}>
            <div className={styles.topics}>
                <label>Grupos afiliados: </label> <p>{conec['group-affiliation']}</p>
            </div>
            <div className={styles.topics}>
                <label>Parentes: </label> <p>{conec['relatives']}</p>
            </div>
        </div>
    )
}

export default Conexoes