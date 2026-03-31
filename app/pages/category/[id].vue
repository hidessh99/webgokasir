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
        <span class="text-zinc-300 dark:text-zinc-300 text-zinc-700 font-medium truncate max-w-[160px]">
          {{ isFetching ? 'Memuat...' : (form.name || 'Ubah Kategori') }}
        </span>
      </div>

      <!-- ===== SKELETON saat loading ===== -->
      <template v-if="isFetching">
        <div class="rounded-2xl overflow-hidden shadow-xl ring-1 bg-white ring-gray-200 dark:bg-zinc-900 dark:ring-zinc-800 animate-pulse">
          <div class="flex items-center gap-3 px-5 sm:px-6 pt-5 pb-4 border-b border-gray-100 dark:border-zinc-800">
            <div class="w-8 h-8 rounded-lg bg-gray-200 dark:bg-zinc-700 shrink-0" />
            <div class="space-y-1.5 flex-1">
              <div class="h-3.5 bg-gray-200 dark:bg-zinc-700 rounded w-40" />
              <div class="h-2.5 bg-gray-100 dark:bg-zinc-800 rounded w-52" />
            </div>
          </div>
          <div class="px-5 sm:px-6 py-5 space-y-4">
            <div v-for="i in 2" :key="i" class="space-y-1.5">
              <div class="h-2.5 bg-gray-200 dark:bg-zinc-700 rounded w-24" />
              <div class="h-10 bg-gray-100 dark:bg-zinc-800 rounded-lg w-full" />
            </div>
          </div>
        </div>
      </template>

      <!-- ===== NOT FOUND ===== -->
      <template v-else-if="notFound">
        <div
          class="rounded-2xl overflow-hidden shadow-xl ring-1 text-center px-6 py-12
                 bg-white ring-gray-200 dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div class="w-14 h-14 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <SearchX class="w-7 h-7 text-red-500 dark:text-red-400" />
          </div>
          <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-1">Kategori Tidak Ditemukan</h2>
          <p class="text-sm text-gray-500 dark:text-zinc-500 mb-5">
            Data kategori dengan ID <span class="font-mono font-medium text-[11px]">{{ route.params.id }}</span> tidak tersedia.
          </p>
          <NuxtLink
            to="/category/manage"
            class="inline-flex items-center gap-2 h-9 px-5 text-sm font-medium rounded-lg transition-all
                   bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          >
            <ArrowLeft class="w-4 h-4" />
            Kembali ke Manajemen Kategori
          </NuxtLink>
        </div>
      </template>

      <!-- ===== FORM EDIT ===== -->
      <template v-else>
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
              <!-- Avatar inisial -->
              <div
                :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold text-white',
                  avatarBg
                ]"
              >
                {{ form.name ? form.name.charAt(0).toUpperCase() : '?' }}
              </div>
              <div>
                <h1 class="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white leading-tight">
                  Ubah Kategori
                </h1>
                <p class="text-[11px] mt-0.5 text-gray-500 dark:text-zinc-500 leading-tight truncate max-w-[200px]">
                  ID: {{ route.params.id }}
                </p>
              </div>
            </div>
          </div>

          <!-- Form Body -->
          <form class="px-5 sm:px-6 py-5 space-y-4" @submit.prevent="handleSubmit">

            <!-- Nama Kategori -->
            <div class="space-y-1.5">
              <label class="block text-[12px] sm:text-[13px] font-medium text-gray-700 dark:text-zinc-300">
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
              class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4 mt-2 border-t
                     border-gray-100 dark:border-zinc-800"
            >
                <!-- Batal -->
                <button
                  type="button"
                  class="w-full sm:w-auto h-10 sm:h-9 px-5 text-sm font-medium rounded-lg border transition-all duration-150
                         bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300
                         dark:bg-transparent dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                  @click="$router.back()"
                >
                  Batal
                </button>
                <!-- Simpan -->
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full sm:w-auto h-10 sm:h-9 px-6 text-sm font-semibold rounded-lg transition-all duration-150
                         bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex justify-center items-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <Loader2 v-if="isLoading" class="w-3.5 h-3.5 animate-spin" />
                  Simpan Perubahan
                </button>
            </div>

          </form>
        </div>
      </template>

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
import { ref, computed, onMounted } from 'vue'
import { Loader2, ChevronRight, ArrowLeft, SearchX, Pencil } from 'lucide-vue-next'
import { getCategoryById, updateCategory } from '~/server/api/public/category'
import { alertSuccess, alertError } from '~/lib/alert'

definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

// ---- SEO ----
useSeoMeta({
  title: `Ubah Kategori - ${appName}`,
  description: `Perbarui data kategori di ${appName}.`,
  ogTitle: `Ubah Kategori - ${appName}`,
  ogUrl: url.href,
})

// ---- State ----
const isFetching = ref(true)
const notFound = ref(false)
const isLoading = ref(false)

const form = ref({
  name: '',
})

// ---- Avatar gradient ----
const gradients = [
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-blue-500 to-sky-600',
  'bg-gradient-to-br from-pink-500 to-rose-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
  'bg-gradient-to-br from-emerald-500 to-teal-600',
]
const avatarBg = computed(() => {
  if (!form.value.name) return gradients[0]
  return gradients[form.value.name.charCodeAt(0) % gradients.length]
})

// ---- Fetch data kategori by ID ----
async function fetchCategory() {
  isFetching.value = true
  notFound.value = false
  try {
    const id = String(route.params.id)
    const token = localStorage.getItem('token') || ''
    
    const response = await getCategoryById(id, token)
    if (response.status === 404) {
      notFound.value = true
      return
    }
    
    const result = await response.json()

    if (response.ok && result.success) {
      const data = result.payload
      form.value = {
        name: data.name || '',
      }
    } else {
      notFound.value = true
    }
  } catch (error) {
    console.error('Error fetching category:', error)
    notFound.value = true
  } finally {
    isFetching.value = false
  }
}

// ---- Submit update ----
async function handleSubmit() {
  if (!form.value.name.trim()) return
  isLoading.value = true
  try {
    const id = String(route.params.id)
    const token = localStorage.getItem('token') || ''
    
    const payload = {
      name: form.value.name.trim(),
    }

    const response = await updateCategory(id, payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Kategori berhasil diperbarui!')
      navigateTo('/category/manage')
    } else {
      alertError(result.message || 'Gagal memperbarui kategori.')
    }
  } catch (error) {
    console.error('Error updating category:', error)
    alertError('Terjadi kesalahan jaringan saat menyimpan.')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchCategory)
</script>
