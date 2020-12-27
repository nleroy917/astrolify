// css
import commonstyles from '../styles/common.module.css';
import styles from '../styles/sign-up.module.css';
import styled from 'styled-components';

// layout
import Layout from '../components/layout/Layout';
import {SectionOne, SectionTwo, SectionThree, SectionFour} from '../components/sign-up-form/sign-up-form';
import Loader from 'react-loader-spinner';

// import state, forms, routing
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

// import firebase
import firebase from "firebase/app";
import "firebase/auth";

import axios from 'axios';
import { birthday_to_zodiac } from '../utils/zodiac';
import Button from '../components/common/Button';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const SignUp = ({code, error}) => {
    const router = useRouter()
    const [pageError, setPageError] = useState(null);
    const [formStep, setFormStep] = useState(1);
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [year, setYear] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleRegistration = async () => {
        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (user) =>{
          let payload = {
            'name': name,
            'birthday': `${year}-${month}-${day}`,
            'code': code,
            'zodiac': birthday_to_zodiac(parseInt(month), parseInt(day)),
            'user': user
          }
          try {
            let res = await axios.post(`${API_BASE}/auth/register`, payload)
            if (res.status === 200){
              setLoading(false)
              let data = await res.data
              console.log(data)
              setLoading(false)
              router.push('/profile')
            }
          } catch(error) {
            // need to deleted user from firebase if any error occurs on the server
            firebase.auth().currentUser.delete()
            setLoading(false)
            setError(true)
            alert(error)
          }
        })
        .catch(error=>{
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(`Error! ${errorMessage}`)
        })
    }

    useEffect(() => {
      if(error === 'access_denied'){
        router.push('/')
      }
      if(!code) {
        setPageError({
          message: 'Please authorize Spotify first'
        })
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
          <div>
          {
            loading ? '' :
           <p 
             className={styles.backLink} 
             onClick={()=>router.push('/')}
           > 
             Go Home
           </p>
          }
           </div>
           <div
             style={{background: 'none'}}
             className={commonstyles.paper}
           >
            {
            pageError
            ? <div style={{color: 'white'}}>{pageError.message}</div>
            :  formStep === 1 
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
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  setFormStep={setFormStep}
                  zodiac={birthday_to_zodiac(parseInt(month), parseInt(day))}
                  onSubmit={handleRegistration}
                />
             : loading
             ? <div className={styles.loadingContainer}>
                 <div>Getting things ready for you...</div>
                 <Loader 
                   type="RevolvingDot"
                   color="#FFF"
                   height={100}
                   width={100}
                   style={{margin: '30px'}}
                />
                </div>
             : error
             ? <div className={commonstyles.centerXY}>
                 <h1>An error occured :(</h1>
                 <Button
                   onClick={()=>router.push('/')}
                 >
                   Take me back
                 </Button>
               </div>
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