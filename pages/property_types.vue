<template>
  <div>
    <el-card class="">
      <div class="lister_header">
        <div class="d-flex"></div>
        <div class="d-flex justify_end mt-10 ml-10">
          <el-input
            v-model="search"
            class="ml-10"
            placeholder="Type something"
            prefix-icon="el-icon-search"
          >
          </el-input>
          <NuxtLink to="/create_property_type"
            ><el-button type="danger"
              ><i class="el-icon-plus mr-10"></i>Add Property Type</el-button
            ></NuxtLink
          >
        </div>
      </div>
    </el-card>
    <el-card class="mt-20">
      <el-card class="mt-20">
        <el-table
          v-loading="properties.length < 1"
          :data="properties"
          stripe
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <!-- <el-table-column label="Property Type Image">
            <template slot-scope="scope">
              <div class="d-flex">
                <span class="mr-10">
                  <img
                    v-if="scope.row.photo"
                    :src="url + scope.row.photo"
                    alt="pic"
                    class="profile_avatar"
                  />
                  <img
                    v-else
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                    alt="pic"
                    style="width: 40px"
                  />
                </span>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column label="Property Type Name">
            <template slot-scope="scope">
              <div class="d-flex">
                <span>
                  <img
                    v-if="scope.row.photo"
                    :src="apiUrl + '/' + scope.row.photo"
                    alt="pic"
                    class="profile_avatar"
                  />
                  <img
                    v-else
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                    alt="pic"
                    style="width: 40px"
                  />
                </span>
                <span class="d-block pl-10 mt-10">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Property Type Lister">
            <template slot-scope="scope">
              <div class="d-flex">
                <!-- <a :href="`/products/${scope.row.id}`">{{ scope.row.name }}</a> -->
                <span class="d-block mt-10"
                  >{{ scope.row.creator.first_name }}
                  {{ scope.row.creator.last_name }}</span
                >
              </div>
            </template>
          </el-table-column>

          <el-table-column label="Last Updated">
            <template slot-scope="scope">
              <span
                >{{ $moment(scope.row.updated_at).format('MMM DD, YY') }}
              </span>
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
                  <el-dropdown-item
                    ><NuxtLink :to="`/property_type/details/${props.row.id}`"
                      ><p class="p-10">Details</p></NuxtLink
                    ></el-dropdown-item
                  >
                  <el-dropdown-item @click="props.row">
                    <NuxtLink :to="`/property_type/edit/${props.row.id}`"
                      ><p class="p-10">Edit</p></NuxtLink
                    ></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><p
                      style="color: red"
                      class="p-10"
                      @click="open(props.row.id)"
                    >
                      Delete
                    </p></el-dropdown-item
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
import { IMixinState } from '@/types/mixinsTypes'

export default Vue.extend({
  name: 'PropertyTypes',

  data() {
    return {
      tableLoading: false,
      profile: {},
      search: '' as string,
      properties: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
        this.fetchData()
      } catch (error) {
        console.log(error, 'error')
        ;(this as any as IMixinState).catchError(error)
      }
    },
    viewProfile(profile: any) {
      this.profile = profile
      console.log(profile)
    },
    toDetails(id: string) {
      console.log(id, 'id')
      this.$router.push(`/property_type/details/${id}`)
    },
    async fetchData() {
      const listings = await this.$propertyApi.index()
      console.log(listings)
      this.properties = listings.data
      console.log(listings.data)
    },
  },
})
</script>
<style lang="scss" scoped>
.profile_avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user_details {
  overflow-y: scroll;
  p {
    font-size: 16px;
    font-weight: 400;
  }
  .profile_img {
    width: 42%;
    border-radius: 50%;
    height: 150px;
  }
  .identification_card {
    width: 100%;
    height: 200px;
    border-radius: 16.4815px;
  }
  .verified {
    color: rgb(34, 197, 94);
    font-size: 18px;
    i {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
