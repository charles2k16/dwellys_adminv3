<template>
  <div>
    <!-- add new enquiry dialog -->
    <el-dialog
      :visible.sync="showProductModal"
      width="65%"
      custom-class="mobile-modal"
    >
      <template slot="title">
        <h3>{{ modalTitle }}</h3>
        <p class="mt-10">
          All fields should be filled for accurate products search.
        </p>
      </template>
      <AddProduct v-if="showProductModal" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ApplicationHandler',
  data() {
    return {
      modalTitle: '' as string,
      showProductModal: false as boolean,
    }
  },
  methods: {
    showAddClassModal(): void {
      this.modalTitle = 'Add Product'
      this.showProductModal = true
    },
  },
})
</script>
