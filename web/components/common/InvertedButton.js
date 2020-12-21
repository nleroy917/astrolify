import styles from '../../styles/InvertedButton.module.css';

const InvertedButton = (props) => {
    const buttonClasses ={
        small: styles.invertedButtonSmall,
        medium: styles.invertedButtonMedium,
        large: styles.invertedButtonLarge
    }
    return (
        <button
         {...props}
         className={buttonClasses[props.size]}
        >
        { props.children}
        </button>
    )
}

export default InvertedButton