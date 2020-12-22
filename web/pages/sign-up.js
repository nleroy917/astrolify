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
      <div style={{display: 'flex', flexDirection:'row'}}>
        <button 
          className={styles.submitButton}
          onClick={()=>props.setFormStep(2)}
        >
          Back
        </button>
        <button 
          className={styles.submitButton}
          onClick={()=>props.setFormStep(3)}
        >
          Lets go
        </button>
        </div>
     </div>
     
    </>
  )
}

const SignUp = ({code}) => {
    const router = useRouter()
    const [formStep, setFormStep] = useState(1);
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    const [name, setName] = useState("")

    const handleRegistration = async () => {
        let payload = {
          'name': name,
          'birthday': `${year}-${month}-${day}`,
          'code': code
        }
    }

    // get access and refresh tokens
    useEffect(() => {
      //console.log(code)
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
  return { code }
}

export default SignUp