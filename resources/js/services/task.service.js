import axios from 'axios'
import {api_point} from "../enviroment";

export const taskService = {
    allTasks($store) {
        $store.commit('checkFortToken');
        return axios.get(`${api_point}/tasks`)
            .then((resp) => {
                return resp.data.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    getUsers($store) {
        $store.commit('checkFortToken');
        return axios.get(`${api_point}/users`)
            .then((resp) => {
                return resp.data.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    createTask(data, $store) {
        $store.commit('checkFortToken');
        return axios.post(`${api_point}/user_tasks`, data)
            .then((resp) => {
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    getTask(id, $store) {
        $store.commit('checkFortToken');
        return axios.get(`${api_point}/show/${id}`)
            .then((resp) => {
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    getTaskForUpdate(id, $store) {
        $store.commit('checkFortToken');
        return axios.get(`${api_point}/user_tasks/${id}/edit`)
            .then((resp) => {
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    updateTask(id, data, $store) {
        $store.commit('checkFortToken');
        return axios.put(`${api_point}/user_tasks/${id}`, data)
            .then((resp) => {
                $store.commit('showAlert', 'success');
                $store.commit('newMessage', 'Task successfully Updated');
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    removeTask(id, $store) {
        $store.commit('checkFortToken');
        return axios.delete(`${api_point}/user_tasks/${id}`)
            .then((resp) => {
                $store.commit('showAlert', 'success');
                $store.commit('newMessage', 'Task successfully removed');
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    changeStatus(id, status, $store) {
        $store.commit('checkFortToken');
        return axios.post(`${api_point}/changeStatus/${id}`, status)
            .then((resp) => {
                $store.commit('showAlert', 'success');
                $store.commit('newMessage', 'Status successfully changed');
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    userTasks($store) {
        $store.commit('checkFortToken');
        return axios.get(`${api_point}/user_tasks`)
            .then((resp) => {
                return resp.data.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    },
    search(key, $store) {
        $store.commit('checkFortToken');
        return axios.post(`${api_point}/search`, key)
            .then((resp) => {
                return resp.data
            })
            .catch(() => {
                $store.commit('showAlert', 'danger');
                $store.commit('newMessage', 'Something went wrong');
            })
            .finally()
    }
};
