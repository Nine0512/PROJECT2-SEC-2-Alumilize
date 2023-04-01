import {defineStore,acceptHMRUpdate} from "pinia";
import {computed, ref, watch} from "vue";

export const useRoleStore = defineStore("role", () => {
    const userInformation = ref({
        firstname: '',
        lastname: '',
        username: '',
        dateOfBirth: '',
        email: '',
        role: '',
        id:'',
        cart: [],
        cartCheck: [],
        price: 0
    })
    const setInfo = (userInfo) => {
        userInformation.value.firstname = userInfo.firstname
        userInformation.value.lastname = userInfo.lastname
        userInformation.value.username = userInfo.username
        userInformation.value.role = userInfo.role
        userInformation.value.dateOfBirth = userInfo.dateOfBirth
        userInformation.value.id = userInfo.id
        userInformation.value.email = userInfo.email
        userInformation.value.cart = userInfo.cart
        userInformation.value.cartCheck = userInfo.cartCheck
        userInformation.value.price = userInfo.price
    }
    const setRole= (roleUser) => {
        userInformation.value.role = roleUser
    }
    const setCartLength = () => {
        userInformation.value.cart = userInformation.value.cart.filter((item, index) => userInformation.value.cart.indexOf(item) === index)
    }
    const getLength = computed(() => {
        userInformation.value.cart.length
    })
    const getPrice = computed(() => {
        let dataJson = async ()=>{
            let res = await fetch('http://localhost:5000/Book/')
            let data = await res.json()
            data.forEach(book=>{
                    if(Object.values(userInformation.value.cart.map(it=>parseInt(it))).includes(book.id)){
                        userInformation.value.price += book.price
                    }
                }
            )
            return userInformation.value.price
        }
        dataJson()
    })
    const setCartToRemain = () => {
        // // userInformation.value.cartCheck = []
        // console.log(useRoleStore().userInformation.cartCheck)
        // useRoleStore().userInformation.cart.filter((item) => useRoleStore().userInformation.cartCheck.indexOf(item))
        // userInformation.value.cartCheck = []
        // console.log(useRoleStore().userInformation.cart)
     }

    return {userInformation, setCartToRemain, setInfo, setRole,getLength,setCartLength, getPrice}
})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}
