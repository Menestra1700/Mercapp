import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url, options = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error(`Error ${response.status}`)
      const data = await response.json()
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchData }
}