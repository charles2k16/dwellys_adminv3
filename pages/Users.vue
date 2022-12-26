<template>
  <div>
    <el-card class="">
      <div class="users_header">
        <div class="d-flex">
          <h4 class="mr-20 pt-8">Users account</h4>
          <NuxtLink to="/users" class="ml-20 mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/users' ? 'primary' : ''"
              >All</el-button
            >
          </NuxtLink>
          <NuxtLink to="/users/verified" class="mr-10">
            <el-button
              size="mini"
              round
              :type="$route.path == '/users/verified' ? 'primary' : ''"
              >Verified</el-button
            >
          </NuxtLink>
          <NuxtLink to="/users/unverified">
            <el-button
              size="mini"
              round
              :type="$route.path == '/users/unverified' ? 'primary' : ''"
              >Unverified</el-button
            >
          </NuxtLink>
        </div>
        <div class="d-flex search_filter">
          <div class="d-flex ml-10">
            <el-select
              v-model="value"
              filterable
              placeholder="Filter"
              class="select_filter"
            >
              <template slot="prefix"
                ><i class="el-icon-cold-drink mt-10"></i
              ></template>
              <el-option
                v-for="item in users"
                :key="item.id"
                :label="item.first_name"
                :value="item.first_name"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-input
              v-model="value"
              class="ml-10 mr-10"
              placeholder="Type something"
              prefix-icon="el-icon-search"
            >
            </el-input>
          </div>
          <NuxtLink to="/add-user">
            <el-button type="danger"
              ><i class="el-icon-plus mr-10"></i>Add new user</el-button
            ></NuxtLink
          >
        </div>
      </div>
    </el-card>

    <NuxtChild
      :users="users"
      :verifiedusers="verifiedUsers"
      :usersPagination="usersPagination"
      :unverifiedusers="unverifiedUsers"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'UsersPage',
  middleware: 'auth',
  data() {
    return {
      users: [],
      verifiedUsers: [],
      unverifiedUsers: [],
      value: '',
      usersPagination: {},
    }
  },
  async created() {
    const users = await this.$usersApi.show('staff')
    console.log(users, 'users')

    this.users = users.data

    this.verifiedUsers = users.data.filter(
      (user: any) => user.status === 'active'
    )
    this.unverifiedUsers = users.data.filter(
      (user: any) => user.status !== 'active'
    )
    this.usersPagination = users.pagination
  },
  methods: {
    addProduct(): void {
      ;(this as any).$refs.handleAction.showAddClassModal()
    },
  },
})
</script>
<style>
.users_header {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 1024px) {
  .users_header {
    display: flex;
    flex-direction: column;
  }
  .search_filter {
    padding-top: 10px;
    /* justify-content: space-between; */
  }
}
</style>
