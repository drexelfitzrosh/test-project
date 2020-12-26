import React from 'react'
import styles from '../styles/Home.module.css'

interface containerProps {
}

const Conatiner: React.FC<containerProps> = (props)=>{
    return(
        <div className={styles.container}>
         <div className={styles.wrapper}>
            {props.children}
            </div>
        </div>
    )
}

export default Conatiner