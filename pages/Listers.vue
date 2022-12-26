<template>
  <div>
    <!-- <ApplicationHandler ref="handleAction"></ApplicationHandler> -->

    <el-card class="py-20">
      <div class="lister_header">
        <div class="d-flex">
          <h4 class="mr-20 pt-8">Lister accounts</h4>
          <NuxtLink to="/listers" class="ml-20 mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/listers' ? 'primary' : ''"
              >All</el-button
            >
          </NuxtLink>
          <NuxtLink to="/listers/verified" class="mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/listers/verified' ? 'primary' : ''"
              >Verified</el-button
            >
          </NuxtLink>
          <NuxtLink to="/listers/unverified">
            <el-button
              size="mini"
              round
              :type="$route.path == '/listers/unverified' ? 'primary' : ''"
              >Unverified</el-button
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
                v-for="item in listers"
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
          <el-button type="danger"
            ><i class="el-icon-plus mr-10"></i>New Lister</el-button
          >
        </div>
      </div>
    </el-card>

    <NuxtChild
      :listers="listers"
      :fetch-data="fetchData"
      :verifiedlisters="verified_listers"
      :unverifiedlisters="unverified_listers"
      :listersPageDetails="listersPageDetails"
    />

    <!-- :type="listing_type" -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ListersPage',
  middleware: 'auth',
  data() {
    return {
      listers: [],
      value: '',
      verified_listers: [],
      unverified_listers: [],
      listersPageDetails: {},
    }
  },
  created() {
    // this.pageLoad = true;
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // this.pageLoad = true;
      const listers = await this.$usersApi.show('lister')
      // const verifiedlisters = await this.$usersApi.show('lister')
      // const unverifiedlisters = await this.$usersApi.show('lister')

      console.log(listers)
      this.listers = listers.data
      this.listersPageDetails = listers.pagination

      this.verified_listers = listers.data.filter(
        (listing: any) => listing.is_id_card_verified === 1
      )
      // console.log('verified',this.verified_listers)
      this.unverified_listers = listers.data.filter(
        (listing: any) => listing.is_id_card_verified === 0
      )
      // console.log('unverified',this.unverified_listers)
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
