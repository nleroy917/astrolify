import styles from '../../styles/Button.module.css'
var classNames = require('classnames');

const Button = (props) => {
    const buttonClasses ={
        small: styles.buttonSmall,
        medium: styles.buttonMedium,
        large: styles.buttonLarge
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

export default Button