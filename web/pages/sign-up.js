// css
import commonstyles from '../styles/common.module.css';
import styles from '../styles/sign-up.module.css';
import styled from 'styled-components';

// layout
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// import state, forms, routing
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

// import firebase
import firebase from "firebase/app";
import "firebase/auth";

import axios from 'axios';
import { birthday_to_zodiac } from '../utils/zodiac';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const SectionOne = (props) => {
  return(
    <>
   <div className={styles.innerWrapper}>
      <h1 style={{textAlign: 'center', fontSize:'36px', marginBottom: '0px'}}>What is your name?</h1>
    <div className={styles.dateWrapper}>
    <Input
      style={{width: 250, fontSize: '22px'}}
      value={props.name}
      onChange={(e)=>props.setName(e.target.value)} 
      label="Name"
      onKeyDown={(e)=>{
        if(e.keyCode === 13){
          props.setFormStep(2)
        }
      }}
    />
    </div>
    <button 
      className={styles.submitButton}
      onClick={()=>props.setFormStep(2)}
    >
      Next
    </button>
    </div>
    </>
  )
}

const SectionTwo = (props) => {
  return(
    <>
    <div className={styles.innerWrapper}>
      <h1 style={{textAlign: 'center'}}>When is your birthday?</h1>
    <div className={styles.dateWrapper}>
    <Input
      style={{width: 50, fontSize: '22px'}}
      value={props.month}
      onChange={(e)=>props.setMonth(e.target.value)} 
      label="Month"
    />
    <Input
      style={{width: 50, fontSize: '22px'}}
      value={props.day}
      onChange={(e)=>props.setDay(e.target.value)} 
      label="Day"
    />
    <Input
      style={{width: 100, fontSize: '22px'}}
      value={props.year}
      onChange={(e)=>props.setYear(e.target.value)} 
      label="Year"
      onKeyDown={(e)=>{
        if(e.keyCode === 13){
          props.setFormStep(3)
        }
      }}
    />
    </div>
    <div style={{display: 'flex', flexDirection:'row'}}>
    <button 
      className={styles.submitButton}
      onClick={()=>props.setFormStep(1)}
    >
      Back
    </button>
    <button 
      className={styles.submitButton}
      onClick={()=>props.setFormStep(3)}
    >
      Next
    </button>
    </div>
    </div>
    </>
  )
}

const SectionThree = (props) => {
  return (
    <>
     <div className={styles.innerWrapper}>
      <h1>Welcome {props.name}</h1>
      <h4>{`I heard ${props.zodiac}'s are ugly.`}</h4>
      <div style={{display: 'flex', flexDirection:'row'}}>
        <button 
          className={styles.submitButton}
          onClick={()=>props.setFormStep(2)}
        >
          Back
        </button>
        <button 
          className={styles.submitButton}
          onClick={()=>props.onSubmit()}
        >
          Lets go
        </button>
        </div>
     </div>
     
    </>
  )
}

const SignUp = ({code, error}) => {
    const router = useRouter()
    const [formStep, setFormStep] = useState(1);
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegistration = async () => {
        setLoading(true)
        let payload = {
          'name': name,
          'birthday': `${year}-${month}-${day}`,
          'code': code,
          'zodiac': birthday_to_zodiac(parseInt(month), parseInt(day))
        }
        try {
          let res = await axios.post(`${API_BASE}/auth/register`, payload)
          if (res.status === 200){
            setLoading(false)
            let data = await res.data
            console.log(data)
            firebase.auth().signInWithCustomToken(data.fb_token)
            .then(user => {
              console.log(user)
              router.push('/')
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
            });
            
          }
        } catch(error) {
            alert(error)
        }

    }

    // get access and refresh tokens
    useEffect(() => {
      if(error === 'access_denied'){
        router.push('/')
      }
    }, [])
    
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
             style={{background: 'none'}}
             className={commonstyles.paper}
           >
          {
               formStep === 1 
             ? <SectionOne 
                 name={name}
                 setName={setName}
                 setFormStep={setFormStep}
                /> 
             : formStep === 2
             ? <SectionTwo 
                  day={day}
                  setDay={setDay}
                  month={month}
                  setMonth={setMonth}
                  year={year}
                  setYear={setYear}
                  setFormStep={setFormStep}
               />
             : formStep === 3
             ? <SectionThree 
                  name={name}
                  setFormStep={setFormStep}
                  onSubmit={handleRegistration}
                  zodiac={birthday_to_zodiac(parseInt(month), parseInt(day))}
                />
             : <div></div>
           }
          </div>
        </div>
        </div>
        </Layout>
        </div>
        </>
    );
}

SignUp.getInitialProps = async ({ query }) => {
  const { code } = query
  const { error } = query
  return { code, error }
}

export default SignUp