<template>
  <div>
    <el-card class="py-20">
      <div class="lister_header">
        <div class="d-flex">
          <h4 class="mr-20 pt-8">Listings accounts</h4>
          <NuxtLink to="/listings" class="ml-20 mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/listings' ? 'primary' : ''"
              >All</el-button
            >
          </NuxtLink>
          <NuxtLink to="/listings/verified" class="mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/listings/verified' ? 'primary' : ''"
              >Verified</el-button
            >
          </NuxtLink>
          <NuxtLink to="/listings/unverified">
            <el-button
              size="mini"
              round
              :type="$route.path == '/listings/unverified' ? 'primary' : ''"
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
                v-for="item in listings"
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
            ><i class="el-icon-plus mr-10"></i>New Listing</el-button
          >
        </div>
      </div>
    </el-card>

    <NuxtChild
      :listings="listings"
      :verifiedlistings="verified_listings"
      :unverifiedlistings="unverified_listings"
      :fetch-data="fetchData"
      :listingsPageDetails="listingsPageDetails"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ListingsPage',
  middleware: 'auth',
  data() {
    return {
      listings: [],
      verified_listings: [],
      unverified_listings: [],
      value: '',
      listingsPageDetails: {},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const listings = await this.$listingsApi.index()
      this.listings = listings.data
      console.log(listings)
      this.listingsPageDetails = listings.pagination

      this.verified_listings = listings.data.filter(
        (listing: any) => listing.status === 'active'
      )
      this.unverified_listings = listings.data.filter(
        (listing: any) => listing.status === 'inactive'
      )
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
