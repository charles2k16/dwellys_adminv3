<template>
  <div class="">
    <div class="d-flex justify_between">
      <div class="d-flex">
        <!-- <section class="listing_bar"> -->
        <!-- <p>Lister</p> -->
        <!-- <p class="pt-10"> -->
        <!-- <b>{{ listing && listing.lister.first_name }} </b> -->
        <!-- </p> -->
        <!-- </section> -->
        <section class="listing_bar">
          <p>Listing type</p>
          <p class="pt-10">
            <b>{{ listing.property_type && listing.property_type.name }} </b>
          </p>
        </section>
        <section class="listing_bar">
          <p>Amount</p>
          <p class="pt-10">
            <b>{{ listing.listing_detail && listing.listing_detail.price }} </b>
          </p>
        </section>
        <section class="listing_bar">
          <p>Lister</p>
          <section class="d-flex pt-10">
            <img
              v-if="listing.lister"
              :src="url() + '/' + listing.lister.avatar"
              height="30px"
            />
            <img
              v-else
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt="pic"
              style="width: 40px"
            />
            <!-- <p class="p user_placeholder">
              <i class="el-icon-user-solid"></i>
            </p> -->
            <p class="pt-5 pl-5">
              <b>
                {{ listing.lister && listing.lister.first_name }}
                {{ listing.lister && listing.lister.last_name }}
              </b>
            </p>
          </section>
        </section>
      </div>
      <div>
        <p>Do you want to approve this listing?</p>

        <div class="d-flex pt-10">
          <el-button
            type="danger"
            class="w-50 pt-5"
            :loading="loading"
            @click="approveLister(listing.id, 'active')"
            ><i class="el-icon-check pr-10"></i>Approve</el-button
          >

          <el-button
            type="info"
            class="w-50 p-0"
            @click="approveLister(listing.id, 'inactive')"
            ><i class="el-icon-close pr-10"></i>Disapprove</el-button
          >
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <div>
        <p>Listing title</p>
        <p class="pt-10"><b>3 bed room house in Community 25, Tema</b></p>
      </div>
      <div class="d-flex pt-30">
        <section class="pr-30">
          <p>Location</p>
          <p class="pt-10">
            <b
              >{{ listing.listing_detail && listing.listing_detail.region }}
            </b>
          </p>
        </section>
        <section>
          <p>Upload Date</p>
          <p class="pt-10">
            <b>
              {{ listing && $moment(listing.created_at).format('MMM DD, YY') }}
            </b>
          </p>
        </section>
      </div>
    </div>
    <section class="pt-30">
      <p>Description</p>
      <p>
        <b>
          {{ listing.listing_detail && listing.listing_detail.description }}</b
        >
      </p>
    </section>
    <div v-if="listing.listing_detail" class="pt-30">
      <p>Images</p>
      <div class="property_images pt-10">
        <img
          v-for="img in listing.listing_detail.listing_images"
          :key="img.id"
          :src="url() + '/' + img.photo"
        />
      </div>
    </div>
    <div class="pt-30">
      <p>Basic information</p>
      <!-- <ul v-for="amenity in listing.amenities" :key="amenity.id">
        <li>{{ amenity.amenity.name }}</li>
      </ul> -->
    </div>
    <div class="pt-30">
      <p>Amenities</p>
      <ul
        v-for="amenity in listing.amenities"
        :key="amenity.id"
        class="amenites_list"
      >
        <li class="d-flex">
          <img src="../../assets/img/ac_unit.png" class="pr-5" />
          <p>{{ amenity.amenity.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import url from '../../url'
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
      listing: {},
      loading: false as boolean,
    }
  },
  async created() {
    // this.pageLoad = true;
    console.log(this.$route.params)
    const listing = await this.$listingsApi.single(this.$route.params.id)
    // const listing = listings.data.find(
    // (listing: any) => listing.id === this.listing_id
    // )
    console.log(listing)
    this.listing = listing.data
  },
  methods: {
    url() {
      return url()
    },
    async approveLister(listingId: string, status: string) {
      try {
        const listingResponse = await this.$listingsApi.toggle(
          '/togglestatus',
          {
            listing_id: listingId,
            status,
          }
        )

        console.log(listingResponse)
        // console.log(listingId, active)

        this.loading = false
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: listingResponse.message,
          type: 'success',
        })
      } catch (error: any) {
        console.log(error, 'error')
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: error.message,
          type: 'success',
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.listing_bar {
  width: 150px;
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
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 80%;

  max-width: 500px;

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
