<template>
  <div>
    <el-card class="mt-20">
      <el-card class="mt-20">
        <el-table
          v-loading="discounts.length < 1"
          :data="discounts"
          stripe
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <!-- <el-table-column label="ID">
            <template slot-scope="scope">
              <div
                class="d-flex"
                style="cursor: pointer"
                @click="getListingDetails(scope.row.id)"
              >
                <span class="d-block mt-10">{{ scope.row.id }}</span>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="Name">
            <template slot-scope="scope">
              <div class="d-flex">
                <span class="d-block">
                  {{ scope.row.name }}
                  <!-- {{ scope.row.lister.last_name }} -->
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="code">
            <template slot-scope="props">
              <div class="d-flex clickable">
                <el-tag type="success"> {{ props.row.code }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="No of redeems">
            <template slot-scope="scope">
              <div>
                <span>{{ scope.row.no_of_redeems }} </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Percentage Value">
            <template slot-scope="props">
              <div class="d-flex clickable">
                <span> {{ props.row.percentage_value }}% </span>

                <!-- {{ moment(props.row.created_at) }} -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Expiry Date">
            <template slot-scope="props">
              <div class="d-flex clickable">
                <span
                  >{{ $moment(props.row.expiry_date).format('MMM DD, YY') }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Plan Type">
            <template slot-scope="scope">
              <div>
                <p>
                  {{
                    scope.row.plan_type == 'all_plan'
                      ? 'All Plans'
                      : 'Selected Plan'
                  }}
                </p>
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
              </el-tooltip> -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="open(props.row.id)"
              ></el-button>
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
  name: 'Discounts',
  props: {
    loading: {
      required: true,
      type: Boolean,
    },
    discounts: {
      required: true,
      type: Array,
    },
    activediscounts: {
      required: true,
      type: Array,
    },
    scheduleddiscounts: {
      required: true,
      type: Array,
    },
    expireddiscounts: {
      required: true,
      type: Array,
    },
    fetchData: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      activeTab: 'pendingReview',
      pendingTab: 'Pending Products',
      // loading: false,
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
    open(discountId: string) {
      // const h = this.$createElement
      this.$confirm('Are you sure you want to delete discount?', {
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
      })
        .then(() => {
          this.deleteDiscount(discountId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },
    async deleteDiscount(id: string) {
      try {
        const discountResponse = await this.$discountApi.delete(id)

        console.log(discountResponse)
        // console.log(listingId, active)
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: `Discount Deleted Successfully!`,
          type: 'success',
        })
        this.fetchData()
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
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
