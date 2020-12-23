import styles from '../../styles/sign-up.module.css';
import commonstyles from '../../styles/common.module.css';

import Input from '../common/Input';
import Button from '../common/Button';

export const SectionOne = (props) => {
    return(
      <>
     <div className={styles.innerWrapper}>
        <h1 className={styles.formSectionTitle}>What is your name?</h1>
      <div className={styles.dateWrapper}>
      <Input
        style={{width: 250, fontSize: '22px'}}
        value={props.name}
        onChange={(e)=>props.setName(e.target.value)} 
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
  
  export const SectionTwo = (props) => {
    return(
      <>
      <div className={styles.innerWrapper}>
        <h1 className={styles.formSectionTitle}>When is your birthday?</h1>
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
  
  export const SectionThree = (props) => {
    return (
      <>
       <div className={styles.innerWrapper}>
        <h1 className={styles.formSectionTitle}>{`Please specify an email and password`}</h1>
        <Input
            style={{fontSize: '22px'}}
            value={props.email}
            onChange={(e)=>props.setEmail(e.target.value)} 
            label="Email"
          />
          <Input
            style={{fontSize: '22px'}}
            value={props.password}
            onChange={(e)=>props.setPassword(e.target.value)} 
            label="Password"
            type="password"
          />
        <div style={{display: 'flex', flexDirection:'row'}}>
          <button 
            className={styles.submitButton}
            onClick={()=>props.setFormStep(2)}
          >
            Back
          </button>
          <button 
            className={styles.submitButton}
            onClick={()=>props.setFormStep(4)}
          >
            Next
          </button>
          </div>
       </div>
       
      </>
    )
  }

  export const SectionFour = (props) => {
      return(
      <>
       <div className={styles.innerWrapper}>
        <h1 className={styles.formSectionTitle}>Connect Spotify</h1>
        <div style={{display: 'flex', flexDirection:'row'}}>
          <button 
            className={styles.submitButton}
            onClick={()=>props.setFormStep(3)}
          >
            Back
          </button>
          <button 
            className={styles.submitButton}
            onClick={()=>props.setFormStep(4)}
          >
            Next
          </button>
          </div>
       </div>  
      </>
      )
  }