const showPasswordIcon = 'https://api.iconify.design/zondicons:view-show.svg?color=%23888888';
const hidePasswordIcon = 'https://api.iconify.design/dashicons:hidden.svg?color=%23888888'

const toggleIconShowHidePassword = (event, passwordField) => {
    if(event.target.src === showPasswordIcon) {
        event.target.src = hidePasswordIcon
        passwordField.type = 'text'
    } else {
        event.target.src = showPasswordIcon
        passwordField.type = 'password'
    }

}

export default toggleIconShowHidePassword