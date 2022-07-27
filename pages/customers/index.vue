<template>
  <div>
    <el-drawer
      title="User account information"
      :visible.sync="drawer"
      size="35%"
    >
      <div class="px-30 user_details">
        <div class="d-flex">
          <img src="../../assets/img/profile.jpg" class="profile_img" />
          <div class="pl-20 pt-20">
            <el-button type="info">Reject profile photo</el-button>
            <p class="pt-10">
              A profile image can be reject if the image is not clear enough or
              the face is covered or an inanimate object is used
            </p>
          </div>
        </div>
        <div class="pt-20 w-70">
          <div class="d-flex justify_between pb-10">
            <section>
              <p class="pb-10">First name</p>
              <p><b>Abena</b></p>
            </section>
            <section class="pl-30">
              <p class="pb-10">Last name</p>
              <p><b>Dansoh</b></p>
            </section>
          </div>
          <section class="pt-10">
            <p class="pb-10">DOB</p>
            <p><b>January, 24, 1998</b></p>
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pt-5 pb-10 d-flex justify_between">
          <section>
            <p class="pb-10">Email address</p>
            <p><b>Abenadansoh12@gmail.com</b></p>
          </section>
          <section class="pl-30 pr-10">
            <p class="pb-10">Phone</p>
            <p><b>+233 20 123 4567</b></p>
          </section>
        </div>
        <el-divider></el-divider>
        <div class="pb-10">
          <section class="pb-20">
            <p class="pb-10">ID type</p>
            <p><b>Drivers license</b></p>
          </section>
          <p><span>Image of ID</span></p>
          <img
            src="../../assets/img/profile.jpg"
            class="identification_card pb-10"
          />
          <div class="d-flex pt-30 pb-30">
            <el-button type="success" class="w-50"
              ><i class="el-icon-check pr-10"></i>Approve</el-button
            >

            <el-button type="info" class="w-50"
              ><i class="el-icon-close pr-10"></i>Disapprove</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
    <el-card class="mt-20">
      <el-card class="mt-20">
        <el-table
          v-loading="tableLoading"
          :data="products"
          stripe
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column label="Name">
            <template slot-scope="scope">
              <div class="d-flex" @click="viewProfile(scope.row)">
                <!-- <a :href="`/products/${scope.row.id}`">{{ scope.row.name }}</a> -->
                <span class="mr-10">
                  <img
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                    alt="pic"
                    style="width: 40px"
                  />
                </span>
                <span class="d-block mb-5">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Email address">
            <template slot-scope="scope">
              <span class="d-block">GHS {{ scope.row.price }}</span>
              <small
                >Quantity: <span class="text-primary">210/pieces</span>
              </small>
            </template>
          </el-table-column>
          <el-table-column label="Phone Number">
            <template slot-scope="props">
              <div class="d-flex clickable" @click="viewProfile(props.row)">
                <span>
                  <b style="font-weight: bold; font-size: 16px">
                    Enugu Agness
                  </b>
                  <br />
                  <small style="font-size: 12px"> +233540571511 </small>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Status">
            <template slot-scope="props">
              <div class="d-flex clickable" @click="viewProfile(props.row)">
                <el-tag type="success" size="small">Pending</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="props">
              <!-- <el-tooltip
                class="item"
                effect="dark"
                content="Edit Product"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </el-tooltip>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteProduct(props.row.id)"
              ></el-button> -->
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"> </i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item style="color: red" @click="props.row"
                    >Delete</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
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
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProductsSubmitted',
  data() {
    return {
      activeTab: 'pendingReview',
      pendingTab: 'Pending Products',
      pendingTotal: 0,
      drawer: false,
      tableLoading: false,
      products: [
        {
          name: 'Themra Turkish',
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
        {
          name: 'Themra Turkish',
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
    viewProfile(profile: any) {
      this.drawer = true
      console.log(profile)
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
<style lang="scss" scoped>
.user_details {
  overflow-y: scroll;
  p {
    font-size: 16px;
    font-weight: 400;
  }
  .profile_img {
    width: 40%;
    border-radius: 50%;
    height: 160px;
  }
  .identification_card {
    width: 100%;
    height: 200px;
    border-radius: 16.4815px;
  }
}
</style>
