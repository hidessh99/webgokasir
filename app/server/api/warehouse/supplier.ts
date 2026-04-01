export interface CreateSupplierPayload {
  name: string
  phone_number?: string
  email?: string
  address?: string
  note?: string
}

export interface SupplierItem {
  id: string
  name: string
  phone_number: string
  email: string
  address: string
  note: string
  created_at: string
}

/**
 * GET /warehouse/supplier
 * Ambil daftar semua supplier
 */
export const getSuppliers = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/warehouse/supplier?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * GET /warehouse/supplier/:id
 * Ambil detail satu supplier berdasarkan ID
 */
export const getSupplierById = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/warehouse/supplier/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * POST /warehouse/supplier
 * Tambah supplier baru
 */
export const createSupplier = async (payload: CreateSupplierPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/warehouse/supplier`, {
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
 * PUT /warehouse/supplier/:id
 * Perbarui data supplier
 */
export const updateSupplier = async (id: string, payload: Partial<CreateSupplierPayload>, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/warehouse/supplier/${id}`, {
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
 * DELETE /warehouse/supplier/:id
 * Hapus supplier
 */
export const deleteSupplier = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/warehouse/supplier/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
