export interface CreateCategoryPayload {
  name: string
  description?: string
}

export interface CategoryItem {
  id: string | number
  public_id?: string
  auth_id?: string
  name: string
  description?: string
  created_at?: string
  updated_at?: string
}

/**
 * POST /public/category
 * Tambah kategori baru
 */
export const createCategory = async (payload: CreateCategoryPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category`, {
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
 * GET /public/category
 * Ambil daftar semua kategori
 */
export const getCategories = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/public/category?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * GET /public/category/:id
 * Ambil detail satu kategori berdasarkan ID
 */
export const getCategoryById = async (id: string | number, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * PUT /public/category/:id
 * Perbarui data kategori
 */
export const updateCategory = async (id: string | number, payload: Partial<CreateCategoryPayload>, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category/${id}`, {
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
 * DELETE /public/category/:id
 * Hapus kategori
 */
export const deleteCategory = async (id: string | number, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
