
"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        Recruit<span>.</span>
      </Link>

      <button
        className={isOpen ? "hamburger open" : "hamburger"}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={isOpen ? "nav-menu open" : "nav-menu"}>
        <Link href="/">Home</Link>
        <Link href="/#jobs">Jobs</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}