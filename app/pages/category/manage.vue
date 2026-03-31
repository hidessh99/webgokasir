<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Manajemen Kategori</h2>
          <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola dan lihat semua kategori produk di dalam sistem</p>
        </div>
        <Button 
          id="btn-tambah-kategori"
          class="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Kategori
        </Button>
      </div>

      <Separator class="bg-gray-100 dark:bg-zinc-800/60" />

      <!-- Toolbar -->
      <div class="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            id="search-kategori"
            v-model="searchQuery"
            placeholder="Cari kategori..." 
            class="pl-9 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all font-medium"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="w-full sm:w-auto h-9 gap-2 border-gray-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-900">
              Kolom
              <ChevronDown class="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked>Nama</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Tanggal</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- Table Section -->
      <div class="px-4 pb-4 overflow-x-auto">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5 ml-2">
                    Nama Kategori
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900 hidden sm:table-cell">
                  <div class="flex items-center gap-1.5">
                    Tanggal
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center hidden sm:table-cell">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- Loading State -->
              <TableRow v-if="isLoading">
                <TableCell colspan="3" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                  <p class="mt-2 text-sm font-medium">Memuat kategori...</p>
                </TableCell>
              </TableRow>
              
              <!-- Empty State -->
              <TableRow v-else-if="categories.length === 0">
                <TableCell colspan="3" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Tags class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tidak ada data kategori ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Data Rows -->
              <TableRow 
                v-else 
                v-for="category in categories" 
                :key="category.public_id || category.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer last:border-0 transition-colors" 
                @click="openCategoryDetail(category.public_id || category.id)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(category.name)}`">
                      {{ category.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 block truncate max-w-[150px] sm:max-w-none">{{ category.name }}</span>
                      <div class="flex flex-col sm:hidden mt-0.5">
                        <span class="text-[11px] text-gray-400 truncate max-w-[140px]">{{ category.created_at || '-' }}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden sm:table-cell font-medium">{{ category.created_at || '-' }}</TableCell>

                <!-- Desktop Action Cell -->
                <TableCell class="py-2.5 pr-4 text-center hidden sm:table-cell">
                  <div class="flex items-center justify-center gap-1.5 focus-within:ring-0">
                    <button 
                      @click.stop="openCategoryDetail(category.public_id || category.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95"
                      title="Lihat Detail"
                    >
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="openEditModal(category)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all hover:text-amber-600 dark:hover:text-amber-400 active:scale-95"
                      title="Edit"
                    >
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="confirmDelete(category.public_id || category.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:text-red-500 active:scale-95"
                      title="Hapus"
                    >
                      <Trash2 class="w-[15px] h-[15px]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors">
            Sebelumnya
          </button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors">
            Selanjutnya
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-zinc-300">
              Halaman <span class="font-bold">{{ currentPage }}</span> dari <span class="font-bold">{{ totalPages }}</span>
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors">
                Sebelumnya
              </button>
              <button @click="nextPage" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors">
                Selanjutnya
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden rounded-2xl">
        <DialogHeader class="border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4">
          <DialogTitle class="text-gray-900 dark:text-white font-semibold">Detail Kategori</DialogTitle>
          <DialogDescription class="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            Informasi lengkap mengenai kategori produk.
          </DialogDescription>
        </DialogHeader>

        <div v-if="isLoadingDetail" class="py-12 flex justify-center">
          <Loader2 class="w-8 h-8 animate-spin text-indigo-500" />
        </div>
        
        <div v-else-if="selectedCategory" class="space-y-5">
          <!-- Main Info -->
          <div class="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-5">
            <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-sm ${getAvatarColor(selectedCategory.name)}`">
              {{ selectedCategory.name.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-gray-900 dark:text-white truncate">{{ selectedCategory.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-zinc-400 font-mono mt-0.5" v-if="selectedCategory.public_id">{{ selectedCategory.public_id }}</p>
              <p class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono mt-0.5">UUID: {{ selectedCategory.id }}</p>
            </div>
          </div>
          
          <!-- Detailed Info Grid -->
          <div class="grid grid-cols-1 gap-5">
            <div class="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Kategori</span>
              <p class="text-[13px] font-semibold text-gray-800 dark:text-zinc-200">{{ selectedCategory.name }}</p>
            </div>
            <div class="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Deskripsi</span>
              <p class="text-[13px] font-semibold text-gray-800 dark:text-zinc-200">{{ selectedCategory.description || 'Tidak ada deskripsi.' }}</p>
            </div>
            <div class="space-y-1.5 p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Waktu Terdaftar</span>
              <p class="text-[13px] font-semibold text-gray-800 dark:text-zinc-200">{{ selectedCategory.created_at || '-' }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Create Dialog -->
    <Dialog :open="isCreateModalOpen" @update:open="val => { if (!isSubmitting) isCreateModalOpen = val }">
      <DialogContent class="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden rounded-2xl p-0">
        <!-- Header -->
        <div class="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-zinc-800">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shrink-0">
            <Plus class="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle class="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">Tambah Kategori Baru</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
              Isi formulir berikut untuk mendaftarkan kategori.
            </DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitCreate" class="p-5 space-y-5" novalidate>
          <!-- Nama Field -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="create-name" class="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
                Nama Kategori <span class="text-red-500 text-[10px]">*</span>
              </label>
              <span class="text-[10px] font-medium" :class="createForm.name.length > 50 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ createForm.name.length }}/50
              </span>
            </div>
            <input
              id="create-name"
              v-model="createForm.name"
              type="text"
              maxlength="50"
              placeholder="Contoh: Makanan, Minuman, Elektronik..."
              :class="[
                'w-full px-4 py-2.5 rounded-xl border text-[13px] font-medium outline-none transition-all',
                'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500',
                createNameError
                  ? 'border-red-400 dark:border-red-500 focus:ring-4 focus:ring-red-500/10'
                  : 'border-gray-200 dark:border-zinc-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
              ]"
              @blur="validateCreateName"
            />
            <p v-if="createNameError" class="text-[11px] text-red-500 flex items-center gap-1.5 px-0.5 font-medium">
              <span>⚠</span> {{ createNameError }}
            </p>
          </div>

          <!-- Deskripsi Field -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="create-description" class="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
                Deskripsi
              </label>
              <span class="text-[10px] font-medium" :class="createForm.description.length > 255 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ createForm.description.length }}/255
              </span>
            </div>
            <textarea
              id="create-description"
              v-model="createForm.description"
              rows="3"
              maxlength="255"
              placeholder="Berikan deskripsi singkat kategori ini..."
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 resize-none transition-all"
            />
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2">
            <Button
              id="btn-cancel-create"
              type="button"
              variant="outline"
              class="flex-1 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800/60 rounded-xl py-6 font-bold tracking-wide"
              :disabled="isSubmitting"
              @click="isCreateModalOpen = false"
            >
              Nanti Saja
            </Button>
            <Button
              id="btn-confirm-create"
              type="submit"
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white gap-2.5 shadow-lg shadow-indigo-500/20 rounded-xl py-6 font-bold tracking-wide"
              :disabled="isSubmitting || !createForm.name.trim()"
            >
              <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              <Plus v-else class="w-4 h-4" />
              {{ isSubmitting ? 'Mendaftarkan...' : 'Daftarkan Kategori' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog :open="isEditModalOpen" @update:open="val => { if (!isUpdating) isEditModalOpen = val }">
      <DialogContent class="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden rounded-2xl p-0">
        <!-- Header -->
        <div class="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-zinc-800">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shrink-0">
            <Pencil class="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle class="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">Perbarui Kategori</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
              Sesuaikan data kategori dengan informasi terbaru.
            </DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitEdit" class="p-5 space-y-5" novalidate>
          <!-- Nama Field -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="edit-name" class="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
                Nama Kategori <span class="text-red-500 text-[10px]">*</span>
              </label>
              <span class="text-[10px] font-medium" :class="editForm.name.length > 50 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ editForm.name.length }}/50
              </span>
            </div>
            <input
              id="edit-name"
              v-model="editForm.name"
              type="text"
              maxlength="50"
              placeholder="Masukkan kategori..."
              :class="[
                'w-full px-4 py-2.5 rounded-xl border text-[13px] font-medium outline-none transition-all',
                'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500',
                editNameError
                  ? 'border-red-400 dark:border-red-500 focus:ring-4 focus:ring-red-500/10'
                  : 'border-gray-200 dark:border-zinc-700 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500'
              ]"
              @blur="validateEditName"
            />
            <p v-if="editNameError" class="text-[11px] text-red-500 flex items-center gap-1.5 px-0.5 font-medium">
              <span>⚠</span> {{ editNameError }}
            </p>
          </div>

          <!-- Deskripsi Field -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="edit-description" class="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
                Deskripsi
              </label>
              <span class="text-[10px] font-medium" :class="editForm.description.length > 255 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ editForm.description.length }}/255
              </span>
            </div>
            <textarea
              id="edit-description"
              v-model="editForm.description"
              rows="3"
              maxlength="255"
              placeholder="Perbarui deskripsi kategori..."
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 resize-none transition-all"
            />
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2">
            <Button
              id="btn-cancel-edit"
              type="button"
              variant="outline"
              class="flex-1 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800/60 rounded-xl py-6 font-bold tracking-wide"
              :disabled="isUpdating"
              @click="isEditModalOpen = false"
            >
              Batal
            </Button>
            <Button
              id="btn-confirm-edit"
              type="submit"
              class="flex-1 bg-amber-500 hover:bg-amber-600 text-white gap-2.5 shadow-lg shadow-amber-500/20 rounded-xl py-6 font-bold tracking-wide"
              :disabled="isUpdating || !editForm.name.trim()"
            >
              <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin" />
              <Pencil v-else class="w-4 h-4" />
              {{ isUpdating ? 'Memperbarui...' : 'Simpan Perubahan' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white">Hapus Kategori Selamanya?</AlertDialogTitle>
          <AlertDialogDescription class="text-[13px] font-medium text-gray-500 dark:text-zinc-400">
            Pastikan produk yang menggunakan kategori ini telah diperbarui. Tindakan ini bersifat permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-2 sm:gap-0">
          <AlertDialogCancel class="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/60 font-bold rounded-xl">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="bg-red-500 hover:bg-red-600 text-white border-0 font-bold rounded-xl shadow-lg shadow-red-500/20"
          >
            Ya, Bersihkan Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, ChevronDown, ChevronsUpDown,
  Eye, Pencil, Trash2, Loader2, Plus, Tags
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory, type CategoryItem } from '@/server/api/public/category'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: 'Manajemen Kategori',
  ogTitle: 'Manajemen Kategori',
  description: `Optimalkan manajemen kategori produk bisnis Anda dengan sistem inventaris cerdas di ${appName}.`,
  ogDescription: `Optimalkan manajemen kategori produk bisnis Anda dengan sistem inventaris cerdas di ${appName}.`,
  ogUrl: url.href,
  twitterCard: 'summary_large_image',
})

// ─── State ─────────────────────────────────────────────────────────────────
const categories = ref<CategoryItem[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Detail Modal
const isDetailModalOpen = ref(false)
const isLoadingDetail = ref(false)
const selectedCategory = ref<CategoryItem | null>(null)

// Create Modal
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)
const createNameError = ref('')
const createForm = ref({ name: '', description: '' })

// Edit Modal
const isEditModalOpen = ref(false)
const isUpdating = ref(false)
const editingId = ref<string | number | null>(null)
const editNameError = ref('')
const editForm = ref({ name: '', description: '' })

// Delete Dialog
const isDeleteDialogOpen = ref(false)
const deleteCategoryId = ref<string | number | null>(null)

// ─── Avatar & Theme ────────────────────────────────────────────────────────
const gradients = [
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-blue-500 to-sky-600',
  'bg-gradient-to-br from-pink-500 to-rose-600',
  'bg-gradient-to-br from-emerald-500 to-teal-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
]

function getAvatarColor(name: string) {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}

// ─── Data Fetching ────────────────────────────────────────────────────────
const fetchCategories = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getCategories(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      if (Array.isArray(result.payload)) {
        categories.value = result.payload
      } else if (result.payload && Array.isArray(result.payload.data)) {
        categories.value = result.payload.data
      } else {
        categories.value = []
      }

      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      } else if (result.payload && result.payload.meta) {
        currentPage.value = result.payload.meta.page || 1
        totalPages.value = result.payload.meta.total_pages || 1
      } else {
        totalPages.value = 1
      }
    } else {
      console.error('Failed to fetch categories:', result.message)
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    isLoading.value = false
  }
}

// ─── Search Debounce ────────────────────────────────────────────────────────
let searchTimeout: any
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchCategories()
  }, 500)
})

// ─── Pagination ─────────────────────────────────────────────────────────────
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchCategories()
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchCategories()
  }
}

onMounted(() => {
  fetchCategories()
})

// ─── Detail ─────────────────────────────────────────────────────────────────
const openCategoryDetail = async (id: string | number) => {
  isDetailModalOpen.value = true
  isLoadingDetail.value = true
  selectedCategory.value = null
  
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getCategoryById(id, token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      selectedCategory.value = result.payload
    } else {
      console.error('Failed to fetch category detail:', result.message)
    }
  } catch (error) {
    console.error('Error fetching category detail:', error)
  } finally {
    isLoadingDetail.value = false
  }
}

// ─── Create ─────────────────────────────────────────────────────────────────
const validateCreateName = () => {
  if (!createForm.value.name.trim()) {
    createNameError.value = 'Mohon masukkan nama kategori.'
    return false
  }
  if (createForm.value.name.trim().length < 2) {
    createNameError.value = 'Minimal 2 karakter untuk identitas.'
    return false
  }
  createNameError.value = ''
  return true
}

const openCreateModal = () => {
  createForm.value = { name: '', description: '' }
  createNameError.value = ''
  isCreateModalOpen.value = true
}

const submitCreate = async () => {
  if (!validateCreateName()) return
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = {
      name: createForm.value.name.trim(),
      description: createForm.value.description.trim() || undefined
    }
    const response = await createCategory(payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Kategori baru bersiapa digunakan.')
      isCreateModalOpen.value = false
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal mendaftarkan kategori.')
    }
  } catch (error) {
    console.error('Error creating category:', error)
    alertError('Sambungan gagal saat pendaftaran.')
  } finally {
    isSubmitting.value = false
  }
}

// ─── Edit ───────────────────────────────────────────────────────────────────
const validateEditName = () => {
  if (!editForm.value.name.trim()) {
    editNameError.value = 'Nama kategori wajib diisi.'
    return false
  }
  if (editForm.value.name.trim().length < 2) {
    editNameError.value = 'Minimal 2 karakter dibutuhkan.'
    return false
  }
  editNameError.value = ''
  return true
}

const openEditModal = (category: CategoryItem) => {
  editingId.value = category.public_id || category.id
  editForm.value = {
    name: category.name,
    description: category.description || '',
  }
  editNameError.value = ''
  isEditModalOpen.value = true
}

const submitEdit = async () => {
  if (!validateEditName()) return
  if (!editingId.value) return
  isUpdating.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = {
      name: editForm.value.name.trim(),
      description: editForm.value.description.trim() || undefined
    }
    const response = await updateCategory(editingId.value, payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data kategori telah diperbarui.')
      isEditModalOpen.value = false
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal memperbarui kategori.')
    }
  } catch (error) {
    console.error('Error updating category:', error)
    alertError('Terjadi kegagalan sambungan.')
  } finally {
    isUpdating.value = false
  }
}

// ─── Delete ─────────────────────────────────────────────────────────────────
const confirmDelete = (id: string | number) => {
  deleteCategoryId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteCategoryId.value) return

  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteCategory(deleteCategoryId.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data kategori berhasil dibersihkan.')
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal menghapus kategori.')
    }
  } catch (error) {
    console.error('Error deleting category:', error)
    alertError('Masalah jaringan saat menghapus kategori.')
  } finally {
    isDeleteDialogOpen.value = false
    deleteCategoryId.value = null
  }
}
</script>
