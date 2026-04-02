<template>
  <div class="p-4 sm:p-6 space-y-6">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Manajemen Staff</h2>
        <p class="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Kelola dan lihat semua staff/employer dalam sistem</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-xl p-1 shadow-sm">
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
          id="btn-tambah-staff"
          class="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 h-11 px-5 rounded-xl shadow-lg shadow-indigo-500/20"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4" />
          Tambah Staff
        </Button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          id="search-staff"
          v-model="searchQuery"
          placeholder="Cari staff dari nama..." 
          class="pl-9 bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg h-9 w-full text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all font-medium"
        />
      </div>
    </div>

    <!-- Main Section -->
    <div class="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">

      <!-- Table Section (Desktop) -->
      <div class="px-4 pb-4 overflow-x-auto hidden md:block">
        <div class="border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
          <Table>
            <TableHeader>
              <TableRow class="hover:bg-transparent border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5 ml-2">
                    Nama Staff
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900 hidden md:table-cell">
                  <div class="flex items-center gap-1.5">
                    Email
                    <ChevronsUpDown class="w-[10px] h-[10px] text-gray-400" />
                  </div>
                </TableHead>
                <TableHead class="text-xs text-gray-500 dark:text-zinc-400 font-semibold h-10 cursor-pointer hover:text-gray-900">
                  <div class="flex items-center gap-1.5">
                    Role
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
                  <p class="mt-2 text-sm font-medium">Memuat data staff...</p>
                </TableCell>
              </TableRow>
              
              <!-- Empty State -->
              <TableRow v-else-if="staffs.length === 0">
                <TableCell colspan="5" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <UserSquare2 class="w-8 h-8 text-gray-300 dark:text-zinc-600" />
                    <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tidak ada data staff ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Data Rows -->
              <TableRow 
                v-else 
                v-for="staff in staffs" 
                :key="staff.id" 
                class="border-gray-100 dark:border-zinc-800/60 hover:bg-gray-50/50 dark:hover:bg-zinc-800/40 cursor-pointer last:border-0 transition-colors" 
                @click="openStaffDetail(staff.id)"
              >
                <TableCell class="py-2.5 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm ${getAvatarColor(staff.name)}`">
                      {{ staff.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <span class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 block truncate max-w-[150px] sm:max-w-none">{{ staff.name }}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden md:table-cell font-medium">
                  {{ staff.email }}
                </TableCell>
                <TableCell class="py-2.5">
                  <Badge variant="secondary" :class="[
                    'text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border-0',
                    staff.role === 'admin' ? 'bg-indigo-500/10 text-indigo-500' : 
                    staff.role === 'warehouse' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-emerald-500/10 text-emerald-500'
                  ]">
                    {{ staff.role || 'user' }}
                  </Badge>
                </TableCell>
                <TableCell class="text-[13px] text-gray-500 dark:text-zinc-400 py-2.5 hidden sm:table-cell font-medium">{{ staff.created_at || '-' }}</TableCell>

                <!-- Desktop Action Cell -->
                <TableCell class="py-2.5 pr-4 text-center">
                  <div class="flex items-center justify-center gap-1.5 focus-within:ring-0">
                    <button 
                      @click.stop="openStaffDetail(staff.id)" 
                      class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95"
                      title="Lihat Detail"
                    >
                      <Eye class="w-[15px] h-[15px]" />
                    </button>
                    <button 
                      @click.stop="confirmDelete(staff.id)" 
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
           <p class="mt-2 text-sm font-medium">Memuat data staff...</p>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="staffs.length === 0" class="py-12 text-center border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl">
           <UserSquare2 class="w-10 h-10 text-gray-300 dark:text-zinc-600 mx-auto" />
           <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-2">Tidak ada data staff.</p>
        </div>

        <!-- Cards -->
        <div 
          v-else 
          v-for="staff in staffs" 
          :key="staff.id"
          class="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all relative overflow-hidden group"
          @click="openStaffDetail(staff.id)"
        >
          <!-- Top Info -->
          <div class="flex items-start justify-between relative z-10">
            <div class="flex items-center gap-3">
              <div :class="`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0 shadow-md ${getAvatarColor(staff.name)}`">
                {{ staff.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 pr-8">
                <div class="flex items-center gap-2">
                  <h4 class="text-[13px] font-bold text-gray-900 dark:text-white truncate leading-tight">{{ staff.name }}</h4>
                  <Badge variant="secondary" :class="[
                    'text-[8px] font-black uppercase px-1 py-0 rounded border-0',
                    staff.role === 'admin' ? 'bg-indigo-500/10 text-indigo-500' : 
                    staff.role === 'warehouse' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-emerald-500/10 text-emerald-500'
                  ]">
                    {{ staff.role || 'user' }}
                  </Badge>
                </div>
                <div class="flex items-center gap-1.5 mt-0.5">
                   <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                   <p class="text-[11px] font-medium text-gray-500 dark:text-zinc-400">{{ staff.email }}</p>
                </div>
              </div>
            </div>
            <!-- View Indicator -->
            <div class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-active:bg-indigo-600 group-active:text-white transition-colors shrink-0">
               <Eye class="w-[14px] h-[14px]" />
            </div>
          </div>
          
          <!-- Mid Content -->
          <div class="mt-4 space-y-2.5 relative z-10">
            <div class="p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100/50 dark:border-zinc-800/50">
               <div class="flex items-center gap-2 mb-0.5">
                  <span class="text-[9px] font-black uppercase tracking-tighter text-gray-400 dark:text-zinc-500">Deskripsi</span>
               </div>
               <p class="text-[11px] font-semibold text-gray-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                  {{ staff.description || 'Tidak ada deskripsi.' }}
               </p>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="flex gap-2.5 mt-4 pt-4 border-t border-gray-50 dark:border-zinc-800/60 relative z-10">
             <Button 
               variant="outline" 
               class="flex-1 h-10 rounded-xl border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-bold gap-2"
               @click.stop="confirmDelete(staff.id)"
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

    <!-- Staff Detail Dialog -->
    <Dialog :open="isDetailModalOpen" @update:open="isDetailModalOpen = $event">
      <DialogContent class="w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-2xl rounded-2xl p-0 overflow-hidden outline-none">
        <div class="max-h-[85vh] overflow-y-auto">
          <!-- Header detail -->
          <div class="p-5 sm:p-6 border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-10">
            <div class="flex items-center justify-between">
              <div>
                <DialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white leading-tight">Detail Staff</DialogTitle>
                <DialogDescription class="text-xs text-gray-400 dark:text-zinc-500 mt-1">Informasi lengkap data employer/staff.</DialogDescription>
              </div>
              <div class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <User2 class="w-4 h-4" />
              </div>
            </div>
          </div>

          <div v-if="isLoadingDetail" class="py-16 flex flex-col items-center justify-center gap-3">
            <Loader2 class="w-8 h-8 animate-spin text-indigo-500" />
            <p class="text-xs font-bold text-gray-400 dark:text-zinc-500 animate-pulse">Menghubungkan...</p>
          </div>
          
          <div v-else-if="selectedStaff" class="p-6 sm:p-7 space-y-6">
            <!-- Avatar & Main Brand -->
            <div class="flex flex-col items-center text-center space-y-3 pb-6 border-b border-gray-50 dark:border-zinc-800/60">
              <div :class="`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl rotate-3 shrink-0 ${getAvatarColor(selectedStaff.name)}`">
                {{ selectedStaff.name.charAt(0).toUpperCase() }}
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-black text-gray-900 dark:text-white leading-tight">{{ selectedStaff.name }}</h3>
                <span class="inline-flex px-2 px-1 rounded bg-gray-100 dark:bg-zinc-800 text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">ID: {{ selectedStaff.id.substring(0, 8) }}...</span>
              </div>
            </div>
            
            <!-- Grid info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Akun Email</span>
                </div>
                <p class="text-[13px] font-black text-gray-800 dark:text-white leading-none truncate">{{ selectedStaff.email }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[11px] font-bold text-gray-400 dark:text-zinc-500">Staff Aktif</span>
                </div>
              </div>

              <div class="space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Tanggal Bergabung</span>
                </div>
                <p class="text-[13px] font-black text-gray-800 dark:text-white leading-none">{{ selectedStaff.created_at || '-' }}</p>
                <span class="text-[11px] font-bold text-gray-400 dark:text-zinc-500 mt-1 block">GoKasir ERP</span>
              </div>

              <div class="space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Peran / Role</span>
                </div>
                <div class="flex items-center gap-2">
                  <Badge variant="secondary" :class="[
                    'text-[11px] font-black uppercase px-2 py-0.5 rounded-md border-0',
                    selectedStaff.role === 'admin' ? 'bg-indigo-500/10 text-indigo-500' : 
                    selectedStaff.role === 'warehouse' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-emerald-500/10 text-emerald-500'
                  ]">
                    {{ selectedStaff.role || 'User' }}
                  </Badge>
                </div>
              </div>

              <div class="space-y-2 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-50 dark:border-zinc-800/50">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  <span class="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">Auth ID</span>
                </div>
                <p class="text-[13px] font-black text-gray-800 dark:text-white leading-none truncate">{{ selectedStaff.auth_id || '-' }}</p>
                <span class="text-[11px] font-bold text-gray-400 dark:text-zinc-500 mt-1 block tracking-tighter">System ID</span>
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
              <DialogTitle class="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Tambah Staff Baru</DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                Isi formulir berikut untuk mendaftarkan staff baru.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitCreate" class="p-5 sm:p-6 space-y-5" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <!-- Nama Field -->
              <div class="space-y-2 sm:col-span-1">
                <label for="create-name" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nama Staff <span class="text-red-500 text-[10px]">*</span>
                </label>
                <input
                  id="create-name"
                  v-model="createForm.name"
                  type="text"
                  placeholder="Nama Lengkap"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border text-[13px] font-semibold outline-none transition-all shadow-sm',
                    'bg-white dark:bg-zinc-900/50 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600',
                    createNameError ? 'border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 dark:border-zinc-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
                  ]"
                />
                <p v-if="createNameError" class="text-[11px] text-red-500 font-bold px-1">{{ createNameError }}</p>
              </div>

              <!-- Role Field -->
              <div class="space-y-2 sm:col-span-1">
                <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Role Staff
                </label>
                <Select v-model="createForm.role">
                  <SelectTrigger class="w-full h-[46px] rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold transition-all">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Email Field -->
              <div class="space-y-2 sm:col-span-1">
                <label for="create-email" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Email Akun <span class="text-red-500 text-[10px]">*</span>
                </label>
                <input
                  id="create-email"
                  v-model="createForm.email"
                  type="email"
                  placeholder="email@example.com"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <!-- Phone Field -->
              <div class="space-y-2 sm:col-span-1">
                <label for="create-phone" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nomor Telepon
                </label>
                <input
                  id="create-phone"
                  v-model="createForm.phone_number"
                  type="text"
                  placeholder="628xxx"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <!-- Password -->
              <div class="space-y-2 sm:col-span-2">
                <label for="create-password" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Password Baru
                </label>
                <input
                  id="create-password"
                  v-model="createForm.password"
                  type="password"
                  placeholder="******"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <!-- Description Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="create-description" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Keterangan
                </label>
                <textarea
                  id="create-description"
                  v-model="createForm.description"
                  rows="2"
                  placeholder="Contoh: Staff bagian depan"
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
                {{ isSubmitting ? 'Mendaftarkan...' : 'Daftarkan Staff' }}
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
              <DialogTitle class="text-[15px] sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Perbarui Staff</DialogTitle>
              <DialogDescription class="text-xs sm:text-sm text-gray-400 dark:text-zinc-500 mt-0.5">
                Sesuaikan data staff dengan informasi terbaru.
              </DialogDescription>
            </div>
          </div>

          <form @submit.prevent="submitEdit" class="p-5 sm:p-6 space-y-5" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <!-- Nama Field -->
              <div class="space-y-2 sm:col-span-1">
                <label for="edit-name" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nama Staff <span class="text-red-500 text-[10px]">*</span>
                </label>
                <input
                  id="edit-name"
                  v-model="editForm.name"
                  type="text"
                  placeholder="Nama Lengkap"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border text-[13px] font-semibold outline-none transition-all shadow-sm',
                    'bg-white dark:bg-zinc-900/50 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600',
                    editNameError ? 'border-red-400 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 dark:border-zinc-800 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500'
                  ]"
                />
                <p v-if="editNameError" class="text-[11px] text-red-500 font-bold px-1">{{ editNameError }}</p>
              </div>

              <!-- Role Field -->
              <div class="space-y-2 sm:col-span-1">
                <label class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Role Staff
                </label>
                <Select v-model="editForm.role">
                  <SelectTrigger class="w-full h-[46px] rounded-xl border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold transition-all">
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Email Field -->
              <div class="space-y-2 sm:col-span-1">
                <label for="edit-email" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Email Akun
                </label>
                <input
                  id="edit-email"
                  v-model="editForm.email"
                  type="email"
                  placeholder="email@example.com"
                  readonly
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-800 text-[13px] font-semibold text-gray-500 outline-none cursor-not-allowed shadow-sm"
                />
              </div>

              <!-- Phone Field -->
              <div class="space-y-2 sm:col-span-1">
                <label for="edit-phone" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Nomor Telepon
                </label>
                <input
                  id="edit-phone"
                  v-model="editForm.phone_number"
                  type="text"
                  placeholder="628xxx"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-[13px] font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm"
                />
              </div>

              <!-- Description Field -->
              <div class="space-y-2 sm:col-span-2">
                <label for="edit-description" class="text-[11px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest block px-0.5">
                  Keterangan
                </label>
                <textarea
                  id="edit-description"
                  v-model="editForm.description"
                  rows="2"
                  placeholder="Contoh: Staff bagian depan"
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
          <AlertDialogTitle class="text-[17px] font-bold text-gray-900 dark:text-white">Hapus Staff Selamanya?</AlertDialogTitle>
          <AlertDialogDescription class="text-[13px] font-medium text-gray-500 dark:text-zinc-400">
            Akses staff ini ke sistem akan segera dicabut. Data yang dihapus tidak dapat dipulihkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-2 sm:gap-0">
          <AlertDialogCancel class="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/60 font-bold rounded-xl">Batal</AlertDialogCancel>
          <AlertDialogAction 
            @click="executeDelete" 
            class="bg-red-500 hover:bg-red-600 text-white border-0 font-bold rounded-xl shadow-lg shadow-red-500/20"
          >
            Ya, Hapus Staff
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {
  Search, ChevronsUpDown,
  Eye, Pencil, Trash2, Loader2, Plus, UserSquare2, User2,
  FileText, FileSpreadsheet
} from 'lucide-vue-next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
import { getEmployers, getEmployerById, createEmployer, updateEmployer, deleteEmployer, type EmployerItem } from '@/server/api/warehouse/employer'
import { alertSuccess, alertError } from '@/lib/alert'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: 'Manajemen Staff',
  ogTitle: 'Manajemen Staff',
  description: `Kelola staff bisnis Anda dengan mudah di ${appName}.`,
  ogDescription: `Kelola staff bisnis Anda dengan mudah di ${appName}.`,
  ogUrl: url.href,
  twitterCard: 'summary_large_image',
})

// ─── State ─────────────────────────────────────────────────────────────────
const staffs = ref<EmployerItem[]>([])
const isLoading = ref(true)

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)

// Detail Modal
const isDetailModalOpen = ref(false)
const isLoadingDetail = ref(false)
const selectedStaff = ref<EmployerItem | null>(null)

// Create Modal
const isCreateModalOpen = ref(false)
const isSubmitting = ref(false)
const createNameError = ref('')
const createForm = ref({ 
  name: '', 
  email: '', 
  description: '', 
  password: '',
  role: 'cashier',
  phone_number: ''
})

// Edit Modal
const isEditModalOpen = ref(false)
const isUpdating = ref(false)
const editingId = ref<string | null>(null)
const editNameError = ref('')
const editForm = ref({ 
  name: '', 
  email: '', 
  description: '',
  role: 'cashier',
  phone_number: ''
})

// Delete Dialog
const isDeleteDialogOpen = ref(false)
const deleteStaffId = ref<string | null>(null)

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
const fetchStaffs = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getEmployers(token, currentPage.value, pageSize.value, searchQuery.value)
    const result = await response.json()
    
    if (response.ok && result.success) {
      staffs.value = result.payload || []

      if (result.additional_info) {
        currentPage.value = result.additional_info.page || 1
        totalPages.value = Math.ceil((result.additional_info.total || 0) / (result.additional_info.size || 10)) || 1
      } else {
        totalPages.value = 1
      }
    } else {
      console.error('Failed to fetch staff:', result.message)
    }
  } catch (error) {
    console.error('Error fetching staff:', error)
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
    fetchStaffs()
  }, 500)
})

// ─── Pagination ─────────────────────────────────────────────────────────────
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchStaffs()
  }
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchStaffs()
  }
}

onMounted(() => {
  fetchStaffs()
})

// ─── Detail ─────────────────────────────────────────────────────────────────
const openStaffDetail = async (id: string) => {
  isDetailModalOpen.value = true
  isLoadingDetail.value = true
  selectedStaff.value = null
  
  try {
    const token = localStorage.getItem('token') || ''
    const response = await getEmployerById(id, token)
    const result = await response.json()
    
    if (response.ok && result.success) {
      selectedStaff.value = result.payload
    } else {
      console.error('Failed to fetch staff detail:', result.message)
    }
  } catch (error) {
    console.error('Error fetching staff detail:', error)
  } finally {
    isLoadingDetail.value = false
  }
}

// ─── Create ─────────────────────────────────────────────────────────────────
const validateCreate = () => {
  if (!createForm.value.name.trim()) {
    createNameError.value = 'Mohon masukkan nama staff.'
    return false
  }
  createNameError.value = ''
  return true
}

const openCreateModal = () => {
  createForm.value = { 
    name: '', 
    email: '', 
    description: '', 
    password: '',
    role: 'cashier',
    phone_number: ''
  }
  createNameError.value = ''
  isCreateModalOpen.value = true
}

const submitCreate = async () => {
  if (!validateCreate()) return
  isSubmitting.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await createEmployer(createForm.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Staff baru berhasil terdaftar.')
      isCreateModalOpen.value = false
      fetchStaffs()
    } else {
      alertError(result.message || 'Gagal mendaftarkan staff.')
    }
  } catch (error) {
    console.error('Error creating staff:', error)
    alertError('Sambungan gagal saat pendaftaran.')
  } finally {
    isSubmitting.value = false
  }
}

// ─── Edit ───────────────────────────────────────────────────────────────────
const openEditModal = (staff: EmployerItem) => {
  editingId.value = staff.id
  editForm.value = {
    name: staff.name,
    email: staff.email,
    description: staff.description || '',
    role: staff.role || 'cashier',
    phone_number: staff.phone_number || ''
  }
  editNameError.value = ''
  isEditModalOpen.value = true
}

const submitEdit = async () => {
  if (!editForm.value.name.trim()) {
    editNameError.value = 'Nama staff wajib diisi.'
    return
  }
  if (!editingId.value) return
  isUpdating.value = true
  try {
    const token = localStorage.getItem('token') || ''
    const response = await updateEmployer(editingId.value, editForm.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Data staff telah diperbarui.')
      isEditModalOpen.value = false
      fetchStaffs()
    } else {
      alertError(result.message || 'Gagal memperbarui staff.')
    }
  } catch (error) {
    console.error('Error updating staff:', error)
    alertError('Terjadi kegagalan sambungan.')
  } finally {
    isUpdating.value = false
  }
}

// ─── Delete ─────────────────────────────────────────────────────────────────
const confirmDelete = (id: string) => {
  deleteStaffId.value = id
  isDeleteDialogOpen.value = true
}

const executeDelete = async () => {
  if (!deleteStaffId.value) return
  try {
    const token = localStorage.getItem('token') || ''
    const response = await deleteEmployer(deleteStaffId.value, token)
    const result = await response.json()

    if (response.ok && result.success) {
      await alertSuccess('Staff telah berhasil dihapus.')
      fetchStaffs()
    } else {
      alertError(result.message || 'Gagal menghapus staff.')
    }
  } catch (error) {
    console.error('Error deleting staff:', error)
    alertError('Masalah jaringan saat menghapus staff.')
  } finally {
    isDeleteDialogOpen.value = false
    deleteStaffId.value = null
  }
}

// ─── Export ─────────────────────────────────────────────────────────────────
const exportToPDF = async () => {
  if (staffs.value.length === 0) {
    alertError('Tidak ada data untuk diekspor.')
    return
  }

  try {
    const { jsPDF } = await import('jspdf')
    const autoTable = (await import('jspdf-autotable')).default
    
    const doc = new jsPDF()
    const tableColumn = ["No", "Nama Staff", "Email", "Deskripsi", "Terdaftar"]
    const tableRows: any[] = []

    staffs.value.forEach((staff, index) => {
      const staffData = [
        index + 1,
        staff.name,
        staff.email || '-',
        staff.description || '-',
        staff.created_at || '-'
      ]
      tableRows.push(staffData)
    })

    doc.setFontSize(18)
    doc.text("Laporan Data Staff", 14, 20)
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

    doc.save(`staff-report-${Date.now()}.pdf`)
    alertSuccess('PDF berhasil diunduh.')
  } catch (error) {
    console.error('Error exporting PDF:', error)
    alertError('Gagal mengekspor PDF.')
  }
}

const exportToExcel = async () => {
  if (staffs.value.length === 0) {
    alertError('Tidak ada data untuk diekspor.')
    return
  }

  try {
    const XLSX = await import('xlsx')
    
    const dataToExport = staffs.value.map((staff, index) => ({
      "No": index + 1,
      "Nama Staff": staff.name,
      "Email": staff.email || '-',
      "Deskripsi": staff.description || '-',
      "Tanggal Terdaftar": staff.created_at || '-'
    }))

    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staffs")
    
    XLSX.writeFile(workbook, `staff-export-${Date.now()}.xlsx`)
    alertSuccess('Excel berhasil diunduh.')
  } catch (error) {
    console.error('Error exporting Excel:', error)
    alertError('Gagal mengekspor Excel.')
  }
}
</script>
