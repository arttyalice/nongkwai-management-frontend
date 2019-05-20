import { apiService } from '@/config/api.js'

export default {
    async getLength () {
        let res = await apiService.get(`/treatment/get/length`);
        return res.data;
    },
    async getAllTreatment (page, size, search) {
        let res = await apiService.get(`/treatment/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async gettreatmentbyID (tmID) {
        let res = await apiService.get(`/treatment/get/one/${tmID}`);
        return res.data;
    },
    async getTreatmentbyPerson (pID) {
        let res = await apiService.get(`/treatment/get/treatment/all/${pID}`);
        return res.data;
    },
    async getFileInTreatment (tmID) {
        let res = await apiService.get(`/treatment/get/files/${tmID}`);
        return res.data;
    },
    async addNewtreatment (req, id_card) {
        let res = await apiService.post('/treatment/insert/' + id_card, req);
        return res
    },
    async removetreatment (tmID) {
        let res = await apiService.post('/treatment/delete/' + tmID);
        return res
    },
    async updatetreatment (req, tmID) {
        let res = await apiService.post('/treatment/update/' + tmID, req);
        return res
    }
}