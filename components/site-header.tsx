"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="CribDesk home">
      <BrandMark className="brand-mark" />
      <span>
        Crib<span>Desk</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ joined = false }: { joined?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <Logo />
        <nav
          className={open ? "nav nav-open" : "nav"}
          aria-label="Primary navigation"
        >
          <a href="#features" onClick={() => setOpen(false)}>
            Features
          </a>
          <a href="#day" onClick={() => setOpen(false)}>
            How it works
          </a>
          <a href="#faq" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <a
            className="nav-cta"
            href={joined ? "#share" : "#join"}
            onClick={() => setOpen(false)}
          >
            {joined ? "Share your link" : "Get early access"}{" "}
            <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
