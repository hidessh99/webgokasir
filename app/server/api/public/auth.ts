export const userRegister = async ({ email, password, name, phone_number }: { email: string, password: string, name: string, phone_number: string }) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      phone_number,
    }),
  })
}

export const userLogin = async ({ email, password }: { email: string, password: string }) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  return await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
}
