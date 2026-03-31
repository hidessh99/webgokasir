<template>
  <div class="flex flex-col gap-y-24 lg:gap-y-32 pb-24">
    <!-- Hero Section -->
    <section class="relative pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <!-- Background Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none fade-in-anim" />

      <div class="text-center max-w-4xl mx-auto relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Sistem POS Generasi Baru
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1] fade-in-up delay-100">
          Satu Aplikasi Kasir untuk <br class="hidden lg:block" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            Semua Kebutuhan Bisnis
          </span>
        </h1>
        
        <p class="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up delay-200">
          Kelola pesanan, pantau laporan penjualan, dan sinkronisasi stok lintas cabang dengan lebih cepat dan mudah melalui satu ekosistem yang terintegrasi.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up delay-300">
          <Button size="lg" class="w-full sm:w-auto h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105" as-child>
            <NuxtLink to="/auth/register">
              Coba Gratis Sekarang
              <ArrowRight class="w-5 h-5 ml-2" />
            </NuxtLink>
          </Button>
          <Button size="lg" variant="outline" class="w-full sm:w-auto h-14 px-8 rounded-full border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-base font-semibold transition-all hover:scale-105" as-child>
            <a href="https://wa.me/628123456789" target="_blank">
              <MessageCircle class="w-5 h-5 mr-2" />
              Kontak Sales
            </a>
          </Button>
        </div>
        <p class="mt-6 text-sm text-zinc-500 dark:text-zinc-400 fade-in-up delay-400">Mudah digunakan • Setup kurang dari 5 menit • Dukungan 24/7</p>
      </div>

      <!-- Hero Dashboard Visual (Clean Abstract) -->
      <div class="mt-16 lg:mt-24 relative mx-auto max-w-5xl fade-in-up delay-500">
        <div class="aspect-[16/10] sm:aspect-[21/9] rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shadow-2xl overflow-hidden relative">
          <!-- Abstract UI Representation -->
          <div class="absolute inset-x-0 top-0 h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-2 bg-white dark:bg-[#09090b]">
            <div class="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div class="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div class="p-4 pt-14 grid grid-cols-12 gap-4 h-full">
            <div class="col-span-3 hidden sm:flex flex-col gap-3">
              <div class="w-full h-8 rounded bg-zinc-200 dark:bg-zinc-800/80 mb-4" />
              <div v-for="i in 6" :key="i" class="w-full h-6 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
            </div>
            <div class="col-span-12 sm:col-span-9 flex flex-col gap-4">
              <div class="flex justify-between items-center">
                <div class="w-1/3 h-8 rounded bg-zinc-200 dark:bg-zinc-800/80" />
                <div class="w-24 h-8 rounded bg-indigo-500/20" />
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div v-for="i in 3" :key="i" class="h-20 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/50" />
              </div>
              <div class="flex-1 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/50 w-full" />
            </div>
          </div>
          <!-- Overlay to smooth it out -->
          <div class="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#09090b] dark:via-[#09090b]/20" />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div v-intersect class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl p-8 lg:p-12 border border-zinc-100 dark:border-zinc-800/50 fade-up">
        <p class="col-span-2 md:col-span-4 text-center text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-widest">
          Dipercaya Ribuan Pemilik Usaha
        </p>
        <div class="space-y-1 text-center">
          <h3 class="text-3xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white">10+</h3>
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tahun Tersertifikasi</p>
        </div>
        <div class="space-y-1 text-center">
          <h3 class="text-3xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white">200+</h3>
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Kota di Indonesia</p>
        </div>
        <div class="space-y-1 text-center">
          <h3 class="text-3xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white">45K+</h3>
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Gerai Pengguna</p>
        </div>
        <div class="space-y-1 text-center">
          <h3 class="text-3xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white">21T+</h3>
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Transaksi</p>
        </div>
      </div>
    </section>

    <!-- Features Section 1 (Text Left, Visual Right) -->
    <section id="fitur" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <!-- Text -->
        <div v-intersect class="space-y-8 slide-right">
          <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
            <BarChart3 class="w-6 h-6" />
          </div>
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              Pantau Usaha dengan Nyaman & Real-time
            </h2>
            <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bisnis yang menggunakan platform GoKasir terbukti lebih sehat secara operasional dan finansial. Analisis laporan penjualan otomatis secara interaktif dimana saja.
            </p>
          </div>
          
          <ul class="space-y-5">
            <li class="flex items-start gap-4">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 class="font-semibold text-zinc-900 dark:text-white mb-1">Laporan Real-time</h4>
                <p class="text-zinc-600 dark:text-zinc-400 text-sm">Akses grafik penjualan harian tanpa perlu rekap manual kembali.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mt-0.5">
                <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 class="font-semibold text-zinc-900 dark:text-white mb-1">Analisis Produk Terlaris</h4>
                <p class="text-zinc-600 dark:text-zinc-400 text-sm">Ketahui tren produk terpopuler dan kapan waktu toko Anda paling sibuk.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- Visual -->
        <div v-intersect class="relative slide-left bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 aspect-square lg:aspect-auto lg:h-[600px] border border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
          <!-- Abstract representation of charts -->
          <div class="w-full max-w-sm flex items-end justify-between gap-4 h-64">
            <div class="w-full bg-indigo-500 dark:bg-indigo-600 rounded-lg h-[40%]" />
            <div class="w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg h-[80%]" />
            <div class="w-full bg-indigo-500 dark:bg-indigo-600 rounded-lg h-[60%]" />
            <div class="w-full bg-zinc-300 dark:bg-zinc-700 rounded-lg h-[100%]" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section 2 (Visual Left, Text Right) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <!-- Visual -->
        <div v-intersect class="order-2 lg:order-1 relative slide-right bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 aspect-square lg:aspect-auto lg:h-[600px] border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-6">
          <div class="w-full max-w-xs p-5 rounded-2xl bg-white dark:bg-[#09090b] shadow-xl border border-zinc-100 dark:border-zinc-800/50 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 class="w-6 h-6" />
            </div>
            <div class="space-y-2 flex-1">
              <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
              <div class="h-3 bg-zinc-100 dark:bg-zinc-800/50 rounded w-3/4" />
            </div>
          </div>
          <div class="w-full max-w-xs p-5 rounded-2xl bg-white dark:bg-[#09090b] shadow-xl border border-zinc-100 dark:border-zinc-800/50 flex items-center gap-4 ml-12">
            <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Globe class="w-6 h-6" />
            </div>
            <div class="space-y-2 flex-1">
              <div class="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
              <div class="h-3 bg-zinc-100 dark:bg-zinc-800/50 rounded w-1/2" />
            </div>
          </div>
        </div>

        <!-- Text -->
        <div v-intersect class="order-1 lg:order-2 space-y-8 slide-left">
          <div class="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20">
            <Server class="w-6 h-6" />
          </div>
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
              Ekosistem Manajemen Serba Lengkap
            </h2>
            <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Memusatkan operasi, persediaan stok, manajemen pelanggan hingga pesanan dari seluruh kanal ke dalam aplikasi pintar GoKasir.
            </p>
          </div>
          
          <ul class="space-y-5">
            <li class="flex items-start gap-4">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center mt-0.5">
                <CheckCircle2 class="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 class="font-semibold text-zinc-900 dark:text-white mb-1">Mendukung Multi-Cabang</h4>
                <p class="text-zinc-600 dark:text-zinc-400 text-sm">Sinkronisasi stok antarcabang dengan cepat tanpa menunda perbaruan ketersediaan barang.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center mt-0.5">
                <CheckCircle2 class="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 class="font-semibold text-zinc-900 dark:text-white mb-1">Hardware Terintegrasi</h4>
                <p class="text-zinc-600 dark:text-zinc-400 text-sm">Siap dihubungkan ke scanner barcode, printer stiker, laci uang, hingga mesin pengelola server.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Solusi Bisnis Cards Minimalist -->
    <section id="solusi" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div v-intersect class="text-center max-w-2xl mx-auto mb-16 fade-up">
        <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">Solusi Semua Usaha</h2>
        <p class="text-zinc-600 dark:text-zinc-400">Dirancang fungsionalitasnya untuk menyatu tanpa hambatan dalam gaya bisnis berbeda.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-intersect class="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 stun-delay-1 fade-up">
          <div class="text-3xl mb-6">☕</div>
          <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Kedai Kopi & Cafe</h4>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Mempercepat pesanan di waktu sibuk dan catat jenis ekstra (es/gula) yang fleksibel.</p>
        </div>
        <div v-intersect class="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 stun-delay-2 fade-up">
          <div class="text-3xl mb-6">🍽️</div>
          <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Restoran Utama</h4>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Peta visual layout meja di lantai rumah makan dan pengantaran sistem dapur (KDS).</p>
        </div>
        <div v-intersect class="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 stun-delay-3 fade-up">
          <div class="text-3xl mb-6">🛍️</div>
          <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Toko Retail</h4>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Mampu mengatur stok hingga puluhan ribu produk dengan sinkronisasi kode barcode yang instan.</p>
        </div>
        <div v-intersect class="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 stun-delay-4 fade-up">
          <div class="text-3xl mb-6">✂️</div>
          <h4 class="text-lg font-bold text-zinc-900 dark:text-white mb-2">Salon & Jasa</h4>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Notifikasi jadwal pelanggan tersusun dengan fungsi pembagian kalkulasi persentase staf.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimoni" class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div v-intersect class="bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 lg:p-24 relative overflow-hidden fade-up">
        <!-- Decoration -->
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div class="absolute -top-40 -left-60 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-full" />
        
        <div class="relative z-10">
          <h2 class="text-3xl lg:text-4xl font-bold mb-12 text-center text-white tracking-tight">Kisah Sukses Bersama GoKasir</h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="flex flex-col">
              <div class="flex items-center gap-1 mb-6">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p class="text-zinc-300 mb-8 leading-relaxed text-lg font-medium">
                "GoKasir sangat gampang digunakan dan membantu kami mengembangkan 27 cabang dalam waktu 5 bulan saja. Memanjakan kontrol manajerial kami."
              </p>
              <div class="mt-auto">
                <p class="font-bold text-white text-base">Jennike Veronica</p>
                <p class="text-sm text-zinc-500">Vilo Gelato</p>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="flex items-center gap-1 mb-6">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p class="text-zinc-300 mb-8 leading-relaxed text-lg font-medium">
                "Membantu pengecekan stok persediaan masuk keluar, serta analisis operasional lengkap. Kami jadi tahu kapan jam krusial melayani reservasi."
              </p>
              <div class="mt-auto">
                <p class="font-bold text-white text-base">Widhi Yustiarto</p>
                <p class="text-sm text-zinc-500">Double U Steak</p>
              </div>
            </div>

            <div class="flex flex-col">
              <div class="flex items-center gap-1 mb-6">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <p class="text-zinc-300 mb-8 leading-relaxed text-lg font-medium">
                "Frontliner pelayanan kasir jadi 2x lipat lebih ramah karena UI/UX kasir aplikasinya super intuitif dan tidak memperlama proses antrian."
              </p>
              <div class="mt-auto">
                <p class="font-bold text-white text-base">Hadi Ismanto</p>
                <p class="text-sm text-zinc-500">Newsroom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Minimalist -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center py-12 lg:py-20">
      <div v-intersect class="scale-in">
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
          Mulai Digitalisasi Hari Ini
        </h2>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Tingkatkan efisiensi penjualan dengan GoKasir. Akses dan migitasi data secara bebas hari ini! Gratis untuk 14 hari pertama.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" class="w-full sm:w-auto h-14 px-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold shadow-xl shadow-indigo-500/20" as-child>
            <NuxtLink to="/auth/register">Buat Akun Sekarang</NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, MessageCircle, BarChart3, 
  CheckCircle2, Server, Globe, Star 
} from 'lucide-vue-next'

// Gunakan layout landing dengan navbar dan footer.
definePageMeta({ layout: 'landing' })

// Custom Directive sederhana untuk observer animasi on-scroll
const vIntersect = {
  mounted: (el: HTMLElement) => {
    el.classList.add('opacity-0', 'intersect-element')
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry && entry.isIntersecting) {
        el.classList.add('visible')
        observer.unobserve(el)
      }
    }, { threshold: 0.15 })
    observer.observe(el)
  }
}
</script>

<style scoped>
/* Keyframes Load Hero Section */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
.fade-in-anim { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 450ms; }

/* In-View Intersection Scroll Animations */
.intersect-element {
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

/* Modifier fade-up */
.fade-up.intersect-element { transform: translateY(50px); }
.fade-up.visible { opacity: 1 !important; transform: translateY(0) !important; }

/* Modifier slide-left (from left to center) */
.slide-right.intersect-element { transform: translateX(-40px); }
.slide-right.visible { opacity: 1 !important; transform: translateX(0) !important; }

/* Modifier slide-right (from right to center) */
.slide-left.intersect-element { transform: translateX(40px); }
.slide-left.visible { opacity: 1 !important; transform: translateX(0) !important; }

/* Modifier scale-in */
.scale-in.intersect-element { transform: scale(0.95); }
.scale-in.visible { opacity: 1 !important; transform: scale(1) !important; }

/* Stagger Delays for lists/grids */
.stun-delay-1.visible { transition-delay: 0ms; }
.stun-delay-2.visible { transition-delay: 100ms; }
.stun-delay-3.visible { transition-delay: 200ms; }
.stun-delay-4.visible { transition-delay: 300ms; }
</style>
