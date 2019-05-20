<template>
  <div class="about">
    <el-row>
      <el-col :span="12" class="align-l">
        จัดการผู้ใช้ระบบ
      </el-col>
      <el-col :span="12" class="align-r">
        <InsertModal @addUserSuccess="fetchChange" :userPosition="userPosition" :userStatus="userStatus" />
      </el-col>
    </el-row>
    <el-row class="search-bar-margin">
      <el-col :span="12">
        <el-input placeholder="ค้นหาผู้ใช้งาน" v-model="searchtext" />
      </el-col>
      <el-col class="align-l" :span="12">
        <el-button @click="serachingData" style="margin-left: 5px;" type="primary" icon="el-icon-search">ค้นหา</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="usersList"
        style="width: 100%"
      >
        <el-table-column
          label="ชื่อ-นามสกุล"
          width="200"
        >
          <template slot-scope="item">
            {{ item.row.fistname + ' ' + item.row.lastname }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="เบอร์โทรศัพท์"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="ตำแหน่ง"
        >
          <template slot-scope="item">
            {{ checkForPosition(item.row.position_id) }}
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
                <el-button @click="triggerUpdateModal(item.row.user_id)" type="success" plain icon="el-icon-edit">
                  แก้ไข
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="removeUser(item.row)" type="danger" plain icon="el-icon-delete">
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
            :total="dataLength"
            @current-change="onPageChange"    
        >
        </el-pagination>
    </el-row>
    <UpdateModal v-if="updateModalVisible" @closeDialog="updateModalVisible = false" :userInfo="userInfo" @addUserSuccess="fetchChange" :userPosition="userPosition" :userStatus="userStatus" />
  </div>
</template>

<script>
  import userService from '@/services/user';
  import InsertModal from '@/components/User/InsertModal';
  import UpdateModal from '@/components/User/UpdateModal';

  export default {
    components: {
      InsertModal,
      UpdateModal,
    },
    data() {
      return {
        searchtext: '',
        currentPage: 0,
        updateModalVisible: false,
        dataLength: 0,
        userInfo: {},
        usersList: [],
        userPosition: [],
        userStatus: [
          {id: 1, name: 'ผู้ดูแลระบบ'},
          {id: 0, name: 'ผู้ใช้งานระบบ'},
        ],
      };
    },
    async created() {
      this.dataLength = Number((await userService.getLength())['length'])
      this.usersList = await userService.getAllUser(this.currentPage, 10, this.searchtext);
      this.userPosition = await userService.getUserPosition();
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
        this.usersList = await userService.getAllUser(this.currentPage, 10, this.searchtext);
      },
      async triggerUpdateModal(uID) {
        this.userInfo = await userService.getUserbyID(uID);
        this.updateModalVisible = true;
      },
      async removeUser(row) {
        this.$confirm(`โปรดตรวจสอบให้แน่ใจอีกครั้ง ข้อมูลของผู้ใช้ ${row.fistname} ${row.lastname}`, 'โปรดตรวจสอบ!', {
            type: 'warning',
            confirmButtonText: 'ตกลง',
        }).then(async () => {
          try {
            const res = await userService.removeUser(row.user_id);
            this.$alert(`ลบข้อมูลของ ${row.fistname} ${row.lastname} เรียบร้อยแล้ว`, 'ลบข้อมูลสำเร็จแล้ว', {
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
      checkForPosition(upID) {
        for (const item of this.userPosition) {
          if (Number(item.position_id) === Number(upID)) {
            return item.position_name;
            break;
          }
        }
      },
    },
  };
</script>

