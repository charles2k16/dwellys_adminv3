<template>
  <div>
    <!-- add new enquiry dialog -->
    <el-dialog
      :visible.sync="showProductModal"
      width="40%"
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
    <el-dialog
      :visible.sync="photoModal"
      width="40%"
      :destroy-on-close="true"
      custom-class="mobile-modal"
    >
      <template slot="title">
        <h3>Upload your photo</h3>
      </template>
      <ListerImageUpload @avatar="userAvatar" />
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
      photoModal: false as boolean,
    }
  },
  methods: {
    showAddClassModal(): void {
      this.modalTitle = 'Add Product'
      this.showProductModal = true
    },
    showPhotoModal(): void {
      this.photoModal = true
    },
    closePhotoModal(): void {
      this.photoModal = false
    },
    userAvatar(file: Object) {
      this.$emit('avatar', file)
      this.photoModal = false
    },
  },
})
</script>
