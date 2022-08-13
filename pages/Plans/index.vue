<template>
  <div class="pt-20 plans_container">
    <el-card v-for="plan in plans" :key="plan.id" class="d-flex_column">
      <div slot="header" class="clearfix pb-5">
        <div><small class="tier_header">Pricing tier</small></div>
        <div class="d-flex justify_between">
          <h3>{{ plan.name }}</h3>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"> </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><NuxtLink :to="`/edit_listing`"
                  >Edit</NuxtLink
                ></el-dropdown-item
              >
              <!-- <el-dropdown-item>Deactivate</el-dropdown-item> -->
              <el-dropdown-item
                ><p style="color: red" @click="open(plan.id, plan.name)">
                  Delete
                </p></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <div>
          <small>Description</small>
          <p>{{ plan.description }}</p>
        </div>
        <div class="d-flex justify_between pt-20">
          <div>
            <small>Amount</small>
            <p>{{ plan.currency }}{{ plan.price }}</p>
          </div>
          <div>
            <small>Time period</small>
            <p>{{ plan.no_of_days }}</p>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="pb-20">
          <small class="pl-5 tier_header">Tier includes:</small>
          <ul class="ml-20">
            <li v-for="tier in plan.listing_plan_features" :key="tier.id">
              {{ tier.feature }}
            </li>
            <!-- <li>Recommended for individuals</li>
          <li>Recommended for individuals</li>
          <li>Recommended for individuals</li> -->
          </ul>
        </div>
      </div>
      <!-- slot="footer" -->
      <div class="deactive_btn bottom clearfix">
        <el-button
          v-loading="loading"
          type="primary"
          class="full_width"
          @click="toggleListingPlan(plan.id)"
          >{{ plan.is_active == 0 ? 'Activate tier' : 'Deactivate tier' }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'PlansAndPricing',
  props: {
    plans: {
      required: true,
      type: Array,
    },
    activeplans: {
      required: true,
      type: Array,
    },
    deactivateplans: {
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
      loading: false,
      pendingTotal: 0,
      drawer: false,
      tableLoading: false,
      profile: {},
      search: '' as string,
    }
  },
  methods: {
    getListingDetails(id: string) {
      this.$router.push(`/listing_details/${id}`)
    },
    open(planId: string, planName: string) {
      console.log(planId, 'profile')
      // const h = this.$createElement
      this.$confirm(
        `Are you sure you want to delete ${planName} ? You cannot undo this action.`,
        'Are you sure you want to delete?',
        {
          cancelButtonText: 'No, i want to keep',
          confirmButtonText: 'Yes,I want to Delete',
        }
      ).then(() => {
        this.deletePlan(planId)
      })
    },
    async deletePlan(planId: string) {
      this.loading = true
      try {
        const planResponse = await this.$listingPlanApi.delete(planId)

        console.log(planResponse)

        this.loading = false
        this.fetchData()
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: planResponse.message,
          type: 'success',
        })
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
    async toggleListingPlan(planId: string) {
      this.loading = true
      try {
        const planResponse = await this.$listingPlanApi.update('togglestatus', {
          listing_plan_id: planId,
        })

        console.log(planResponse)

        this.loading = false
        this.fetchData()
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: planResponse.message,
          type: 'success',
        })
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.plans_container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 10px;
  p {
    color: black !important;
  }
  .tier_header {
    font-size: 12px;
  }
  li {
    font-size: 13px;
    color: #64748b;
    // margin: 0 10px;
  }
  .deactive_btn {
    align-self: baseline;
  }
}
</style>
