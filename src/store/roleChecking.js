import {defineStore,acceptHMRUpdate} from "pinia";
import {computed, ref} from "vue";

export const useRoleStore = defineStore("role", () => {
    const userInformation = ref({
        firstname: '',
        lastname: '',
        username: '',
        dateOfBirth: '',
        email: '',
        role: '',
        id:'',
        bookId: [],
        cart: [],
        cartCheck: []
    })
    const setInfo = (userInfo) => {
        userInformation.value.firstname = userInfo.firstname
        userInformation.value.lastname = userInfo.lastname
        userInformation.value.username = userInfo.username
        userInformation.value.role = userInfo.role
        userInformation.value.dateOfBirth = userInfo.dateOfBirth
        userInformation.value.id = userInfo.id
        userInformation.value.email = userInfo.email
        userInformation.value.bookId = userInfo.bookId
        userInformation.value.cart = userInfo.cart
        userInformation.value.cartCheck = userInfo.cartCheck
    }
    const setRole= (roleUser) => {
        userInformation.value.role = roleUser
    }

    const setCartToRemain = () => {
        userInformation.value.cart.filter(val => {
            return userInformation.value.cartCheck.indexOf(val) === -1;
        });
        // userInformation.value.cart.filter(val => !userInformation.value.cartCheck.includes(val));
    }
    const getPrice = computed(()=>{
        let total = ref(0)
        userInformation.value.cart.forEach(item => {
            total.value += item.price
        })
        return total.value
    })
    return {userInformation, setCartToRemain, setInfo, setRole,getPrice}
})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}