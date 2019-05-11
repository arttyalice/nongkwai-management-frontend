import { apiService } from '@/config/api.js'

export default {
    async getAllPerson (page, size, search) {
        const res = await apiService.get(`/visiting/get/all?page=${page}&size=${size}&search=${search}`);
        return res.data;
    },
    async getPersonbyID (pID) {
        const res = await apiService.get(`/visiting/get/one/${pID}`);
        return res.data;
    },
    async getVisitingHistory (id_card) {
        const res = await apiService.get(`visiting/get/visiting/all/${id_card}`)
        return res.data
    },
    async getAdlSummary (adlID) {
        const res = await apiService.get('/visiting/get/adl/summary/' + adlID)
        return res.data
    },
    async addNewVisiting (id_card, req) {
        const res = await apiService.post('/visiting/insert/' + id_card, req);
        return res
    },
    async removePerson (pID) {
        const res = await apiService.get('/person/delete/' + pID);
        return res
    },
    async updatePerson (req, pID) {
        const res = await apiService.post('/person/update/' + pID, req);
        return res
    }
}