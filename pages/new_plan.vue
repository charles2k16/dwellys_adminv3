<template>
  <div class="pb-20">
    <div class="w-80">
      <div class="d-flex justify_between">
        <div class="d-flex">
          <NuxtLink to="/users">
            <span
              ><i class="el-icon-back mr-20" style="font-size: 30px"></i>
            </span>
          </NuxtLink>
          <div>
            <h2>Create a new pricing & plan tier</h2>
            <p class="mt-10 text-grey">
              Create a completely new pricing tier to be published on the
              platform
            </p>
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
              <h4>Name & Description</h4>
              <p class="w-80 pt-10">
                The name and description should be able to help the user
                identify which offer works best for their use case.
              </p>
            </div>
            <div class="pl-20 w-80">
              <div class="plan_info d-flex_column">
                <el-form-item
                  label="Name of Tier"
                  class="plan_name"
                  prop="name"
                >
                  <el-input
                    v-model="plan.name"
                    placeholder="Please enter the name of the tier, eg. Quick Sale"
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="Description"
                  prop="description"
                  class="plan_name"
                >
                  <el-input
                    v-model="plan.description"
                    placeholder="Enter a description the best summarises the price tier."
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
              <h4>Amount & Duration</h4>
              <p class="w-80 pt-10">
                The amount and duration of the price tier.
              </p>
            </div>
            <div class="pl-20 duration_container">
              <el-form-item label="Percentage Plan" class="amount">
                <el-checkbox
                  v-model="plan.is_plan_in_percentage"
                  label="Plan in Percentage(%) ?"
                ></el-checkbox>
              </el-form-item>
              <div v-if="!plan.is_plan_in_percentage" class="d-flex">
                <el-form-item label="Currency" class="amount">
                  <el-select
                    v-model="plan.currency"
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
                </el-form-item>
                <el-form-item label="Amount" class="pl-20 w-100">
                  <el-input
                    v-model="plan.price"
                    placeholder="E.g 300"
                    class="w-50"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div v-else class="d-flex">
                <el-form-item label="Percentage fraction on plan" class="w-100">
                  <el-input
                    v-model="plan.percentage_fraction_on_value"
                    type="number"
                    placeholder="Enter percentage fraction."
                    class="w-100"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <el-form-item label="Duration" prop="no_of_days">
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
          <el-divider></el-divider>
          <div class="d-flex pb-20 w-100">
            <div class="account_label">
              <h4>Tier perks</h4>
              <p class="w-80 pt-10">Enter the perks that come with the tier</p>
            </div>
            <div class="w-50">
              <div v-for="(tier, index) in counter" :key="index" class="w-80">
                <el-input
                  v-model="plan.features[tier - 1]"
                  type="text"
                  placeholder="Tier feature"
                  class="mb-10"
                />
                <!-- </el-input> -->
                <p
                  v-if="index != 0"
                  class="w-50 d-flex justify_end m-10"
                  style="color: red"
                  @click="removeTier(index)"
                >
                  <i class="el-icon-delete-solid" style="font-weight: 600"></i>
                </p>
              </div>
              <p
                style="color: red"
                class="m-10 d-flex justify_end"
                @click="addTier"
              >
                <i class="el-icon-plus mr-10" style="font-weight: 600"></i>
                Add new
              </p>
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
        const response = await this.$listingPlanApi.create(this.plan)
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

.amount {
  width: 35%;
  el-select {
    width: 80%;
  }
}
.fraction {
  max-width: 450px;
  width: 100%;
}

.account_form {
  padding-left: 20px;
}
.account_label {
  width: 20%;
  padding-top: 8px;
}
</style>
