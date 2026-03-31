export interface CustomerCategoryItem {
  id: string
  name: string
  description?: string
  created_at?: string
}

export interface CreateCustomerCategoryPayload {
  name: string
  description?: string
}

/**
 * GET /public/category-customer
 * Ambil daftar kategori pelanggan
 */
export const getCustomerCategories = async (
  token: string,
  page: number = 1,
  pageSize: number = 10,
  search: string = ''
) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/public/category-customer?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /public/category-customer
 * Tambah kategori pelanggan baru
 */
export const createCustomerCategory = async (
  payload: CreateCustomerCategoryPayload,
  token: string
) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category-customer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * PUT /public/category-customer/:id
 * Perbarui kategori pelanggan
 */
export const updateCustomerCategory = async (
  id: string,
  payload: CreateCustomerCategoryPayload,
  token: string
) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category-customer/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * DELETE /public/category-customer/:id
 * Hapus kategori pelanggan
 */
export const deleteCustomerCategory = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category-customer/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
