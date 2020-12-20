import styles from '../../styles/Button.module.css'
var classNames = require('classnames');

const Button = ({size, children, onClick}) => {
    const buttonClasses ={
        small: styles.buttonSmall,
        medium: styles.buttonMedium,
        large: styles.buttonLarge
    }
    return (
        <button
         className={buttonClasses[size]}
         onClick={onClick}
        >
        { children}
        </button>
    )
}

export default Button