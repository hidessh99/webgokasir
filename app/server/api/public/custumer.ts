export interface CreateCustomerPayload {
  name: string
  phone_number: string
  email?: string
  address?: string
  note?: string
  category_customer_id?: string
}

export interface CustomerItem {
  id: string | number
  name: string
  phone_number: string
  email?: string
  address?: string
  note?: string
  category_customer_id?: string
  category?: {
    id: string
    name: string
  }
  created_at?: string
  updated_at?: string
}

/**
 * POST /public/customer
 * Tambah pelanggan baru
 */
export const createCustomer = async (payload: CreateCustomerPayload, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/customer`, {
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
 * GET /public/customer
 * Ambil daftar semua pelanggan
 */
export const getCustomers = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/public/customer?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * GET /public/customer/:id
 * Ambil detail satu pelanggan berdasarkan ID
 */
export const getCustomerById = async (id: string | number, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/customer/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * PUT /public/customer/:id
 * Perbarui data pelanggan
 */
export const updateCustomer = async (id: string | number, payload: Partial<CreateCustomerPayload>, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/customer/${id}`, {
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
 * DELETE /public/customer/:id
 * Hapus pelanggan
 */
export const deleteCustomer = async (id: string | number, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/public/customer/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
