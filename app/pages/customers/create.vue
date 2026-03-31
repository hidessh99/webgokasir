<template>
  <!-- Outer: full height, centered both axes -->
  <div class="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:py-12">

    <!-- Card wrapper — full width on mobile, max-md on larger -->
    <div class="w-full max-w-md">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-1.5 text-xs mb-4">
        <NuxtLink
          to="/customers"
          class="text-zinc-500 hover:text-zinc-300 dark:text-zinc-500 dark:hover:text-zinc-300
                 text-zinc-600 hover:text-zinc-800 transition-colors"
        >
          Mitra & Pelanggan
        </NuxtLink>
        <ChevronRight class="w-3 h-3 text-zinc-500 dark:text-zinc-600 shrink-0" />
        <span class="text-zinc-300 dark:text-zinc-300 text-zinc-700 font-medium">Tambah Pelanggan Baru</span>
      </div>

      <!-- Card -->
      <div
        class="rounded-2xl overflow-hidden shadow-xl ring-1
               bg-white ring-gray-200
               dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <!-- Card Header -->
        <div
          class="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4 border-b
                 border-gray-100 dark:border-zinc-800"
        >
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
              <UserPlus class="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 class="text-sm sm:text-[15px] font-semibold
                         text-gray-900 dark:text-white leading-tight">
                Tambah Pelanggan Baru
              </h1>
              <p class="text-[11px] mt-0.5
                        text-gray-500 dark:text-zinc-500 leading-tight">
                Isi data pelanggan dengan lengkap
              </p>
            </div>
          </div>

        </div>

        <!-- Form Body -->
        <form class="px-5 sm:px-6 py-5 space-y-4" @submit.prevent="handleSubmit">

          <!-- Nama Pelanggan -->
          <div class="space-y-1.5">
            <label class="block text-[12px] sm:text-[13px] font-medium
                          text-gray-700 dark:text-zinc-300">
              Nama Pelanggan <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="cth: Budi Santoso"
              required
              class="w-full h-10 px-3.5 text-sm rounded-lg border outline-none
                     transition-all duration-150
                     bg-white border-gray-200 text-gray-800 placeholder:text-gray-400
                     focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500
                     dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500
                     dark:focus:ring-blue-500/20 dark:focus:border-blue-500"
            />
          </div>

          <!-- No. Telepon & Email — stack on mobile, side-by-side on sm+ -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label class="block text-[12px] sm:text-[13px] font-medium
                            text-gray-700 dark:text-zinc-300">
                No. Telepon
              </label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="628123456789"
                inputmode="numeric"
                @input="onPhoneInput"
                :class="[
                  'w-full h-10 px-3.5 text-sm rounded-lg border outline-none transition-all duration-150',
                  'bg-white text-gray-800 placeholder:text-gray-400',
                  'dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500',
                  phoneError
                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/25 focus:border-red-400 dark:border-red-500 dark:focus:ring-red-500/20'
                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 dark:border-zinc-700 dark:focus:ring-blue-500/20 dark:focus:border-blue-500'
                ]"
              />
              <!-- Error message -->
              <p v-if="phoneError" class="flex items-center gap-1 text-[11px] text-red-500 dark:text-red-400 mt-1">
                <AlertCircle class="w-3 h-3 shrink-0" />
                {{ phoneError }}
              </p>
            </div>
            <div class="space-y-1.5">
              <label class="block text-[12px] sm:text-[13px] font-medium
                            text-gray-700 dark:text-zinc-300">
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="budi@email.com"
                class="w-full h-10 px-3.5 text-sm rounded-lg border outline-none
                       transition-all duration-150
                       bg-white border-gray-200 text-gray-800 placeholder:text-gray-400
                       focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500
                       dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500
                       dark:focus:ring-blue-500/20 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Alamat -->
          <div class="space-y-1.5">
            <label class="block text-[12px] sm:text-[13px] font-medium
                          text-gray-700 dark:text-zinc-300">
              Alamat
            </label>
            <textarea
              v-model="form.address"
              rows="3"
              placeholder="Alamat lengkap"
              class="w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none resize-none
                     transition-all duration-150
                     bg-white border-gray-200 text-gray-800 placeholder:text-gray-400
                     focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500
                     dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500
                     dark:focus:ring-blue-500/20 dark:focus:border-blue-500"
            />
          </div>

          <!-- Catatan -->
          <div class="space-y-1.5">
            <label class="block text-[12px] sm:text-[13px] font-medium
                          text-gray-700 dark:text-zinc-300">
              Catatan
            </label>
            <textarea
              v-model="form.note"
              rows="3"
              placeholder="Catatan tambahan (opsional)"
              class="w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none resize-none
                     transition-all duration-150
                     bg-white border-gray-200 text-gray-800 placeholder:text-gray-400
                     focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500
                     dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500
                     dark:focus:ring-blue-500/20 dark:focus:border-blue-500"
            />
          </div>

          <!-- Footer Actions -->
          <div
            class="flex items-center justify-end gap-2.5 pt-3 mt-1 border-t
                   border-gray-100 dark:border-zinc-800"
          >
            <button
              type="button"
              class="h-9 px-5 text-sm font-medium rounded-lg border transition-all duration-150
                     bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300
                     dark:bg-transparent dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              @click="$router.back()"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="h-9 px-6 text-sm font-semibold rounded-lg transition-all duration-150
                     bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center gap-2 shadow-md shadow-blue-500/20"
            >
              <Loader2 v-if="isLoading" class="w-3.5 h-3.5 animate-spin" />
              Simpan
            </button>
          </div>

        </form>
      </div>

      <!-- Back link below card -->
      <div class="text-center mt-4">
        <NuxtLink
          to="/customers"
          class="text-xs transition-colors
                 text-zinc-500 hover:text-zinc-300
                 dark:text-zinc-600 dark:hover:text-zinc-400"
        >
          ← Kembali ke daftar pelanggan
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Loader2, ChevronRight, UserPlus, AlertCircle } from 'lucide-vue-next'
import { createCustomer } from '~/server/api/public/custumer'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Tambah Pelanggan - ${appName}`,
  description: `Tambah pelanggan baru ke dalam sistem ${appName}.`,
  ogTitle: `Tambah Pelanggan - ${appName}`,
  ogUrl: url.href,
})

// ---- State ----
const isLoading = ref(false)
const phoneTouched = ref(false)
const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  note: '',
})

// ---- Phone Validation ----
const phoneError = computed(() => {
  const p = form.value.phone
  if (!phoneTouched.value || p === '') return '' // kosong & belum disentuh → tidak error
  if (!p.startsWith('62')) return 'Nomor telepon harus diawali dengan 62 (kode negara Indonesia)'
  if (p.length < 10) return `Nomor terlalu pendek (${p.length}/10 karakter minimum)`
  if (!/^\d+$/.test(p)) return 'Nomor telepon hanya boleh berisi angka'
  return ''
})

function onPhoneInput() {
  phoneTouched.value = true
  // Hanya izinkan angka
  form.value.phone = form.value.phone.replace(/\D/g, '')
}

// ---- Submit ----
async function handleSubmit() {
  if (!form.value.name.trim()) return

  // Paksa validasi phone ditampilkan saat submit
  phoneTouched.value = true
  if (phoneError.value) return

  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await createCustomer({
      name: form.value.name.trim(),
      phone_number: form.value.phone,
      email: form.value.email || undefined,
      address: form.value.address || undefined,
      note: form.value.note || undefined,
    }, token)

    const result = await response.json()

    if (response.ok) {
      await alertSuccess('Pelanggan berhasil ditambahkan!')
      navigateTo('/customers')
    } else {
      alertError(result.message || 'Gagal menambahkan pelanggan. Coba lagi.')
    }
  } catch (error) {
    console.error('Create customer error:', error)
    alertError('Terjadi kesalahan koneksi. Periksa jaringan Anda.')
  } finally {
    isLoading.value = false
  }
}
</script>
