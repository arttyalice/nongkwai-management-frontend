<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        จัดการข้อมูลผู้ป่วยโรคเอดส์
      </el-col>
      <el-col :span="12" class="align-r">
          <router-link to="/aid/insert">
            <el-button type="primary" plain @click="dialogVisible = true">
                เพิ่มข้อมูลผู้ป่วย
            </el-button>
          </router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="ค้นหาผู้ป่วย" v-model="searchtext" />
      </el-col>
      <el-col class="align-l" :span="12">
        <el-button @click="serachingData" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
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
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="ชื่อ-นามสกุล"
          width="200"
        >
          <template slot-scope="item">
            {{ `${item.row.person_titlename} ${item.row.person_firstname} ${item.row.person_lastname}` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="person_phone"
          label="เบอร์โทรศัพท์"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="person_birthday"
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
                    ผู้ป่วย
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="warning" plain>
                  ผู้ติดต่อ
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="ตัวเลือก"
          align="center"
          width="300"
        >
          <template slot-scope="item">
            <el-row>
              <el-col :span="12">
                <router-link :to="`/aid/update/${item.row.id_card}`">
                  <el-button type="success" plain icon="el-icon-edit">
                    แก้ไข
                  </el-button>
                </router-link>
              </el-col>
              <el-col :span="12">
                <el-button @click="removePerson(item.row)" type="danger" plain icon="el-icon-delete">
                  ลบ
                </el-button>
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
            :total="aidsList.length"
            @current-change="onPageChange"    
        >
        </el-pagination>
    </el-row>
    <patientModal v-if="patientModal" @closeModal="patientModal = false" :dialogVisible="patientModal" :patientInfo="patientInfo" />
  </div>
</template>

<script>
    import moment from 'moment';
    import personService from '@/services/person';
    import aidService from '@/services/aid';
    import patientModal from '@/components/Aid/patientModal';

    export default {
        components: {
            patientModal,
        },
        data() {
            return {
                    searchtext: '',
                    currentPage: 0,
                    aidsList: [],
                    userPosition: [],
                    userStatus: [
                        { id: 0, name: 'ผู้ดูแลระบบ' },
                        { id: 1, name: 'ผู้ใช้งานระบบ' },
                    ],
                    patientModal: false,
                    patientInfo: {},
            };
        },
        async created() {
            this.aidsList = await aidService.getAllAids(this.currentPage, 10, '');
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
                console.log(item)
                this.patientInfo = item
                this.patientModal = true
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

