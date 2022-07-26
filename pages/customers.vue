<template>
  <div>
    <!-- <ApplicationHandler ref="handleAction"></ApplicationHandler> -->

    <el-card class="p-20">
      <div class="customer_header">
        <div class="d-flex">
          <h4 class="mr-20 pt-8">User accounts</h4>
          <NuxtLink to="/customers/" class="ml-20 mr-10">
            <el-button size="mini" round type="primary">All</el-button>
          </NuxtLink>
          <NuxtLink to="/customers/verified">
            <el-button size="mini" round>Verified</el-button>
          </NuxtLink>
          <NuxtLink to="/customers/unverified">
            <el-button size="mini" round>Unverified</el-button>
          </NuxtLink>
        </div>
        <div class="d-flex">
          <div class="d-flex filter ml-10">
            <i class="el-icon-cold-drink mt-10"></i>
            <el-select v-model="value" filterable placeholder="Filter">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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

    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProductsPage',
  data() {
    return {
      listings: [],
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
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
.customer_header {
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
