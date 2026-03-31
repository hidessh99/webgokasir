<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-indigo-600 dark:text-indigo-400">Manajemen Pelanggan</h2>
          <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 font-medium">Kelola dan lihat semua pelanggan terdaftar di dalam sistem</p>
        </div>
        <Button 
          id="btn-tambah-pelanggan"
          class="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20 px-6 font-bold"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Konsumen
        </Button>
      </div>

      <Separator class="bg-gray-100 dark:bg-zinc-800/60" />

      <!-- Toolbar -->
      <div class="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            id="search-pelanggan"
            v-model="searchQuery"
            placeholder="Cari nama, email, atau telepon..." 
            class="pl-9 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 dark:focus:border-indigo-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 transition-all font-semibold"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="w-full sm:w-auto h-9 gap-2 border-gray-200 dark:border-zinc-700 rounded-lg text-xs font-bold text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-900">
              Kolom
              <ChevronDown class="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked>Nama</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Email</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>No. Telepon</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Kategori</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- Table Section -->
      <div class="px-4 pb-4 overflow-x-auto">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10">
                  <div class="flex items-center gap-1.5 ml-2">
                    Nama
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 hidden sm:table-cell">
                  Kategori
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 hidden sm:table-cell">
                  Kontak
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 hidden md:table-cell">
                  Alamat
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 text-center hidden sm:table-cell">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- Loading State -->
              <TableRow v-if="isLoading">
                <TableCell colspan="5" class="h-40 text-center">
                  <Loader2 class="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-3" />
                  <p class="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Sinkronisasi Data...</p>
                </TableCell>
              </TableRow>
              
              <!-- Empty State -->
              <TableRow v-else-if="customers.length === 0">
                <TableCell colspan="5" class="h-40 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Users class="w-6 h-6 text-gray-300 dark:text-zinc-600" />
                    </div>
                    <p class="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">Database Kosong</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Data Rows -->
              <TableRow 
                v-else 
                v-for="customer in customers" 
                :key="customer.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer transition-all duration-200 group" 
                @click="openCustomerDetail(customer.id)"
              >
                <TableCell class="py-3 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm transition-transform group-hover:scale-110 ${getAvatarColor(customer.name)}`">
                      {{ customer.name.charAt(0).toUpperCase() }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <span class="text-[13px] font-bold text-gray-900 dark:text-gray-100 block truncate">{{ customer.name }}</span>
                      
                      <!-- Mobile Detail: Category & Contact -->
                      <div class="flex flex-col gap-1.5 mt-1 sm:hidden">
                        <div class="flex items-center gap-2">
                          <div v-if="customer.category" class="flex items-center gap-1">
                            <Tags class="w-2.5 h-2.5 text-indigo-500/60" />
                            <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50 uppercase tracking-tight">{{ customer.category.name }}</span>
                          </div>
                          <span v-if="customer.created_at" class="text-[9px] font-medium text-gray-400 font-mono tracking-tighter">📅 {{ customer.created_at.split('T')[0] }}</span>
                        </div>
                        <div class="flex items-center gap-2.5">
                          <span class="text-[10px] font-mono font-bold text-gray-500 bg-gray-50 dark:bg-zinc-800 px-1.5 rounded">{{ customer.phone_number || '-' }}</span>
                          <span v-if="customer.email" class="text-[10px] text-gray-400 truncate max-w-[120px] font-medium underline decoration-gray-200 decoration-dotted">{{ customer.email }}</span>
                        </div>
                      </div>

                      <!-- Mobile Action Buttons -->
                      <div class="flex sm:hidden items-center gap-2 mt-3 w-full max-w-[280px]">
                        <button 
                          @click.stop="openEditModal(customer)" 
                          class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-[11px] font-bold shadow-sm transition-all active:scale-95"
                        >
                          <Pencil class="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button 
                          @click.stop="confirmDelete(customer.id)" 
                          class="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-600 dark:bg-red-500 text-white text-[11px] font-bold shadow-md shadow-red-500/20 transition-all active:scale-95"
                        >
                          <Trash2 class="w-3.5 h-3.5" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="py-3 hidden sm:table-cell">
                  <div v-if="customer.category" class="flex items-center gap-1.5">
                    <Tags class="w-3.5 h-3.5 text-indigo-500/70" />
                    <span class="text-[11px] font-bold uppercase tracking-tight text-indigo-600 dark:text-indigo-400">{{ customer.category.name }}</span>
                  </div>
                  <span v-else class="text-[10px] font-bold text-gray-300 dark:text-zinc-700 uppercase tracking-widest italic select-none">-</span>
                </TableCell>
                <TableCell class="py-3 hidden sm:table-cell">
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[12px] font-bold text-gray-700 dark:text-zinc-300 truncate max-w-[180px]">{{ customer.email || '-' }}</span>
                    <span class="text-[10px] font-mono text-gray-400 transition-colors group-hover:text-indigo-500">{{ customer.phone_number || '-' }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-[12px] text-gray-500 dark:text-zinc-400 py-3 hidden md:table-cell max-w-[150px] truncate" :title="customer.address">
                  {{ customer.address || '-' }}
                </TableCell>

                <!-- Desktop Action Cell -->
                <TableCell class="py-3 pr-4 text-center hidden sm:table-cell">
                  <div class="flex items-center justify-center gap-1">
                    <button 
                      @click.stop="openCustomerDetail(customer.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-90"
                      title="Lihat Detail"
                    >
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="openEditModal(customer)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-zinc-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all active:scale-90"
                      title="Edit"
                    >
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="confirmDelete(customer.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-zinc-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all active:scale-90"
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
          <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-[11px] font-bold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-30 transition-all">
            Sebelumnya
          </button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-[11px] font-bold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-30 transition-all">
            Selanjutnya
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
              Hal. {{ currentPage }} / {{ totalPages }}
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px gap-2" aria-label="Pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-30 transition-all">
                Sebelumnya
              </button>
              <button @click="nextPage" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-30 transition-all">
                Selanjutnya
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="max-w-[95vw] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-2xl p-0 max-h-[95vh] flex flex-col">
        <div class="p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 relative overflow-hidden flex-shrink-0">
          <div class="absolute top-0 right-0 p-8 opacity-5">
            <Users class="w-32 h-32" />
          </div>
          <DialogTitle class="text-[16px] font-bold text-gray-900 dark:text-white mb-1">Informasi Konsumen</DialogTitle>
          <DialogDescription class="text-xs text-gray-500 dark:text-zinc-400 font-medium">
            Berikut adalah rincian data lengkap dari database.
          </DialogDescription>
        </div>

        <div v-if="isLoadingDetail" class="py-12 flex justify-center flex-1">
          <Loader2 class="w-8 h-8 animate-spin text-indigo-500" />
        </div>
        
        <div v-else-if="selectedCustomer" class="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          <div class="flex items-center gap-5 pb-5 border-b border-gray-50 dark:border-zinc-800/50">
            <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-md ${getAvatarColor(selectedCustomer.name)}`">
              {{ selectedCustomer.name.charAt(0).toUpperCase() }}
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-gray-900 dark:text-white truncate">{{ selectedCustomer.name }}</h3>
              <div class="flex items-center gap-2 mt-1" v-if="selectedCustomer.category">
                <Tags class="w-3 h-3 text-indigo-400" />
                <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-500">{{ selectedCustomer.category.name }}</span>
              </div>
              <p class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono mt-1 tracking-tighter">UUID: {{ selectedCustomer.id }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-5">
            <div class="col-span-2 sm:col-span-1 space-y-1.5 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Telepon</span>
              <p class="text-[13px] font-bold text-gray-800 dark:text-zinc-200 font-mono">{{ selectedCustomer.phone_number }}</p>
            </div>
            <div class="col-span-2 sm:col-span-1 space-y-1.5 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Email</span>
              <p class="text-[13px] font-bold text-gray-800 dark:text-zinc-200 truncate">{{ selectedCustomer.email || 'N/A' }}</p>
            </div>
            <div class="col-span-2 space-y-1.5 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Alamat Pengiriman</span>
              <p class="text-[13px] font-semibold text-gray-800 dark:text-zinc-300 leading-relaxed">{{ selectedCustomer.address || 'Alamat belum diatur.' }}</p>
            </div>
            <div class="col-span-2 space-y-1.5 px-3 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/20 dark:bg-indigo-900/10">
              <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block font-bold">Memo Pelanggan</span>
              <p class="text-[12px] text-gray-600 dark:text-zinc-400 italic">"{{ selectedCustomer.note || 'Tidak ada catatan khusus.' }}"</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isCreateModalOpen" @update:open="val => { if (!isSubmitting) isCreateModalOpen = val }">
      <DialogContent class="max-w-[95vw] sm:max-w-lg bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-2xl p-0 max-h-[95vh] flex flex-col">
        <div class="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-800/20 flex-shrink-0">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
            <Plus class="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle class="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Daftarkan Konsumen</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-medium">Berikan rincian kontak terbaru untuk pelanggan ini.</DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitCreate" class="p-5 flex-1 flex flex-col min-h-0 overflow-hidden" novalidate>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <!-- Nama -->
            <div class="space-y-1.5 col-span-1">
              <label for="create-name" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Nama Lengkap <span class="text-red-500 font-bold">*</span></label>
              <input id="create-name" v-model="createForm.name" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 disabled:opacity-50 transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" placeholder="Susanto" @blur="validateCreateName" />
              <p v-if="createNameError" class="text-[10px] text-red-500 font-bold px-1 mt-1">⚠ {{ createNameError }}</p>
            </div>
            
            <!-- No Telepon -->
            <div class="space-y-1.5 col-span-1">
              <label for="create-phone" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">No. Telepon <span class="text-red-500 font-bold">*</span></label>
              <input id="create-phone" v-model="createForm.phone_number" type="tel" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" placeholder="081234..." />
            </div>

            <!-- Email -->
            <div class="col-span-1 space-y-1.5">
              <label for="create-email" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Alamat Email</label>
              <input id="create-email" v-model="createForm.email" type="email" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" placeholder="susanto@mail.com" />
            </div>

            <div class="col-span-1 space-y-1.5">
              <div class="flex items-center justify-between">
                <label for="create-category" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Kategori</label>
                <NuxtLink to="/customers/category" class="text-[9px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Tambah Kategori &rarr;</NuxtLink>
              </div>
              <select 
                id="create-category" 
                v-model="createForm.category_customer_id" 
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer"
              >
                <option value="" disabled>Pilih Kategori...</option>
                <option v-for="cat in customerCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <!-- Alamat -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label for="create-address" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Alamat Lengkap</label>
              <textarea id="create-address" v-model="createForm.address" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none transition-all placeholder-gray-400" placeholder="Jl. Raya No. 123..."></textarea>
            </div>

            <!-- Catatan -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label for="create-note" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Catatan Internal</label>
              <input id="create-note" v-model="createForm.note" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[12px] font-medium text-gray-500 dark:text-zinc-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none" placeholder="Pembelian grosir..." />
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row gap-3 pt-6 flex-shrink-0">
            <Button type="button" variant="outline" class="flex-1 rounded-xl h-12 sm:py-6 font-bold tracking-wide border-gray-100 dark:border-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-all" @click="isCreateModalOpen = false" :disabled="isSubmitting">Kembali</Button>
            <Button type="submit" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 sm:py-6 font-bold shadow-lg shadow-indigo-500/20 gap-2 transition-all active:scale-95" :disabled="isSubmitting || !createForm.name || !createForm.phone_number">
              <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin text-white" />
              <Plus v-else class="w-4 h-4 text-white/50" />
              {{ isSubmitting ? 'Mendaftarkan...' : 'Konfirmasi' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <Dialog :open="isEditModalOpen" @update:open="val => { if (!isUpdating) isEditModalOpen = val }">
      <DialogContent class="max-w-[95vw] sm:max-w-lg bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-2xl p-0 max-h-[95vh] flex flex-col">
        <div class="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-zinc-800 bg-amber-50/30 dark:bg-amber-900/10 flex-shrink-0">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
            <Pencil class="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle class="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Perbarui Profil Konsumen</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-medium">Ubah informasi pelanggan agar tetap akurat.</DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitEdit" class="p-5 flex-1 flex flex-col min-h-0 overflow-hidden" novalidate>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <!-- Nama -->
            <div class="space-y-1.5 col-span-1">
              <label for="edit-name" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Nama Lengkap <span class="text-red-500 font-bold">*</span></label>
              <input id="edit-name" v-model="editForm.name" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500" @blur="validateEditName" />
              <p v-if="editNameError" class="text-[10px] text-red-500 font-bold px-1 mt-1">⚠ {{ editNameError }}</p>
            </div>

            <!-- No Telepon -->
            <div class="space-y-1.5 col-span-1">
              <label for="edit-phone" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">No. Telepon <span class="text-red-500 font-bold">*</span></label>
              <input id="edit-phone" v-model="editForm.phone_number" type="tel" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500" />
            </div>

            <!-- Email -->
            <div class="col-span-1 space-y-1.5">
              <label for="edit-email" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Alamat Email</label>
              <input id="edit-email" v-model="editForm.email" type="email" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500" />
            </div>

            <div class="col-span-1 space-y-1.5">
              <div class="flex items-center justify-between">
                <label for="edit-category" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Kategori</label>
                <NuxtLink to="/customers/category" class="text-[9px] font-bold text-amber-500 hover:text-amber-600 transition-colors uppercase tracking-tight">Tambah Kategori &rarr;</NuxtLink>
              </div>
              <select 
                id="edit-category" 
                v-model="editForm.category_customer_id" 
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer"
              >
                <option value="">Tanpa Kategori</option>
                <option v-for="cat in customerCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <!-- Alamat -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label for="edit-address" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Alamat Lengkap</label>
              <textarea id="edit-address" v-model="editForm.address" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none resize-none transition-all"></textarea>
            </div>

            <!-- Catatan -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label for="edit-note" class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Catatan Internal</label>
              <input id="edit-note" v-model="editForm.note" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[12px] font-medium text-gray-500 dark:text-zinc-400 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none" />
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row gap-3 pt-6 flex-shrink-0">
            <Button type="button" variant="outline" class="flex-1 rounded-xl h-12 sm:py-6 font-bold tracking-wide border-gray-100 dark:border-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-all" @click="isEditModalOpen = false" :disabled="isUpdating">Batal</Button>
            <Button type="submit" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-12 sm:py-6 font-bold shadow-lg shadow-amber-500/20 gap-2 transition-all active:scale-95" :disabled="isUpdating || !editForm.name || !editForm.phone_number">
              <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin text-white" />
              <Pencil v-else class="w-4 h-4 text-white/50" />
              {{ isUpdating ? 'Memperbarui...' : 'Simpan' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="max-w-[95vw] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight">Hapus Pelanggan Selamanya?</AlertDialogTitle>
          <AlertDialogDescription class="text-[13px] font-medium text-gray-500 dark:text-zinc-400">Tindakan ini tidak dapat dibatalkan. Riwayat transaksi mungkin akan terdampak di laporan akhir.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-2 sm:gap-0 mt-4">
          <AlertDialogCancel class="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/60 font-bold rounded-xl px-6 py-5">Batal</AlertDialogCancel>
          <AlertDialogAction @click="executeDelete" class="bg-red-500 hover:bg-red-600 text-white border-0 font-bold rounded-xl shadow-lg shadow-red-500/20 px-6 py-5 transition-all">Ya, Hapus Permanen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Users, CheckCircle2, Wallet,
  Search, ChevronDown, ChevronsUpDown,
  Activity, Eye, Pencil, Trash2, Loader2, Plus, Tags
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer, type CustomerItem } from '@/server/api/public/custumer'
import { getCustomerCategories, type CustomerCategoryItem } from '@/server/api/public/category-customer'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: 'Manajemen Pelanggan',
  ogTitle: 'Manajemen Pelanggan',
  description: `Kelola basis pelanggan Anda dengan efisien di ${appName}.`,
  ogDescription: `Kelola basis pelanggan Anda dengan efisien di ${appName}.`,
  ogUrl: url.href,
  twitterCard: 'summary_large_image',
})

// ─── State ─────────────────────────────────────────────────────────────────
const customers = ref<CustomerItem[]>([])
const customerCategories = ref<CustomerCategoryItem[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modal State
const isDetailModalOpen = ref(false)
const isLoadingDetail = ref(false)
const selectedCustomer = ref<CustomerItem | null>(null)

// Create Modal
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)
const createNameError = ref('')
const createForm = ref({ name: '', phone_number: '', email: '', address: '', note: '', category_customer_id: '' })

// Edit Modal
const isEditModalOpen = ref(false)
const isUpdating = ref(false)
const editingId = ref<string | number | null>(null)
const editNameError = ref('')
const editForm = ref({ name: '', phone_number: '', email: '', address: '', note: '', category_customer_id: '' })

// Delete Dialog State
const isDeleteDialogOpen = ref(false)
const deleteCustomerId = ref<string | number | null>(null)

// ─── Styling ────────────────────────────────────────────────────────────────
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

// ─── Fetching ───────────────────────────────────────────────────────────────
const fetchCustomerCategories = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    // Limit to large enough size to get all relevant categories for dropdown
    const response = await getCustomerCategories(token, 1, 100) 
    const result = await response.json()
    if (response.ok && result.success) {
      customerCategories.value = result.payload || []
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const fetchCustomers = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getCustomers(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      if (Array.isArray(result.payload)) {
        customers.value = result.payload
      } else if (result.payload && Array.isArray(result.payload.data)) {
        customers.value = result.payload.data
      } else {
        customers.value = []
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
      console.error('Failed to fetch customers:', result.message)
    }
  } catch (error) {
    console.error('Error fetching customers:', error)
  } finally {
    isLoading.value = false
  }
}

// ─── Search ─────────────────────────────────────────────────────────────────
let searchTimeout: any
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchCustomers()
  }, 500)
})

// ─── Pagination ─────────────────────────────────────────────────────────────
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchCustomers()
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchCustomers()
  }
}

onMounted(() => {
  fetchCustomers()
  fetchCustomerCategories()
})

// ─── Detail ─────────────────────────────────────────────────────────────────
const openCustomerDetail = async (id: string | number) => {
  isDetailModalOpen.value = true
  isLoadingDetail.value = true
  selectedCustomer.value = null
  
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getCustomerById(id, token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      selectedCustomer.value = result.payload
    } else {
      console.error('Failed to fetch customer detail:', result.message)
    }
  } catch (error) {
    console.error('Error fetching customer detail:', error)
  } finally {
    isLoadingDetail.value = false
  }
}

// ─── Create ─────────────────────────────────────────────────────────────────
const validateCreateName = () => {
  if (!createForm.value.name.trim()) {
    createNameError.value = 'Wajib mencantumkan nama.'
    return false
  }
  createNameError.value = ''
  return true
}

const openCreateModal = () => {
  createForm.value = { name: '', phone_number: '', email: '', address: '', note: '', category_customer_id: '' }
  createNameError.value = ''
  isCreateModalOpen.value = true
}

const submitCreate = async () => {
  if (!validateCreateName()) return
  if (!createForm.value.phone_number) return
  
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = {
      name: createForm.value.name.trim(),
      phone_number: createForm.value.phone_number.trim(),
      email: createForm.value.email.trim() || undefined,
      address: createForm.value.address.trim() || undefined,
      note: createForm.value.note.trim() || undefined,
      category_customer_id: createForm.value.category_customer_id || undefined
    }
    const response = await createCustomer(payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Selamat! Konsumen baru terdaftar.')
      isCreateModalOpen.value = false
      fetchCustomers()
    } else {
      alertError(result.message || 'Gagal mendaftarkan konsumen.')
    }
  } catch (error) {
    console.error('Error creating customer:', error)
    alertError('Sambungan terputus saat pendaftaran.')
  } finally {
    isSubmitting.value = false
  }
}

// ─── Edit ───────────────────────────────────────────────────────────────────
const validateEditName = () => {
  if (!editForm.value.name.trim()) {
    editNameError.value = 'Nama tidak boleh kosong.'
    return false
  }
  editNameError.value = ''
  return true
}

const openEditModal = (customer: CustomerItem) => {
  editingId.value = customer.id
  editForm.value = {
    name: customer.name,
    phone_number: customer.phone_number,
    email: customer.email || '',
    address: customer.address || '',
    note: customer.note || '',
    category_customer_id: customer.category_customer_id || (customer.category?.id || ''),
  }
  editNameError.value = ''
  isEditModalOpen.value = true
}

const submitEdit = async () => {
  if (!validateEditName()) return
  if (!editingId.value) return
  if (!editForm.value.phone_number) return

  isUpdating.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = {
      name: editForm.value.name.trim(),
      phone_number: editForm.value.phone_number.trim(),
      email: editForm.value.email.trim() || undefined,
      address: editForm.value.address.trim() || undefined,
      note: editForm.value.note.trim() || undefined,
      category_customer_id: editForm.value.category_customer_id || undefined
    }
    const response = await updateCustomer(editingId.value, payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Profil konsumen berhasil diperbarui.')
      isEditModalOpen.value = false
      fetchCustomers()
    } else {
      alertError(result.message || 'Gagal memperbarui profil.')
    }
  } catch (error) {
    console.error('Error updating customer:', error)
    alertError('Terjadi kegagalan sinkronisasi data.')
  } finally {
    isUpdating.value = false
  }
}

// ─── Delete ─────────────────────────────────────────────────────────────────
const confirmDelete = (id: string | number) => {
  deleteCustomerId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteCustomerId.value) return

  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteCustomer(deleteCustomerId.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data konsumen telah dibersihkan.')
      fetchCustomers()
    } else {
      alertError(result.message || 'Gagal menghapus pelanggan.')
    }
  } catch (error) {
    console.error('Error deleting customer:', error)
    alertError('Masalah jaringan saat penghapusan.')
  } finally {
    isDeleteDialogOpen.value = false
    deleteCustomerId.value = null
  }
}
</script>
