<template>
  <div class="section property_upload">
    <el-drawer title="Add new Specifications" :visible.sync="drawer" size="35%">
      <div class="px-30 user_details">
        <section class="">
          <section class="specs_icons">
            <h3 class="pb-10 center">Specifications</h3>
            <div class="icons_container">
              <section
                v-for="(specification, index) in specifications"
                :key="index"
                :style="
                  propertyUpload.specifications.includes(specification)
                    ? { background: '#81f78166' }
                    : { background: '#fff' }
                "
                class="info_card"
                @click="getIcon(specification)"
              >
                <p>{{ specification.name }}</p>
              </section>
            </div>
          </section>
        </section>
        <el-divider></el-divider>
        <div class="pb-10">
          <div class="d-flex justify_center pt-30 pb-30">
            <el-button
              type="primary"
              class=""
              :loading="spec_loader"
              @click="showAmenities"
              ><i class="el-icon-check pr-10"></i>Add Amenities</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      title="Add new Amenities"
      :visible.sync="amenity_drawer"
      size="35%"
    >
      <div class="px-30 user_details">
        <div class="">
          <section class="specs_icons">
            <h3 class="pb-10 center">Amenities</h3>
            <div class="icons_container">
              <section
                v-for="(amenity, index) in amenities_icon"
                :key="index"
                :style="
                  propertyUpload.amenities.includes(amenity)
                    ? { background: '#81f78166' }
                    : ''
                "
                class="info_card"
                @click="getAmenityIcon(amenity)"
              >
                <p>
                  {{ amenity.name }}
                  <!-- <i
                    v-if="isAmenity(icon.name)"
                    class="el-icon-check pr-10"
                  ></i> -->
                </p>
              </section>
            </div>
            <!-- <el-upload
                id="category-image"
                class="upload-demo"
                drag
                :on-change="getImage"
                action="#"
                :multiple="false"
                :auto-upload="false"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div> -->
            <!-- </el-upload> -->
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pb-10">
          <div class="d-flex justify_end pt-30 pb-30">
            <el-button
              type="primary"
              class="w-50"
              :loading="loading"
              @click="submitUpload"
              ><i class="el-icon-check pr-10"></i>Submit</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
    <div>
      <div class="center">
        <div class="property_upload_head">
          <h3>Create Property Type</h3>
        </div>
      </div>
      <div class="property_content_container">
        <div class="d-flex_column pb-20 pt-10 justify_center">
          <el-card class="w-100">
            <div class="property_content">
              <div class="category w-50">
                <label for="category-name" class="pb-10">Property Type</label>
                <el-input
                  id="category-name"
                  v-model="propertyUpload.name"
                  placeholder="E.g Apartment"
                  class="pt-10 d-flex_justify_center"
                >
                </el-input>
              </div>

              <div class="category w-50">
                <label for="category-description" class="pb-10"
                  >Property Type Description</label
                >
                <el-input
                  id="category-description"
                  v-model="propertyUpload.description"
                  class="pt-10"
                  type="textarea"
                  :rows="2"
                  placeholder="Enter description"
                >
                </el-input>
              </div>
              <div class="image_category">
                <label for="category-image" class="pb-10"
                  >Property Type Image</label
                >
                <el-upload
                  id="category-image"
                  class="upload-demo"
                  drag
                  :on-change="getImage"
                  action="#"
                  :multiple="false"
                  :auto-upload="false"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                </el-upload>
                <div>
                  <img src="" />
                </div>
              </div>
            </div>
            <div class="property_upload_btns pt-10">
              <el-button
                type="primary"
                class="btn_sm submit_register_button"
                :disabled="!propertyValidation"
                @click="drawer = true"
              >
                Add Specifications</el-button
              >
            </div>
          </el-card>
        </div>
      </div>
      <hr class="hr_rule" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'AccountPage',

  data() {
    return {
      loading: false as boolean,
      spec_loader: false as boolean,
      amenity_loader: false as boolean,
      amenity_drawer: false as boolean,
      countries: [],
      iconUrl: '../assets/icons/',
      specifications: [
        { icon: 'bed.svg', name: 'Bed room', description: 'bed rooms' },
        { icon: 'bath.svg', name: 'Bath room', description: 'bath rooms' },
        { icon: 'car.svg', name: 'Garage', description: 'garage' },
        { icon: 'armchair.svg', name: 'Chair', description: 'furniture' },
        { icon: 'armchair.svg', name: 'Kitchen', description: 'kitchen' },
        { icon: 'armchair.svg', name: 'Dining room', description: 'dining' },
        { icon: 'armchair.svg', name: 'Office', description: 'office' },
        {
          icon: 'armchair.svg',
          name: 'Property width',
          description: 'land width',
        },
        {
          icon: 'armchair.svg',
          name: 'Property length',
          description: 'land height',
        },
      ],

      amenities_icon: [
        { icon: 'propeller.svg', name: 'Fan', description: 'Fan' },
        { icon: 'propeller.svg', name: 'Water Heater', description: 'heater' },
        {
          icon: 'swimming.svg',
          name: 'Swimming Pool',
          description: 'swimming pool',
        },
        {
          icon: 'growth.svg',
          name: 'Refrigerator',
          description: 'refrigerator',
        },
        {
          icon: 'growth.svg',
          name: 'Pre-Paid Meter',
          description: 'meter',
        },
        {
          icon: 'growth.svg',
          name: 'Trash Compactor',
          description: 'trash compactor',
        },
        { icon: 'growth.svg', name: 'Garden', description: 'Garden' },
        {
          icon: 'browser.svg',
          name: 'Internet',
          description: 'Internet connectivity',
        },
        { icon: 'plug.svg', name: 'Generator', description: 'Generator' },
        { icon: 'plug.svg', name: 'Electricity', description: 'electricity' },
        {
          icon: 'plug.svg',
          name: 'Air Condition',
          description: 'air condition',
        },
        {
          icon: 'plug.svg',
          name: 'Parking',
          description: 'parking',
        },
        { icon: 'plug.svg', name: 'Solar Panel', description: 'solar' },
        {
          icon: 'building-warehouse.svg',
          name: 'Washing Machine',
          description: 'Washing Machine',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Water Supply',
          description: 'water supply',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Water Storage',
          description: 'water storage',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Tiled Floor',
          description: 'tiled floor',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Wardrobe',
          description: 'wardrobe',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Dishwasher',
          description: 'dish washer',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Chandeller',
          description: 'chandeller',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'TV',
          description: 'television',
        },
        {
          svg: 'building-warehouse.svg',
          name: 'Pop Ceiling',
          description: 'pop ceiling',
        },
      ],
      listing_photos: [] as any,
      propertyUpload: {
        name: '' as string,
        description: '' as string,
        photo: '' as any,
        specifications: [] as Array<object>,
        amenities: [] as Array<object>,
      },
      drawer: false,
      profile: {},
      // specifications: {
      //   property_type_id: '' as string,
      //  ,
      // },
      // amenities: {
      //   property_type_id: '' as string,
      //  ,
      // },
    }
  },

  computed: {
    propertyValidation() {
      let valid = false
      if (
        this.propertyUpload.name !== '' &&
        this.propertyUpload.description !== ''
      ) {
        valid = true
      }
      return valid
    },
  },
  methods: {
    isSelected(iconSpec: any) {
      // let isIcon = false;
      const filtered = this.propertyUpload.specifications.find(
        (spec: any) => spec.name === iconSpec
      )
      return filtered
    },
    isAmenity(iconSpec: any) {
      // let isIcon = false;
      const filtered = this.propertyUpload.amenities.find(
        (spec: any) => spec.name === iconSpec
      )
      return filtered
    },
    showAmenities() {
      this.drawer = false
      this.amenity_drawer = true
    },
    getIcon(icon: any) {
      const mainSpec = Object.assign([], this.propertyUpload.specifications)

      this.propertyUpload.specifications.find(
        (spec: any) => spec.name === icon.name
      )
        ? this.propertyUpload.specifications.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.propertyUpload.specifications.push(icon)

      console.log(this.propertyUpload.specifications)
    },
    getAmenityIcon(icon: any) {
      const mainSpec = Object.assign([], this.propertyUpload.amenities)

      this.propertyUpload.amenities.find((spec: any) => spec.name === icon.name)
        ? this.propertyUpload.amenities.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.propertyUpload.amenities.push(icon)

      console.log(this.propertyUpload.amenities)
    },
    toggleUpload(event: any) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => {
        // reader.result;
        const img = { tag: 'front', is_featured: false, photo: reader.result }
        this.listing_photos.push(img)
      }
    },
    getImage(file: any) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onloadend = () => {
        this.propertyUpload.photo = reader.result
      }
    },
    async submitUpload() {
      console.log(this.propertyUpload)
      this.loading = true
      try {
        const propertyResponse = await this.$propertyApi.create(
          this.propertyUpload
        )
        console.log(propertyResponse)
        this.loading = false
        ;(this as any as IMixinState).$message({
          showClose: true,
          message: propertyResponse.message,
          type: 'success',
        })
        this.$router.replace('/property_types')
      } catch (error: any) {
        this.loading = false
        if (error?.response) {
          console.log(error?.response)
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: error?.response?.data?.message,
            type: 'error',
          })
        } else {
          console.log(error, 'error')
          ;(this as any as IMixinState).$message({
            showClose: true,
            message: 'Check your network connectivity',
            type: 'error',
          })
          // ;(this as any as IMixinState).catchError(error)
        }
      }
    },
  },
})
</script>

<style lang="scss">
$small_screen: 426px;
$medium_screen: 769px;

.property_upload {
  //   margin: 0 auto;
  // background: #81f78166;
  .property_upload_head {
    padding-bottom: 20px;
    h3 {
      font-size: 20px;
      padding-bottom: 5px;
      line-height: 27px;

      @media (max-width: $small_screen) {
        text-align: left;
      }
    }
    small {
      font-size: 14px;
      line-height: 20px;
      color: #64748b;
    }
  }
  .property_content_container {
    padding-top: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media (max-width: $small_screen) {
      width: 100%;
      margin: 0;
    }
    .property_content {
      min-height: 420px;
      width: 100%;
      margin: 0 auto;
      .category {
        widows: 70%;
        margin: 0 auto;
        padding: 20px 0;
      }
      .image_category {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
      }
    }
  }
  .property_upload_btns {
    width: 100%;
    // margin: 0 auto;
    padding-top: 30px;
    display: flex;
    justify-content: flex-end;
    @media (max-width: $small_screen) {
      width: 100%;
      margin: 0;
      padding-bottom: 20px;
    }
  }
  .specs_icons {
    width: 100%;
    .icons_container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .info_card {
        // background: #f8fafc;
        background: #fcfcfc;
        padding: 5px 10px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        margin: 10px 10px;
        display: flex;

        p {
          font-size: 13px;
        }
        .icon {
          //   font-size: 22px;
          color: grey !important;
        }
      }
    }
  }
}
</style>
