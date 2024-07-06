import styles from '../modules/status.module.css'


const Status = ({stats}) => {
    
    const colors = {
        'intelligence': "blue",
        'strength': "red",
        'speed': "aqua",
        'durability': 'steelblue',
        'power': "gold",
        'combat': "gray"
    }
    
    const statsKeys = Object.keys(stats);

    const Stat = ({name, stat}) => {

        return (
            <div className={styles.stat}>
                <div className={styles.name}>
                    {name}: {stat}
                </div>
                <div className= {styles.bar}>
                    <div className={styles.statusbar} style={{width: `${stat}%`, backgroundColor: colors[name]}}></div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.status}>
            {statsKeys.map((key, i) => {
                return <Stat key={i} name={key} stat={stats[key]} />
            })}
        </div>
    )
}

export default Status