"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { type ChangeEvent } from "react"

interface SearchComponentProps {
   searchQuery: string
   onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
   placeholder?: string
}

export function SearchComponent({ 
   searchQuery, 
   onSearchChange, 
   placeholder = "Cari..." 
   }: SearchComponentProps) {
   return (
      <div className="relative w-full max-w-sm">
         <Search className="absolute left-3 top-1/2 h-5 w-4 -translate-y-1/2 text-muted-foreground" />
         <Input
         type="search"
         placeholder={placeholder}
         className="pl-10 w-full"
         value={searchQuery}
         onChange={onSearchChange}
         />
      </div>
   )
}