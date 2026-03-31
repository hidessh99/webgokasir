<template>
  <div class="p-4 sm:p-6 space-y-5 min-h-full">

    <!-- Page Header -->
    <div class="text-center space-y-1 pb-2">
      <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Mitra & Pelanggan</h1>
      <p class="text-sm text-zinc-500">Kelola data pelanggan, supplier, riwayat transaksi, dan pembelian di satu tempat.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <!-- Total Pelanggan -->
      <div class="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-4 flex items-center gap-4 hover:border-zinc-700/60 transition-colors">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
          <Users class="w-5 h-5 text-white" />
        </div>
        <div>
          <p class="text-xs text-zinc-500 font-medium">Total Pelanggan</p>
          <p class="text-2xl font-bold text-white mt-0.5">{{ stats.totalCustomers }}</p>
        </div>
      </div>
      <!-- Total Belanja -->
      <div class="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-4 flex items-center gap-4 hover:border-zinc-700/60 transition-colors">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <ShoppingCart class="w-5 h-5 text-white" />
        </div>
        <div>
          <p class="text-xs text-zinc-500 font-medium">Total Belanja</p>
          <p class="text-2xl font-bold text-white mt-0.5">{{ formatRupiah(stats.totalSpend) }}</p>
        </div>
      </div>
    </div>

    <!-- Loyalty Pelanggan -->
    <div class="bg-zinc-900/50 border border-zinc-800/60 rounded-xl">
      <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
        <div class="flex items-center gap-2">
          <Star class="w-4 h-4 text-amber-400" />
          <span class="text-sm font-semibold text-white">Loyalty Pelanggan</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          class="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 px-2.5 gap-1.5"
          @click="showTierDialog = true"
        >
          <Settings2 class="w-3.5 h-3.5" />
          Atur Tier
        </Button>
      </div>
      <!-- Tier Cards or Empty -->
      <div v-if="loyaltyTiers.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4">
        <div
          v-for="tier in loyaltyTiers"
          :key="tier.name"
          class="rounded-lg border border-zinc-800/60 p-3 hover:border-zinc-700 transition-colors"
        >
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-lg">{{ tier.emoji }}</span>
            <span class="text-sm font-semibold text-white">{{ tier.name }}</span>
          </div>
          <p class="text-xs text-zinc-500">Min. belanja {{ formatRupiah(tier.minSpend) }}</p>
          <p class="text-xs text-emerald-400 mt-1 font-medium">{{ tier.memberCount }} member</p>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center py-8 text-center">
        <Star class="w-8 h-8 text-zinc-700 mb-2" />
        <p class="text-sm text-zinc-500">Belum ada pelanggan untuk ditampilkan.</p>
      </div>
    </div>

    <!-- Main Table Card -->
    <div class="bg-zinc-900/50 border border-zinc-800/60 rounded-xl">
      <!-- Tabs -->
      <div class="flex items-center border-b border-zinc-800/60 px-4 pt-3 gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="[
            'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px',
            activeTab === tab.key
              ? 'text-white border-indigo-500 bg-zinc-800/40'
              : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-800/30'
          ]"
          @click="activeTab = tab.key"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5" />
          {{ tab.label }}
          <span :class="[
            'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
            activeTab === tab.key
              ? 'bg-indigo-500/20 text-indigo-400'
              : 'bg-zinc-800 text-zinc-500'
          ]">
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Search + Actions -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          <Input
            v-model="searchQuery"
            :placeholder="activeTab === 'customer' ? 'Cari nama, telepon, email pelanggan...' : 'Cari nama, telepon, email supplier...'"
            class="pl-9 h-9 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-600 text-sm rounded-lg"
          />
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            class="h-9 bg-emerald-600 hover:bg-emerald-500 text-white text-xs gap-1.5 px-4"
            @click="openAddDialog"
          >
            <Plus class="w-4 h-4" />
            {{ activeTab === 'customer' ? 'Tambah Pelanggan' : 'Tambah Supplier' }}
          </Button>
          <Button
            variant="outline"
            size="sm"
            class="h-9 bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs gap-1.5"
            @click="handleExport"
          >
            <FileDown class="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="border-zinc-800/60 hover:bg-transparent">
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto pl-4">Nama</TableHead>
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto">Telepon</TableHead>
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto hidden md:table-cell">Email</TableHead>
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto hidden lg:table-cell">Alamat</TableHead>
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto text-right">Total Belanja</TableHead>
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto text-right hidden sm:table-cell">Transaksi</TableHead>
              <TableHead class="text-xs text-zinc-500 font-medium py-2 h-auto text-center pr-4">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="filteredData.length > 0">
              <TableRow
                v-for="item in filteredData"
                :key="item.id"
                class="border-zinc-800/40 hover:bg-zinc-800/30 transition-colors group"
              >
                <!-- Nama -->
                <TableCell class="py-3 pl-4">
                  <div class="flex items-center gap-3">
                    <div :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0',
                      `bg-gradient-to-br ${avatarGradient(item.name)}`
                    ]">
                      {{ item.name[0].toUpperCase() }}
                    </div>
                    <div>
                      <p class="text-sm text-white font-medium leading-tight truncate max-w-[120px]">{{ item.name }}</p>
                      <p v-if="item.tier" class="flex items-center gap-1 mt-0.5">
                        <span class="text-[10px]">{{ item.tier.emoji }}</span>
                        <span class="text-[10px] text-amber-400 font-medium">{{ item.tier.name }}</span>
                      </p>
                    </div>
                  </div>
                </TableCell>
                <!-- Telepon -->
                <TableCell class="py-3 text-sm text-zinc-400">{{ item.phone || '-' }}</TableCell>
                <!-- Email -->
                <TableCell class="py-3 text-sm text-zinc-400 hidden md:table-cell truncate max-w-[160px]">{{ item.email || '-' }}</TableCell>
                <!-- Alamat -->
                <TableCell class="py-3 text-xs text-zinc-500 hidden lg:table-cell truncate max-w-[180px]">{{ item.address || '-' }}</TableCell>
                <!-- Total Belanja -->
                <TableCell class="py-3 text-sm text-white font-medium text-right whitespace-nowrap">
                  {{ formatRupiah(item.totalSpend) }}
                </TableCell>
                <!-- Transaksi -->
                <TableCell class="py-3 text-sm text-zinc-400 text-right hidden sm:table-cell">
                  {{ item.transactions }}x
                </TableCell>
                <!-- Aksi -->
                <TableCell class="py-3 pr-4">
                  <div class="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-7 w-7 text-zinc-500 hover:text-white hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all"
                      @click="openDetailDialog(item)"
                    >
                      <Eye class="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-7 w-7 text-zinc-500 hover:text-indigo-400 hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all"
                      @click="openEditDialog(item)"
                    >
                      <Pencil class="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all"
                      @click="confirmDelete(item)"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </template>
            <!-- Empty State -->
            <TableRow v-else class="border-0 hover:bg-transparent">
              <TableCell colspan="7" class="py-16 text-center">
                <div class="flex flex-col items-center gap-3">
                  <div class="w-14 h-14 rounded-full bg-zinc-800/60 flex items-center justify-center">
                    <component :is="activeTab === 'customer' ? Users : Building2" class="w-6 h-6 text-zinc-600" />
                  </div>
                  <div>
                    <p class="text-sm text-zinc-500 font-medium">
                      {{ activeTab === 'customer' ? 'Belum ada pelanggan.' : 'Belum ada supplier.' }}
                    </p>
                    <button
                      class="text-sm text-emerald-400 hover:text-emerald-300 font-medium mt-1 transition-colors"
                      @click="openAddDialog"
                    >
                      + {{ activeTab === 'customer' ? 'Tambah Pelanggan Pertama' : 'Tambah Supplier Pertama' }}
                    </button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredData.length > 0" class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-zinc-800/60">
        <p class="text-xs text-zinc-500">
          Menampilkan {{ filteredData.length }} dari {{ currentList.length }} data
        </p>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" class="h-7 px-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-xs" disabled>
            <ChevronLeft class="w-3.5 h-3.5" />
          </Button>
          <span class="text-xs text-zinc-400 px-2">Hal. 1 / 1</span>
          <Button variant="outline" size="sm" class="h-7 px-2 bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-xs" disabled>
            <ChevronRight class="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- ====== DIALOG: Tambah/Edit Pelanggan ====== -->
    <Dialog v-model:open="showFormDialog">
      <DialogContent class="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle class="text-base font-semibold">
            {{ editTarget ? (activeTab === 'customer' ? 'Edit Pelanggan' : 'Edit Supplier') : (activeTab === 'customer' ? 'Tambah Pelanggan' : 'Tambah Supplier') }}
          </DialogTitle>
          <DialogDescription class="text-zinc-500 text-xs">
            {{ activeTab === 'customer' ? 'Isi data pelanggan dengan lengkap.' : 'Isi data supplier dengan lengkap.' }}
          </DialogDescription>
        </DialogHeader>
        <form class="space-y-4 mt-2" @submit.prevent="handleSave">
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-zinc-300">Nama Lengkap <span class="text-red-400">*</span></label>
            <Input
              v-model="form.name"
              placeholder="Masukkan nama lengkap"
              class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus-visible:ring-0 h-9"
              required
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1.5">
              <label class="text-xs font-medium text-zinc-300">Telepon</label>
              <Input
                v-model="form.phone"
                placeholder="08xx-xxxx-xxxx"
                class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus-visible:ring-0 h-9"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-medium text-zinc-300">Email</label>
              <Input
                v-model="form.email"
                type="email"
                placeholder="email@domain.com"
                class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus-visible:ring-0 h-9"
              />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-zinc-300">Alamat</label>
            <Input
              v-model="form.address"
              placeholder="Jl. Contoh No. 1, Kota"
              class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus-visible:ring-0 h-9"
            />
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-zinc-300">Catatan</label>
            <Input
              v-model="form.note"
              placeholder="Catatan tambahan (opsional)"
              class="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus-visible:ring-0 h-9"
            />
          </div>
          <DialogFooter class="pt-2 gap-2">
            <Button type="button" variant="outline" class="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-9" @click="showFormDialog = false">
              Batal
            </Button>
            <Button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white h-9 px-6">
              {{ editTarget ? 'Simpan Perubahan' : (activeTab === 'customer' ? 'Tambah Pelanggan' : 'Tambah Supplier') }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- ====== DIALOG: Detail Pelanggan ====== -->
    <Dialog v-model:open="showDetailDialog">
      <DialogContent class="bg-zinc-900 border-zinc-800 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle class="text-base font-semibold">Detail Pelanggan</DialogTitle>
        </DialogHeader>
        <template v-if="detailTarget">
          <div class="flex flex-col items-center gap-3 py-2">
            <div :class="[
              'w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white',
              `bg-gradient-to-br ${avatarGradient(detailTarget.name)}`
            ]">
              {{ detailTarget.name[0].toUpperCase() }}
            </div>
            <div class="text-center">
              <p class="text-base font-semibold text-white">{{ detailTarget.name }}</p>
              <p v-if="detailTarget.tier" class="text-sm text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                {{ detailTarget.tier.emoji }} {{ detailTarget.tier.name }}
              </p>
            </div>
          </div>
          <div class="space-y-3 bg-zinc-800/40 rounded-lg p-4 text-sm">
            <div class="flex justify-between">
              <span class="text-zinc-500">Telepon</span>
              <span class="text-white font-medium">{{ detailTarget.phone || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-zinc-500">Email</span>
              <span class="text-white font-medium truncate ml-4 text-right">{{ detailTarget.email || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-zinc-500 shrink-0">Alamat</span>
              <span class="text-white font-medium text-right ml-4">{{ detailTarget.address || '-' }}</span>
            </div>
            <Separator class="bg-zinc-700/60" />
            <div class="flex justify-between">
              <span class="text-zinc-500">Total Belanja</span>
              <span class="text-emerald-400 font-semibold">{{ formatRupiah(detailTarget.totalSpend) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-zinc-500">Jumlah Transaksi</span>
              <span class="text-white font-medium">{{ detailTarget.transactions }}x</span>
            </div>
          </div>
        </template>
        <DialogFooter class="pt-1">
          <Button variant="outline" class="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-9 w-full" @click="showDetailDialog = false">
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- ====== DIALOG: Konfirmasi Hapus ====== -->
    <AlertDialog v-model:open="showDeleteDialog">
      <AlertDialogContent class="bg-zinc-900 border-zinc-800 text-white max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle class="text-white">Hapus Data?</AlertDialogTitle>
          <AlertDialogDescription class="text-zinc-500">
            Tindakan ini tidak dapat dibatalkan. Data <span class="text-white font-medium">{{ deleteTarget?.name }}</span> akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter class="gap-2">
          <AlertDialogCancel class="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">Batal</AlertDialogCancel>
          <AlertDialogAction class="bg-red-600 hover:bg-red-500 text-white border-0" @click="handleDelete">
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- ====== DIALOG: Atur Tier ====== -->
    <Dialog v-model:open="showTierDialog">
      <DialogContent class="bg-zinc-900 border-zinc-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle class="text-base font-semibold">Pengaturan Loyalty Tier</DialogTitle>
          <DialogDescription class="text-zinc-500 text-xs">
            Atur tier loyalty untuk memberikan reward kepada pelanggan setia Anda.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-3 mt-2">
          <div
            v-for="tier in loyaltyTiers"
            :key="tier.name"
            class="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
          >
            <span class="text-2xl">{{ tier.emoji }}</span>
            <div class="flex-1">
              <p class="text-sm font-medium text-white">{{ tier.name }}</p>
              <p class="text-xs text-zinc-500">Min. {{ formatRupiah(tier.minSpend) }} • {{ tier.memberCount }} member</p>
            </div>
            <Button variant="ghost" size="icon" class="h-7 w-7 text-zinc-500 hover:text-indigo-400 hover:bg-zinc-700">
              <Pencil class="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button variant="outline" size="sm" class="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 h-9 gap-2">
            <Plus class="w-4 h-4" />
            Tambah Tier Baru
          </Button>
        </div>
        <DialogFooter class="pt-2">
          <Button class="bg-indigo-600 hover:bg-indigo-500 text-white h-9" @click="showTierDialog = false">
            Selesai
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {
  Users, ShoppingCart, Star, Settings2, Search, Plus, FileDown,
  Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Building2, UserRound
} from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const config = useRuntimeConfig()
const appName = String(config.public.APP_NAME || 'GoKasir')
const url = useRequestURL()

useSeoMeta({
  title: `Pelanggan - ${appName} | Mitra & Pelanggan`,
  description: `Kelola data pelanggan dan supplier bisnis Anda di ${appName}. Pantau riwayat transaksi, total belanja, dan program loyalty pelanggan setia.`,
  ogTitle: `Mitra & Pelanggan - ${appName}`,
  ogDescription: `Manajemen pelanggan dan supplier terintegrasi dalam satu platform ${appName}.`,
  ogImage: config.public.appLogo || '/logo.png',
  ogUrl: url.href,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `Pelanggan - ${appName}`,
  twitterDescription: `Kelola mitra dan pelanggan bisnis UMKM Anda dengan ${appName}.`,
  twitterImage: config.public.appLogo || '/logo.png',
})

useHead({
  link: [{ rel: 'canonical', href: url.href }],
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'keywords', content: `manajemen pelanggan, data supplier, loyalty program, ${appName.toLowerCase()} pelanggan` },
    { name: 'author', content: 'GoKasir Team' },
    { name: 'theme-color', content: '#09090b' },
    { property: 'og:locale', content: 'id_ID' },
    { property: 'og:site_name', content: appName },
  ]
})

// ---- State ----
const activeTab = ref<'customer' | 'supplier'>('customer')
const searchQuery = ref('')
const showFormDialog = ref(false)
const showDetailDialog = ref(false)
const showDeleteDialog = ref(false)
const showTierDialog = ref(false)
const editTarget = ref<any>(null)
const detailTarget = ref<any>(null)
const deleteTarget = ref<any>(null)

const form = ref({ name: '', phone: '', email: '', address: '', note: '' })

// ---- Tabs ----
const tabs = computed(() => [
  { key: 'customer' as const, label: 'Pelanggan', icon: UserRound, count: customers.value.length },
  { key: 'supplier' as const, label: 'Supplier', icon: Building2, count: suppliers.value.length },
])

// ---- Mock Data ----
const loyaltyTiers = ref([
  { name: 'Bronze', emoji: '🥉', minSpend: 500000, memberCount: 2 },
  { name: 'Silver', emoji: '🥈', minSpend: 2000000, memberCount: 1 },
  { name: 'Gold', emoji: '🥇', minSpend: 5000000, memberCount: 0 },
])

const customers = ref([
  {
    id: 1, name: 'Budi Santoso', phone: '0812-3456-7890', email: 'budi@email.com',
    address: 'Jl. Merdeka No. 10, Jakarta', totalSpend: 2350000, transactions: 15,
    tier: { name: 'Silver', emoji: '🥈' }
  },
  {
    id: 2, name: 'Siti Rahayu', phone: '0856-7890-1234', email: 'siti@email.com',
    address: 'Jl. Sudirman No. 5, Bandung', totalSpend: 875000, transactions: 8,
    tier: { name: 'Bronze', emoji: '🥉' }
  },
  {
    id: 3, name: 'Ahmad Fauzi', phone: '0878-1234-5678', email: 'ahmad@email.com',
    address: 'Jl. Gatot Subroto No. 22, Surabaya', totalSpend: 145000, transactions: 3,
    tier: null
  },
  {
    id: 4, name: 'Dewi Kusuma', phone: '0813-9876-5432', email: 'dewi@email.com',
    address: 'Jl. Pemuda No. 7, Yogyakarta', totalSpend: 3200000, transactions: 22,
    tier: { name: 'Silver', emoji: '🥈' }
  },
  {
    id: 5, name: 'Rudi Hartono', phone: '0821-5555-6666', email: '',
    address: '', totalSpend: 62000, transactions: 1,
    tier: null
  },
])

const suppliers = ref([
  {
    id: 1, name: 'CV. Makmur Jaya', phone: '021-888-9999', email: 'cs@makmurmjaya.com',
    address: 'Kawasan Industri, Tangerang', totalSpend: 15000000, transactions: 12,
    tier: null
  },
  {
    id: 2, name: 'PT. Sumber Bahan', phone: '031-777-8888', email: 'order@sumberbahan.id',
    address: 'Jl. Industri No. 45, Surabaya', totalSpend: 8500000, transactions: 7,
    tier: null
  },
])

// ---- Computed ----
const stats = computed(() => ({
  totalCustomers: customers.value.length,
  totalSpend: customers.value.reduce((sum, c) => sum + c.totalSpend, 0),
}))

const currentList = computed(() => activeTab.value === 'customer' ? customers.value : suppliers.value)

const filteredData = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return currentList.value
  return currentList.value.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.phone.toLowerCase().includes(q) ||
    (item.email && item.email.toLowerCase().includes(q))
  )
})

// ---- Helpers ----
function formatRupiah(val: number) {
  if (val === 0) return 'Rp 0'
  return 'Rp ' + val.toLocaleString('id-ID')
}

const gradients = [
  'from-indigo-500 to-violet-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-purple-600',
]
function avatarGradient(name: string) {
  const idx = name.charCodeAt(0) % gradients.length
  return gradients[idx]
}

// ---- Actions ----
function openAddDialog() {
  editTarget.value = null
  form.value = { name: '', phone: '', email: '', address: '', note: '' }
  showFormDialog.value = true
}

function openEditDialog(item: any) {
  editTarget.value = item
  form.value = { name: item.name, phone: item.phone, email: item.email, address: item.address, note: '' }
  showFormDialog.value = true
}

function openDetailDialog(item: any) {
  detailTarget.value = item
  showDetailDialog.value = true
}

function confirmDelete(item: any) {
  deleteTarget.value = item
  showDeleteDialog.value = true
}

function handleSave() {
  if (!form.value.name.trim()) return
  const list = activeTab.value === 'customer' ? customers : suppliers
  if (editTarget.value) {
    const idx = list.value.findIndex((c: any) => c.id === editTarget.value.id)
    if (idx !== -1) {
      list.value[idx] = { ...list.value[idx], ...form.value }
    }
  } else {
    const newId = Math.max(0, ...list.value.map((c: any) => c.id)) + 1
    list.value.push({
      id: newId, ...form.value, totalSpend: 0, transactions: 0, tier: null
    })
  }
  showFormDialog.value = false
}

function handleDelete() {
  if (!deleteTarget.value) return
  const list = activeTab.value === 'customer' ? customers : suppliers
  list.value = list.value.filter((c: any) => c.id !== deleteTarget.value.id)
  showDeleteDialog.value = false
  deleteTarget.value = null
}

function handleExport() {
  const data = filteredData.value
  const headers = ['Nama', 'Telepon', 'Email', 'Alamat', 'Total Belanja', 'Transaksi']
  const rows = data.map(d => [
    d.name, d.phone, d.email, d.address, d.totalSpend, d.transactions
  ])
  const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${activeTab.value === 'customer' ? 'pelanggan' : 'supplier'}-gokasir.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
