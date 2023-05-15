<template>
  <div>
    <el-card class="mt-20">
      <el-table
        v-loading="tableLoading"
        :data="verifiedlisters"
        stripe
        :default-sort="{ prop: 'name', order: 'descending' }"
      >
        <el-table-column label="Name">
          <template slot-scope="scope">
            <div class="d-flex" @click="viewProfile(scope.row)">
              <!-- <a :href="`/products/${scope.row.id}`">{{ scope.row.name }}</a> -->
              <span class="mr-10">
                <img
                  v-if="scope.row.avatar"
                  :src="scope.row.avatar"
                  alt="pic"
                  class="profile_avatar"
                />
                <img
                  v-else
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt="pic"
                  style="width: 40px"
                />
              </span>
              <span class="d-block mt-10"
                >{{ scope.row.first_name }} {{ scope.row.last_name }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Email address">
          <template slot-scope="scope">
            <span @click="viewProfile(scope.row)">{{ scope.row.email }} </span>
          </template>
        </el-table-column>
        <el-table-column label="Phone Number">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row)">
              <span>
                {{ props.row.phone_number }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Verified">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row)">
              <el-tag
                :type="props.row.is_id_card_verified == 1 ? 'success' : 'error'"
                size="small"
              >
                {{ props.row.is_id_card_verified == 1 ? 'Yes' : 'No' }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Status">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row)">
              <el-tag
                :type="props.row.status == 'active' ? 'success' : 'error'"
                size="small"
              >
                {{ props.row.status == 'active' ? 'Yes' : 'No' }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <!-- <el-tooltip
                class="item"
                effect="dark"
                content="Edit Product"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </el-tooltip>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteProduct(props.row.id)"
              ></el-button> -->
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"> </i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="color: red" @click="props.row"
                  >Delete</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="mt-20">
      <div class="center d-flex justify_between">
        <div class="align_center">
          <span class="pr-10">View</span>
          <el-select v-model="value" placeholder="Select" style="width: 80px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="pl-10">users per page</span>
        </div>
        <!-- layout="prev, pager, next, sizes, total" -->
        <div v-if="listersPageDetails" class="align_center">
          <span
            >{{ listersPageDetails.current_page }}-{{
              listersPageDetails.per_page
            }}
            0f 100</span
          >
          <el-pagination
            background
            :page-size="listersPageDetails.per_page"
            :current-page="listersPageDetails.current_page"
            @curent-change="handleCurrentChange"
            :page-sizes="[30, 50, 100]"
            layout="prev, pager, next"
            :total="listersPageDetails.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-drawer
      title="User lister information"
      :visible.sync="drawer"
      size="30%"
    >
      <div class="px-30 user_details">
        <div class="d-flex">
          <img v-if="profile" :src="profile.avatar" class="profile_img" />
          <div class="pl-20 pt-20">
            <el-button type="info">Reject profile photo</el-button>
            <p class="pt-10">
              A profile image can be reject if the image is not clear enough or
              the face is covered or an inanimate object is used
            </p>
          </div>
        </div>
        <div class="pt-20 w-70">
          <div class="d-flex justify_between pb-10">
            <section>
              <p class="pb-10">First name</p>
              <p>
                <b>{{ profile && profile.first_name }} </b>
              </p>
            </section>
            <section class="pl-30">
              <p class="pb-10">Last name</p>
              <p>
                <b>{{ profile && profile.last_name }}</b>
              </p>
            </section>
          </div>
          <section class="pt-10">
            <p class="pb-10">DOB</p>
            <p>
              <b>{{ profile.dob }} </b>
            </p>
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pt-5 pb-10 d-flex justify_between">
          <section>
            <p class="pb-10">Email address</p>
            <p>
              <b>{{ profile && profile.email }}</b>
            </p>
          </section>
          <section class="pl-30 pr-10">
            <p class="pb-10">Phone</p>
            <p>
              <b>{{ profile && profile.phone_number }}</b>
            </p>
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pb-10">
          <section class="pb-20">
            <p class="pb-10">ID type</p>
            <p>
              <b>{{ profile && profile.id_card_type }} </b>
            </p>
          </section>
          <p><span>Image of ID</span></p>
          <img
            :src="profile.id_card_upload"
            class="identification_card pb-10"
          />
          <!-- <div
            v-if="profile.is_id_card_verified == 1"
            class="p-10 d-flex justify_center"
          >
            <p class="p-10 verified">
              <i class="el-icon-check pr-10"></i>Verified
            </p>
          </div> -->
          <div class="d-flex justify_center pt-30 pb-30">
            <el-button
              v-if="profile.is_id_card_verified != 1"
              type="success"
              class="w-50"
              :loading="loading"
              @click="approveLister(profile)"
              ><i class="el-icon-check pr-10"></i>Verify</el-button
            >
            <el-button
              v-else
              type="primary"
              class="w-50"
              :loading="loading"
              @click="approveLister(profile)"
              ><i class="el-icon-close pr-10"></i>Unverify</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'VerifiedListers',
  props: {
    verifiedlisters: {
      required: true,
      type: Array,
    },
    listers: {
      required: true,
      type: Array,
    },
    unverifiedlisters: {
      required: true,
      type: Array,
    },
    fetchData: {
      required: true,
      type: Function,
    },
    listersPageDetails: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      value: '30',
      options: [
        {
          value: '30',
          label: '30',
        },
        {
          value: '50',
          label: '50',
        },
        {
          value: '100',
          label: '100',
        },
      ],
      activeTab: 'pendingReview',
      pendingTab: 'Pending Products',
      loading: false,
      pendingTotal: 0,
      drawer: false,
      tableLoading: false,
      profile: {},
      search: '' as string,
    }
  },
  methods: {
    viewProfile(profile: any) {
      this.profile = profile
      this.drawer = true
    },
    handleCurrentChange() {},
    async approveLister(profile: any) {
      this.loading = true
      try {
        const listingResponse = await this.$approvalApi.create({
          user_id: profile.id,
        })

        this.loading = false
        this.drawer = false
        this.fetchData()
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: listingResponse.message,
          type: 'success',
        })
      } catch (error) {
        this.loading = false
        ;(this as any as IMixinState).catchError(error)
      }
    },
    deleteProduct(id: string) {
      this.$message({
        message: 'Product Deleted',
        type: 'success',
      })
    },
    addProduct(): void {
      ;(this as any).$refs.handleAction.showAddClassModal()
    },
  },
})
</script>
<style lang="scss" scoped>
.profile_avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user_details {
  overflow-y: scroll;
  p {
    font-size: 16px;
    font-weight: 400;
  }
  .profile_img {
    width: 42%;
    border-radius: 50%;
    height: 150px;
  }
  .identification_card {
    width: 100%;
    height: 200px;
    border-radius: 16.4815px;
  }
  .verified {
    color: rgb(34, 197, 94);
    font-size: 18px;
    i {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
