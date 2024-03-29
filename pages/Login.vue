<template>
  <div class="login_container">
    <div class="box-card">
      <el-card class="py-20 px-10">
        <div slot="header" class="clearfix center">
          <img src="../assets/img/logo.png" alt="logo" width="100px" />
          <p class="mt-10">Authorized login for Dwellys Administrators.</p>
        </div>
        <div class="text item">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="validation"
            class="d-flex_column_center"
          >
            <el-form-item prop="email" class="w-100">
              <el-input
                v-model="loginForm.email"
                placeholder="youremail@email.com"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password" class="w-100">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="********"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="d-flex justify_end">
            <NuxtLink to="/reset_password" style="text-decoration: underline"
              >Forgotten password ?</NuxtLink
            >
          </div>
          <div class="mt-20">
            <el-button
              class="full_width"
              type="primary"
              :loading="buttonLoading"
              @click="userLogin"
              >Login</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'Login',
  layout: 'auth',
  data() {
    return {
      buttonLoading: false,
      loginForm: {
        email: '' as string,
        password: '' as string,
      },
      validation: {
        email: [
          {
            required: true,
            type: 'email',
            message: 'Please enter valid email',
            trigger: ['blur', 'change'],
          },
          { min: 5, message: 'Length should be 5 or more', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          {
            min: 6,
            message: 'Length should be 6 or more characters',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    userLogin(): void {
      this.buttonLoading = true
      ;(this as any).$refs.loginForm.validate((valid: boolean) => {
        if (valid) {
          this.signIn()
        } else {
          this.buttonLoading = false
          ;(this as any as IMixinState).getNotification(
            'Email or password is incorrect',
            'error'
          )
          return false
        }
      })
    },
    async signIn(): Promise<any> {
      const login = await this.$auth
        .loginWith('local', {
          data: {
            email: this.loginForm.email,
            password: this.loginForm.password,
          },
        })
        .then((response: any) => {
          const { user, token } = response.data.data
          this.$auth.setUserToken(token)
          this.$auth.setUser(user)
          // this.$auth.$storage.setLocalStorage("user_data", user);
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: response.data.message,
            type: 'success',
          })
          this.buttonLoading = false
          this.$router.push({
            name: 'index',
          })
        })
        .catch((error) => {
          if (error?.response?.data) {
            ;(this as any as IMixinState).getNotification(
              'User Not Recognized',
              'warning'
            )
          } else {
            ;(this as any as IMixinState).getNotification(
              'Something went wrong',
              'warning'
            )
          }
          this.buttonLoading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.login_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-card {
    max-width: 450px;
    width: 100%;

    .login_title {
      font-size: 2rem;
    }
  }
}
</style>
