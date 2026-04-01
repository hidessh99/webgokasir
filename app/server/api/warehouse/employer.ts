export interface EmployerItem {
  id: string
  name: string
  description?: string
  email: string
  phone_number?: string
  role?: string
  created_at: string
}

export interface CreateEmployerPayload {
  name: string
  email: string
  password?: string
  role?: string
  phone_number?: string
  description?: string
}

const baseUrl = 'http://localhost:3020'

export const getEmployers = async (token: string, page = 1, pageSize = 10, search = '') => {
  return await fetch(`${baseUrl}/warehouse/employer?page=${page}&page_size=${pageSize}&search=${search}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const getEmployerById = async (id: string, token: string) => {
  return await fetch(`${baseUrl}/warehouse/employer/${id}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export const createEmployer = async (payload: CreateEmployerPayload, token: string) => {
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  if (payload.password) formData.append('password', payload.password)
  if (payload.role) formData.append('role', payload.role)
  if (payload.phone_number) formData.append('phone_number', payload.phone_number)
  if (payload.description) formData.append('description', payload.description)

  return await fetch(`${baseUrl}/warehouse/employer`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

export const updateEmployer = async (id: string, payload: Partial<CreateEmployerPayload>, token: string) => {
  const formData = new FormData()
  if (payload.name) formData.append('name', payload.name)
  if (payload.email) formData.append('email', payload.email)
  if (payload.password) formData.append('password', payload.password)
  if (payload.role) formData.append('role', payload.role)
  if (payload.phone_number) formData.append('phone_number', payload.phone_number)
  if (payload.description) formData.append('description', payload.description)

  return await fetch(`${baseUrl}/warehouse/employer/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

export const deleteEmployer = async (id: string, token: string) => {
  return await fetch(`${baseUrl}/warehouse/employer/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}
