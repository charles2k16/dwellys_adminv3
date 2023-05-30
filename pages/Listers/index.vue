<template>
  <div>
    <el-card class="mt-20">
      <el-table
        v-loading="listers.length < 1"
        :data="listers"
        stripe
        :default-sort="{ prop: 'name', order: 'descending' }"
      >
        <el-table-column label="Name">
          <template slot-scope="scope">
            <div class="d-flex" @click="viewProfile(scope.row)">
              <!-- <a :href="`/products/${scope.row.id}`">{{ scope.row.name }}</a> -->
              <span class="mr-10">
                <a
                  v-if="scope.row.avatar"
                  :href="scope.row.avatar"
                  target="_blank"
                  ><img
                    :src="scope.row.avatar"
                    alt="pic"
                    class="profile_avatar"
                /></a>
                <img
                  v-else
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt="pic"
                  style="width: 40px"
                />
              </span>
              <span class="d-block mt-10"
                >{{ scope.row.first_name }} {{ scope.row.last_name }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Email address">
          <template slot-scope="scope">
            <span @click="viewProfile(scope.row)">{{ scope.row.email }} </span>
          </template>
        </el-table-column>
        <el-table-column label="Phone Number">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row)">
              <span>
                {{ props.row.phone_number }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Verified">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row)">
              <el-tag
                :type="props.row.is_id_card_verified == 1 ? 'success' : 'error'"
                size="small"
              >
                {{ props.row.is_id_card_verified == 1 ? 'Yes' : 'No' }}</el-tag
              >
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
                {{ props.row.status == 'active' ? 'Yes' : 'No' }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
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

    <el-card class="mt-20">
      <div class="center d-flex justify_between">
        <div class="align_center">
          <span class="pr-10">View</span>
          <el-select v-model="value" placeholder="Select" style="width: 80px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="pl-10">listers per page</span>
        </div>
        <!-- layout="prev, pager, next, sizes, total" -->
        <div v-if="listersPageDetails" class="align_center">
          <span
            >{{ listersPageDetails.current_page }}-{{
              listersPageDetails.per_page
            }}
            0f 100</span
          >
          <el-pagination
            background
            :page-size="listersPageDetails.per_page"
            :current-page="listersPageDetails.current_page"
            @curent-change="handleCurrentChange"
            :page-sizes="[30, 50, 100]"
            layout="prev, pager, next"
            :total="listersPageDetails.total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-drawer
      title="User lister information"
      :visible.sync="drawer"
      size="40%"
    >
      <div class="px-30 user_details">
        <div class="about_image pb-10">
          <img
            v-if="
              profile.avatar &&
              avatar ===
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
            :src="profile.avatar"
            class="profile_img"
          />
          <img v-else :src="avatar" alt="avatar" class="profile_img" />
          <div class="pl-20 pt-20">
            <el-button type="info">Reject profile photo</el-button>
            <p class="pt-10">
              A profile image can be rejected if the image is not clear enough
              or the face is covered or an inanimate object is used
            </p>
          </div>
        </div>
        <el-upload
          class="upload-demo"
          action="#"
          :multiple="false"
          :auto-upload="false"
          :on-change="getAvatar"
          :show-file-list="false"
        >
          <el-button type="info" size="mini">Change Photo</el-button>
        </el-upload>
        <div class="pt-20 w-70">
          <div class="d-flex justify_between pb-10">
            <section>
              <p class="pb-10">First name</p>
              <!-- <p>
                <b>{{ profile && profile.first_name }} </b>
              </p> -->
              <el-input v-model="profile.first_name" placeholder="First name">
              </el-input>
            </section>
            <section class="pl-30">
              <p class="pb-10">Last name</p>
              <!-- <p>
                <b>{{ profile && profile.last_name }}</b>
              </p> -->
              <el-input v-model="profile.last_name" placeholder="Last Name">
              </el-input>
            </section>
          </div>
          <section class="pt-10">
            <p class="pb-10">DOB</p>
            <p>
              <b>{{ profile.dob }} </b>
            </p>
            <el-input v-model="profile.date" type="date"> </el-input>
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pt-5 pb-10 d-flex justify_between">
          <section>
            <p class="pb-10">Email address</p>
            <!-- <p>
              <b>{{ profile && profile.email }}</b>
            </p> -->
            <el-input
              v-model="profile.email"
              type="email"
              placeholder="Enter email"
            />
          </section>
          <section class="pl-30 pr-10">
            <p class="pb-10">Phone</p>
            <p>
              <b>{{ profile && profile.phone_number }}</b>
            </p>
            <vue-phone-number-input
              v-model="phone"
              :border-radius="7"
              default-country-code="GH"
              @update="onPhoneUpdate"
            />
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pb-10">
          <section class="pb-20">
            <p class="pb-10">ID type</p>
            <p>
              <b>{{ profile && profile.id_card_type }} </b>
            </p>
          </section>
          <p><span>Image of ID</span></p>
          <img
            :src="profile.id_card_upload"
            class="identification_card pb-10"
          />
          <!-- <div
            v-if="profile.is_id_card_verified == 1"
            class="p-10 d-flex justify_center"
          >
            <p class="p-10 verified">
              <i class="el-icon-check pr-10"></i>Verified
            </p>
          </div> -->
          <div class="d-flex justify_between pt-30 pb-30">
            <el-button
              v-if="profile.is_id_card_verified != 1"
              type="success"
              class="w-50"
              :loading="loading"
              @click="approveLister(profile)"
              ><i class="el-icon-check pr-10"></i>Verify</el-button
            >
            <el-button
              v-else
              type="primary"
              class="w-50"
              :loading="loading"
              @click="approveLister(profile)"
              ><i class="el-icon-close pr-10"></i>Unverify</el-button
            >
            <el-button
              :type="'primary'"
              :loading="saveLoading"
              class="btn_sm"
              @click="updateUser"
              >Save information
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'Listers',
  props: {
    listers: {
      required: true,
      type: Array,
    },
    verifiedlisters: {
      required: true,
      type: Array,
    },
    unverifiedlisters: {
      required: true,
      type: Array,
    },
    fetchData: {
      required: true,
      type: Function,
    },
    listersPageDetails: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      value: '30',
      options: [
        {
          value: '30',
          label: '30',
        },
        {
          value: '50',
          label: '50',
        },
        {
          value: '100',
          label: '100',
        },
      ],
      activeTab: 'pendingReview',
      pendingTab: 'Pending Products',
      phone: '',
      loading: false,
      saveLoading: false,
      countries: [],
      pendingTotal: 0,
      drawer: false,
      tableLoading: false,
      profile: {} as any,
      search: '' as string,
      country_id: '' as string,
      avatar:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' as any,
    }
  },
  async created() {
    const countries = await this.$countriesApi.index()
    this.countries = countries.data
    const country = countries.data.filter(
      (country: any) => country.short_name === 'GH'
    )
    this.country_id = country[0].id
  },
  methods: {
    getAvatar(file: any) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onloadend = () => {
        this.avatar = reader.result
      }
    },
    handleCurrentChange() {},
    onPhoneUpdate(e: any) {
      this.profile.phone_number = e.formattedNumber
      this.countries.filter((country: any) =>
        country.short_name === e.countryCode
          ? (this.profile.country_id = country.id)
          : ''
      )
    },
    viewProfile(profile: any) {
      this.profile = profile

      console.log(this.profile)
      this.drawer = true
    },
    async approveLister(profile: any) {
      this.loading = true
      try {
        const listingResponse = await this.$approvalApi.create({
          user_id: profile.id,
        })

        this.loading = false
        this.drawer = false
        this.fetchData()
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: listingResponse.message,
          type: 'success',
        })
      } catch (error) {
        this.loading = false
        ;(this as any as IMixinState).catchError(error)
      }
    },
    async updateUser(): Promise<void> {
      this.saveLoading = true
      const data = {
        avatar:
          this.avatar !==
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            ? this.avatar
            : null,
        dob: this.profile.dob,
        email: this.profile.email,
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        phone_number: this.profile.phone_number,
        country_id: this.country_id,
        user_type: this.profile.user_type,
      }
      try {
        const profileResponse = await this.$listerUpdateApi.update(
          'update',
          data
        )
        this.$auth.setUser(profileResponse.data.user)

        this.saveLoading = false
        ;(this as any as IMixinState).getNotification(
          'Update successfull!',
          'success'
        )
      } catch (error: any) {
        this.saveLoading = false
        const errorResponses = Object.values(
          error?.response?.data?.errors
        ).toString()
        console.log(errorResponses)
        // ;(this as any as IMixinState).$message({
        //   showClose: true,
        //   message: errorResponses,
        //   type: 'error',
        // })
        // ;(this as any as IMixinState).catchError(error)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
$medium_screen: 769px;
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
    width: 36%;
    border-radius: 50%;
    height: 180px;
    @media (max-width: $medium_screen) {
      margin: 0 auto;
    }
  }
  .identification_card {
    width: 100%;
    height: 200px;
    border-radius: 16.4815px;
  }
  .verified {
    color: rgb(34, 197, 94);
    font-size: 18px;
    i {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .about_image {
    display: flex;
    @media (max-width: $medium_screen) {
      flex-direction: column;
    }
  }
}
</style>
