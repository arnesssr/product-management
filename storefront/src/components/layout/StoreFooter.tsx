import React from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function StoreFooter() {
  return (
    <footer className="border-t py-12 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold mb-4">Your Store Name</h3>
            <p className="text-sm text-muted-foreground">
              Quality products for your every need
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/shipping" className="hover:underline">Shipping Info</a></li>
              <li><a href="/returns" className="hover:underline">Returns</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/category/new" className="hover:underline">New Arrivals</a></li>
              <li><a href="/category/featured" className="hover:underline">Featured</a></li>
              <li><a href="/category/sale" className="hover:underline">Sale</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
