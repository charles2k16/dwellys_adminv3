<template>
  <div>
    <!-- <ApplicationHandler ref="handleAction"></ApplicationHandler> -->

    <el-card class="p-20">
      <div class="lister_header">
        <div class="d-flex">
          <h4 class="mr-20 pt-8">Listings accounts</h4>
          <NuxtLink to="/listers/" class="ml-20 mr-10">
            <el-button size="mini" round type="primary">All</el-button>
          </NuxtLink>
          <NuxtLink to="/listings/verified">
            <el-button size="mini" round>Verified</el-button>
          </NuxtLink>
          <NuxtLink to="/listings/unverified">
            <el-button size="mini" round>Unverified</el-button>
          </NuxtLink>
        </div>
        <div class="d-flex">
          <div class="d-flex filter ml-10">
            <i class="el-icon-cold-drink mt-10"></i>
            <el-select v-model="value" filterable placeholder="Filter">
              <el-option
                v-for="item in listings"
                :key="item.id"
                :label="item.lister.first_name"
                :value="item.lister.first_name"
              >
              </el-option>
            </el-select>
          </div>
          <el-input
            v-model="value"
            class="ml-10"
            placeholder="Type something"
            prefix-icon="el-icon-search"
          >
          </el-input>
        </div>
      </div>
    </el-card>

    <NuxtChild :listings="listings" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ListingsPage',
  data() {
    return {
      listings: [],
      value: '',
    }
  },
  async created() {
    // this.pageLoad = true;
    const listings = await this.$listingsApi.index()
    console.log(listings)
    this.listings = listings.data
  },
  methods: {
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
