import axios from 'axios'
import {api_point} from "../enviroment";

export const authService = {
    login(data, $store) {
        return axios.post(`${api_point}/login`, data)
            .then((resp) => {
                this.fillStorageValuesAndAuthVariable(resp.data, $store);
                this.updateAuthorizationBearerToken(`Bearer ${resp.data.token}`);
                return resp.data
            })
            .catch()
            .finally()
    },
    register(data, $store) {
        return axios.post(`${api_point}/register`, data)
            .then((resp) => {
                this.fillStorageValuesAndAuthVariable(resp.data, $store);
                this.updateAuthorizationBearerToken(`Bearer ${resp.data.token}`);
                return resp.data
            })
            .catch()
            .finally()
    },
    logOut($store) {
        this.clearStorageAndResetAuthVariable($store);
        this.updateAuthorizationBearerToken(null);
        return axios.post(`${api_point}/logout`, 'logOut')
            .then((resp) => {
                return resp.data
            })
            .catch()
            .finally()
    },
    fillStorageValuesAndAuthVariable(data,$store) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        $store.commit('userDetails');
        $store.commit('checkFortToken');
    },
    clearStorageAndResetAuthVariable($store) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        $store.commit('userDetails');
        $store.commit('checkFortToken');
    },
    updateAuthorizationBearerToken(token) {
        window.axios.defaults.headers.common['Authorization'] = token;
    }
};
