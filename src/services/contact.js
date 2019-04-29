import { apiService } from '@/config/api.js'

export default {
    async getContactbyPatientID (pID) {
        let res = await apiService.get(`/contact/get/patient/${pID}`);
        return res.data;
    },
    async deleteContactbyID (cID) {
        let res = await apiService.get(`/contact/delete/${cID}`);
        return res.data;
    },
}