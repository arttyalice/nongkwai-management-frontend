import { apiService } from '@/config/api.js'

export default {
    async getLength () {
        let res = await apiService.get(`/allowance/get/length`);
        return res.data;
    },
    async getAllPersonWithTypeAndAllowance (page, size, search) {
        let res = await apiService.get(`/allowance/get/all?page=${page}&size=${size}&search=${search}`)
        return res.data
    },
    async getAllPersonWithTypeAndAllowanceReport (from, to) {
        let res = await apiService.get(`/allowance/get/report?from=${from}&to=${to}`)
        return res.data
    },
    async getAllPersonWithTypeAndAllowancebyID (alID) {
        let res = await apiService.get(`/allowance/get/one/${alID}`)
        return res.data
    },
    async getAllowanceByPerson (id_card) {
        let res = await apiService.get(`/allowance/get/person/${id_card}`)
        return res.data
    },
    async addNewAllowance (req) {
        let res = await apiService.post('/allowance/insert', req)
        return res
    },
    async updateAllowance (req, alID) {
        let res = await apiService.post('/allowance/update/' + alID, req)
        return res
    }
}