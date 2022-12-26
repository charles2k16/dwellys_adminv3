<template>
  <div>
    <el-card class="py-20">
      <div class="lister_header">
        <div class="d-flex">
          <h4 class="mr-10 pt-8">Discounts</h4>
          <NuxtLink to="/discounts" class="ml-20 mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/discounts' ? 'primary' : ''"
              >All</el-button
            >
          </NuxtLink>
          <NuxtLink to="/discounts/active" class="mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/discounts/active' ? 'primary' : ''"
              >Active</el-button
            >
          </NuxtLink>
          <NuxtLink to="/discounts/scheduled" class="mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/discounts/scheduled' ? 'primary' : ''"
              >Scheduled</el-button
            >
          </NuxtLink>
          <NuxtLink to="/discounts/expiredDiscounts">
            <el-button
              size="mini"
              round
              :type="
                $route.path == '/discounts/expiredDiscounts' ? 'primary' : ''
              "
              >Expired</el-button
            >
          </NuxtLink>
        </div>
        <div class="d-flex">
          <div class="d-flex ml-10">
            <!-- <el-select
              v-model="value"
              filterable
              placeholder="Filter"
              class="select_filter"
            >
              <template slot="prefix"
                ><i class="el-icon-cold-drink mt-10"></i
              ></template>
              <el-option
                v-for="item in discounts"
                :key="item.id"
                :label="item.lister.first_name"
                :value="item.lister.first_name"
              >
              </el-option>
            </el-select> -->
          </div>
          <el-input
            v-model="value"
            class="ml-10 mr-10"
            placeholder="Type something"
            prefix-icon="el-icon-search"
          >
          </el-input>
          <NuxtLink to="/new_discount">
            <el-button type="danger"
              ><i class="el-icon-plus mr-10"></i>Create Discount</el-button
            ></NuxtLink
          >
        </div>
      </div>
    </el-card>

    <NuxtChild
      :discounts="discounts"
      :activediscounts="active_discounts"
      :scheduleddiscounts="scheduled_discounts"
      :expireddiscounts="expired_discounts"
      :fetch-data="fetchData"
      :discountsPagination="discountsPagination"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DiscountsPage',
  middleware: 'auth',
  data() {
    return {
      loading: false,
      discounts: [],
      active_discounts: [],
      scheduled_discounts: [],
      expired_discounts: [],
      discountsPagination: {},
      value: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const discounts = await this.$discountApi.index()
      console.log(discounts)
      this.discounts = discounts.data
      // this.discountsPagination = discounts.pagination
      if (!this.discounts) {
        this.loading = true
      }

      // this.verified_discounts = discounts.data.filter(
      //   (listing: any) => listing.status === 'active'
      // )
      // // console.log('verified',this.verified_discounts)
      // this.unverified_discounts = discounts.data.filter(
      //   (listing: any) => listing.status === 'inactive'
      // )
      // console.log('unverified',this.unverified_discounts)
    },
    addProduct(): void {
      ;(this as any).$refs.handleAction.showAddClassModal()
    },
  },
})
</script>
<style>
.lister_header {
  display: flex;
  justify-content: space-between;
}
.filter {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 5px;
  width: 160px;
}
</style>
