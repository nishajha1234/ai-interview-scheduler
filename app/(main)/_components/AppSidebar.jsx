"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/Services/constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export function AppSidebar() {

  const path = usePathname();
  const router = useRouter();
  console.log(path);

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5 px-8'>
        <Image src={'/logo.png'} alt="logo" width={200} height={100} className="w-[150px]" />
        <Button onClick={() => router.push('/dashboard/create-interview')} className='w-full mt-1 cursor-pointer'><Plus />Create New Interview</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarContent className='p-2'>
          <SidebarMenu>
            {SidebarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className="p-1">
                <SidebarMenuButton asChild className={`${path === option.path ? 'bg-blue-50' : ''}`}>
                  <Link
                    href={option.path}
                    className={`flex items-center gap-2 py-6 px-4 rounded w-full ${path === option.path ? 'text-primary' : ''
                      }`}
                  >
                    <option.icon />
                    <span className="text-[16px] font-medium">{option.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
