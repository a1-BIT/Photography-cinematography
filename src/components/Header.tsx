"use client";
import { useState } from "react";
import { Arrow } from "./Icon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { brandName } from "@/lib/brand";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label={`${brandName} home`}>{brandName}</a>
      <div className="header-actions">
        <nav id="main-navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Main navigation">
          <a onClick={() => setOpen(false)} href="#work">Selected work</a>
          <a onClick={() => setOpen(false)} href="#about">About</a>
          <a onClick={() => setOpen(false)} href="#contact" className="nav-contact">Let’s talk <Arrow diagonal /></a>
        </nav>
        <ThemeSwitcher />
        <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close −" : "Menu +"}</button>
      </div>
    </header>
  );
}
