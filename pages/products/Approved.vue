<template>
  <div>
    <ApplicationHandler ref="handleAction"></ApplicationHandler>

    <el-row :gutter="10" class="mb-2 mt-20">
      <el-col :sm="21" :md="21">
        <div class="d-flex">
          <el-input
            v-model="search"
            placeholder="Search prodcuts by name"
            class="search_input_width"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>

      <el-col :sm="3" :md="3">
        <el-button icon="el-icon-plus" type="primary" @click="addProduct">
          Add a Product
        </el-button>
      </el-col>
    </el-row>

    <el-card class="mt-40">
      <el-table
        v-loading="tableLoading"
        :data="products"
        stripe
        :default-sort="{ prop: 'name', order: 'descending' }"
      >
        <el-table-column type="expand">
          <template #default="props">
            <p>
              <b>Description:</b> Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Rerum corporis repellendus incidunt iure vitae
              magni blanditiis eaque reiciendis iusto sapiente magnam doloribus
              suscipit odit beatae, eveniet unde tenetur deleniti adipisci?
            </p>
            <p class="mt-20"><b>SKU: </b> <span>beverages</span></p>
            <p class="mt-20">
              <b>Has Discount:</b>
              <el-tag type="danger" size="small">
                <b> {{ props.row.has_discount }}</b>
              </el-tag>
            </p>
            <p class="mt-20">
              <b>Readty to Ship:</b>
              <el-tag type="success" size="small">
                <b> Yes</b>
              </el-tag>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            <div @click="showProduct(scope.row.id)">
              <!-- <a :href="`/products/${scope.row.id}`">{{ scope.row.name }}</a> -->
              <span class="d-block mb-5">{{ scope.row.name }}</span>
              <el-tag type="success" size="small">Alcoholic beverages</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Price">
          <template slot-scope="scope">
            <span class="d-block">GHS {{ scope.row.price }}</span>
            <small
              >Quantity: <span class="text-primary">210/pieces</span>
            </small>
          </template>
        </el-table-column>
        <el-table-column label="Vendor">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row._id)">
              <span class="mr-10">
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt="pic"
                  style="width: 40px"
                />
              </span>
              <span>
                <b style="font-weight: bold; font-size: 16px"> Enugu Agness </b>
                <br />
                <small style="font-size: 12px"> +233540571511 </small>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <el-tooltip
              class="item"
              effect="dark"
              content="Edit Product"
              placement="top"
            >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteProduct(props.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="mt-40 center pb-10">
      <el-pagination
        background
        :page-sizes="[15, 30, 50]"
        :page-size="15"
        layout="prev, pager, next, sizes, total"
        :total="0"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProductsPage',
  data() {
    return {
      tableLoading: false,
      products: [
        {
          name: 'Themra Turkish Honey Macun 240 Gr',
          description: 'Themra Turkish Honey Macun 240 Gr',
          price: '200',
          category: 'Alcoholic beverages',
          has_discount: 'No',
          user: {
            name: 'Enugu Agness',
            address: 'Enugu',
            phone: '+233540571511',
            email: 'youremail.com',
            avatar:
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          },
        },
      ] as Array<object>,
      search: '' as string,
    }
  },
  methods: {
    showProduct(id: string) {
      this.$router.push(`/products/${id}`)
    },
    viewProfile(id: string) {
      this.$router.push(`/user/profile/${id}`)
    },
    deleteProduct(id: string) {
      console.log(id)
      this.$message({
        message: 'Product Deleted',
        type: 'success',
      })
    },
    addProduct(): void {
      ;(this as any).$refs.handleAction.showAddClassModal()
    },
  },
})
</script>
