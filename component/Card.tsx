import React from 'react'
import styles from '../styles/Home.module.css'

interface CardProps {
    jobId: string;
    jobTitle: string;
    companyName: string;
    shortDesc: string;
    postedDate: string
}
// A card component that display the Job title, company , short description and date posted
const Card: React.FC<CardProps> = ({jobId,companyName, jobTitle, shortDesc,postedDate})=>{
    return(
        <div key={jobId} className={styles.cardContainer}>
            <div className={styles.textContainer}>
                <div className={styles.jobTitle}>
                    <h3>{jobTitle}</h3>
                </div>
                <div className={styles.companyName}>
                    <p>{companyName}</p>
                </div>
                <div className={styles.desrciption}>
                    <p>{shortDesc}</p>
                </div>
                <div className={styles.date}>
                    <p>{postedDate}</p>
                </div>
            </div>
        </div>
    )
}

export default Card