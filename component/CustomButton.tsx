import React from 'react'
import styles from '../styles/Home.module.css'

interface CustomButtonProps {
    text: string;
    onClick(): any;
}

const CustomButton: React.FC<CustomButtonProps> = ({text, onClick})=>{
    return(
        <>
            <button onClick={onClick} className={styles.button}>{text}</button>
        </>
    )
}

export default CustomButton