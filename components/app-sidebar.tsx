"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  LayoutDashboard,
  ArrowLeftRight,
  AlignStartVertical,
  Scale,
  BookUser,
  NotepadText,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import Image from 'next/image'

import { useEffect, useState } from 'react';
import { clientApiRequest } from "@/services/clientApiRequest"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Transaksi",
      url: "#",
      icon: ArrowLeftRight,
    },
    {
      title: "Kategori Transaksi",
      url: "#",
      icon: AlignStartVertical,
    },
    {
      title: "Anggaran",
      url: "#",
      icon: Scale,
    },
    {
      title: "Vendor",
      url: "#",
      icon: BookUser,
    },
    {
      title: "Laporan",
      url: "#",
      icon: NotepadText,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = useState<{ name: string; email: string; picture: string }>({
    name: '',
    email: '',
    picture: ''
  });
  

  useEffect(() => {
    const getUser = async () => {
      const response = await clientApiRequest({
        url: '/user',
        method: 'GET'
      })
      setUser(response)
    }
    getUser()
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Image 
          src={'https://res.cloudinary.com/du0tz73ma/image/upload/v1702445620/octansidnByBoxity_vwv8wi.png'}
          alt="Logo octans"
          width={180}
          height={180}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
