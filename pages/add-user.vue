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
            <h2>Add new user</h2>
            <p class="mt-10 text-grey">Add a new employee</p>
          </div>
        </div>
        <div class="mr-20">
          <el-tag type="success" size="small"> active</el-tag>
        </div>
      </div>
      <el-divider class="mr-20"></el-divider>
    </div>

    <div class="account_form mt-10">
      <el-form
        ref="user_account"
        :rules="account_validation"
        :model="user_account"
        label-position="top"
      >
        <div class="user_form">
          <div class="d-flex">
            <div class="account_label">
              <h4>Name</h4>
              <p class="w-80 pt-10">
                The name and description should be able to help the user
                identify which offer works best for their use case.
              </p>
            </div>
            <div class="ml-20">
              <div class="d-flex">
                <el-form-item label="First Name" prop="first_name">
                  <el-input
                    v-model="user_account.first_name"
                    placeholder="First name"
                    class="w-50"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="Last Name" prop="last_name" class="pl-20">
                  <el-input
                    v-model="user_account.last_name"
                    placeholder="Last Name"
                    class="w-50"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <el-row :gutter="20" class="ml-10">
                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item label="Password" prop="password">
                    <el-input
                      v-model="user_account.password"
                      placeholder="Enter password"
                      type="password"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12">
                  <el-form-item
                    label="Confirm Password"
                    prop="confirm_password"
                  >
                    <el-input
                      v-model="user_account.confirm_password"
                      placeholder="confirm password"
                      type="password"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="Date of Birth" prop="dob">
                <el-input v-model="user_account.dob" type="date"> </el-input>
              </el-form-item>
            </div>
          </div>
        </div>

        <el-divider></el-divider>
        <div>
          <div class="d-flex pb-20">
            <div class="account_label">
              <h4>Contact info</h4>
              <p class="w-80 pt-10">
                The name and description should be able to help the user
                identify which offer works best for their use case.
              </p>
            </div>
            <div class="ml-20">
              <el-form-item label="Email address" prop="email">
                <el-input
                  v-model="user_account.email"
                  type="email"
                  placeholder="Enter email"
                >
                </el-input>
              </el-form-item>

              <el-form-item
                label="Phone number"
                prop="phone_number"
                style="margin-top: 10px"
              >
                <vue-phone-number-input
                  v-model="phone"
                  :border-radius="7"
                  default-country-code="GH"
                  @update="onPhoneUpdate"
                />
              </el-form-item>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="d-flex pb-20">
            <div class="account_label">
              <h4>Position & Access</h4>
              <p class="w-80 pt-10">Role based access control features</p>
            </div>
            <div class="w-50">
              <div v-for="(tier, index) in user_account.tierForm" :key="index">
                <el-input
                  v-model="tier.value"
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
                class="m-10 d-flex justify_end w-50"
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
                <el-button type="info" @click="submit_account">Save</el-button>
                <el-button
                  type="primary"
                  :loading="btnLoading"
                  class="second_next submit_register_button"
                  @click="submit_account"
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
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'AccountPage',
  components: {
    VuePhoneNumberInput,
  },

  data() {
    const validatePass = (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if ((this as any).user_account.confirm_password !== '') {
          ;(this as any).$refs.user_account.validateField('confirm_password')
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== (this as any).user_account.password) {
        callback(new Error("Password don't match!"))
      } else {
        callback()
      }
    }
    return {
      active: 0 as number,
      step: 1 as number,
      phone: '',
      btnLoading: false as boolean,
      user_account: {
        first_name: '' as string,
        dob: '' as string,
        last_name: '' as string,
        sign_up_mode: 'email',
        email: '' as string,
        phone_number: '' as string,
        password: '' as string,
        confirm_password: '' as string,
        country_id: '39a40751-d7d2-4346-99e5-b0235b520ce5' as String,
        user_type: 'visitor',
        tierForm: [{ value: '' }],
      },

      account_validation: {
        first_name: [
          {
            required: true,
            message: 'Please enter your first name',
            trigger: ['blur', 'change'],
          },
        ],
        last_name: [
          {
            required: true,
            message: 'Please enter your last name',
            trigger: ['blur', 'change'],
          },
        ],
        dob: [
          {
            required: true,
            message: 'Please enter your date of birth',
            trigger: ['blur', 'change'],
          },
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: 'Please enter valid email',
            trigger: ['blur', 'change'],
          },
          { min: 5, message: 'Length should be 5 or more', trigger: 'blur' },
        ],
        phone_number: [
          {
            required: true,
            message: 'Please enter your phone number',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true },
        ],
        confirm_password: [
          { validator: validatePass2, trigger: 'blur', required: true },
        ],
      },

      user: '' as string,
      countries: [],
    }
  },
  async created() {
    const countries = await this.$countriesApi.index()
    this.countries = countries.data
    console.log(countries)
  },
  methods: {
    addTier() {
      this.user_account.tierForm.push({ value: '' })
    },
    removeTier(index: number) {
      this.user_account.tierForm.splice(index, 1)
    },
    onPhoneUpdate(e: any) {
      console.log(e)
      this.user_account.phone_number = e.formattedNumber
      this.countries.filter((country: any) =>
        country.short_name === e.countryCode
          ? (this.user_account.country_id = country.id)
          : ''
      )
    },
    submit_account() {
      //   this.user_account.activate = activate
      console.log('send')
      this.btnLoading = true
      ;(this as any).$refs.user_account.validate((valid: boolean) => {
        if (valid) {
          this.signUp()
          this.$router.replace('/users')
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
    async signUp(): Promise<void> {
      try {
        const response = await this.$registerApi.create(this.user_account)
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

.account_form {
  padding-left: 40px;
}
.account_label {
  width: 20%;
  padding-top: 8px;
}
</style>
