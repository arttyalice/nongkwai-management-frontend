import { apiService } from '@/config/api.js'

export default {
    async getLength () {
        let res = await apiService.get(`/disabled/get/length`);
        return res.data;
    },
    async getAllDisabled (page, size, search) {
        let res = await apiService.get(`/disabled/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async getPersonbyID (pID) {
        let res = await apiService.get(`/disabled/get/one/${pID}`);
        return res.data;
    },
    async addNewPerson (req) {
        let res = await apiService.post('/disabled/insert', req);
        return res
    },
    async removePerson (pID) {
        let res = await apiService.get('/disabled/delete/' + pID);
        return res
    },
    async updatePerson (req, dID) {
        let res = await apiService.post('/disabled/update/' + dID, req);
        return res
    }
}