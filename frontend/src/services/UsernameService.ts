import {ref} from "vue";
import {getCookie} from "../components/composables/GetCookie";

export const currentUsername = ref("");

export function setCurrentUser() {
    if (!!getCookie("noxtoon-session")) {
        currentUsername.value = JSON.parse(decodeURIComponent(getCookie("noxtoon-session"))).username;
        return;
    }
    currentUsername.value = "";
}

setCurrentUser()
