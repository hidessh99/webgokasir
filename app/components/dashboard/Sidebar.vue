<template>
  <Sidebar variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/dashboard">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Command class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Dashboard</span>

              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <!-- Search Bar -->
    </SidebarHeader>

    <SidebarContent>
      <!-- cashier -->
      <SidebarGroup v-if="canAccessMemberArea">
        <SidebarGroupLabel>Member Area</SidebarGroupLabel>
        <SidebarMenu>
          <!-- ServerMOnth  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="UserMonthOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>VPN Month</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in UserMonthItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- community  with submenu -->

          <!-- ServerAlways  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="UserAlwaysOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>VPN AlwaysOn</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in UserAlwaysItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- ServerAlways  with submenu -->

          <!-- ServerAlways  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="UserPayAsOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>VPN PayAs</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in UserPayAsItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- ServerAlways  with submenu -->

          <!-- Price with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="PriceOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <DollarSign class="h-4 w-4" />
                  <span>Price</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in PriceItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- price  with submenu -->

          <!-- Top up -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <NuxtLink to="/users/balance">
                <Settings2 class="h-4 w-4" />
                <span>TopUp</span>
                <ChevronRight class="ml-auto h-4 w-4" />
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <!-- Invoice with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="invoiceOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <FileText class="h-4 w-4" />
                  <span>Invoice</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in invoiceItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- Invoice  with submenu -->

          <!-- Profil  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="ProfilOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <User class="h-4 w-4" />
                  <span>Profile</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in ProfileItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- Profil  with submenu -->

          <!-- Log with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="LogOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <AlertTriangle class="h-4 w-4" />
                  <span>Log</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in LogItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>

          <!-- community  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="CommunityOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Users class="h-4 w-4" />
                  <span>Community</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in CommunityItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <a :href="item.url" target="_blank" rel="noopener noreferrer">
                        <span>{{ item.title }}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- community  with submenu -->
        </SidebarMenu>
      </SidebarGroup>

      <!-- admin Area -->
      <SidebarGroup v-if="canAccessAdminArea">
        <SidebarGroupLabel>Admin Area</SidebarGroupLabel>
        <SidebarMenu>
          <!-- users  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminUserOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <UserCheck class="h-4 w-4" />
                  <span>Users</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminUserItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- users  with submenu -->

          <!-- server   with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminServerOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Servers</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminServerItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- server   submenu -->

          <!-- server month  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminServerMonthOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Month</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminServerMonthItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- server month with submenu -->

          <!-- server alwayson  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminServeralwaysOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>AlwaysOn</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminServeralwaysItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- server alwayson with submenu -->

          <!-- server payas  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminServerpayasOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>PayAs</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminServerpayasItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- server payas with submenu -->

          <!-- server payas  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminSettingsOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Settings</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminSettingsItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- server payas with submenu -->

          <!-- Withdraw with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="AdminWDOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <DollarSign class="h-4 w-4" />
                  <span>Withdraw</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in AdminWDItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- server payas with submenu -->
        </SidebarMenu>
      </SidebarGroup>

      <!-- warehouse Area -->
      <SidebarGroup>
        <!-- <SidebarGroup v-if="canAccessSellerArea"></SidebarGroup> -->
        <SidebarGroupLabel>Warehouse</SidebarGroupLabel>
        <SidebarMenu>
          <!-- Costumer with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="SellerUserOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                <Users class="h-4 w-4" />
                <span>Pelanggan</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in CostumerItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- Kategori -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Kategori">
            <NuxtLink to="/category/manage">
              <LayoutGrid class="h-4 w-4" />
              <span>Kategori</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

                    <!-- Staff -->
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Staff">
            <NuxtLink to="/employer/staff">
              <LayoutGrid class="h-4 w-4" />
              <span>Staff</span>
            </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <!-- month  with submenu -->

          <!-- always  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="ProdukOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Produk</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in ProdukItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- always  with submenu -->

          <!-- payas  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="SellerpayasOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <Server class="h-4 w-4" />
                  <span>Pay As</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in SellerServerpayasItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- month  with submenu -->
        </SidebarMenu>

        <SidebarMenu>
          <!-- users  with submenu -->
          <SidebarMenuItem>
            <Collapsible v-model:open="SellerWdOpen" class="group/collapsible">
              <CollapsibleTrigger as-child>
                <SidebarMenuButton>
                  <CreditCard class="h-4 w-4" />
                  <span>Withdraw</span>
                  <ChevronDown
                    class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem v-for="item in SellerWidthdrawItems" :key="item.title">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="item.url">
                        <span>{{ item.title }}</span>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <!-- users  with submenu -->
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child />
            <DropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              :side-offset="4"
            >
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatars/dian-pratama.png" alt="@dianpratama" />
                    <AvatarFallback class="rounded-lg">
                      DP
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Dian Pratama</span>
                    <span class="truncate text-xs">dianpratama2@gmail.com</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '~/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

import {
  Command,
  Settings2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  CreditCard,
  LogOut,
  LayoutGrid,
  User,
  DollarSign,
  Server,
  Users,
  FileText,
  UserCheck,
} from 'lucide-vue-next'


import { useLocalStorage } from '@vueuse/core'
import { onMounted } from 'vue'
import { alertError } from '../../lib/alert'

// gokasir 

const ProdukOpen = ref(false)

// gokasir 

// Reactive state for collapsible menus

const CommunityOpen = ref(false)
const ProfilOpen = ref(false)
const LogOpen = ref(false)

const AdminUserOpen = ref(false)
const AdminServerOpen = ref(false)
const AdminServeralwaysOpen = ref(false)
const AdminServerMonthOpen = ref(false)
const AdminServerpayasOpen = ref(false)
const AdminSettingsOpen = ref(false)

const SellerUserOpen = ref(false)
const SellerWdOpen = ref(false)
const SellerpayasOpen = ref(false)
const SellersvralwaysOpen = ref(false)

const AdminWDOpen = ref(false)

const UserAlwaysOpen = ref(false)
const invoiceOpen = ref(false)
const UserPayAsOpen = ref(false)
const PriceOpen = ref(false)
const PriceItems = [
  {
    title: 'Server Month',
    url: '/price/servermonth',
  },
  {
    title: 'Server Always',
    url: '/price/serveralways',
  },
  {
    title: 'Server PayAs',
    url: '/price/serverpayas',
  },
]

// user navigasi
const UserMonthOpen = ref(false)

const AdminServerItems = [

  {
    title: 'Connections',
    url: '/admin/servers/connections',
  },
  {
    title: 'Type',
    url: '/admin/servers/types',
  },
  {
    title: 'Country',
    url: '/admin/servers/country',
  },
]

const AdminWDItems = [

  {
    title: 'Withdraw',
    url: '/admin/withdraw',
  },
  {
    title: 'Pending',
    url: '/admin/withdraw/pending',
  },
  {
    title: 'PayAs',
    url: '/admin/withdraw/payas',
  },
]

const AdminSettingsItems = [

  {
    title: 'Announcement',
    url: '/admin/settings/announcement',
  },

]

const AdminServerpayasItems = [
  {
    title: 'Servers',
    url: '/admin/servers/payas',
  },
  {
    title: 'Accounts',
    url: '/admin/servers/payas/account',
  },
  {
    title: 'Errors',
    url: '/admin/servers/payas/errors',
  },
]

const AdminServerMonthItems = [
  {
    title: 'Servers',
    url: '/admin/servers/month',
  },
  {
    title: 'Accounts',
    url: '/admin/servers/month/account',
  },
]

const AdminServeralwaysItems = [
  {
    title: 'Servers',
    url: '/admin/servers/always',
  },
  {
    title: 'Accounts',
    url: '/admin/servers/always/account',
  },
]

const CostumerItems = [
  {
    title: 'Detail',
    url: '/customers',
  },

  {
    title: 'Manage',
    url: '/customers/manage',
  },
    {
    title: 'Kategori',
    url: '/customers/category',
  },

]

const ProdukItems = [
  {
    title: 'Supplier',
    url: '/employer/supplier',
  },
  {
    title: 'Accounts',
    url: '/employer/accounts',
  },

]

const SellerServerpayasItems = [
  {
    title: 'Servers',
    url: '/sellers/server/payas',
  },
  {
    title: 'Accounts',
    url: '/sellers/server/payas/account',
  },
  {
    title: 'Errors',
    url: '/sellers/server/payas/errors',
  },

]

const SellerWidthdrawItems = [
  {
    title: 'Payout',
    url: '/sellers/withdraw',
  },
  {
    title: 'Pending',
    url: '/sellers/withdraw/pending',
  }, {
    title: 'PayAs',
    url: '/sellers/withdraw/payas',
  },

]

// menu users

const UserMonthItems = [
  {
    title: 'Create',
    url: '/users/month/create',
  },
  {
    title: 'Account',
    url: '/users/month',
  },
]

const UserPayAsItems = [
  {
    title: 'Create',
    url: '/users/payas/create',
  },
  {
    title: 'Account',
    url: '/users/payas',
  },
]

const invoiceItems = [
  {
    title: 'Topup',
    url: '/users/balance/billing',
  },
  {
    title: 'Account',
    url: '/invoice/account',
  },
]

const UserAlwaysItems = [
  {
    title: 'Create',
    url: '/users/always/create',
  },
  {
    title: 'Account',
    url: '/users/always',
  },
]

const LogItems = [
  {
    title: 'Activity',
    url: '/users/activity',
  },
  {
    title: 'Loging',
    url: '/users/log',
  },
]

const CommunityItems = [
  {
    title: 'Telegram',
    url: 'https://t.me/hidessh',
  },
  {
    title: 'Facebook',
    url: 'https://fb.me/4hidessh',
  },
]

const AdminUserItems = [
  {
    title: 'Manage',
    url: '/admin/users',
  },
  {
    title: 'Activity',
    url: '/admin/users/activity',
  },
]

const ProfileItems = [
  {
    title: 'View',
    url: '/users',
  },
  {
    title: 'Setting',
    url: '/users/settings',
  },
]

const token = useLocalStorage('token', '')

// User profile data
const userProfile = ref({
  id: '',
  name: '',
  email: '',
  balance: 0,
  created_at: '',
  role: 'user',
})

// Fetch user profile
// const fetchUserProfile = async () => {
//   try {
//     const response = await getUserProfile({ token: token.value })
//     const result = await response.json()

//     if (!response.ok) {
//       await alertError(result.errors)
//       return
//     }
//     if (result.data) {
//       userProfile.value = result.data
//     }
//   }
//   catch (error) {
//     // console.error('Failed to fetch user profile:', error)
//     await alertError(error instanceof Error ? error.message : 'Failed to fetch user profile')
//   }
// }

// Computed properties for role-based access

// access cashier
const canAccessMemberArea = computed(() => {
  return ['admin', 'Warehouse', 'cashier'].includes(userProfile.value.role)
})

// access admin
const canAccessAdminArea = computed(() => {
  return userProfile.value.role === 'admin'
})

// access warehouse
const canAccessSellerArea = computed(() => {
  return ['admin', 'Warehouse', 'cashier'].includes(userProfile.value.role)
})

// Initialize profile data on component mount
onMounted(() => {
  if (token.value) {
    // fetchUserProfile()
  }
})
</script>
