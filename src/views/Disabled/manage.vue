<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        <h3><b>จัดการข้อมูลผู้พิการ</b></h3>
      </el-col>
    </el-row>
    <el-row class="search-bar-margin">
      <el-col :span="12">
        <el-input placeholder="ค้นหาผู้พิการ" v-model="searchtext" />
      </el-col>
      <el-col class="align-l" :span="12">
        <el-button @click="serachingData" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="disabledList"
        style="width: 100%"
      >
        <el-table-column
          prop="id_card"
          label="เลขบัตรประชาชน"
          width="150"
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
          width="110"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="disability_info"
          label="ข้อมูลของผู้พิการ"
          width="200"
        >
        </el-table-column> -->
        <el-table-column
          prop="disability_type"
          label="มีความพิการทาง"
          width="280"
        >
          <template slot-scope="item">
            <span v-for="(row, index) in item.row.disability_type" :key="index">
              {{ row }}<span v-if="index !== item.row.disability_type.length - 1">, </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="วัน/เดือน/ปี เกิด"
        >
          <template slot-scope="item">
            {{ momentDate(item.row.person_birthday) }}
          </template>
        </el-table-column>
        <el-table-column
          label="แก้ไข"
          align="center"
          width="250"
        >
          <template slot-scope="item">
            <el-row>
              <el-col :span="24">
                <router-link :to="`/disabled/update/${item.row.id_card}`">
                  <el-button type="success" plain icon="el-icon-edit">
                    
                  </el-button>
                </router-link>
              </el-col>
              <!-- <el-col :span="12">
                <el-button @click="removePerson(item.row)" type="danger" plain icon="el-icon-delete">
                  ลบ
                </el-button>
              </el-col> -->
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
    <UpdateModal v-if="updateModalVisible" @closeDialog="updateModalVisible = false" :userInfo="userInfo" @addUserSuccess="fetchChange" :userPosition="userPosition" :userStatus="userStatus" />
  </div>
</template>

<script>
    import moment from 'moment';
    import disabledService from '@/services/disabled';
    import UpdateModal from '@/components/User/UpdateModal';

    export default {
        components: {
            UpdateModal,
        },
        data() {
            return {
                    searchtext: '',
                    currentPage: 0,
                    updateModalVisible: false,
                    dataLength: 0,
                    userInfo: {},
                    disabledList: [],
                    userPosition: [],
                    userStatus: [
                    { id: 0, name: 'ผู้ดูแลระบบ' },
                    { id: 1, name: 'ผู้ใช้งานระบบ' },
                ],
            };
        },
        async created() {
            this.disabledList = await disabledService.getAllDisabled(this.currentPage, 10, this.searchtext);
            this.dataLength = Number((await disabledService.getLength())['length'])
            this.disabledList.forEach(e => {
              e.disability_type = JSON.parse(e.disability_type)
            })
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
                this.disabledList = await disabledService.getAllDisabled(this.currentPage, 10, this.searchtext);
            },
            async removePerson(row) {
                this.$confirm(`โปรดตรวจสอบให้แน่ใจอีกครั้งข้อมูลของ ${row.person_firstname} ${row.person_lastname} จะไม่สามารถกูคืนได้`,
                  'โปรดตรวจสอบ!', {
                  type: 'warning',
                  confirmButtonText: 'ตกลง',
                }).then(async () => {
                  try {
                    const res = await disabledService.removePerson(row.id_card);
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

