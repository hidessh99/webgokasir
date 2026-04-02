<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Kategori Pelanggan</h2>
          <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola dan lihat semua kategori pelanggan di dalam sistem</p>
        </div>
        <Button
          id="btn-tambah-kategori-pelanggan"
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
            id="search-kategori-pelanggan"
            v-model="searchQuery"
            placeholder="Cari kategori pelanggan..."
            class="pl-9 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-gray-100"
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
            <DropdownMenuCheckboxItem checked>Deskripsi</DropdownMenuCheckboxItem>
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
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 hidden md:table-cell">
                  Deskripsi
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900 hidden sm:table-cell">
                  <div class="flex items-center gap-1.5">
                    Tanggal Dibuat
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
                <TableCell colspan="4" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                  <p class="mt-2 text-sm">Memuat kategori pelanggan...</p>
                </TableCell>
              </TableRow>

              <!-- Empty State -->
              <TableRow v-else-if="categories.length === 0">
                <TableCell colspan="4" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Tags class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada kategori pelanggan ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Data Rows -->
              <TableRow
                v-else
                v-for="category in categories"
                :key="category.id"
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer"
                @click="openDetailModal(category)"
              >
                <!-- Name Cell -->
                <TableCell class="py-3 pl-4 sm:py-2.5">
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-3">
                      <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(category.name)}`">
                        {{ category.name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 block">{{ category.name }}</span>
                        <!-- Mobile: show date below name -->
                        <div class="flex flex-col sm:hidden mt-0.5">
                          <span class="text-[11px] text-gray-500 truncate max-w-[180px]">{{ category.created_at || '-' }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- Mobile Action Buttons -->
                    <div class="flex sm:hidden items-center gap-2 w-full pr-4">
                      <button
                        @click.stop="openEditModal(category)"
                        class="flex flex-1 items-center justify-center px-3 py-1.5 rounded-md text-[11px] text-amber-600 bg-amber-50 hover:bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-colors gap-1.5"
                      >
                        <Pencil class="w-[12px] h-[12px]" />
                        <span class="font-medium tracking-wide">Edit</span>
                      </button>
                      <button
                        @click.stop="confirmDelete(category)"
                        class="flex flex-1 items-center justify-center px-3 py-1.5 rounded-md text-[11px] text-white bg-red-600 hover:bg-red-700 transition-colors gap-1.5"
                      >
                        <Trash2 class="w-[12px] h-[12px]" />
                        <span class="font-medium tracking-wide">Hapus</span>
                      </button>
                    </div>
                  </div>
                </TableCell>

                <!-- Description Cell -->
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden md:table-cell max-w-[200px]">
                  <span class="truncate block">{{ category.description || '-' }}</span>
                </TableCell>

                <!-- Date Cell -->
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden sm:table-cell">
                  {{ category.created_at || '-' }}
                </TableCell>

                <!-- Desktop Action Cell -->
                <TableCell class="py-2.5 pr-4 text-center hidden sm:table-cell">
                  <div class="flex items-center justify-center gap-1">
                    <button
                      @click.stop="openDetailModal(category)"
                      class="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye class="w-[14px] h-[14px]" />
                    </button>
                    <button
                      @click.stop="openEditModal(category)"
                      class="w-7 h-7 flex items-center justify-center rounded-md text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                      title="Edit"
                    >
                      <Pencil class="w-[14px] h-[14px]" />
                    </button>
                    <button
                      @click.stop="confirmDelete(category)"
                      class="w-7 h-7 flex items-center justify-center rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 class="w-[14px] h-[14px]" />
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
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-zinc-300">
              Halaman <span class="font-medium">{{ currentPage }}</span> dari <span class="font-medium">{{ totalPages }}</span>
              <span class="ml-2 text-gray-400 dark:text-zinc-500">({{ totalItems }} item)</span>
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50"
              >
                Selanjutnya
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden rounded-xl">
        <DialogHeader class="border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4">
          <DialogTitle class="text-gray-900 dark:text-white">Detail Kategori Pelanggan</DialogTitle>
          <DialogDescription class="text-xs text-gray-500 dark:text-zinc-400 mt-1">
            Informasi lengkap mengenai kategori pelanggan.
          </DialogDescription>
        </DialogHeader>

        <div v-if="selectedCategory" class="space-y-4">
          <!-- Main Info -->
          <div class="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
            <div :class="`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0 ${getAvatarColor(selectedCategory.name)}`">
              {{ selectedCategory.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ selectedCategory.name }}</h3>
              <p class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono mt-0.5">ID: {{ selectedCategory.id }}</p>
            </div>
          </div>

          <!-- Detail Grid -->
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-1">
              <span class="text-[11px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Nama Kategori</span>
              <p class="text-sm text-gray-800 dark:text-zinc-200">{{ selectedCategory.name }}</p>
            </div>
            <div class="space-y-1">
              <span class="text-[11px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Deskripsi</span>
              <p class="text-sm text-gray-800 dark:text-zinc-200">{{ selectedCategory.description || '-' }}</p>
            </div>
            <div class="space-y-1">
              <span class="text-[11px] font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Tanggal Dibuat</span>
              <p class="text-sm text-gray-800 dark:text-zinc-200">{{ selectedCategory.created_at || '-' }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog :open="isEditModalOpen" @update:open="val => { if (!isUpdating) isEditModalOpen = val }">
      <DialogContent class="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden rounded-xl p-0">
        <!-- Header -->
        <div class="flex items-center gap-3 p-5 border-b border-gray-100 dark:border-zinc-800">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-sm shrink-0">
            <Pencil class="w-4 h-4 text-white" />
          </div>
          <div>
            <DialogTitle class="text-base font-semibold text-gray-900 dark:text-white leading-tight">Edit Kategori Pelanggan</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
              Perubahan akan langsung disimpan ke sistem
            </DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitEdit" class="p-5 space-y-5" novalidate>
          <!-- Nama Field -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="edit-nama-kategori" class="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                Nama Kategori <span class="text-red-500">*</span>
              </label>
              <span class="text-[10px]" :class="editForm.name.length > 100 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ editForm.name.length }}/100
              </span>
            </div>
            <input
              id="edit-nama-kategori"
              v-model="editForm.name"
              type="text"
              maxlength="100"
              placeholder="Nama kategori..."
              :class="[
                'w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all',
                'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500',
                editNameError
                  ? 'border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 dark:focus:border-amber-500'
              ]"
              @blur="validateEditName"
            />
            <p v-if="editNameError" class="text-[11px] text-red-500 flex items-center gap-1">
              <span>⚠</span> {{ editNameError }}
            </p>
          </div>

          <!-- Deskripsi Field -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="edit-deskripsi-kategori" class="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                Deskripsi
              </label>
              <span class="text-[10px]" :class="editForm.description.length > 255 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ editForm.description.length }}/255
              </span>
            </div>
            <textarea
              id="edit-deskripsi-kategori"
              v-model="editForm.description"
              rows="3"
              maxlength="255"
              placeholder="Deskripsi singkat mengenai kategori pelanggan ini..."
              class="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 dark:focus:border-amber-500 resize-none transition-all"
            />
          </div>

          <!-- Live Preview -->
          <div v-if="editForm.name.trim()" class="flex items-center gap-3 p-3 rounded-lg bg-amber-50/60 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30">
            <div :class="`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(editForm.name)}`">
              {{ editForm.name.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{{ editForm.name }}</p>
              <p v-if="editForm.description" class="text-[11px] text-gray-500 dark:text-zinc-400 truncate">{{ editForm.description }}</p>
              <p v-else class="text-[11px] text-gray-300 dark:text-zinc-600 italic">Tanpa deskripsi</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-1">
            <Button
              id="btn-batal-edit-kategori"
              type="button"
              variant="outline"
              class="flex-1 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
              :disabled="isUpdating"
              @click="isEditModalOpen = false"
            >
              Batal
            </Button>
            <Button
              id="btn-simpan-edit-kategori"
              type="submit"
              class="flex-1 bg-amber-500 hover:bg-amber-600 text-white gap-2 shadow-sm"
              :disabled="isUpdating || !editForm.name.trim()"
            >
              <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin" />
              <Pencil v-else class="w-4 h-4" />
              {{ isUpdating ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Create Dialog -->
    <Dialog :open="isCreateModalOpen" @update:open="val => { if (!isSubmitting) isCreateModalOpen = val }">
      <DialogContent class="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden rounded-xl p-0">
        <!-- Header -->
        <div class="flex items-center gap-3 p-5 border-b border-gray-100 dark:border-zinc-800">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm shrink-0">
            <Plus class="w-4 h-4 text-white" />
          </div>
          <div>
            <DialogTitle class="text-base font-semibold text-gray-900 dark:text-white leading-tight">Tambah Kategori Pelanggan</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">
              Kategori baru akan langsung tersimpan ke sistem
            </DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitCreate" class="p-5 space-y-5" novalidate>
          <!-- Nama Field -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="input-nama-kategori" class="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                Nama Kategori <span class="text-red-500">*</span>
              </label>
              <span class="text-[10px]" :class="createForm.name.length > 100 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ createForm.name.length }}/100
              </span>
            </div>
            <div class="relative">
              <input
                id="input-nama-kategori"
                v-model="createForm.name"
                type="text"
                maxlength="100"
                placeholder="Contoh: Supplier, Reseller, Member..."
                :class="[
                  'w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all',
                  'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500',
                  createNameError
                    ? 'border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500'
                ]"
                @blur="validateCreateName"
              />
            </div>
            <p v-if="createNameError" class="text-[11px] text-red-500 flex items-center gap-1">
              <span>⚠</span> {{ createNameError }}
            </p>
          </div>

          <!-- Deskripsi Field -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="input-deskripsi-kategori" class="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                Deskripsi
              </label>
              <span class="text-[10px]" :class="createForm.description.length > 255 ? 'text-red-500' : 'text-gray-400 dark:text-zinc-500'">
                {{ createForm.description.length }}/255
              </span>
            </div>
            <textarea
              id="input-deskripsi-kategori"
              v-model="createForm.description"
              rows="3"
              maxlength="255"
              placeholder="Deskripsi singkat mengenai kategori pelanggan ini..."
              class="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 resize-none transition-all"
            />
          </div>

          <!-- Preview Badge -->
          <div v-if="createForm.name.trim()" class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-700">
            <div :class="`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${getAvatarColor(createForm.name)}`">
              {{ createForm.name.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{{ createForm.name }}</p>
              <p v-if="createForm.description" class="text-[11px] text-gray-400 dark:text-zinc-500 truncate">{{ createForm.description }}</p>
              <p v-else class="text-[11px] text-gray-300 dark:text-zinc-600 italic">Tanpa deskripsi</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-1">
            <Button
              id="btn-batal-buat-kategori"
              type="button"
              variant="outline"
              class="flex-1 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
              :disabled="isSubmitting"
              @click="isCreateModalOpen = false"
            >
              Batal
            </Button>
            <Button
              id="btn-simpan-kategori"
              type="submit"
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm"
              :disabled="isSubmitting || !createForm.name.trim()"
            >
              <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
              <Plus v-else class="w-4 h-4" />
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Kategori' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-gray-900 dark:text-white">Hapus Kategori Pelanggan?</AlertDialogTitle>
          <AlertDialogDescription class="text-gray-500 dark:text-zinc-400">
            Apakah Anda yakin ingin menghapus kategori
            <span class="font-semibold text-gray-700 dark:text-zinc-300">"{{ deleteCategoryName }}"</span>?
            Data yang terhapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel class="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            @click="executeDelete"
            class="bg-red-500 hover:bg-red-600 text-white border-0"
            :disabled="isDeleting"
          >
            <Loader2 v-if="isDeleting" class="w-4 h-4 animate-spin mr-2" />
            Ya, Hapus
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
  Eye, Trash2, Loader2, Plus, Tags, Pencil,
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
import {
  getCustomerCategories,
  createCustomerCategory,
  updateCustomerCategory,
  deleteCustomerCategory,
  type CustomerCategoryItem,
} from '@/server/api/public/category-customer'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Kategori Pelanggan | ${appName} - Manajemen CRM Terpadu`,
  ogTitle: `Kategori Pelanggan | ${appName} Dashboard`,
  description: `Optimalkan manajemen data Anda dengan fitur Kategori Pelanggan di ${appName}. Kelola, kelompokkan, dan pantau segmentasi pelanggan bisnis Anda secara efisien dan terorganisir dalam satu dashboard canggih.`,
  ogDescription: `Ringkasan manajemen kategori pelanggan di ${appName}. Segmentasikan pelanggan Anda secara profesional untuk meningkatkan efisiensi operasional dan layanan bisnis.`,
  ogUrl: url.href,
  ogType: 'website',
  ogLocale: 'id_ID',
  ogSiteName: appName,
  twitterCard: 'summary_large_image',
  twitterTitle: `Kategori Pelanggan - ${appName}`,
  twitterDescription: `Kelola segmentasi pelanggan bisnis Anda dengan sistem kategori cerdas dari ${appName}.`,
  author: 'GoKasir Team',
  robots: 'index, follow',
})

useHead({
  link: [
    { rel: 'canonical', href: url.href }
  ]
})

// ─── State ─────────────────────────────────────────────────────────────────
const categories = ref<CustomerCategoryItem[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const totalItems = ref(0)

// Detail Modal
const isDetailModalOpen = ref(false)
const selectedCategory = ref<CustomerCategoryItem | null>(null)

// Create Modal
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)
const createForm = ref({ name: '', description: '' })

// Edit Modal
const isEditModalOpen = ref(false)
const isUpdating = ref(false)
const editingId = ref<string | null>(null)
const editNameError = ref('')
const editForm = ref({ name: '', description: '' })

// Delete Dialog
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)
const deleteCategoryId = ref<string | null>(null)
const deleteCategoryName = ref('')

// ─── Avatar Color ───────────────────────────────────────────────────────────
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

// ─── Fetch ──────────────────────────────────────────────────────────────────
const fetchCategories = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getCustomerCategories(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()

    if (response.ok && result.success) {
      categories.value = Array.isArray(result.payload) ? result.payload : []

      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalItems.value = result.additional_info.total || 0
        totalPages.value = Math.ceil(totalItems.value / (result.additional_info.size || pageSize.value)) || 1
      } else {
        totalPages.value = 1
        totalItems.value = categories.value.length
      }
    } else {
      console.error('Failed to fetch customer categories:', result.message)
      categories.value = []
    }
  } catch (error) {
    console.error('Error fetching customer categories:', error)
    categories.value = []
  } finally {
    isLoading.value = false
  }
}

// ─── Search Debounce ────────────────────────────────────────────────────────
let searchTimeout: ReturnType<typeof setTimeout>
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

// ─── Detail Modal ───────────────────────────────────────────────────────────
const openDetailModal = (category: CustomerCategoryItem) => {
  selectedCategory.value = category
  isDetailModalOpen.value = true
}

// ─── Edit Modal ──────────────────────────────────────────────────────────────
const validateEditName = () => {
  if (!editForm.value.name.trim()) {
    editNameError.value = 'Nama kategori wajib diisi.'
    return false
  }
  if (editForm.value.name.trim().length < 2) {
    editNameError.value = 'Nama kategori minimal 2 karakter.'
    return false
  }
  editNameError.value = ''
  return true
}

const openEditModal = (category: CustomerCategoryItem) => {
  editingId.value = category.id
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
      description: editForm.value.description.trim(),
    }
    const response = await updateCustomerCategory(editingId.value, payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Kategori pelanggan berhasil diperbarui.')
      isEditModalOpen.value = false
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal memperbarui kategori pelanggan.')
    }
  } catch (error) {
    console.error('Error updating customer category:', error)
    alertError('Terjadi kesalahan jaringan.')
  } finally {
    isUpdating.value = false
  }
}

// ─── Create Modal ───────────────────────────────────────────────────────────
const createNameError = ref('')

const validateCreateName = () => {
  if (!createForm.value.name.trim()) {
    createNameError.value = 'Nama kategori wajib diisi.'
    return false
  }
  if (createForm.value.name.trim().length < 2) {
    createNameError.value = 'Nama kategori minimal 2 karakter.'
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
    // Payload sesuai API: name (required) + description (optional string)
    const payload = {
      name: createForm.value.name.trim(),
      description: createForm.value.description.trim(),
    }
    const response = await createCustomerCategory(payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Kategori pelanggan berhasil ditambahkan.')
      isCreateModalOpen.value = false
      currentPage.value = 1
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal menambahkan kategori pelanggan.')
    }
  } catch (error) {
    console.error('Error creating customer category:', error)
    alertError('Terjadi kesalahan jaringan.')
  } finally {
    isSubmitting.value = false
  }
}

// ─── Delete ──────────────────────────────────────────────────────────────────
const confirmDelete = (category: CustomerCategoryItem) => {
  deleteCategoryId.value = category.id
  deleteCategoryName.value = category.name
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteCategoryId.value) return
  isDeleting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteCustomerCategory(deleteCategoryId.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Kategori pelanggan berhasil dihapus.')
      fetchCategories()
    } else {
      alertError(result.message || 'Gagal menghapus kategori pelanggan.')
    }
  } catch (error) {
    console.error('Error deleting customer category:', error)
    alertError('Terjadi kesalahan jaringan saat menghapus.')
  } finally {
    isDeleting.value = false
    isDeleteDialogOpen.value = false
    deleteCategoryId.value = null
    deleteCategoryName.value = ''
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────
onMounted(() => {
  fetchCategories()
})
</script>
