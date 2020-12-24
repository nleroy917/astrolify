import commonstyles from '../styles/common.module.css';
import styles from '../styles/sign-in.module.css';
import styled from 'styled-components';

import Layout from '../components/layout/Layout';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

import firebase from "firebase/app";
import "firebase/auth";

const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter()
    const [error, setError] = useState(false);
    const onSubmit = (data) => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
              router.push('/profile')
            })
            .catch((error) => {
              if(error.code === 'auth/user-not-found'){
                setError({
                  code: error.code,
                  message: 'Email not recognized. Have you created an account?'
                })
              } else if(error.code === 'auth/wrong-password') {
                setError({
                  code: error.code,
                  message: 'Email/Password combo is incorrect.'
                  })
              } else {
                setError({
                  code: error.code,
                  message: `Unknown error occured: ${error.code}`
                  })
              }
          });
    }

    return (
        <>
        <div className={commonstyles.starryNight}>
        <Layout
          seo={{
              title: "Sign In"
          }}
        >
         <div className={styles.signInContainer}>
          <div className={styles.signInFormWrapper}>
           <div className={commonstyles.paper}>
              <h1> Sign In</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input name="email" ref={register} placeholder="person@company.com" type="email" className={commonstyles.formInput} />
                <label>Password</label>
                <input name="password" ref={register} placeholder="Shh..." type="password" className={commonstyles.formInput} />
                <button type="submit" className={styles.submitButton}>
                    Sign In
                </button>
                <div className={styles.errorContainer}>
                 <div className={styles.errorMessage}>
                  {error ? `${error.message}` : '' }
                 </div>
                </div>
              </form>
              <div className={styles.bottomLinks}>
                <p 
                  className={styles.textLink}
                  onClick={()=>router.push('/sign-up')}
                 >
                   Already have an account?
                </p>
                <p 
                  className={styles.textLink}
                  onClick={()=>router.push('/sign-in')}
                 >
                   Forgot Password?
                </p>
              </div>
           </div>
          </div>
         </div>
         </Layout>
         </div>
        </>
    )
}

export default SignIn;