
<template>
    <span>
        <el-row>
            <el-col class="align-l" :span="12">
                <h2>แก้ไขข้อมูลผู้ป่วยโรคเอดส์</h2>
            </el-col>
            <el-col class="align-r" :span="12">
                <router-link to="/aid">
                    <el-button plain>
                        กลับ
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-form ref="form" :model="person" :rules="rules" label-width="120px" class="demo-form-inline">
            <!-- Person info -->
            <el-row>
                <h2>ที่พักอาศัย</h2>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="ผู้ครอบครองของที่พัก: " prop="titlename">
                        <el-radio-group v-model="visit[item.name]">
                            <el-radio    
                                :label="เป็นของตนเอง"
                            >
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="ชื่อจริง :" prop="fname">
                        <el-input placeholder="ชื่อจริง" v-model="person.fname"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="นามสกุล :" prop="lname">
                        <el-input placeholder="นามสกุล" v-model="person.lname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <el-form-item label="บัตรประชาชน :" prop="idCard">
                        <el-input placeholder="1239900123003" v-model="person.idCard"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="วันเกิด :" prop="birthDate">
                        <el-date-picker
                            style="width: 100%;"
                            v-model="person.birthDate"
                            type="date"
                            placeholder="เลือกวันเกิด">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="สัญชาติ :" prop="nationality">
                        <el-input placeholder="ไทย, ฝรั่งเศษ" v-model="person.nationality"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <el-form-item label="เบอร์โทร :" prop="phone">
                        <el-input placeholder="0812345678" v-model="person.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- Address -->
            <el-row>
                <h2>ที่อยู่</h2>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="บ้านเลขที่ :" prop="address.num">
                        <el-input placeholder="10/10" v-model="person.address.num"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="หมู่ :" prop="address.moo">
                        <el-input placeholder="1" v-model="person.address.moo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="ซอย :" prop="address.soi">
                        <el-input placeholder="ชื่อซอย 1" v-model="person.address.soi"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="ถนน :" prop="address.road">
                        <el-input placeholder="ชื่อถนน" v-model="person.address.road"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="หมู่บ้าน :" prop="address.village">
                        <el-input placeholder="ชื่อหมู่บ้าน" v-model="person.address.village"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="จังหวัด :" prop="address.Pid">
                        <el-select filterable style="width: 100%;" @change="onProvinceChange" v-model="person.address.Pid">
                            <el-option v-for="item in provinceList" :key="item.Pid" :label="item.Pname_th" :value="item.Pid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="อำเภอ :" prop="address.Did">
                        <el-select filterable style="width: 100%;" @change="onDistrictChange" v-model="person.address.Did">
                            <el-option v-for="item in districtList" :key="item.Did" :label="item.Dname_th" :value="item.Did"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="ตำบล :" prop="address.SDTid">
                        <el-select filterable style="width: 100%;" v-model="person.address.SDTid">
                            <el-option v-for="item in subDistrictList" :key="item.SDTid" :label="item.SDTname_th" :value="item.SDTid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item style="text-align: left;" label="ตำแหน่ง :">
                        <span style="position: relative;">
                            <el-button
                                type="warning"
                                icon="el-icon-location"
                                style="position: absolute; top: 10px; left: 10px; z-index: 2;"
                                @click="findCurrentLocation"
                            >Get current location</el-button>
                            <GmapMap
                                :center="center"
                                :zoom="13"
                                :options="{
                                    zoomControl: true,
                                    mapTypeControl: false,
                                    scaleControl: false,
                                    streetViewControl: false,
                                    rotateControl: false,
                                    fullscreenControl: false,
                                    disableDefaultUi: false
                                }"
                                @click="onMapChange"
                                style="width: 100%; height: 500px"
                            >
                                <GmapMarker
                                    v-if="person.address.geo.lat !== null"
                                    :position="{lat: person.address.geo.lat, lng: person.address.geo.lng}"
                                    :clickable="true"
                                    :draggable="true"
                                    @dragend="onMapChange"
                                />
                            </GmapMap>
                        </span>
                    </el-form-item>
                    
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="reset">ล้างข้อมูล</el-button>
            <el-button type="primary" @click="saveNewPerson">บันทึก</el-button>
        </span>
    </span>
</template>


<script>
    import moment from 'moment'
    import personService from '@/services/person'
    import addressService from '@/services/address_prefence'
    export default {
        data() {
            return {
                provinceList: [],
                districtList: [],
                subDistrictList: [],
                center: { lat:18.796143, lng:98.979263 },
                rules: {
                    fname: [
                        { required: true, message: 'กรุณากรอกชื่อจริง', trigger: 'blur', },
                    ],
                    lname: [
                        { required: true, message: 'กรุณากรอกนามสกุล', trigger: 'blur', },
                    ],
                    phone: [
                        { required: true, message: 'กรุณากรอกเบอร์โทร', trigger: 'blur', },
                        { min: 9, max: 10, message: 'เบอร์โทรต้องยาว 9 - 10 หลัก', trigger: 'change' },
                    ],
                    birthDate: [
                        { required: true, message: 'กรุณากรอกวันเกิด', trigger: 'blur', },
                    ],
                    nationality: [
                        { required: true, message: 'กรุณากรอกสัญชาติ', trigger: 'blur', },
                    ],
                    idCard: [
                        { required: true, message: 'กรุณากรอกรหัสบัตรประชาชน', trigger: 'blur', },
                        { min: 13, max: 13, message: 'รหัสบัตรประชาชนต้องยาว 13 หลัก', trigger: 'change' },
                    ],
                    titlename: [
                        { required: true, message: 'กรุณากรอกคำนำหน้าชื่อ', trigger: 'blur', },
                    ],
                    person_status: [
                        { required: true, message: 'กรุณากรอกสถานะความเป็นอยู่', trigger: 'blur', },
                    ],
                    address: {
                        num: [
                            { required: true, message: 'กรุณากรอกเลขที่บ้าน', trigger: 'blur', },
                        ],
                        moo: [
                            { required: true, message: 'กรุณากรอกเลขที่หมู่', trigger: 'blur', },
                        ],
                        soi: [
                            { required: true, message: 'กรุณากรอกซอย', trigger: 'blur', },
                        ],
                        road: [
                            { required: true, message: 'กรุณากรอกชื่อถนน', trigger: 'blur', },
                        ],
                        village: [
                            { required: true, message: 'กรุณากรอกชื่อหมู่บ้าน', trigger: 'blur', },
                        ],
                        Pid: [
                            { required: true, message: 'กรุณาเลือกจังหวัด', trigger: 'blur', },
                        ],
                        Did: [
                            { required: true, message: 'กรุณาเลือกอำเภอ', trigger: 'blur', },
                        ],
                        SDTid: [
                            { required: true, message: 'กรุณาเลือกตำบล', trigger: 'blur', },
                        ],
                    },
                },
                person: {
                    idCard: '',
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: '',
                    birthDate: '',
                    nationality: '',
                    person_status: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null,
                        geo: {
                            lat: null,
                            lng: null,
                        }
                    },
                },
            };
        },
        async created() {
            try {
                this.provinceList = await addressService.getAllProvice();
            } catch (error) {
                this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                    type: 'error',
                    confirmButtonText: 'ตกลง',
                });
                this.$router.push('/aid');
            }
        },
        methods: {
            reset() {
                this.person = {
                    idCard: '',
                    titlename: '',
                    fname: '',
                    lname: '',
                    phone: '',
                    birthDate: '',
                    nationality: '',
                    person_status: '',
                    address: {
                        num: '',
                        moo: '',
                        soi: '',
                        road: '',
                        village: '',
                        Pid: null,
                        Did: null,
                        SDTid: null,
                        geo: {
                            lat: null,
                            lng: null,
                        }
                    },
                };
            },
            onMapChange (ev) {
                this.person.address.geo.lat = ev.latLng.lat();
                this.person.address.geo.lng = ev.latLng.lng();
            },
            findCurrentLocation () {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.person.address.geo.lat = pos.coords.latitude;
                    this.person.address.geo.lng = pos.coords.longitude;
                    this.center = {
                        lat: this.person.address.geo.lat,
                        lng: this.person.address.geo.lng
                    }
                })
            },
            async onProvinceChange () {
                try {
                    this.person.address.Did = null;
                    this.person.address.SDTid = null;
                    this.districtList = await addressService.getDistricByProvinceID(this.person.address.Pid);
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
            async onDistrictChange () {
                try {
                    this.person.address.SDTid = null;
                    this.subDistrictList = await addressService.getSubdistrictByDistrictID(this.person.address.Did);
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
            async saveNewPerson() {
                let valid = null
                await this.$refs.form.validate(val => {
                    valid = val;
                });
                if (valid === false) {
                    this.$alert('กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึกข้อมูล', 'ข้อมูลไม่ครบถ้วน!', {
                        type: 'warning',
                        confirmButtonText: 'ตกลง',
                    });
                    return;
                } else {
                    if (this.validateLatLng()) {
                        this.$alert('กรุณาเลือกตำแหน่งที่อยู่บนแผนที่ก่อนบันทึก', 'ข้อมูลไม่ครบถ้วน!', {
                            type: 'warning',
                            confirmButtonText: 'ตกลง',
                        });
                        return;
                    }
                }
                const newPerson = new FormData();
                newPerson.append('id_card', this.person.idCard);
                newPerson.append('person_titlename', this.person.titlename);
                newPerson.append('person_firstname', this.person.fname);
                newPerson.append('person_lastname', this.person.lname);
                newPerson.append('person_birthday', moment(this.person.birthDate).format('YYYY-MM-DD').toString());
                newPerson.append('person_nationality', this.person.nationality);
                newPerson.append('person_addNum', this.person.address.num);
                newPerson.append('person_addMoo', this.person.address.moo);
                newPerson.append('person_addSoi', this.person.address.soi);
                newPerson.append('person_addRoad', this.person.address.road);
                newPerson.append('person_addVillage', this.person.address.village);
                newPerson.append('STDid', this.person.address.SDTid);
                newPerson.append('Did', this.person.address.Did);
                newPerson.append('Pid', this.person.address.Pid);
                newPerson.append('person_phone', this.person.phone);
                newPerson.append('person_status', this.person.person_status);
                newPerson.append('person_lat', this.person.address.geo.lat);
                newPerson.append('person_lng', this.person.address.geo.lng);
                newPerson.append('user_id', localStorage.getItem('admin_user_data'));
                try {
                    let res = await personService.addNewPerson(newPerson);
                    this.$alert(`บันทึกข้อมูลผู้ใช้ของ ${this.person.fname} ${this.person.lname} เรียบร้อยแล้ว`, 'สำเร็จ!', {
                        type: 'success',
                        confirmButtonText: 'ตกลง',
                    });
                    this.reset();
                    this.$router.push('/aid');
                } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                        type: 'error',
                        confirmButtonText: 'ตกลง',
                    });
                }
            },
            validateLatLng () {
                console.log(this.person.address.geo)
                if (this.person.address.geo.lat === null || this.person.address.geo.lng === null) {
                    return true
                }
                return false
            },
        }
    };
</script>