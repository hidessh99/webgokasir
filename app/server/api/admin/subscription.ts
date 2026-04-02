export interface SubscriptionItem {
  id: string
  tenant_id: string
  plan_name: string
  start_date: string
  end_date: string
  company_name: string
  email: string
  name: string
  role: string
  status: string
  created_at: string
}

/**
 * GET /admin/subscription
 * Ambil daftar semua langganan
 */
export const getSubscriptions = async (token: string, page: number = 1, pageSize: number = 10, search: string = '') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('page_size', pageSize.toString())
  if (search) {
    params.append('search', search)
  }

  return await fetch(`${baseUrl}/admin/subscription?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}

/**
 * DELETE /admin/subscription/:id
 * Batalkan/Hapus langganan (Jika didukung oleh API)
 */
export const deleteSubscription = async (id: string, token: string) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/admin/subscription/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
