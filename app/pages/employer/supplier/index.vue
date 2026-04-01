<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
      <!-- Header -->
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Manajemen Supplier</h2>
          <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola dan lihat semua supplier dalam sistem</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-xl p-1 mr-1">
            <Button 
              variant="ghost" 
              size="icon" 
              class="h-9 w-9 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Export PDF"
              @click="exportToPDF"
            >
              <FileText class="w-[18px] h-[18px]" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              class="h-9 w-9 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              title="Export Excel"
              @click="exportToExcel"
            >
              <FileSpreadsheet class="w-[18px] h-[18px]" />
            </Button>
          </div>
          <Button 
            id="btn-tambah-supplier"
            class="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 px-5 rounded-xl shadow-lg shadow-indigo-500/20"
            @click="openCreateModal"
          >
            <Plus class="w-4 h-4" />
            Tambah Supplier
          </Button>
        </div>
      </div>

      <Separator class="bg-gray-100 dark:bg-zinc-800/60" />

      <!-- Toolbar -->
      <div class="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:max-w-xs">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            id="search-supplier"
            v-model="searchQuery"
            placeholder="Cari supplier..." 
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
            <DropdownMenuCheckboxItem checked>Kontak</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Alamat</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Tanggal</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- Table Section (Desktop) -->
      <div class="px-4 pb-4 overflow-x-auto hidden md:block">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5 ml-2">
                    Nama Supplier
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900 hidden md:table-cell">
                  <div class="flex items-center gap-1.5">
                    Kontak
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900 hidden lg:table-cell">
                  <div class="flex items-center gap-1.5">
                    Alamat
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900 hidden sm:table-cell">
                  <div class="flex items-center gap-1.5">
                    Terdaftar
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!-- Loading State -->
              <TableRow v-if="isLoading">
                <TableCell colspan="5" class="h-32 text-center text-zinc-500">
                  <Loader2 class="w-6 h-6 animate-spin mx-auto text-indigo-500" />
                  <p class="mt-2 text-sm font-medium">Memuat data supplier...</p>
                </TableCell>
              </TableRow>
              
              <!-- Empty State -->
              <TableRow v-else-if="suppliers.length === 0">
                <TableCell colspan="5" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Building2 class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tidak ada data supplier ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Data Rows -->
              <TableRow 
                v-else 
                v-for="supplier in suppliers" 
                :key="supplier.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer last:border-0 transition-colors" 
                @click="openSupplierDetail(supplier.id)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(supplier.name)}`">
                      {{ supplier.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 block truncate max-w-[150px] sm:max-w-none">{{ supplier.name }}</span>
                      <div class="flex flex-col md:hidden mt-0.5">
                        <span class="text-[11px] text-gray-400 truncate max-w-[140px]">{{ supplier.phone_number }}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden md:table-cell font-medium">
                  <div class="flex flex-col">
                    <span>{{ supplier.phone_number }}</span>
                    <span class="text-[11px] text-gray-400">{{ supplier.email }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden lg:table-cell font-medium max-w-[200px] truncate">
                  {{ supplier.address || '-' }}
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden sm:table-cell font-medium">{{ supplier.created_at || '-' }}</TableCell>

                <!-- Desktop Action Cell -->
                <TableCell class="py-2.5 pr-4 text-center">
                  <div class="flex items-center justify-center gap-1.5 focus-within:ring-0">
                    <button 
                      @click.stop="openSupplierDetail(supplier.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95"
                      title="Lihat Detail"
                    >
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="openEditModal(supplier)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all hover:text-amber-600 dark:hover:text-amber-400 active:scale-95"
                      title="Edit"
                    >
                      <Pencil class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="confirmDelete(supplier.id)" 
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

      <!-- Card Section (Mobile) -->
      <div class="px-4 pb-4 md:hidden flex flex-col gap-4">
        <!-- Loading State -->
        <div v-if="isLoading" class="py-12 text-center text-zinc-500">
           <Loader2 class="w-8 h-8 animate-spin mx-auto text-indigo-500" />
           <p class="mt-2 text-sm font-medium">Memuat data supplier...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="suppliers.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <Building2 class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Tidak ada data supplier.</p>
        </div>

        <!-- Cards -->
        <div 
          v-else 
          v-for="supplier in suppliers" 
          :key="supplier.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden group"
          @click="openSupplierDetail(supplier.id)"
        >
          <!-- Top Info -->
          <div class="flex items-start justify-between relative z-10">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(supplier.name)}`">
                {{ supplier.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <h4 class="text-[13px] font-bold text-gray-900 dark:text-white truncate leading-tight">{{ supplier.name }}</h4>
                <div class="flex items-center gap-1.5 mt-0.5">
                   <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <p class="text-[11px] font-medium text-gray-500 dark:text-zinc-400">{{ supplier.phone_number || '-' }}</p>
                </div>
              </div>
            </div>
            <!-- View Indicator (Eye Icon) -->
            <div class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-active:bg-indigo-600 group-active:text-white transition-colors shrink-0">
               <Eye class="w-[14px] h-[14px]" />
            </div>
          </div>
          
          <!-- Mid Content -->
          <div class="mt-4 space-y-2.5 relative z-10">
            <div class="p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100/50 dark:border-zinc-800/50">
               <div class="flex items-center gap-2 mb-0.5">
                  <span class="text-[9px] font-black uppercase tracking-tighter text-gray-400 dark:text-zinc-500">Alamat Lengkap</span>
               </div>
               <p class="text-[11px] font-semibold text-gray-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                  {{ supplier.address || 'Alamat belum dilengkapi.' }}
               </p>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="flex gap-2.5 mt-4 pt-4 border-t border-gray-50 dark:border-zinc-800/60 relative z-10">
             <Button 
               variant="outline" 
               class="flex-1 h-10 rounded-xl border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-xs font-bold gap-2"
               @click.stop="openEditModal(supplier)"
             >
               <Pencil class="w-3.5 h-3.5" />
               Edit Data
             </Button>
             <Button 
               variant="outline" 
               class="flex-1 h-10 rounded-xl border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-bold gap-2"
               @click.stop="confirmDelete(supplier.id)"
             >
               <Trash2 class="w-3.5 h-3.5" />
               Hapus
             </Button>
          </div>
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

    <!-- Supplier Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl rounded-2xl p-0 overflow-hidden outline-none">
        <div class="max-h-[85vh] overflow-y-auto">
          <!-- Header detail -->
          <div class="p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-10">
            <div class="flex items-center justify-between">
              <div>
                <DialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white leading-tight">Detail Supplier</DialogTitle>
                <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-1">Informasi lengkap data supplier.</DialogDescription>
              </div>
              <div class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Building2 class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div v-if="isLoadingDetail" class="py-16 flex flex-col items-center justify-center gap-3">
            <Loader2 class="w-8 h-8 animate-spin text-indigo-500" />
            <p class="text-xs font-bold text-gray-400 dark:text-zinc-500 animate-pulse">Menghubungkan...</p>
          </div>
          
          <div v-else-if="selectedSupplier" class="p-6 sm:p-7 space-y-6">
            <!-- Avatar & Main Brand -->
            <div class="flex flex-col items-center text-center space-y-3 pb-6 border-b border-gray-50 dark:border-zinc-800/60">
              <div :class="`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedSupplier.name)}`">
                {{ selectedSupplier.name.charAt(0).toUpperCase() }}
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-black text-gray-900 dark:text-white leading-tight">{{ selectedSupplier.name }}</h3>
                <span class="inline-flex px-2 px-1 rounded bg-gray-100 dark:bg-zinc-800 text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">ID: {{ selectedSupplier.id.substring(0, 8) }}...</span>
              </div>
            </div>
            
            <!-- Grid info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Kontak Utama</span>
                </div>
                <p class="text-[13px] font-black text-gray-800 dark:text-white leading-none">{{ selectedSupplier.phone_number || '-' }}</p>
                <p class="text-[11px] font-bold text-gray-400 dark:text-zinc-500 truncate">{{ selectedSupplier.email || 'Email tidak tersedia' }}</p>
              </div>

              <div class="space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Tanggal Registrasi</span>
                </div>
                <p class="text-[13px] font-black text-gray-800 dark:text-white leading-none">{{ selectedSupplier.created_at || '-' }}</p>
                <p class="text-[11px] font-bold text-gray-400 dark:text-zinc-500">Member Aktif</p>
              </div>

              <div class="sm:col-span-2 space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Alamat Bisnis</span>
                </div>
                <p class="text-[13px] font-semibold text-gray-800 dark:text-zinc-300 leading-relaxed">{{ selectedSupplier.address || 'Alamat belum dilengkapi.' }}</p>
              </div>

              <div class="sm:col-span-2 space-y-2 p-4 rounded-2xl bg-indigo-50/30 dark:bg-zinc-800/50 border border-indigo-100/50 dark:border-zinc-700/30">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span class="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">Catatan Khusus</span>
                </div>
                <p class="text-[12px] font-medium text-gray-700 dark:text-zinc-300 leading-relaxed italic">"{{ selectedSupplier.note || 'Tidak ada catatan tambahan untuk supplier ini.' }}"</p>
              </div>
            </div>

            <!-- Footer modal detail -->
            <div class="pt-4">
              <Button 
                variant="outline" 
                class="w-full py-6 rounded-2xl border-gray-100 dark:border-zinc-800 font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800"
                @click="isDetailModalOpen = false"
              >
                Tutup Detail
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Create Dialog -->
    <Dialog :open="isCreateModalOpen" @update:open="val => { if (!isSubmitting) isCreateModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-lg bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl rounded-2xl p-0 overflow-hidden outline-none">
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center gap-4 p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-20">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <Plus class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <DialogTitle class="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Tambah Supplier Baru</DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                Isi formulir berikut untuk mendaftarkan supplier baru.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitCreate" class="p-5 sm:p-6 space-y-5" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <!-- Nama Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="create-name" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nama Supplier <span class="text-red-500 text-[10px]">*</span>
                </label>
                <input
                  id="create-name"
                  v-model="createForm.name"
                  type="text"
                  placeholder="Contoh: PT. Sumber Makmur"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border text-[13px] font-semibold outline-none transition-all shadow-sm',
                    'bg-white dark:bg-zinc-900/50 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600',
                    createNameError ? 'border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 dark:border-zinc-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
                  ]"
                />
                <p v-if="createNameError" class="text-[11px] text-red-500 font-bold px-1">{{ createNameError }}</p>
              </div>

              <!-- Phone Field -->
              <div class="space-y-2">
                <label for="create-phone" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nomor Telepon
                </label>
                <input
                  id="create-phone"
                  v-model="createForm.phone_number"
                  type="tel"
                  placeholder="0812..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <!-- Email Field -->
              <div class="space-y-2">
                <label for="create-email" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Email
                </label>
                <input
                  id="create-email"
                  v-model="createForm.email"
                  type="email"
                  placeholder="supplier@example.com"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <!-- Address Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="create-address" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Alamat Lengkap
                </label>
                <textarea
                  id="create-address"
                  v-model="createForm.address"
                  rows="3"
                  placeholder="Alamat lengkap supplier..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 resize-none transition-all shadow-sm"
                />
              </div>

              <!-- Note Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="create-note" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Catatan Tambahan
                </label>
                <textarea
                  id="create-note"
                  v-model="createForm.note"
                  rows="2"
                  placeholder="Catatan tambahan (opsional)..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 resize-none transition-all shadow-sm"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-50 dark:border-zinc-800/50">
              <Button
                type="button"
                variant="outline"
                class="order-2 sm:order-1 flex-1 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800/60 rounded-xl py-6 font-bold text-sm"
                :disabled="isSubmitting"
                @click="isCreateModalOpen = false"
              >
                Nanti Saja
              </Button>
              <Button
                type="submit"
                class="order-1 sm:order-2 flex-1 bg-indigo-600 hover:bg-indigo-700 text-white gap-2.5 shadow-lg shadow-indigo-500/20 rounded-xl py-6 font-bold text-sm active:scale-[0.98] transition-all"
                :disabled="isSubmitting || !createForm.name.trim()"
              >
                <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
                <Plus v-else class="w-4 h-4" />
                {{ isSubmitting ? 'Mendaftarkan...' : 'Daftarkan Supplier' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog :open="isEditModalOpen" @update:open="val => { if (!isUpdating) isEditModalOpen = val }">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-lg bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl rounded-2xl p-0 overflow-hidden outline-none">
        <div class="max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center gap-4 p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-20">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <Pencil class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <DialogTitle class="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Perbarui Supplier</DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                Sesuaikan data supplier dengan informasi terbaru.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitEdit" class="p-5 sm:p-6 space-y-5" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <!-- Nama Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="edit-name" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nama Supplier <span class="text-red-500 text-[10px]">*</span>
                </label>
                <input
                  id="edit-name"
                  v-model="editForm.name"
                  type="text"
                  placeholder="Masukkan nama supplier..."
                  :class="[
                    'w-full px-4 py-3 rounded-xl border text-[13px] font-semibold outline-none transition-all shadow-sm',
                    'bg-white dark:bg-zinc-900/50 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600',
                    editNameError ? 'border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 dark:border-zinc-800 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500'
                  ]"
                />
                <p v-if="editNameError" class="text-[11px] text-red-500 font-bold px-1">{{ editNameError }}</p>
              </div>

              <!-- Phone Field -->
              <div class="space-y-2">
                <label for="edit-phone" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nomor Telepon
                </label>
                <input
                  id="edit-phone"
                  v-model="editForm.phone_number"
                  type="tel"
                  placeholder="0812..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm"
                />
              </div>

              <!-- Email Field -->
              <div class="space-y-2">
                <label for="edit-email" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Email
                </label>
                <input
                  id="edit-email"
                  v-model="editForm.email"
                  type="email"
                  placeholder="supplier@example.com"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm"
                />
              </div>

              <!-- Address Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="edit-address" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Alamat Lengkap
                </label>
                <textarea
                  id="edit-address"
                  v-model="editForm.address"
                  rows="3"
                  placeholder="Alamat lengkap supplier..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 resize-none transition-all shadow-sm"
                />
              </div>

              <!-- Note Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="edit-note" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Catatan Tambahan
                </label>
                <textarea
                  id="edit-note"
                  v-model="editForm.note"
                  rows="2"
                  placeholder="Catatan tambahan..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 resize-none transition-all shadow-sm"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-50 dark:border-zinc-800/50">
              <Button
                type="button"
                variant="outline"
                class="order-2 sm:order-1 flex-1 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800/60 rounded-xl py-6 font-bold text-sm"
                :disabled="isUpdating"
                @click="isEditModalOpen = false"
              >
                Batal
              </Button>
              <Button
                type="submit"
                class="order-1 sm:order-2 flex-1 bg-amber-500 hover:bg-amber-600 text-white gap-2.5 shadow-lg shadow-amber-500/20 rounded-xl py-6 font-bold text-sm active:scale-[0.98] transition-all"
                :disabled="isUpdating || !editForm.name.trim()"
              >
                <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin" />
                <Pencil v-else class="w-4 h-4" />
                {{ isUpdating ? 'Memperbarui...' : 'Simpan Perubahan' }}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog :open="isDeleteDialogOpen" @update:open="isDeleteDialogOpen = $event">
      <AlertDialogContent class="bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white">Hapus Supplier Selamanya?</AlertDialogTitle>
          <AlertDialogDescription class="text-[13px] font-medium text-gray-500 dark:text-zinc-400">
            Data supplier yang dihapus tidak dapat dipulihkan. Pastikan tidak ada transaksi yang tertunda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-2 sm:gap-0">
          <AlertDialogCancel class="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/60 font-bold rounded-xl">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="bg-red-500 hover:bg-red-600 text-white border-0 font-bold rounded-xl shadow-lg shadow-red-500/20"
          >
            Ya, Hapus Supplier
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
  Eye, Pencil, Trash2, Loader2, Plus, Building2,
  FileText, FileSpreadsheet
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
import { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier, type SupplierItem } from '@/server/api/warehouse/supplier'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: 'Manajemen Supplier',
  ogTitle: 'Manajemen Supplier',
  description: `Kelola supplier bisnis Anda dengan mudah di ${appName}.`,
  ogDescription: `Kelola supplier bisnis Anda dengan mudah di ${appName}.`,
  ogUrl: url.href,
  twitterCard: 'summary_large_image',
})

// ─── State ─────────────────────────────────────────────────────────────────
const suppliers = ref<SupplierItem[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Detail Modal
const isDetailModalOpen = ref(false)
const isLoadingDetail = ref(false)
const selectedSupplier = ref<SupplierItem | null>(null)

// Create Modal
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)
const createNameError = ref('')
const createForm = ref({ name: '', phone_number: '', email: '', address: '', note: '' })

// Edit Modal
const isEditModalOpen = ref(false)
const isUpdating = ref(false)
const editingId = ref<string | null>(null)
const editNameError = ref('')
const editForm = ref({ name: '', phone_number: '', email: '', address: '', note: '' })

// Delete Dialog
const isDeleteDialogOpen = ref(false)
const deleteSupplierId = ref<string | null>(null)

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
const fetchSuppliers = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getSuppliers(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      suppliers.value = result.payload || []

      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      } else {
        totalPages.value = 1
      }
    } else {
      console.error('Failed to fetch suppliers:', result.message)
    }
  } catch (error) {
    console.error('Error fetching suppliers:', error)
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
    fetchSuppliers()
  }, 500)
})

// ─── Pagination ─────────────────────────────────────────────────────────────
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchSuppliers()
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchSuppliers()
  }
}

onMounted(() => {
  fetchSuppliers()
})

// ─── Detail ─────────────────────────────────────────────────────────────────
const openSupplierDetail = async (id: string) => {
  isDetailModalOpen.value = true
  isLoadingDetail.value = true
  selectedSupplier.value = null
  
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getSupplierById(id, token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      selectedSupplier.value = result.payload
    } else {
      console.error('Failed to fetch supplier detail:', result.message)
    }
  } catch (error) {
    console.error('Error fetching supplier detail:', error)
  } finally {
    isLoadingDetail.value = false
  }
}

// ─── Create ─────────────────────────────────────────────────────────────────
const validateCreate = () => {
  if (!createForm.value.name.trim()) {
    createNameError.value = 'Mohon masukkan nama supplier.'
    return false
  }
  createNameError.value = ''
  return true
}

const openCreateModal = () => {
  createForm.value = { name: '', phone_number: '', email: '', address: '', note: '' }
  createNameError.value = ''
  isCreateModalOpen.value = true
}

const submitCreate = async () => {
  if (!validateCreate()) return
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await createSupplier(createForm.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Supplier baru berhasil terdaftar.')
      isCreateModalOpen.value = false
      fetchSuppliers()
    } else {
      alertError(result.message || 'Gagal mendaftarkan supplier.')
    }
  } catch (error) {
    console.error('Error creating supplier:', error)
    alertError('Sambungan gagal saat pendaftaran.')
  } finally {
    isSubmitting.value = false
  }
}

// ─── Edit ───────────────────────────────────────────────────────────────────
const openEditModal = (supplier: SupplierItem) => {
  editingId.value = supplier.id
  editForm.value = {
    name: supplier.name,
    phone_number: supplier.phone_number || '',
    email: supplier.email || '',
    address: supplier.address || '',
    note: supplier.note || '',
  }
  editNameError.value = ''
  isEditModalOpen.value = true
}

const submitEdit = async () => {
  if (!editForm.value.name.trim()) {
    editNameError.value = 'Nama supplier wajib diisi.'
    return
  }
  if (!editingId.value) return
  isUpdating.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await updateSupplier(editingId.value, editForm.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data supplier telah diperbarui.')
      isEditModalOpen.value = false
      fetchSuppliers()
    } else {
      alertError(result.message || 'Gagal memperbarui supplier.')
    }
  } catch (error) {
    console.error('Error updating supplier:', error)
    alertError('Terjadi kegagalan sambungan.')
  } finally {
    isUpdating.value = false
  }
}

// ─── Delete ─────────────────────────────────────────────────────────────────
const confirmDelete = (id: string) => {
  deleteSupplierId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteSupplierId.value) return

  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteSupplier(deleteSupplierId.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data supplier berhasil dihapus.')
      fetchSuppliers()
    } else {
      alertError(result.message || 'Gagal menghapus supplier.')
    }
  } catch (error) {
    console.error('Error deleting supplier:', error)
    alertError('Masalah jaringan saat menghapus supplier.')
  } finally {
    isDeleteDialogOpen.value = false
    deleteSupplierId.value = null
  }
}

// ─── Export ─────────────────────────────────────────────────────────────────
const exportToPDF = async () => {
  if (suppliers.value.length === 0) {
    alertError('Tidak ada data untuk diekspor.')
    return
  }

  try {
    const { jsPDF } = await import('jspdf')
    const autoTable = (await import('jspdf-autotable')).default
    
    const doc = new jsPDF()
    const tableColumn = ["No", "Nama Supplier", "Telepon", "Email", "Alamat", "Terdaftar"]
    const tableRows: any[] = []

    suppliers.value.forEach((supplier, index) => {
      const supplierData = [
        index + 1,
        supplier.name,
        supplier.phone_number || '-',
        supplier.email || '-',
        supplier.address || '-',
        supplier.created_at || '-'
      ]
      tableRows.push(supplierData)
    })

    // Header Report
    doc.setFontSize(18)
    doc.text("Laporan Data Supplier", 14, 20)
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 28)

    // @ts-ignore
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [249, 250, 251] },
    })

    doc.save(`supplier-report-${Date.now()}.pdf`)
    alertSuccess('PDF berhasil diunduh.')
  } catch (error) {
    console.error('Error exporting PDF:', error)
    alertError('Gagal mengekspor PDF.')
  }
}

const exportToExcel = async () => {
  if (suppliers.value.length === 0) {
    alertError('Tidak ada data untuk diekspor.')
    return
  }

  try {
    const XLSX = await import('xlsx')
    
    const dataToExport = suppliers.value.map((supplier, index) => ({
      "No": index + 1,
      "Nama Supplier": supplier.name,
      "Telepon": supplier.phone_number || '-',
      "Email": supplier.email || '-',
      "Alamat": supplier.address || '-',
      "Tanggal Terdaftar": supplier.created_at || '-'
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers")
    
    XLSX.writeFile(workbook, `supplier-export-${Date.now()}.xlsx`)
    alertSuccess('Excel berhasil diunduh.')
  } catch (error) {
    console.error('Error exporting Excel:', error)
    alertError('Gagal mengekspor Excel.')
  }
}
</script>
