import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useRoleStore = defineStore("role", () => {
    const userInformation = ref({
        firstname: '',
        lastname: '',
        username: '',
        dateOfBirth: '',
        email: '',
        role: ''
    })
    const setInfo = (userInfo) => {
        userInformation.value.firstname = userInfo.firstname
        userInformation.value.lastname = userInfo.lastname
        userInformation.value.username = userInfo.username
        userInformation.value.role = userInfo.role
        userInformation.value.dateOfBirth = userInfo.dateOfBirth
        userInformation.value.email = userInfo.email
    }
    const setRole= (roleUser) => {
        userInformation.value.role = roleUser
    }

    return {userInformation, setInfo, setRole}
})