// css
import commonstyles from '../styles/common.module.css';
import styles from '../styles/sign-up.module.css';
import styled from 'styled-components';

// layout
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';

// import state, forms, routing
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

// import firebase
import firebase from "firebase/app";
import "firebase/auth";
import Button from '../components/common/Button';

const SignUp = () => {
    const router = useRouter()
    const [formStep, setFormStep] = useState(1);
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    // get access and refresh tokens
    useEffect(() => {
    }, [])

    const SectionOne = () => {
      return(
        <>
        <div className={styles.innerWrapper}>
          <h1 style={{textAlign: 'center'}}>When is your birthday?</h1>
        <div className={styles.dateWrapper}>
        <Input
          style={{width: 50, fontSize: '22px'}}
          value={month}
          onChange={(e)=>setMonth(e.target.value)} 
          label="Month"
        />
        <Input
          style={{width: 50, fontSize: '22px'}}
          value={day}
          onChange={(e)=>setDay(e.target.value)} 
          label="Day"
        />
        <Input
          style={{width: 100, fontSize: '22px'}}
          value={year}
          onChange={(e)=>setYear(e.target.value)} 
          label="Year"s
        />
        </div>
        <button className={styles.submitButton}>
          Next
        </button>
        </div>
        </>
      )
    }
    
    return (
        <>
        <div className={commonstyles.starryNight}>
        <Layout
          seo={{
              title: "Sign Up"
          }}
        >
         <div className={styles.signUpContainer}>
          <div className={styles.signUpFormWrapper}>
           <p 
             className={styles.backLink} 
             onClick={()=>router.push('/')}
           > 
           Back
           </p>
           <div 
             className={commonstyles.paper}
           >
           {
             formStep === 1 ?
               <SectionOne /> :
             ''
           }
          </div>
        </div>
        </div>
        </Layout>
        </div>
        </>
    );
}
export default SignUp