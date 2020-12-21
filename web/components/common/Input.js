import styles from '../../styles/Input.module.css';

const Input = (props) => {
    return (
      <>
       <div>
        <label
           className={styles.label}
         >
           {props.label}
         </label>
         <input
           {...props}
           className={styles.input}
         />
         </div>
      </>
    )
}

export default Input;