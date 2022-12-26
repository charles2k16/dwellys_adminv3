<template>
  <div>
    <el-card class="">
      <div class="lister_header">
        <div class="d-flex">
          <h4 class="pt-8">Plans and pricing</h4>
          <NuxtLink to="/plans" class="ml-20 mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/plans' ? 'primary' : ''"
              >All</el-button
            >
          </NuxtLink>
          <NuxtLink to="/plans/Active" class="mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/plans/Active' ? 'primary' : ''"
              >Active</el-button
            >
          </NuxtLink>
          <NuxtLink to="/plans/DeActive">
            <el-button
              size="mini"
              round
              :type="$route.path == '/plans/DeActive' ? 'primary' : ''"
              >Deactive</el-button
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
          <NuxtLink to="/new_plan"
            ><el-button type="danger"
              ><i class="el-icon-plus mr-10"></i>New Plan</el-button
            ></NuxtLink
          >
        </div>
      </div>
    </el-card>

    <NuxtChild
      :plans="plans"
      :activeplans="activePlans"
      :deactivateplans="deactivatedPlans"
      :fetch-data="fetchData"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PlansPage',
  middleware: 'auth',
  data() {
    return {
      plans: [],
      activePlans: [],
      deactivatedPlans: [],
      value: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      //   const listings = await this.$listingsApi.index()
      const plans = await this.$listingPlanApi.index()
      this.plans = plans.data
      console.log(plans.data)

      this.activePlans = plans.data.filter((plan: any) => plan.is_active === 1)
      console.log('active', this.activePlans)
      this.deactivatedPlans = plans.data.filter(
        (plan: any) => plan.is_active === 0
      )
      console.log('deactive', this.deactivatedPlans)
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
