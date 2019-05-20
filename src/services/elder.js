import { apiService } from '@/config/api.js'

export default {
    async getLength () {
        let res = await apiService.get(`/elder/get/length`);
        return res.data;
    },
    async getAllDisabled (page, size, search) {
        let res = await apiService.get(`/elder/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async getPersonbyID (pID) {
        let res = await apiService.get(`/elder/get/one/${pID}`);
        return res.data;
    },
    async addNewPerson (req) {
        let res = await apiService.post('/elder/insert', req);
        return res
    },
    async removePerson (pID) {
        let res = await apiService.get('/elder/delete/' + pID);
        return res
    },
    async updatePerson (req, edID) {
        let res = await apiService.post('/elder/update/' + edID, req);
        console.log(res)
        return res
    }
}