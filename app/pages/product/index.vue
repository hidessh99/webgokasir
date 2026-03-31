<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-indigo-600 dark:text-indigo-400">Daftar Produk</h2>
          <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 font-medium">Kelola menu, harga, dan inventaris produk Anda</p>
        </div>
        <Button 
          id="btn-tambah-produk"
          class="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-500/20 px-6 font-bold"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      <Separator class="bg-gray-100 dark:bg-zinc-800/60" />

      <!-- Toolbar -->
      <div class="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30 dark:bg-zinc-800/10">
        <div class="relative w-full sm:max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            id="search-produk"
            v-model="searchQuery"
            placeholder="Cari nama, SKU, atau kategori..." 
            class="pl-9 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-xs font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 dark:focus:border-indigo-500 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 transition-all"
          />
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="flex-1 sm:flex-none h-9 gap-2 border-gray-200 dark:border-zinc-700 rounded-lg text-xs font-bold text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-900">
                Kolom
                <ChevronDown class="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem checked>SKU</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Harga Jual</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Kategori</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <!-- Table Section -->
      <div class="px-4 pb-4 overflow-x-auto">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 w-[300px]">
                  <div class="flex items-center gap-1.5 ml-2">
                    Informasi Produk
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 hidden sm:table-cell">
                  Kategori
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 hidden md:table-cell">
                  Harga Jual
                </TableHead>
                <TableHead class="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-400 font-bold h-10 text-center hidden sm:table-cell">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- Loading State -->
              <TableRow v-if="isLoading">
                <TableCell colspan="4" class="h-40 text-center">
                  <Loader2 class="w-8 h-8 animate-spin mx-auto text-indigo-500 mb-3" />
                  <p class="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">Menghubungkan Database...</p>
                </TableCell>
              </TableRow>
              
              <!-- Empty State -->
              <TableRow v-else-if="menus.length === 0">
                <TableCell colspan="4" class="h-40 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                      <LayoutGrid class="w-6 h-6 text-gray-300 dark:text-zinc-600" />
                    </div>
                    <p class="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">Belum Ada Produk</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Data Rows -->
              <TableRow 
                v-else 
                v-for="menu in menus" 
                :key="menu.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer transition-all duration-200 group" 
                @click="openMenuDetail(menu.id)"
              >
                <TableCell class="py-3 pl-4">
                  <div class="flex items-center gap-3">
                    <!-- Product Image -->
                    <div class="w-12 h-12 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50 flex-shrink-0 overflow-hidden shadow-sm relative group-hover:scale-105 transition-transform">
                      <img v-if="menu.image" :src="menu.image" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-600">
                        <ImageIcon class="w-5 h-5" />
                      </div>
                    </div>
                    <div class="min-w-0">
                      <span class="text-[13px] font-bold text-gray-900 dark:text-gray-100 block truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{{ menu.name }}</span>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-mono tracking-tighter">{{ menu.sku_code || 'NO-SKU' }}</span>
                        <!-- Mobile Category Badge -->
                        <span v-if="menu.category" class="sm:hidden text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50">{{ menu.category.name }}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="py-3 hidden sm:table-cell">
                  <div v-if="menu.category" class="flex items-center gap-1.5">
                    <div class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <span class="text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400">{{ menu.category.name }}</span>
                  </div>
                  <span v-else class="text-[10px] font-bold text-gray-300 dark:text-zinc-700 uppercase tracking-widest italic select-none">-</span>
                </TableCell>
                <TableCell class="py-3 hidden md:table-cell font-mono text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
                  Rp {{ formatPrice(menu.selling_price) }}
                </TableCell>

                <!-- Desktop Action Cell -->
                <TableCell class="py-3 pr-4 text-center hidden sm:table-cell">
                  <div class="flex items-center justify-center gap-1">
                    <button 
                      @click.stop="openMenuDetail(menu.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-90"
                      title="Lihat Detail"
                    >
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="openEditModal(menu)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-zinc-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all active:scale-90"
                      title="Edit"
                    >
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="confirmDelete(menu.id)" 
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
      <div class="px-4 py-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between sm:px-6 bg-gray-50/10">
        <div class="flex-1 flex justify-between sm:hidden px-2">
          <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-[11px] font-bold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-30 transition-all">
            Sebelumnya
          </button>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-zinc-700 text-[11px] font-bold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-30 transition-all">
            Selanjutnya
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest pl-2">
              Hal. {{ currentPage }} / {{ totalPages }}
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-xl shadow-sm gap-2" aria-label="Pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-30 transition-all">
                Sebelumnya
              </button>
              <button @click="nextPage" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-30 transition-all">
                Selanjutnya
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="max-w-[95vw] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-2xl p-0 transition-all max-h-[95vh] flex flex-col">
        <div class="p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 flex-shrink-0">
          <DialogTitle class="text-[16px] font-bold text-gray-900 dark:text-white mb-1">Rincian Informasi Menu</DialogTitle>
          <DialogDescription class="text-xs text-gray-500 dark:text-zinc-400">
            Detail lengkap mengenai produk dan kebijakan harga.
          </DialogDescription>
        </div>

        <div v-if="isLoadingDetail" class="py-12 flex justify-center flex-1">
          <Loader2 class="w-8 h-8 animate-spin text-indigo-500" />
        </div>
        
        <div v-else-if="selectedMenu" class="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          <div class="flex items-center gap-5 pb-5 border-b border-gray-50 dark:border-zinc-800/50">
            <div class="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-zinc-800 shrink-0 shadow-inner">
              <img v-if="selectedMenu.image" :src="selectedMenu.image" class="w-full h-full object-cover" />
              <ImageIcon v-else class="w-8 h-8 text-gray-200 dark:text-zinc-700" />
            </div>
            <div class="min-w-0">
              <h3 class="font-bold text-gray-900 dark:text-white truncate uppercase tracking-tight text-[15px]">{{ selectedMenu.name }}</h3>
              <div class="flex items-center gap-2 mt-1.5" v-if="selectedMenu.category">
                <Tags class="w-3 h-3 text-amber-500" />
                <span class="text-[10px] font-bold uppercase tracking-wider text-amber-500">{{ selectedMenu.category.name }}</span>
              </div>
              <p class="text-[10px] text-gray-400 dark:text-zinc-500 font-mono mt-2 tracking-tighter truncate">PUBLICID: {{ selectedMenu.public_id || 'N/A' }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1 space-y-1.5 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">SKU Code</span>
              <p class="text-[13px] font-bold text-gray-800 dark:text-zinc-200 font-mono tracking-tighter">{{ selectedMenu.sku_code }}</p>
            </div>
            <div class="col-span-2 sm:col-span-1 space-y-1.5 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Barcode</span>
              <p class="text-[13px] font-bold text-gray-800 dark:text-zinc-200 font-mono tracking-tighter">{{ selectedMenu.barcode || '-' }}</p>
            </div>
            <div class="col-span-2 sm:col-span-1 space-y-1.5 px-3 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/20 dark:bg-indigo-900/10">
              <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block">Harga Jual</span>
              <p class="text-[15px] font-bold text-indigo-600 dark:text-indigo-400">Rp {{ formatPrice(selectedMenu.selling_price) }}</p>
            </div>
            <div class="col-span-2 sm:col-span-1 space-y-1.5 px-3 py-2.5 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/10">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block">Harga Beli</span>
              <p class="text-[15px] font-bold text-gray-500 dark:text-zinc-400">Rp {{ formatPrice(selectedMenu.purchase_price || 0) }}</p>
            </div>
            <div class="col-span-2 space-y-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 shadow-sm">
              <span class="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">Deskripsi Produk</span>
              <p class="text-[12px] font-medium text-gray-600 dark:text-zinc-400 leading-relaxed">{{ selectedMenu.description || 'Tidak ada deskripsi tersedia.' }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog :open="isCreateModalOpen" @update:open="val => { if (!isSubmitting) isCreateModalOpen = val }">
      <DialogContent class="max-w-[95vw] sm:max-w-lg bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-2xl p-0 max-h-[95vh] flex flex-col">
        <div class="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/20 dark:bg-zinc-800/20 flex-shrink-0">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
            <Plus class="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle class="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Daftarkan Menu Baru</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Tambahkan produk baru ke dalam daftar inventaris Anda.</DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitCreate" class="p-5 flex-1 flex flex-col min-h-0 overflow-hidden" novalidate>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <!-- Nama -->
            <div class="space-y-1.5 col-span-1">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Nama Produk <span class="text-red-500 font-bold">*</span></label>
              <input v-model="createForm.name" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500" placeholder="Mie Goreng Spesial" @blur="validateCreateName" />
              <p v-if="createNameError" class="text-[10px] text-red-500 font-bold px-1 mt-1">⚠ {{ createNameError }}</p>
            </div>
            
            <!-- Category -->
            <div class="space-y-1.5 col-span-1">
              <div class="flex items-center justify-between">
                <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Kategori</label>
                <NuxtLink to="/category/manage" class="text-[9px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors uppercase tracking-tight">Tambah &rarr;</NuxtLink>
              </div>
              <select v-model="createForm.category_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 appearance-none bg-no-repeat bg-[right_1rem_center] cursor-pointer">
                <option value="" disabled>Pilih Kategori...</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Barcode / Kode Produk</label>
              <input v-model="createForm.barcode" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-inner" placeholder="Scan barcode atau masukkan kode manual..." />
            </div>

            <!-- Harga Beli -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Harga Beli</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rp</span>
                <input v-model.number="createForm.purchase_price" type="number" class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none shadow-inner" placeholder="0" />
              </div>
            </div>
            <!-- Harga Jual -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">Harga Jual <span class="text-red-500 font-bold">*</span></label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-400">Rp</span>
                <input v-model.number="createForm.selling_price" type="number" class="w-full pl-10 pr-4 py-2.5 rounded-xl border-indigo-200 dark:border-indigo-900 bg-indigo-50/5 dark:bg-indigo-900/5 text-[13px] font-bold text-indigo-600 dark:text-indigo-300 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none shadow-sm" placeholder="0" />
              </div>
            </div>

            <!-- Image URL -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">URL Gambar Produk</label>
              <div class="flex gap-2">
                <input v-model="createForm.image" type="text" class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[12px] font-medium text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all" placeholder="https://domain.com/gambar.jpg" />
                <div class="w-11 h-11 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                   <img v-if="createForm.image" :src="createForm.image" class="w-full h-full object-cover" />
                   <ImageIcon v-else class="w-4 h-4 text-gray-300 dark:text-zinc-600" />
                </div>
              </div>
            </div>

            <!-- Deskripsi -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Deskripsi Menu</label>
              <textarea v-model="createForm.description" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-medium text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none resize-none transition-all placeholder-gray-400" placeholder="Tuliskan detail ramuan atau info produk..."></textarea>
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row gap-3 pt-6 flex-shrink-0">
            <Button type="button" variant="outline" class="flex-1 rounded-xl h-12 sm:py-6 font-bold tracking-wide border-gray-100 dark:border-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-300 transition-all" @click="isCreateModalOpen = false" :disabled="isSubmitting">Kembali</Button>
            <Button type="submit" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 sm:py-6 font-bold shadow-lg shadow-indigo-500/20 gap-2 transition-all active:scale-[0.98]" :disabled="isSubmitting || !createForm.name || !createForm.selling_price">
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
        <div class="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-zinc-800 bg-amber-50/20 dark:bg-amber-900/10 flex-shrink-0">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shrink-0">
            <Pencil class="w-5 h-5 text-white" />
          </div>
          <div>
            <DialogTitle class="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Perbarui Master Produk</DialogTitle>
            <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-medium">Ubah spesifikasi atau penyesuaian harga menu.</DialogDescription>
          </div>
        </div>

        <form @submit.prevent="submitEdit" class="p-5 flex-1 flex flex-col min-h-0 overflow-hidden" novalidate>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
             <!-- Nama -->
            <div class="space-y-1.5 col-span-1">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Nama Produk <span class="text-red-500 font-bold">*</span></label>
              <input v-model="editForm.name" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 transition-all outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 shadow-inner" @blur="validateEditName" />
              <p v-if="editNameError" class="text-[10px] text-red-500 font-bold px-1 mt-1">⚠ {{ editNameError }}</p>
            </div>
            
            <!-- Category -->
            <div class="space-y-1.5 col-span-1">
              <div class="flex items-center justify-between">
                <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Kategori</label>
                <NuxtLink to="/category/manage" class="text-[9px] font-bold text-amber-500 hover:text-amber-600 transition-colors uppercase tracking-tight">Kelola &rarr;</NuxtLink>
              </div>
              <select v-model="editForm.category_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 cursor-pointer appearance-none">
                <option value="">Tanpa Kategori</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Barcode / Kode Produk</label>
              <input v-model="editForm.barcode" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none shadow-inner" />
            </div>

            <!-- Harga Harga -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Harga Beli</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rp</span>
                <input v-model.number="editForm.purchase_price" type="number" class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-bold text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none shadow-sm" />
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Harga Jual <span class="text-red-500 font-bold">*</span></label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-500">Rp</span>
                <input v-model.number="editForm.selling_price" type="number" class="w-full pl-10 pr-4 py-2.5 rounded-xl border-amber-200 dark:border-amber-900/50 bg-amber-50/5 dark:bg-amber-900/5 text-[13px] font-bold text-amber-600 dark:text-amber-400 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 outline-none shadow-sm" />
              </div>
            </div>

            <!-- Image URL -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">URL Gambar Produk</label>
              <div class="flex gap-2">
                <input v-model="editForm.image" type="text" class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[12px] font-medium text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all" />
                <div class="w-11 h-11 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                   <img v-if="editForm.image" :src="editForm.image" class="w-full h-full object-cover" />
                   <ImageIcon v-else class="w-4 h-4 text-gray-200 dark:text-zinc-700" />
                </div>
              </div>
            </div>

            <!-- Deskripsi -->
            <div class="col-span-1 sm:col-span-2 space-y-1.5">
              <label class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest">Deskripsi Menu</label>
              <textarea v-model="editForm.description" rows="2" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[13px] font-medium text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none resize-none transition-all" placeholder="Tuliskan detail..."></textarea>
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row gap-3 pt-6 flex-shrink-0">
            <Button type="button" variant="outline" class="flex-1 rounded-xl h-12 sm:py-6 font-bold tracking-wide border-gray-100 dark:border-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-300 transition-all font-mono" @click="isEditModalOpen = false" :disabled="isUpdating">Batal</Button>
            <Button type="submit" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl h-12 sm:py-6 font-bold shadow-lg shadow-amber-500/20 gap-2 transition-all active:scale-[0.98]" :disabled="isUpdating || !editForm.name || !editForm.selling_price">
              <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin text-white" />
              <Pencil v-else class="w-4 h-4 text-white/50" />
              {{ isUpdating ? 'Memperbarui...' : 'Simpan' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="max-w-[95vw] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-0">
        <div class="p-6">
          <AlertDialogHeader>
            <AlertDialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight">Hapus Produk Ini?</AlertDialogTitle>
            <AlertDialogDescription class="text-[13px] font-medium text-gray-500 dark:text-zinc-400">
              Data produk dan riwayat SKU terkait akan dihapus secara permanen. Pastikan Anda tidak memiliki transaksi aktif yang merujuk pada produk ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-0 bg-gray-50/50 dark:bg-zinc-800/30 p-4 pt-2">
          <AlertDialogCancel class="flex-1 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700 font-bold rounded-xl px-6 py-5 transition-all">Batal</AlertDialogCancel>
          <AlertDialogAction @click="executeDelete" class="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 font-bold rounded-xl shadow-lg shadow-red-500/20 px-6 py-5 transition-all sm:ml-2">Ya, Hapus Permanen</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  LayoutGrid, Search, ChevronDown, ChevronsUpDown,
  Eye, Pencil, Trash2, Loader2, Plus, Tags, Image as ImageIcon
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
import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu, type MenuItem } from '@/server/api/public/menu'
import { getCategories, type CategoryItem } from '@/server/api/public/category'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Manajemen Produk - ${appName}`,
  ogTitle: `Manajemen Produk - ${appName}`,
  description: `Atur daftar menu dan inventaris produk Anda dengan sistem POS terpadu di ${appName}.`,
  ogDescription: `Kelola stok, harga, dan kategori produk Anda dengan efisien.`,
  ogUrl: url.href,
  twitterCard: 'summary_large_image',
})

// ─── State ─────────────────────────────────────────────────────────────────
const menus = ref<MenuItem[]>([])
const categories = ref<CategoryItem[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Modal State
const isDetailModalOpen = ref(false)
const isLoadingDetail = ref(false)
const selectedMenu = ref<MenuItem | null>(null)

// Create Modal
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)
const createNameError = ref('')
const createForm = ref({ 
  name: '', 
  sku_code: '', 
  barcode: '', 
  description: '', 
  selling_price: 0, 
  purchase_price: 0, 
  category_id: '',
  image: ''
})

// Edit Modal
const isEditModalOpen = ref(false)
const isUpdating = ref(false)
const editingId = ref<string | number | null>(null)
const editNameError = ref('')
const editForm = ref({ 
  name: '', 
  sku_code: '', 
  barcode: '', 
  description: '', 
  selling_price: 0, 
  purchase_price: 0, 
  category_id: '',
  image: ''
})

// Delete Dialog State
const isDeleteDialogOpen = ref(false)
const deleteMenuId = ref<string | number | null>(null)

// ─── Helper ────────────────────────────────────────────────────────────────
const formatPrice = (price: number) => {
  return price.toLocaleString('id-ID')
}

// ─── Fetching ───────────────────────────────────────────────────────────────
const fetchMasterData = async () => {
    try {
        const token = localStorage.getItem('token') || ''
        const response = await getCategories(token, 1, 100)
        const result = await response.json()
        if (response.ok && result.success) {
            categories.value = result.payload || []
        }
    } catch (e) {
        console.error('Error fetching categories:', e)
    }
}

const fetchMenus = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getMenus(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      if (Array.isArray(result.payload)) {
        menus.value = result.payload
      } else {
        menus.value = []
      }

      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      }
    } else {
      console.error('Failed to fetch menus:', result.message)
    }
  } catch (error) {
    console.error('Error fetching menus:', error)
  } finally {
    isLoading.value = false
  }
}

// ─── Search & Pagination ───────────────────────────────────────────────────
let searchTimeout: any
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchMenus()
  }, 500)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchMenus()
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchMenus()
  }
}

onMounted(() => {
  fetchMenus()
  fetchMasterData()
})

// ─── Detail ─────────────────────────────────────────────────────────────────
const openMenuDetail = async (id: string | number) => {
  isDetailModalOpen.value = true
  isLoadingDetail.value = true
  selectedMenu.value = null
  
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getMenuById(id, token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      selectedMenu.value = result.payload
    } else {
      console.error('Failed to fetch menu detail:', result.message)
    }
  } catch (error) {
    console.error('Error fetching menu detail:', error)
  } finally {
    isLoadingDetail.value = false
  }
}

// ─── Create ─────────────────────────────────────────────────────────────────
const validateCreateName = () => {
  if (!createForm.value.name.trim()) {
    createNameError.value = 'Nama menu wajib diisi.'
    return false
  }
  createNameError.value = ''
  return true
}

const openCreateModal = () => {
  createForm.value = { 
    name: '', sku_code: '', barcode: '', description: '', 
    selling_price: 0, purchase_price: 0, category_id: '', image: '' 
  }
  createNameError.value = ''
  isCreateModalOpen.value = true
}

const submitCreate = async () => {
  if (!validateCreateName()) return
  if (createForm.value.selling_price < 0) return
  
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const payload = {
      ...createForm.value,
      name: createForm.value.name.trim(),
      category_id: createForm.value.category_id || undefined,
      description: createForm.value.description.trim() || undefined,
      sku_code: createForm.value.sku_code.trim() || undefined,
      barcode: createForm.value.barcode.trim() || undefined,
      image: createForm.value.image.trim() || undefined,
    }
    const response = await createMenu(payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Produk baru berhasil didaftarkan.')
      isCreateModalOpen.value = false
      fetchMenus()
    } else {
      alertError(result.message || 'Gagal mendaftarkan produk.')
    }
  } catch (error) {
    console.error('Error creating menu:', error)
    alertError('Terjadi kesalahan koneksi saat pendaftaran.')
  } finally {
    isSubmitting.value = false
  }
}

// ─── Edit ───────────────────────────────────────────────────────────────────
const validateEditName = () => {
  if (!editForm.value.name.trim()) {
    editNameError.value = 'Nama produk tidak boleh kosong.'
    return false
  }
  editNameError.value = ''
  return true
}

const openEditModal = (menu: MenuItem) => {
  editingId.value = menu.id
  editForm.value = {
    name: menu.name,
    sku_code: menu.sku_code || '',
    barcode: menu.barcode || '',
    description: menu.description || '',
    selling_price: menu.selling_price,
    purchase_price: menu.purchase_price || 0,
    category_id: menu.category?.id || '',
    image: menu.image || '',
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
      ...editForm.value,
      name: editForm.value.name.trim(),
      category_id: editForm.value.category_id || undefined,
      description: editForm.value.description.trim() || undefined,
      sku_code: editForm.value.sku_code.trim() || undefined,
      barcode: editForm.value.barcode.trim() || undefined,
      image: editForm.value.image.trim() || undefined,
    }
    const response = await updateMenu(editingId.value, payload, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Master produk berhasil diperbarui.')
      isEditModalOpen.value = false
      fetchMenus()
    } else {
      alertError(result.message || 'Gagal memperbarui data produk.')
    }
  } catch (error) {
    console.error('Error updating menu:', error)
    alertError('Terjadi kegagalan sinkronisasi dengan server.')
  } finally {
    isUpdating.value = false
  }
}

// ─── Delete ─────────────────────────────────────────────────────────────────
const confirmDelete = (id: string | number) => {
  deleteMenuId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteMenuId.value) return

  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteMenu(deleteMenuId.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data produk telah dihapus selamanya.')
      fetchMenus()
    } else {
      alertError(result.message || 'Gagal menghapus produk.')
    }
  } catch (error) {
    console.error('Error deleting menu:', error)
    alertError('Terjadi gangguan jaringan saat penghapusan.')
  } finally {
    isDeleteDialogOpen.value = false
    deleteMenuId.value = null
  }
}
</script>
