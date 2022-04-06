<template>
  <div>
    <!-- <ApplicationHandler ref="handleAction"></ApplicationHandler> -->

    <div class="page__title">
      <NuxtLink to="/products/" class="mr-10">
        <el-button size="mini" round type="primary">Submitted</el-button>
      </NuxtLink>
      <NuxtLink to="/products/approved">
        <el-button size="mini" round>Approved</el-button>
      </NuxtLink>
    </div>

    <NuxtChild />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProductsPage',
  methods: {
    addProduct(): void {
      ;(this as any).$refs.handleAction.showAddClassModal()
    },
  },
})
</script>
