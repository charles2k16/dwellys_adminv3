<template>
  <div>
    <el-card class="mt-20">
      <el-card class="mt-20">
        <el-table
          v-loading="tableLoading"
          :data="listings"
          stripe
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column label="Name">
            <template slot-scope="scope">
              <div class="d-flex" @click="viewProfile(scope.row)">
                <!-- <a :href="`/products/${scope.row.id}`">{{ scope.row.name }}</a> -->
                <span class="mr-10">
                  <img
                    v-if="scope.row.lister.avatar"
                    :src="url + scope.row.lister.avatar"
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
                  >{{ scope.row.lister.first_name }}
                  {{ scope.row.lister.last_name }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Email address">
            <template slot-scope="scope">
              <span>{{ scope.row.lister.email }} </span>
            </template>
          </el-table-column>
          <el-table-column label="Phone Number">
            <template slot-scope="props">
              <div class="d-flex clickable" @click="viewProfile(props.row)">
                <span>
                  {{ props.row.lister.phone_number }}
                </span>
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
                  {{ props.row.status }}</el-tag
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

      <div class="mt-40 center pb-10">
        <el-pagination
          background
          :page-sizes="[15, 30, 50]"
          :page-size="15"
          layout="prev, pager, next, sizes, total"
          :total="0"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'ProductsSubmitted',
  props: {
    listings: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      activeTab: 'pendingReview',
      pendingTab: 'Pending Products',
      loading: false,
      url: 'http://127.0.0.1:8000/',
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
      console.log(profile)
    },
    async approveLister(profile: any) {
      try {
        const listingResponse = await this.$approvalApi.create({
          user_id: profile.id,
        })

        console.log(listingResponse)

        this.loading = false
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: listingResponse.message,
          type: 'success',
        })
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
    deleteProduct(id: string) {
      console.log(id)
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
}
</style>
