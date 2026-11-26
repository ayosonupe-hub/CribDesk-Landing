import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import styles from "./legal-page.module.css";

export function LegalPage({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="CribDesk home">
          <BrandMark />
          <span>CribDesk</span>
        </Link>
        <Link href="/" className={styles.back}>
          ← Back to home
        </Link>
      </header>
      <main className={styles.main}>
        <p className={styles.kicker}>Legal</p>
        <article className={styles.content}>{children}</article>
      </main>
      <footer className={styles.footer}>
        <p>© 2026 CribDesk, LLC. All rights reserved.</p>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </nav>
      </footer>
    </div>
  );
}
