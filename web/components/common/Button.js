import styles from '../../styles/Button.module.css'
var classNames = require('classnames');

const Button = ({size, children}) => {
    const buttonClasses ={
        small: styles.buttonSmall,
        medium: styles.buttonMedium,
        large: styles.buttonLarge
    }
    return (
        <button
         className={buttonClasses[size]}
        >
        { children}
        </button>
    )
}

export default Button