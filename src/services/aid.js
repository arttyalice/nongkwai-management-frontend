import { apiService } from '@/config/api.js'

export default {
    async getAllAids (page, size, search) {
        let res = await apiService.get(`/aid/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async getPersonbyID (pID) {
        let res = await apiService.get(`/aid/get/one/${pID}`);
        return res.data;
    },
    async addNewPerson (req) {
        let res = await apiService.post('/aid/insert', req);
        return res
    },
    async removePerson (pID) {
        let res = await apiService.get('/aid/delete/' + pID);
        return res
    },
    async updatePerson (req, pID) {
        let res = await apiService.post('/aid/update/' + pID, req);
        return res
    }
}