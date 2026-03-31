<template>
  <!-- Outer: full height, centered both axes -->
  <div class="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:py-12">

    <!-- Card wrapper — full width on mobile, max-md on larger -->
    <div class="w-full max-w-md">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-1.5 text-xs mb-4">
        <NuxtLink
          to="/category/manage"
          class="text-zinc-500 hover:text-zinc-300 dark:text-zinc-500 dark:hover:text-zinc-300
                 text-zinc-600 hover:text-zinc-800 transition-colors"
        >
          Manajemen Kategori
        </NuxtLink>
        <ChevronRight class="w-3 h-3 text-zinc-500 dark:text-zinc-600 shrink-0" />
        <span class="text-zinc-300 dark:text-zinc-300 text-zinc-700 font-medium">Tambah Kategori Baru</span>
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
            <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
              <Plus class="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 class="text-sm sm:text-[15px] font-semibold
                         text-gray-900 dark:text-white leading-tight">
                Tambah Kategori Baru
              </h1>
              <p class="text-[11px] mt-0.5
                        text-gray-500 dark:text-zinc-500 leading-tight">
                Buat kategori baru untuk pengelompokan produk
              </p>
            </div>
          </div>
        </div>

        <!-- Form Body -->
        <form class="px-5 sm:px-6 py-5 space-y-4" @submit.prevent="handleSubmit">

          <!-- Nama Kategori -->
          <div class="space-y-1.5">
            <label class="block text-[12px] sm:text-[13px] font-medium
                          text-gray-700 dark:text-zinc-300">
              Nama Kategori <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="cth: Makanan, Minuman"
              required
              class="w-full h-10 px-3.5 text-sm rounded-lg border outline-none
                     transition-all duration-150
                     bg-white border-gray-200 text-gray-800 placeholder:text-gray-400
                     focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500
                     dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-500
                     dark:focus:ring-indigo-500/20 dark:focus:border-indigo-500"
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
                     bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center gap-2 shadow-md shadow-indigo-500/20"
            >
              <Loader2 v-if="isLoading" class="w-3.5 h-3.5 animate-spin" />
              Simpan Kategori
            </button>
          </div>

        </form>
      </div>

      <!-- Back link below card -->
      <div class="text-center mt-4">
        <NuxtLink
          to="/category/manage"
          class="text-xs transition-colors
                 text-zinc-500 hover:text-zinc-300
                 dark:text-zinc-600 dark:hover:text-zinc-400"
        >
          ← Kembali ke manajemen kategori
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Loader2, ChevronRight } from 'lucide-vue-next'
import { createCategory } from '~/server/api/public/category'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Tambah Kategori - ${appName}`,
  description: `Tambah kategori produk baru ke dalam sistem ${appName}.`,
  ogTitle: `Tambah Kategori - ${appName}`,
  ogUrl: url.href,
})

// ---- State ----
const isLoading = ref(false)
const form = ref({
  name: '',
})

// ---- Submit ----
async function handleSubmit() {
  const categoryName = form.value.name.trim()
  if (!categoryName) return

  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    
    // Sesuai dengan spesifikasi curl: hanya mengirim name (atau name & description jika ada)
    const payload = {
      name: categoryName
    }

    const response = await createCategory(payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Kategori berhasil ditambahkan!')
      navigateTo('/category/manage')
    } else {
      alertError(result.message || 'Gagal menambahkan kategori. Coba lagi.')
    }
  } catch (error) {
    console.error('Create category error:', error)
    alertError('Terjadi kesalahan koneksi. Periksa jaringan Anda.')
  } finally {
    isLoading.value = false
  }
}
</script>
