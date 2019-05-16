<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        จัดการข้อมูลประชากร
      </el-col>
      <el-col :span="12" class="align-r">
          <router-link to="/person/insert">
            <el-button type="primary" plain @click="dialogVisible = true">
                เพิ่มข้อมูลประชากร
            </el-button>
          </router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input placeholder="ค้นหาประชากร" v-model="searchtext" />
      </el-col>
      <el-col class="align-l" :span="12">
        <el-button @click="serachingData" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="personList"
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
          label="วัน/เดือน/ปี เกิด"
        >
          <template slot-scope="item">
            {{ momentDate(item.row.person_birthday) }}
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
                <router-link :to="`/person/update/${item.row.id_card}`">
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
            :total="personList.length"
            @current-change="onPageChange"    
        >
        </el-pagination>
    </el-row>
    <UpdateModal v-if="updateModalVisible" @closeDialog="updateModalVisible = false" :userInfo="userInfo" @addUserSuccess="fetchChange" :userPosition="userPosition" :userStatus="userStatus" />
  </div>
</template>

<script>
    import moment from 'moment';
    import personService from '@/services/person';
    import UpdateModal from '@/components/User/UpdateModal';

    export default {
        components: {
            UpdateModal,
        },
        data() {
            return {
              searchtext: "",
              currentPage: 0,
              updateModalVisible: false,
              userInfo: {},
              personList: [],
              userPosition: [],
              userStatus: [
                { id: 0, name: 'ผู้ดูแลระบบ' },
                { id: 1, name: 'ผู้ใช้งานระบบ' },
              ],
            };
        },
        async created() {
            this.personList = await personService.getAllPerson(this.currentPage, 10, this.searchtext);
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
                this.personList = await personService.getAllPerson(this.currentPage, 10, this.searchtext);
            },
            async removePerson(row) {
                this.$confirm(`โปรดตรวจสอบให้แน่ใจอีกครั้งข้อมูลของ ${row.person_firstname} ${row.person_lastname} จะไม่สามารถกูคืนได้`,
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

