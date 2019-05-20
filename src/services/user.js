import { apiService } from '@/config/api.js'

export default {
    async getLength () {
        let res = await apiService.get(`/user/get/length`);
        return res.data;
    },
    async getAllUser (page, size, search) {
        let res = await apiService.get(`/user/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async getUserbyID (uID) {
        let res = await apiService.get(`/user/get/one/${uID}`);
        return res.data;
    },
    async getUserPosition () {
        let res = await apiService.get(`/user/get/position`);
        return res.data;
    },
    async userLogin (data) {
        let res = await apiService.post('/user/login', data);
        return res;
    },
    async addNewUser (req) {
        let res = await apiService.post('/user/insert', req);
        return res
    },
    async removeUser (uID) {
        let res = await apiService.get('/user/delete/' + uID);
        return res
    },
    async updateUser (req, uID) {
        let res = await apiService.post('/user/update/' + uID, req);
        return res
    }
}