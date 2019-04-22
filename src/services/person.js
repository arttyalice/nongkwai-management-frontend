import { apiService } from '@/config/api.js'

export default {
    async getAllPerson (page, size, search) {
        let res = await apiService.get(`/person/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async getPersonbyID (pID) {
        let res = await apiService.get(`/person/get/one/${pID}`);
        return res.data;
    },
    async addNewPerson (req) {
        let res = await apiService.post('/person/insert', req);
        return res
    },
    async removePerson (pID) {
        let res = await apiService.get('/person/delete/' + pID);
        return res
    },
    async updatePerson (req, pID) {
        let res = await apiService.post('/person/update/' + pID, req);
        return res
    }
}