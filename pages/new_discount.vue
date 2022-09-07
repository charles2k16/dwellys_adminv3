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
      <el-form
        ref="plan"
        :rules="plan_validation"
        :model="plan"
        label-position="top"
      >
        <div class="user_form">
          <div class="d-flex w-100">
            <div class="account_label">
              <h4>Name</h4>
              <p class="w-80 pt-10">Descrpitive name of the discount.</p>
            </div>
            <div class="pl-20 w-80">
              <div class="plan_info d-flex_column">
                <el-form-item
                  label="Name of discount"
                  class="plan_name"
                  prop="name"
                >
                  <el-input
                    v-model="plan.name"
                    placeholder="First name"
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="Discount code"
                  prop="description"
                  class="plan_name"
                >
                  <el-input
                    v-model="plan.description"
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
                <el-form-item label="Discount type" class="discount">
                  <el-select
                    v-model="plan.currency"
                    placeholder="Select a discount type"
                    class="pt-10 select"
                  >
                    <el-option
                      v-for="(currency, index) in currencies"
                      :key="index"
                      :label="currency.short_name"
                      :value="currency.short_name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Pricing tier" class="discount">
                  <el-select
                    v-model="plan.currency"
                    placeholder="Select a pricing tier"
                    class="pt-10 select"
                  >
                    <el-option
                      v-for="(currency, index) in currencies"
                      :key="index"
                      :label="currency.short_name"
                      :value="currency.short_name"
                    >
                    </el-option>
                  </el-select>
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
              <el-form-item label="Discount percent" prop="no_of_days">
                <el-input
                  v-model="plan.no_of_days"
                  type="number"
                  placeholder="Enter percentage fraction."
                  class="w-100"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="mt-20 d-flex w-50 justify_between">
              <el-button class="back_btn">Cancel</el-button>
              <div class="register_btn">
                <el-button type="info" @click="submit_plan">Save</el-button>
                <el-button
                  type="primary"
                  :loading="btnLoading"
                  class="second_next submit_register_button"
                  @click="submit_plan"
                  >Save and activate</el-button
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
      currencies: [],
      plan: {
        name: '' as string,
        description: '' as string,
        price: 0 as number,
        is_plan_in_percentage: null,
        percentage_fraction_on_value: '',
        currency: '',
        no_of_days: '' as string,
        features: [''] as Array<string>,
      },

      plan_validation: {
        name: [
          {
            required: true,
            message: 'Please enter plan name',
            trigger: ['blur', 'change'],
          },
        ],
        description: [
          {
            required: true,
            message: 'Please enter description',
            trigger: ['blur', 'change'],
          },
        ],
        no_of_days: [
          {
            required: true,
            message: 'Please enter duration',
            trigger: ['blur', 'change'],
          },
        ],
      },

      user: '' as string,
      countries: [],
    }
  },
  async created() {
    const currencies = await this.$countriesApi.index()
    this.currencies = currencies.data
    console.log(this.currencies)
  },
  methods: {
    addTier() {
      this.counter++
      this.plan.features.push('')
    },
    removeTier(index: number) {
      this.counter--
      this.plan.features.splice(index, 1)
    },
    submit_plan() {
      //   this.plan.activate = activate
      console.log(this.plan)
      this.btnLoading = true
      ;(this as any).$refs.plan.validate((valid: boolean) => {
        if (valid) {
          this.newPlan()
          // this.$router.replace('/users')
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
          description: this.plan.description,
          price: this.plan.is_plan_in_percentage === true ? 0 : this.plan.price,
          is_plan_in_percentage: this.plan.price > 0 ? 'no' : 'yes',
          percentage_fraction_on_value:
            this.plan.is_plan_in_percentage === true
              ? this.plan.percentage_fraction_on_value
              : '',
          currency:
            this.plan.is_plan_in_percentage === true ? '' : this.plan.currency,
          no_of_days:
            this.plan.is_plan_in_percentage === true
              ? ''
              : this.plan.no_of_days,
          features: this.plan.features,
        }
        console.log(data)
        const response = await this.$listingPlanApi.create(data)
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
