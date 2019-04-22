import { apiService } from '@/config/api.js'

export default {
    async getAllProvice () {
        let res = await apiService.get(`/address/province`);
        return res.data;
    },
    async getDistricByProvinceID (pvID) {
        let res = await apiService.get(`/address/district/${pvID}`);
        return res.data;
    },
    async getSubdistrictByDistrictID (dtID) {
        let res = await apiService.get(`/address/subdistrict/${dtID}`);
        return res.data;
    },
}