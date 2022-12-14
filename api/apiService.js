// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
export default ($axios) => (resource) => ({
  index(query) {
    return $axios.$get(`${resource}`, query)
  },

  show(id) {
    return $axios.$get(`${resource}${id}`)
  },

  single(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },
  toggle(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload)
  },
  update(id, payload) {
    return $axios.$put(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  },
})
