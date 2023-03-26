import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useRoleStore = defineStore("role", () => {
    const role = ref('')
    const setRole= (roleUser) => {
        role.value = roleUser
    }

    return {role, setRole}
})