import React, { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "../ui/Input"
import { useNavigate } from "react-router-dom"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-xl w-full">
      <Input 
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 w-full"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  )
}
