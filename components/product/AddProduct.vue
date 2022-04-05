<template>
  <div>
    <el-form ref="productDetails" :model="productDetails" label-position="top">
      <el-tabs v-model="activeTab" class="mt-4 px-2" stretch type="border-card">
        <el-tab-pane name="details">
          <span slot="label"
            ><i class="el-icon-document-copy mr-5"></i> Product Details</span
          >

          <el-form-item prop="name">
            <el-input
              v-model="productDetails.name"
              maxlength="30"
              placeholder="Product Name (Soya Beans)"
            />
          </el-form-item>

          <el-form-item prop="description">
            <el-input
              v-model="productDetails.description"
              type="textarea"
              rows="4"
              placeholder="Product Description"
            />
          </el-form-item>

          <el-form-item prop="category" class="mt-20">
            <el-select
              v-model="productDetails.category"
              multiple
              placeholder="Select Category"
              class="full_width mr-30"
            >
              <el-option
                v-for="(category, index) in classCategories"
                :key="index"
                :label="category.name"
                :value="category._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="tags" label="Keywords">
            <!-- <span>Press enter to add search keywords</span> -->
            <el-select
              v-model="productDetails.tags"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="Choose keywords for your product"
              class="full_width"
            >
              <el-option
                v-for="item in tagOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="brand">
            <span slot="label">
              Brand
              <el-tooltip
                class="item"
                effect="dark"
                content="Brand name can be your company and/or your product name"
                placement="right"
              >
                <i class="el-icon-info"></i>
              </el-tooltip>
            </span>
            <el-input v-model="productDetails.description" type="text" />
          </el-form-item>

          <div class="mt-30">
            <label>Additional Information</label> <small>(Optional)</small>
            <div
              v-for="(additional_info, index) in additional_infos"
              :key="index"
              class="d-flex justify_between mt-10"
            >
              <div class="d-flex" style="width: 85%">
                <el-input
                  v-model="additional_info.name"
                  type="text"
                  placeholder="Power"
                  class="mr-20"
                  style="width: 300px"
                />
                <el-input
                  v-model="additional_info.value"
                  type="text"
                  placeholder="12 volts, charges fast"
                />
              </div>

              <div>
                <el-button
                  v-if="index > 0"
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  @click="deleteAdditionalInfo(index)"
                ></el-button>

                <el-button
                  v-if="index === additional_infos.length - 1"
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  @click="addAdditionalInfo"
                ></el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- Inventory Info -->
        <el-tab-pane name="inventory">
          <span slot="label"><i class="el-icon-timer"></i> Inventory</span>

          <el-row :gutter="20">
            <el-col :md="19" :xs="24" :sm="24">
              <el-form-item prop="sku">
                <label>SKU</label>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Unique stock keeping unit for the product"
                  placement="right"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
                <el-input v-model="productDetails.sku" type="text" />
              </el-form-item>
            </el-col>

            <el-col :md="5" :xs="24" :sm="24">
              <el-form-item prop="stock_level" label="Stock Quantity">
                <el-input-number
                  v-model="productDetails.stock_level"
                  class="default_input"
                  controls-position="right"
                  :min="1"
                  :max="100"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="mt-30">
            <el-col :md="24" :xs="24" :sm="24">
              <el-descriptions direction="vertical" size="medium" border>
                <label slot="title">Pricing</label>
                <!-- create a title slot -->
                <el-descriptions-item label="Unit of Measure">
                  <el-select
                    v-model="productDetails.units_of_measure"
                    placeholder="carton"
                  >
                    <el-option
                      v-for="(unit, index) in unitsMeasurement"
                      :key="index"
                      :label="unit"
                      :value="unit"
                    ></el-option>
                  </el-select>
                </el-descriptions-item>

                <el-descriptions-item label="Minimum Order Quantity">
                  <el-input-number
                    v-model="productDetails.min_order"
                    class="default_input"
                    controls-position="right"
                    :min="1"
                    :max="50"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="Unit Price">
                  <el-input
                    v-model="productDetails.price"
                    type="number"
                    placeholder="0.00"
                  >
                    <template slot="prepend">GHS</template>
                  </el-input>
                </el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>

          <el-row :gutter="30" class="mt-30">
            <el-col :md="12" :xs="24" :sm="24">
              <el-form-item label="Ready to Ship" prop="ready_to_ship">
                <el-radio-group v-model="productDetails.ready_to_ship">
                  <el-radio-button :label="true">Yes</el-radio-button>
                  <el-radio-button :label="false">No</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :md="12" :xs="24" :sm="24">
              <el-form-item label="Has Discount" prop="has_discount">
                <el-radio-group v-model="productDetails.has_discount">
                  <el-radio-button :label="true">Yes</el-radio-button>
                  <el-radio-button :label="false">No</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- Assets Info -->
        <el-tab-pane name="schedule">
          <span slot="label"><i class="el-icon-timer"></i> Product Assets</span>

          <!-- class images -->
          <el-row :gutter="10" class="mt-20">
            <el-col :md="24" :xs="24" :sm="24">
              <label class="mb-10 d-block">Product Images</label>
              <ImageUpload />
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddClasses',
  data() {
    return {
      productDetails: {
        name: '',
        description: '',
        capacity: 0,
        level: '',
        ready_to_ship: false,
        singlePrice: false,
        has_discount: false,
        stock_level: 1,
        min_order: 1,
        units_of_measure: '',
        category: [],
        tags: [],
        facility: '',
        trainers: [],
        images: [''],
      },
      additional_infos: [{ name: '', value: '' }],
      categories: [] as Array<object>,
      activeTab: 'details',
      tagOptions: ['food'],
      unitsMeasurement: [
        'Piece',
        'carton',
        'packet',
        'box',
        'kg',
        'g',
        'l',
        'ml',
        'oz',
        'lb',
        'fl oz',
        'cup',
        'pint',
        'quart',
        'gallon',
      ],
      queryParams: {
        page: 1 as number,
        limit: 20 as number,
      },
    }
  },
  methods: {
    deleteAdditionalInfo(index: number) {
      this.additional_infos.splice(index, 1)
    },
    addAdditionalInfo() {
      this.additional_infos.push({ name: '', value: '' })
    },
  },
})
</script>
