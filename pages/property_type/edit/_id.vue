<template>
  <div class="section property_upload">
    <div class="property_content_container">
      <div class="property_upload_head d-flex">
        <NuxtLink to="/property_types">
          <span
            ><i class="el-icon-back mr-20" style="font-size: 30px"></i>
          </span>
        </NuxtLink>
        <div><h3 class="pl-20 ml-20">Edit Property Type</h3></div>
      </div>
      <div class="d-flex_column pb-20 pt-10 justify_center">
        <el-card class="w-100">
          <div class="property_content">
            <div class="category w-50">
              <label for="category-name" class="pb-10">Property Name</label>
              <el-input
                id="category-name"
                v-model="property.name"
                placeholder="Apartment"
                class="pt-10 d-flex_justify_center"
              >
              </el-input>
            </div>

            <div class="category w-50">
              <label for="category-description" class="pb-10"
                >Property Description</label
              >
              <el-input
                id="category-description"
                v-model="property.description"
                class="pt-10"
                type="textarea"
                :rows="2"
                placeholder="Please input"
              >
              </el-input>
            </div>
            <div class="image_category">
              <img
                v-if="property.photo && !avatar"
                :src="property.photo"
                alt="property image"
                class="property_image"
              />
              <img v-else :src="avatar" alt="avatar" class="property_image" />

              <div class="w-50 d-flex justify_end">
                <el-upload
                  id="category-image"
                  action="#"
                  class="upload-demo mt-10"
                  :on-change="getImage"
                >
                  <el-button size="small" type="primary"
                    >Change Image</el-button
                  >
                  <!-- <div slot="tip" class="el-upload__tip">
                    jpg/png files with a size less than 5mb
                  </div> -->
                </el-upload>
              </div>
            </div>
            <section class="specs_icons">
              <h3 class="pb-10 center">Specifications</h3>
              <div class="icons_container">
                <section
                  v-for="(icon, index) in specifications"
                  :key="index"
                  :style="
                    isSpecification(icon.name)
                      ? { background: '#de0b0b', color: 'white' }
                      : ''
                  "
                  class="info_card"
                  @click="getSpecification(icon)"
                >
                  <!-- #f8fafc -->
                  <p>{{ icon.name }}</p>
                </section>
              </div>
            </section>
            <section class="specs_icons">
              <h3 class="pb-10 center">Amenities</h3>
              <div class="icons_container">
                <section
                  v-for="(icon, index) in amenities_icon"
                  :key="index"
                  :style="isAmenity(icon.name) ? 'background: red' : ''"
                  class="info_card"
                  @click="getAmenityIcon(icon)"
                >
                  <!-- {{ isAmenity(icon.name) }} -->
                  <p>
                    {{ icon.name }}
                  </p>
                </section>
              </div>
            </section>
          </div>
          <div class="property_upload_btns pt-10">
            <el-button
              type="success"
              class="btn_sm submit_register_button"
              :loading="loading"
              @click="submitChanges"
            >
              Save Changes</el-button
            >
          </div>
        </el-card>
      </div>
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
      avatar: '' as any,
      countries: [],
      iconUrl: '../assets/icons/',
      property_type_id: this.$route.params.id,
      specifications: [
        { icon: 'bed.svg', name: 'Bed room', description: 'bed rooms' },
        { icon: 'bath.svg', name: 'Bath room', description: 'bath rooms' },
        { icon: 'car.svg', name: 'Garage', description: 'garage' },
        { icon: 'armchair.svg', name: 'Chair', description: 'furniture' },
        { icon: 'kitchen.svg', name: 'Kitchen', description: 'kitchen' },
        { icon: 'dine.svg', name: 'Dining room', description: 'dining' },
        { icon: 'office.svg', name: 'Office', description: 'office' },
        {
          icon: 'armchair.svg',
          name: 'Property width',
          description: 'land width',
        },
        {
          icon: 'armchair.svg',
          name: 'Property length',
          description: 'land length',
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
          icon: 'warehouse.svg',
          name: 'Washing Machine',
          description: 'Washing Machine',
        },
        {
          icon: 'water.svg',
          name: 'Water Supply',
          description: 'water supply',
        },
        {
          icon: 'storage.svg',
          name: 'Water Storage',
          description: 'water storage',
        },
        {
          icon: 'ceiling.svg',
          name: 'Pop Ceiling',
          description: 'pop ceiling',
        },
        {
          icon: 'floor.svg',
          name: 'Tiled Floor',
          description: 'tiled floor',
        },
        {
          icon: 'wardrobe.svg',
          name: 'Wardrobe',
          description: 'wardrobe',
        },
        {
          icon: 'dish.svg',
          name: 'Dishwasher',
          description: 'dish washer',
        },
        {
          icon: 'light.svg',
          name: 'Chandeller',
          description: 'chandeller',
        },
        {
          icon: 'tv.svg',
          name: 'TV',
          description: 'television',
        },
      ],
      listing_photos: [] as any,
      property: {} as any,
      // specifications: {
      //   property_type_id: '' as string,
      //   specifications: [] as Array<object>,
      // },
      amenities: {
        property_type_id: '' as string,
        amenities: [] as Array<object>,
      },
    }
  },

  computed: {},
  async created() {
    // this.pageLoad = true;
    const property = await this.$propertyApi.single(this.property_type_id)

    this.property = property.data
    console.log(this.property)
  },
  methods: {
    isSpecification(iconSpec: any) {
      const propSpecs = Object.assign([], this.property.specifications)
      const filtered = propSpecs.find((spec: any) => spec.name === iconSpec)
      return filtered
    },
    isAmenity(iconSpec: any) {
      const propSpecs = Object.assign([], this.property.amenities)
      const filtered = propSpecs.find((spec: any) => spec.name === iconSpec)

      return filtered
    },
    getSpecification(icon: any) {
      const mainSpec = Object.assign([], this.property.specifications)

      this.property.specifications.find((spec: any) => spec.name === icon.name)
        ? this.property.specifications.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.property.specifications.push(icon)

      console.log(this.property.specifications)
    },
    getAmenityIcon(icon: any) {
      const mainSpec = Object.assign([], this.property.amenities)

      mainSpec.find((spec: any) => spec.name === icon.name)
        ? this.property.amenities.splice(
            mainSpec.findIndex((spec: any) => spec.name === icon.name),
            1
          )
        : this.property.amenities.push(icon)
    },
    getImage(file: any) {
      // this.avatar = file
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onloadend = () => {
        this.avatar = reader.result
        this.property.photo = reader.result
      }
    },
    async submitChanges() {
      // console.log(this.property)
      this.loading = true
      const specifications = this.property.specifications.map(
        (specification: any) => {
          return {
            ...specification,
            id: specification.id ? specification.id : '',
          }
        }
      )

      const amenities = this.property.amenities.map((amenity: any) => {
        return {
          ...amenity,
          id: amenity.id ? amenity.id : '',
        }
      })
      console.log(amenities)

      try {
        const propertyResponse = await this.$propertyApi.update(
          this.property_type_id,
          {
            amenities,
            specifications,
            photo: this.avatar ? this.avatar : null,
            name: this.property.name,
            id: this.property.id,
            description: this.property.description,
          }
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
        console.log(error?.response?.data, 'error')
        ;(this as any as IMixinState).catchError(error?.response?.data?.message)
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
        .property_image {
          width: 100%;
          max-width: 400px;
          height: 200px;
        }
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
    width: 80%;
    margin: 20px auto;
    .icons_container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
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
