import { apiService } from '@/config/api.js'

export default {
    async getLength () {
        let res = await apiService.get(`/contact/get/length`);
        return res.data;
    },
    async getContactbyPatientID (pID) {
        let res = await apiService.get(`/contact/get/patient/${pID}`);
        return res.data;
    },
    async getContactbyContactID (ctID) {
        let res = await apiService.get(`contact/get/one/${ctID}`);
        return res.data;
    },
    async createContact (data) {
        let res = await apiService.post(`/contact/insert`, data);
        return res.data;
    },
    async updateContact (ctID, data) {
        let res = await apiService.post(`/contact/update/${ctID}`, data);
        return res.data;
    },
    async deleteContactbyID (cID) {
        let res = await apiService.get(`/contact/delete/${cID}`);
        return res.data;
    },
}