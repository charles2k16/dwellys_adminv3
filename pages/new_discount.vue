<template>
  <div class="pb-20">
    <div class="w-80">
      <div class="d-flex justify_between">
        <div class="d-flex">
          <NuxtLink to="/discounts">
            <span
              ><i class="el-icon-back mr-20" style="font-size: 30px"></i>
            </span>
          </NuxtLink>
          <div>
            <h2>New discount</h2>
            <p class="mt-10 text-grey">Create a new discount offer</p>
          </div>
        </div>
      </div>
      <el-divider class="mr-20"></el-divider>
    </div>

    <div class="account_form mt-10">
      <el-form ref="plan" :model="plan" label-position="top">
        <div class="user_form">
          <div class="d-flex w-100">
            <div class="account_label">
              <h4>Name</h4>
              <p class="w-80 pt-10">Descrpitive name of the discount.</p>
            </div>
            <div class="pl-20 w-80">
              <div class="plan_info d-flex_column">
                <el-form-item label="Name of discount" class="plan_name">
                  <el-input
                    v-model="plan.name"
                    placeholder="First name"
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="Discount code" class="plan_name">
                  <el-input
                    v-model="plan.code"
                    placeholder="enter a discount code"
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>

        <el-divider></el-divider>
        <div>
          <div class="d-flex pb-20">
            <div class="account_label">
              <h4>Discount Setup</h4>
              <p class="w-80 pt-10">
                The name and description should be able to help the user
                identify which offer works best for their use case.
              </p>
            </div>
            <div class="pl-20 duration_container">
              <!-- <el-form-item label="Percentage Plan" class="amount">
                <el-checkbox
                  v-model="plan.is_plan_in_percentage"
                  label="Plan in Percentage(%) ?"
                ></el-checkbox>
              </el-form-item> -->
              <div class="">
                <el-form-item label="Plan Type" class="discount">
                  <el-select
                    v-model="plan.currency"
                    placeholder="Select a plan type"
                    class="pt-10 select"
                  >
                    <el-option
                      v-for="(type, index) in plan_types"
                      :key="index"
                      :label="type"
                      :value="type"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Discount Plan" class="discount">
                  <el-select
                    v-model="plan.listing_plan_id"
                    placeholder="Select a discount plan"
                    class="pt-10 select"
                  >
                    <el-option
                      v-for="(selected_plan, index) in plans"
                      :key="index"
                      :label="selected_plan.name"
                      :value="selected_plan.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Number of days" class="plan_name">
                  <el-input
                    v-model="plan.no_of_days"
                    placeholder="enter a number or days"
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="Number of redeems" class="plan_name">
                  <el-input
                    v-model="plan.no_of_redeems"
                    placeholder="enter a number or redeems"
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="d-flex pb-20 w-100">
            <div class="account_label">
              <h4>Amount</h4>
              <p class="w-80 pt-10">
                The amount to be subtracted from the price of an applicable
                access plan.
              </p>
            </div>
            <div class="w-50">
              <el-form-item label="Discount percent">
                <el-input
                  v-model="plan.percentage_value"
                  type="number"
                  placeholder="Enter percentage fraction."
                  class="w-100"
                >
                  <template slot="append"><p>&#37;</p> </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="mt-20 d-flex w-50 justify_between">
              <NuxtLink to="/discounts"
                ><el-button class="back_btn">Cancel</el-button></NuxtLink
              >
              <div class="register_btn">
                <el-button
                  type="Primary"
                  :loading="btnLoading"
                  class="second_next submit_register_button"
                  @click="submit_discount"
                  >Save</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'AccountPage',

  data() {
    return {
      active: 0 as number,
      step: 1 as number,
      phone: '',
      btnLoading: false as boolean,
      counter: 1,
      plan_types: ['All Plans', 'Select Plan'],
      currencies: [],
      plan: {
        name: '' as string,
        code: '' as string,
        plan_type: '' as string,
        percentage_value: '' as string,
        listing_plan_id: '' as string,
        no_of_redeems: '' as string,
        no_of_days: '' as string,
      },

      user: '' as string,
      plans: [],
    }
  },
  async created() {
    const plans = await this.$listingPlanApi.index()
    this.plans = plans.data.filter((plan: any) => plan.is_active === 1)
  },
  methods: {
    submit_discount() {
      console.log(this.plan)
      this.btnLoading = true
      ;(this as any).$refs.plan.validate((valid: boolean) => {
        if (valid) {
          this.newPlan()
          this.$router.replace('/discounts')
        } else {
          this.btnLoading = false
          ;(this as any as IMixinState).getNotification(
            'Make sure all required fields are filled',
            'error'
          )
          return false
        }
      })
    },
    async newPlan(): Promise<void> {
      try {
        const data = {
          name: this.plan.name,
          plan_type:
            this.plan.plan_type === 'Select Plan'
              ? 'selected_plan'
              : 'all_plan',
          code: this.plan.code,
          no_of_redeems: this.plan.no_of_redeems,
          percentage_value: this.plan.percentage_value,
          listing_plan_id: this.plan.listing_plan_id,
          no_of_days: this.plan.no_of_days,
        }
        console.log(data)
        const response = await this.$discountApi.create(data)
        console.log(response)
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: response.message,
          type: 'success',
        })
        this.btnLoading = false
      } catch (error) {
        this.btnLoading = false
        ;(this as any as IMixinState).catchError(error)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
$small_screen: 426px;
.duration_container {
  min-width: 450px;
}
.plan_info {
  max-width: 450px;
  width: 100%;
  .plan_name {
    max-width: 450px !important;
    .el-input__inner {
      width: 100% !important;
    }
  }
}

.discount {
  width: 100%;
  .select {
    width: 100%;
    max-width: 450px !important;
  }
}

.account_form {
  padding-left: 20px;
}
.account_label {
  width: 20%;
  padding-top: 8px;
}
</style>
