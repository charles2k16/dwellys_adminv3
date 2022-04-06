<template>
  <div>
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
    </el-row>

    <el-card class="mt-40">
      <el-table v-loading="tableLoading" :data="vendorsData" stripe>
        <!-- <el-table-column type="expand">
            <template #default="props">
              <p>
                <b>Description:</b> Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Rerum corporis repellendus incidunt iure vitae
                magni blanditiis eaque reiciendis iusto sapiente magnam
                doloribus suscipit odit beatae, eveniet unde tenetur deleniti
                adipisci?
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
          </el-table-column> -->
        <el-table-column label="Info">
          <template slot-scope="props">
            <div class="d-flex clickable" @click="viewProfile(props.row.id)">
              <span class="mr-10">
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt="pic"
                  style="width: 40px"
                />
              </span>
              <span>
                <b style="font-weight: bold; font-size: 16px">
                  {{ props.row.name }}
                </b>
                <br />
                <small style="font-size: 12px"> {{ props.row.number }} </small>
                <br />
                <small style="font-size: 12px"> {{ props.row.email }} </small>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Country">
          <template slot-scope="scope">
            <span class="d-block">{{ scope.row.country_name }}</span>
            <small>Language: {{ scope.row.language_preference }}</small>
          </template>
        </el-table-column>
        <el-table-column label="Store">
          <template slot-scope="">
            <span class="d-block">Anita Enterprise</span>
            <small
              >Verified: <el-tag type="danger" size="mini">No</el-tag>
            </small>
          </template>
        </el-table-column>
        <el-table-column label="Joined">
          <template slot-scope="props">
            <span class="d-block">{{ props.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <el-button
              type=""
              size="mini"
              icon="el-icon-view"
              @click="viewProfile(props.row.id)"
            >
              View Store
            </el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="Edit Vendor"
              placement="top"
            >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteVendor(props.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="mt-40 center pb-10">
      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-sizes="[15, 30, 50]"
        :page-size="15"
        layout="prev, pager, next, sizes, total"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IUser } from '@/types'
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'Vendors',
  data() {
    return {
      vendorsData: [] as Array<object>,
      tableLoading: true as boolean,
      search: '' as string,
      total: 0 as number,
      currentPage: 1 as number,
    }
  },
  async fetch() {
    try {
      const vendors = await this.$usersApi.index()
      this.loadDataTable(vendors.payload)
      this.total = vendors.total
    } catch (err) {
      console.log('vendors')
    }
  },
  methods: {
    loadDataTable(vendors: Array<IUser>) {
      const self = this
      const tableData = vendors.map(function (vendor) {
        vendor.name = vendor.first_name + ' ' + vendor.last_name
        vendor.created_at = (self as any as IMixinState).getFormatedDate(
          vendor.created_at,
          'short'
        )
        vendor.country_name =
          vendor.country === null ? 'Not set' : vendor.country.country_name
        return vendor
      })
      this.vendorsData = tableData
      this.tableLoading = false
    },
    viewProfile(id: string) {
      this.$router.push({
        name: 'VendorProfile',
        params: {
          id,
        },
      })
    },
    deleteVendor(id: string) {
      this.$confirm('Are you sure to delete this veendor?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
      })
        .then(() => {
          this.$usersApi.delete(id).then(() => {
            this.$fetch()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },
  },
})
</script>
