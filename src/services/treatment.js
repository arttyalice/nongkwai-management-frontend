import { apiService } from '@/config/api.js'

export default {
    async getAllTreatment (page, size, search) {
        let res = await apiService.get(`/treatment/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async gettreatmentbyID (pID) {
        let res = await apiService.get(`/treatment/get/one/${pID}`);
        return res.data;
    },
    async addNewtreatment (req, id_card) {
        let res = await apiService.post('/treatment/insert/' + id_card, req);
        return res
    },
    async removetreatment (pID) {
        let res = await apiService.get('/treatment/delete/' + pID);
        return res
    },
    async updatetreatment (req, pID) {
        let res = await apiService.post('/treatment/update/' + pID, req);
        return res
    }
}