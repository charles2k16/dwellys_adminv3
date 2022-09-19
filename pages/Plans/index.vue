<template>
  <div class="pt-20 plans_container">
    <el-dialog
      title="Update Plan"
      :visible.sync="dialogVisible"
      class="edit_pricing_log"
      width="40%"
    >
      <div v-if="pricing" class="edit_plan">
        <div class="plan_info d-flex_column">
          <div class="py-10">
            <span>Plan Name</span>
            <el-input
              v-model="pricing.name"
              placeholder="Please enter the name of the tier, eg. Quick Sale"
              class="w-100"
            >
            </el-input>
          </div>
          <div class="py-10">
            <span>Plan Description</span>
            <el-input
              v-model="pricing.description"
              placeholder="Enter a description the best summarises the price tier."
              class="w-100"
            >
            </el-input>
          </div>
        </div>
        <div class="duration_container">
          <div v-if="pricing.is_plan_in_percentage == 'yes'">
            <!-- <div class="py-10">
              <span>Plan in percentage</span>
              <el-checkbox
                v-model="pricing.is_plan_in_percentage"
                label="Plan in Percentage(%) ?"
              ></el-checkbox>
            </div> -->
            <div class="py-10">
              <span>Percentage on fraction</span>
              <el-input
                v-model="pricing.percentage_fraction_on_value"
                type="number"
                placeholder="Enter percentage fraction."
                class="w-100"
              >
              </el-input>
            </div>
          </div>
          <div v-else>
            <div class="py-10 d-flex_column">
              <span>Currency</span>
              <el-select
                v-model="pricing.currency"
                placeholder="Currency"
                class="pt-10"
              >
                <el-option
                  v-for="(currency, index) in currencies"
                  :key="index"
                  :label="currency.short_name"
                  :value="currency.short_name"
                >
                </el-option>
              </el-select>
            </div>
            <div class="py-10">
              <span>Price</span>
              <el-input
                v-model="pricing.price"
                placeholder="E.g 300"
                class="w-50"
              >
              </el-input>
            </div>
            <div>
              <span>No of days</span>
              <el-input
                v-model="pricing.no_of_days"
                type="number"
                placeholder="Enter percentage fraction."
                class="w-100"
              >
              </el-input>
            </div>
          </div>
        </div>
        <div class="d-flex pb-20 w-100">
          <div class="edit_tiers pt-10">
            <p class="">Tiers</p>
            <div
              v-for="(tier, index) in pricing.listing_plan_features"
              :key="index"
              class="w-100 pt-10 d-flex"
            >
              <el-input
                v-model="tier.feature"
                type="text"
                placeholder="Tier feature"
                class="mb-10"
              />
              <!-- </el-input> -->
              <p
                class="d-flex justify_end m-10"
                style="color: red"
                @click="removeTier(index)"
              >
                <i
                  class="el-icon-delete-solid"
                  style="font-weight: 600; color: red"
                ></i>
              </p>
            </div>
            <p class="m-10 d-flex justify_end" @click="addTier">
              <i class="el-icon-plus mr-10" style="font-weight: 600"></i>
              Add new
            </p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="editPricing(pricing.id)"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
    <el-card v-for="plan in plans" :key="plan.id" class="d-flex_column mb-10">
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
                ><p class="mb-10" @click="getPlan(plan)">
                  Edit
                </p></el-dropdown-item
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
      counter: 0,
      dialogVisible: false,
      pricing: {} as any,
      loading: false,
      pendingTotal: 0,
      drawer: false,
      tableLoading: false,
      profile: {},
      search: '' as string,
      currencies: [],
    }
  },
  async created() {
    const currencies = await this.$countriesApi.index()
    this.currencies = currencies.data
    console.log(this.currencies)
  },
  methods: {
    addTier() {
      this.pricing.listing_plan_features.push({ feature: '', id: '' })
    },
    removeTier(index: number) {
      this.pricing.listing_plan_features.splice(index, 1)
    },
    getPlan(plan: any) {
      this.pricing = plan
      console.log('plan', this.pricing)
      this.counter = plan.listing_plan_features.length
      this.dialogVisible = true
    },
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
    async editPricing(id: string) {
      this.loading = true
      try {
        const planResponse = await this.$listingPlanApi.update(id, {
          name: this.pricing.name,
          is_plan_in_percentage: this.pricing.is_plan_in_percentage,
          price: this.pricing.price,
          currency: this.pricing.currency,
          percentage_fraction_on_value:
            this.pricing.percentage_fraction_on_value,
          description: this.pricing.description,
          no_of_days: this.pricing.no_of_days,
          features: this.pricing.listing_plan_features,
        })

        console.log(planResponse)
        this.dialogVisible = false
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
    async deletePlan(planId: string) {
      this.loading = true
      try {
        const planResponse = await this.$listingPlanApi.delete(planId)

        console.log(planResponse)

        this.loading = false
        this.fetchData()
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: 'Plan Deleted Successfully!',
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
        const planResponse = await this.$listingPlanApi.toggle('togglestatus', {
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
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
.edit_plan {
  overflow-y: scroll;
  height: 500px;
}
.edit_tiers {
  width: 80%;
  margin: 0 auto;
}
.dialog-footer {
  padding: 10px !important;
  margin-bottom: 10px;
}
</style>
