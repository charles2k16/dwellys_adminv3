<template>
  <div class="">
    <div class="d-flex justify_between">
      <div class="d-flex">
        <!-- <section class="listing_bar"> -->
        <!-- <p>Lister</p> -->
        <!-- <p class="pt-10"> -->
        <!-- <b>{{ listing && property.lister.first_name }} </b> -->
        <!-- </p> -->
        <!-- </section> -->
        <section class="mr-10 mt-10">
          <NuxtLink to="/property_types">
            <span
              ><i class="el-icon-back mr-20" style="font-size: 30px"></i>
            </span>
          </NuxtLink>
        </section>
        <section class="listing_bar">
          <p>Property name</p>
          <section class="d-flex pt-10">
            <img v-if="property" :src="property.photo" height="30px" />
            <p class="pt-10">
              <b>{{ property && property.name }} </b>
            </p>
          </section>
        </section>
        <!-- <section class="listing_bar">
          <p>Lister</p>
          <section v-if="property.creator" class="d-flex pt-10">
            <img
              v-if="property.creator.avatar != null"
              :src="property.creator.avatar"
              height="30px"
            />
            <img
              v-else
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt="pic"
              style="width: 40px"
            />
            <p class="pt-5 pl-5">
              <b>
                {{ property.creator && property.creator.first_name }}
                {{ property.creator && property.creator.last_name }}
              </b>
            </p>
          </section>
        </section> -->
      </div>
      <div>
        <div class="d-flex pt-10">
          <el-button
            type="danger"
            class="w-50 pt-5"
            :loading="loading"
            @click="updateProperty(property.id)"
            ><i class="el-icon-check pr-10"></i>Update</el-button
          >

          <el-button type="info" class="w-50 p-0" @click="open(property.id)"
            ><i class="el-icon-close pr-10"></i>Delete</el-button
          >
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <section class="pt-30">
      <p>Description</p>
      <p class="w-70 pt-10">
        <b> {{ property && property.description }}</b>
      </p>
    </section>
    <div class="pt-30">
      <p class="pb-10">Specifications</p>

      <ul class="amenites_list">
        <li
          v-for="spec in property.specifications"
          :key="spec.id"
          class="mb-10"
        >
          {{ spec.name }}
        </li>
      </ul>
    </div>
    <div class="pt-30">
      <p class="pb-10">Amenities</p>
      <ul class="amenites_list">
        <li
          v-for="amenity in property.amenities"
          :key="amenity.id"
          class="mb-10"
        >
          <!-- <img src="../../assets/icons/snowflake.svg" class="pr-5" /> -->
          <p>{{ amenity.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'ListingDetails',

  // props: {
  //   property: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      activeName: 'first' as string,
      image: '' as any,
      listing_id: this.$route.params.id,
      property: {},
      loading: false as boolean,
    }
  },
  async created() {
    // this.pageLoad = true;
    console.log(this.$route.params)
    const property = await this.$propertyApi.single(this.$route.params.id)

    console.log(property)
    this.property = property.data
  },
  methods: {
    updateProperty(id: string) {
      this.$router.push(`/property_type/edit/${id}`)
    },
    open(id: string) {
      // const h = this.$createElement
      this.$confirm(
        'Are you sure you want to delete ? You cannot undo this action.',
        {
          cancelButtonText: 'No, i want to keep',
          confirmButtonText: 'Yes,I want to Delete',
        }
      ).then(() => {
        this.deletePropertyType(id)
      })
    },
    async deletePropertyType(id: string) {
      console.log(id)
      try {
        const propertyResponse = await this.$propertyApi.delete(id)
        console.log(propertyResponse)
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: propertyResponse.message,
          type: 'success',
        })
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.listing_bar {
  width: 200px;
  padding-right: 10px;
}
.property_images {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));

  img {
    // border-radius: 20px;
    height: 100px;
    max-width: 300px;
    width: 90%;
  }
}
.amenites_list {
  // padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  width: 30%;

  // max-width: 500px;

  li {
    background: #f1f5f9;
    border-radius: 80px;
    list-style: none;
    width: fit-content;
    padding: 10px 20px;
    color: #1e293b;
    font-size: 12px;
  }
}
.user_placeholder {
  background: #d9d9d9;
  border-radius: 50%;
}
</style>
