<template>
  <div class="property_account">
    <div class="d-flex justify_between">
      <div>
        <span> <i class="el-icon-back"></i> </span>
        <div>
          <h2>Add new user</h2>
          <p class="mt-10 text-grey">Add a new employee</p>
        </div>
      </div>
      <div>active</div>
    </div>
    <el-divider></el-divider>
    <div class="account_form mt-10">
      <el-form
        ref="property_account"
        :rules="account_validation"
        :model="property_account"
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

            <div class="d-flex ml-20">
              <el-form-item label="First Name" prop="first_name">
                <el-input
                  v-model="property_account.first_name"
                  placeholder="First name"
                  class="w-50"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="last_name" class="pl-20">
                <el-input
                  v-model="property_account.last_name"
                  placeholder="Last Name"
                  class="w-50"
                >
                </el-input>
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
                  v-model="property_account.email"
                  type="email"
                  placeholder="Enter email"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="Phone number"
                prop="phone"
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
          <div class="d-flex pb-20">
            <div class="account_label">
              <h4>Position & Access</h4>
              <p class="w-80 pt-10">Role based access control features</p>
            </div>
            <div class="ml-20">
              <el-form-item label="Email address" prop="email">
                <el-input
                  v-for="tier in tierForm"
                  :key="tier.value"
                  v-model="tier.value"
                  type="email"
                  placeholder="Tier feature"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div>
            <div class="mt-20 d-flex justify_between">
              <el-button class="back_btn" @click="toPrev">Cancel</el-button>
              <div class="register_btn">
                <el-button type="info">Save</el-button>
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
// import VuePhoneNumberInput from "vue-phone-number-input";
// import 'vue-phone-number-input/dist/vue-phone-number-input.css'
// import { IMixinState } from "@/types/mixinsTypes";

export default Vue.extend({
  name: 'AccountPage',
  components: {
    // VuePhoneNumberInput,
  },

  data() {
    const validatePass = (value: string, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if ((this as any).property_account.confirm_password !== '') {
          ;(this as any).$refs.property_account.validateField(
            'confirm_password'
          )
        }
        callback()
      }
    }
    const validatePass2 = (value: string, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== (this as any).property_account.password) {
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
      property_account: {
        avatar: '' as any,
        first_name: '' as string,
        last_name: '' as string,
        dob: '' as string,
        sign_up_mode: 'email',
        email: '' as string,
        password: '' as string,
        confirm_password: '' as string,
        phone_number: '' as string,
        country_id: '39a40751-d7d2-4346-99e5-b0235b520ce5' as String,
        user_type: 'lister',
      },
      tierForm: [{ value: '' }],
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
        id_card_number: [
          {
            required: true,
            message: 'Please enter ID number',
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
        id_card_type: [
          {
            required: true,
            message: 'Please select ID type',
            trigger: 'change',
          },
        ],
        id_card_upload: [
          {
            required: true,
            message: 'Please select an ID card',
            trigger: 'change',
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
  async created() {},
  methods: {
    // submit_account() {
    //   this.btnLoading = true;
    //   (this as any).$refs.property_account.validate((valid: boolean) => {
    //     if (valid) {
    //       this.signUp();
    //       this.$router.replace("/login");
    //     } else {
    //       this.btnLoading = false;
    //       (this as any as IMixinState).getNotification(
    //         "Make sure all required fields are filled",
    //         "error"
    //       );
    //       return false;
    //     }
    //   });
    // },
    // async signUp(): Promise<void> {
    //   try {
    //     const response = await this.$registerApi.create(this.property_account);
    //     console.log(response);
    //     (this as any as IMixinState).$confirm(response.message, {
    //       confirmButtonText: "OK",
    //       cancelButtonText: "Cancel",
    //       type: "success",
    //     });
    //     this.btnLoading = false;
    //   } catch (error) {
    //     this.btnLoading = false;
    //     (this as any as IMixinState).catchError(error);
    //   }
    // },
  },
})
</script>

<style lang="scss" scoped>
$small_screen: 426px;

.account_form {
  padding-left: 40px;
}
.account_label {
  width: 200px;
}
</style>
