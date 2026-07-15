## 📌 Ringkasan

<!-- Jelaskan singkat apa yang diubah dan kenapa -->

**Target branch:**

- [ ] `dev` — integrasi fitur/fix harian
- [ ] `staging` — promosi batch perubahan ke QA
- [ ] `main` — rilis ke production

**Terkait ticket/issue:** #

## 🧩 Jenis Perubahan

- [ ] Fitur baru
- [ ] Bug fix
- [ ] Refactor (tidak mengubah behavior)
- [ ] Chore / tooling / config

## ✅ Checklist Dasar (wajib untuk semua target branch)

- [ ] Kode bisnis baru ada di `src/features/[nama-fitur]/` mengikuti pola domain/data/presentation
- [ ] `npm run lint` lulus lokal
- [ ] `npm test` lulus lokal
- [ ] `npm run build` lulus lokal
- [ ] Sudah self-review diff sendiri
- [ ] Tidak ada `console.log` atau kode debug tertinggal
- [ ] Tidak ada `any` tanpa alasan yang jelas
- [ ] Tidak ada file/config personal ikut ter-commit (env lokal, host ngrok, dll)

<!-- Bagian di bawah ini opsional — isi kalau relevan dengan target branch, hapus kalau tidak -->

## 🔍 Tambahan kalau target `staging`

- [ ] Semua fitur di PR ini sudah lengkap & sudah di-test manual sendiri
- [ ] Sudah di-review minimal 1 reviewer di level `dev`

**Fokus testing untuk QA:**
<!-- Area/skenario/edge case spesifik yang perlu dicek QA -->

## 🚀 Tambahan kalau target `main`

- [ ] Sudah lolos QA di staging (sign-off QA/PM)
- [ ] Tidak ada breaking change tanpa rencana migrasi yang jelas
- [ ] Changelog / release notes sudah diupdate (jika tim pakai)
- [ ] Env var / konfigurasi production baru (jika ada) sudah disiapkan di server/hosting
- [ ] Disetujui oleh reviewer **dan** tech lead/PM

**Catatan deployment:**
<!-- Migrasi data, env var baru, urutan deploy khusus, dsb -->

**Rencana rollback:**
<!-- Langkah kalau rilis ini perlu di-revert -->

## 🖼️ Screenshot / Demo (jika ada perubahan UI)

## 📝 Catatan untuk Reviewer
