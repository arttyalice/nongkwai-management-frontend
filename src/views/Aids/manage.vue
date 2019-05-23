<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        <h3><b>จัดการข้อมูลผู้ป่วยโรคเอดส์</b></h3>
      </el-col>
    </el-row>
    <el-row class="search-bar-margin">
      <el-col :span="12">
        <el-input placeholder="ค้นหาผู้ป่วย" v-model="searchtext" />
      </el-col>
      <el-col class="align-l" :span="12">
        <el-button  @click="serachingData" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="aidsList"
        style="width: 100%"
      >
        <el-table-column
          prop="id_card"
          label="เลขบัตรประชาชน"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="ชื่อ-นามสกุล"
          width="220"
        >
          <template slot-scope="item">
            {{ `${item.row.person_titlename} ${item.row.person_firstname} ${item.row.person_lastname}` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="person_phone"
          label="เบอร์โทรศัพท์"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="วัน/เดือน/ปี เกิด"
        >
          <template slot-scope="item">
            {{ momentDate(item.row.person_birthday) }}
          </template>
        </el-table-column>
         <el-table-column
          label="ข้อมูลผู้ป่วย"
          align="center"
          width="220"
        >
          <template slot-scope="item">
            <el-row>
              <el-col :span="12">
                <el-button @click="showPatientModal(item.row)" type="info" plain>
                    ดูข้อมูล
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="showContactModal(item.row)" type="warning" plain>
                  ผู้ติดต่อ
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="แก้ไข"
          align="center"
          width="200"
        >
          <template slot-scope="item">
            <el-row>
              <el-col :span="24">
                <router-link :to="`/aid/update/${item.row.id_card}`">
                  <el-button type="success" plain icon="el-icon-edit">
                    
                  </el-button>
                </router-link>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top: 15px;">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="dataLength"
            @current-change="onPageChange"    
        >
        </el-pagination>
    </el-row>
    <patientModal v-if="isPatientModal" @closeModal="isPatientModal = false" :patientInfo="patientInfo" />
    <contactModal v-if="isContactModal" @closeModal="isContactModal = false" :patientInfo="patientInfo" />
  </div>
</template>

<script>
    import moment from 'moment';
    import personService from '@/services/person';
    import aidService from '@/services/aid';
    import patientModal from '@/components/Aid/patientModal';
    import contactModal from '@/components/Aid/contactModal';

    export default {
        components: {
            patientModal,
            contactModal,
        },
        data() {
            return {
                    searchtext: '',
                    currentPage: 0,
                    dataLength: 0,
                    aidsList: [],
                    userPosition: [],
                    userStatus: [
                        { id: 0, name: 'ผู้ดูแลระบบ' },
                        { id: 1, name: 'ผู้ใช้งานระบบ' },
                    ],
                    isPatientModal: false,
                    isContactModal: false,
                    patientInfo: {},
            };
        },
        async created() {
            this.aidsList = await aidService.getAllAids(this.currentPage, 10, '');
            this.dataLength = Number((await aidService.getLength())['length'])
        },
        methods: {
            onPageChange(page) {
                this.currentPage = page - 1;
                this.fetchChange();
            },
            serachingData() {
              this.currentPage = 0;
              this.fetchChange();
            },
            async fetchChange() {
                this.aidsList = await aidService.getAllAids(this.currentPage, 10, this.searchtext);
            },
            showPatientModal (item) {
                this.patientInfo = item
                this.isPatientModal = true
            },
            showContactModal (item) {
                this.patientInfo = item
                this.isContactModal = true
            },
            async removePerson(row) {
                this.$confirm(`โปรดตรวจสอบให้แน่ใจอีกครั้งการลบข้อมูลของ ${row.person_firstname} ${row.person_lastname} จะไม่สามารถกูคืนได้`,
                  'โปรดตรวจสอบ!', {
                  type: 'warning',
                  confirmButtonText: 'ตกลง',
                }).then(async () => {
                  try {
                    const res = await personService.removePerson(row.id_card);
                    this.$alert(`ลบข้อมูลของ ${row.person_firstname} ${row.person_lastname} เรียบร้อยแล้ว`, 'ลบข้อมูลสำเร็จแล้ว', {
                      type: 'success',
                    });
                    this.fetchChange();
                  } catch (error) {
                    this.$alert('มีบางอย่างผิดพลาด โปรดลองใหม่ในภายหลัง', 'บางอย่างผิดพลาด!', {
                      type: 'error',
                      confirmButtonText: 'ตกลง',
                    });
                  }
                });
            },
            momentDate(date) {
                return date !== '0000-00-00' ? moment(date).format('DD/MM/YYYY') : 'ไม่ได้บันทึกวันเกิด';
            },
        },
    };
</script>

<style>
  .search-bar-margin {
    margin: 20px 0;
  }
</style>
