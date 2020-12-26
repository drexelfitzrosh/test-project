import React, { useCallback, useMemo, useState } from 'react'
import axios from 'axios'
import Conatiner from '../../component/Container'
import Card from '../../component/Card'

import CustomButton from '../../component/CustomButton'


interface type {
    jobId: string;
    jobTitle: string;
    companyName: string;
    shortDesc: string;
    postedDate: string
}

interface jobProps{
    data: Array<type>
}

const Jobs: React.FC<jobProps> = ({data})=>{
    const [jobs, setJobs] = useState(data)

    //render the List
    const renderCardList = useCallback(()=>(
        <Conatiner >
            {jobs.map(({jobId, jobTitle, companyName, shortDesc, postedDate})=>(
            <Card jobId={jobId} jobTitle={jobTitle} companyName={companyName} shortDesc={shortDesc} postedDate={postedDate}/>
            ))}
        </Conatiner>
    ),[jobs])


    // function that sort the list by Company name           
    const SortJobs = ()=>{
        const newList = jobs.sort((a,b)=>{
            if (a.companyName < b.companyName){
                return -1
            }
            if (a.companyName > b.companyName){
                return 1
            }
            return 0
        })

        setJobs([...newList])
    }

    // function that filter and return the jobs published in the last 7 days
    const filterDatePosted = () =>{
        const regexNumber = /\d/g;
        const filterList = jobs.filter(job=>{
            const getDays = job.postedDate.match(regexNumber)
            const days = parseInt(getDays.join(''))
            return days <= 7
        })
        const sortedList = filterList.sort((a,b)=>{
            if (a.postedDate < b.postedDate){
                return -1
            }
            if (a.postedDate > b.postedDate){
                return 1
            }
            return 0
        })

        setJobs([...sortedList])
    }

    return (
        <>
        <Conatiner >
            {/* button that sort the list by company name */}
            <CustomButton text={'COMPANY NAME'} onClick={SortJobs} />
            {/* button that filter out jobs that is posted more than 7days */}
            <CustomButton text={'FILTER'} onClick={filterDatePosted} />
        </Conatiner>
        {renderCardList()}
        </>
    )
}

// get the serverside props for server side rendering
export async function getServerSideProps(){
    const apiUrl = 'https://www.zippia.com/api/jobs/'
    const res = await axios.post(apiUrl, {
        "companySkills": true,
        "dismissedListingHashes": [],
        "fetchJobDesc": true,
        "jobTitle": "Business Analyst",
        "locations": [],
        "numJobs": 20,
        "previousListingHashes": []
    })    
    //get only 10 jobs
    const data = res.data.jobs.splice(0, 10)
    const newList = data.map(({jobId, jobTitle, companyName, shortDesc, postedDate})=>(
        {jobId, jobTitle, companyName, shortDesc, postedDate}
    ))
    return {
        props: {
            data: newList || []
        }
    }
}

export default Jobs