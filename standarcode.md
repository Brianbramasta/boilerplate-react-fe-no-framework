# Standar Kode Frontend Tim

> Sumber: evaluasi template `starter-template-fe-dasaria` (HRIS FE). Dokumen ini adalah **standar wajib**, bukan sekadar rekomendasi. Setiap H2 di bawah didesain agar bisa langsung jadi 1 slide.

---

## 1. Kondisi Saat Ini (Ringkas)

Template sudah punya fondasi bagus: Feature-Based Clean Architecture, React 19 + TypeScript strict, TanStack Query, Zustand, Tailwind v4. Tapi ada gap antara **dokumentasi** dan **implementasi nyata**, serta **tidak ada quality gate** yang benar-benar aktif. Dokumen ini menutup gap tersebut.

---

## 2. Prinsip Arsitektur (Wajib untuk Semua Fitur Baru)

**Feature-Based Clean Architecture** — setiap fitur bisnis adalah modul independen dengan 3 layer:

```
Presentation → Domain ← Data
```

- **Domain**: business rules murni (entities, usecases). Tidak boleh import React, API service, atau localStorage.
- **Data**: pemanggilan API + mapping response → domain model (services, models, repositories).
- **Presentation**: UI (hooks, components, pages). Tidak boleh panggil API langsung, harus lewat usecase.

**Aturan tegas:**

- Semua fitur bisnis **wajib** berada di `src/features/[nama-fitur]/`. Tidak ada lagi kode bisnis "nyasar" ke `components/`, `pages/`, atau `layout/` di root.
- Fitur tidak boleh saling import langsung — hanya lewat `shared/` atau `index.ts` publik masing-masing fitur.

---

## 3. Migrasi yang Wajib Dilakukan Sebelum Standar Ini Berlaku

Sebelum tim mulai develop dengan standar baru, lakukan cleanup berikut:

1. **Audit & hapus komponen boilerplate tak terpakai** di `src/components/` (ecommerce, crm, saas, marketing, stocks, email, chat, invoice, kanban, faqs-variants, carousel, dll — sisa admin template). Jalankan analisis unused-export, hapus yang tidak direferensikan oleh halaman aktif.
2. **Refactor fitur existing ke struktur `features/`** — auth, payroll, dan modul lain yang sekarang tersebar di `components/`, `pages/OtherPage/`, `layout/` harus dipindah mengikuti pola `features/landing` (satu-satunya contoh yang sudah benar saat ini).
3. **Selaraskan README dengan kode nyata** — contoh `employee`/`attendance` di README saat ini tidak ada di repo. Ganti dengan fitur nyata yang sudah dimigrasi, atau hapus contoh yang tidak eksis.
4. **Pilih satu sistem UI**: pertahankan Tailwind + `src/components/ui/*` (sudah lengkap), lepas `@mui/material` & `@mui/icons-material` kecuali ada justifikasi kuat untuk tetap dual-stack.
5. **Pindahkan dependency salah kamar**: `json-server` → `devDependencies`. Audit `jsonwebtoken` & `multer` — ini package Node/backend, hapus dari FE kecuali benar-benar dipakai (dan jika dipakai, evaluasi ulang, karena berisiko bundle bloat/security).
6. **Bersihkan `vite.config.ts`** dari config personal (`allowedHosts` ngrok pribadi) — pindah ke `.env.local` per-developer jika memang perlu ngrok.

---

## 4. Konvensi Penamaan

| Jenis           | Format                    | Contoh                                 |
| --------------- | ------------------------- | -------------------------------------- |
| Folder          | lowercase, dash           | `employee-data`, `user-management`     |
| Component       | PascalCase                | `EmployeeTable.tsx`                    |
| Hook            | PascalCase, prefix `Use`  | `UseEmployeeData.ts`                   |
| Page            | PascalCase, suffix `Page` | `EmployeeListPage.tsx`                 |
| Usecase/Service | PascalCase                | `GetEmployees.ts`, `FetchEmployees.ts` |
| Function        | PascalCase                | `GetEmployees()`                       |
| Variable        | snake_case                | `employee_data`, `is_loading`          |

Semua nama file, folder, function, dan variable **wajib bahasa Inggris**.

---

## 5. Standar Kualitas Kode (TypeScript & Lint)

- `tsconfig` **strict mode** wajib tetap aktif (`strict`, `noUnusedLocals`, `noUnusedParameters`).
- `@typescript-eslint/no-explicit-any` **wajib diaktifkan** (saat ini di-set `off` — ini harus diperbaiki). Tipe `any` hanya boleh dipakai dengan komentar justifikasi + persetujuan review.
- Tidak boleh ada `console.log` yang ter-commit ke branch utama (gunakan logger terstruktur atau hapus sebelum PR).
- Tidak boleh ada TODO/FIXME tanpa tiket tracking terkait.
- Prettier wajib ditambahkan dan dijalankan otomatis (saat ini belum ada config Prettier) agar format konsisten lintas developer.

---

## 6. Standar Testing

- Setiap **usecase** di domain layer wajib punya unit test (ini nilai jual utama Clean Architecture — logic bisnis harus mudah di-test tanpa UI/API).
- Setiap **repository/mapper** di data layer wajib punya test untuk transformasi data API ↔ domain.
- Komponen UI kompleks (form, table dengan logic) wajib punya minimal 1 test interaksi utama.
- Target minimum: **coverage untuk domain layer 80%+**, coverage keseluruhan dilaporkan tiap PR.
- `npm run test` wajib hijau sebelum merge (lihat gate CI di bawah).

---

## 7. Git & CI/CD Gate (Wajib Diaktifkan)

Saat ini Husky pre-commit/pre-push ada tapi **semua perintah di-comment** — artinya tidak ada enforcement sama sekali. Ini harus diperbaiki:

- **Pre-commit**: `lint` + `type-check` wajib jalan dan lulus.
- **Pre-push**: `test` wajib jalan dan lulus.
- **CI pipeline** (GitHub Actions) wajib ditambahkan — repo saat ini tidak punya `.github/workflows` sama sekali. Minimal jalankan: `lint`, `type-check` (`tsc -b`), `test`, `build` pada setiap PR ke `main`.
- PR tidak boleh di-merge jika CI merah.

---

## 8. Environment & Konfigurasi

- Akses env variable **wajib** lewat `import.meta.env.VITE_*` (konvensi standar Vite), bukan lewat `globalThis` hasil inject manual di `vite.config.ts`. Ini membuat env type-safe lewat `vite-env.d.ts` dan konsisten dengan tooling Vite.
- Tidak ada config/host personal (ngrok, IP lokal, dsb) yang di-commit ke `vite.config.ts` atau file shared lainnya — taruh di `.env.local` (sudah gitignored) per-developer.
- `.env` / secrets tetap **wajib** gitignored (praktik ini sudah benar, pertahankan).

---

## 9. Dependency Hygiene

- Package yang hanya dipakai untuk tooling/mock/dev (`json-server`, dsb) masuk `devDependencies`, bukan `dependencies`.
- Package backend-only (`jsonwebtoken`, `multer`) tidak boleh ada di FE kecuali ada alasan eksplisit yang didokumentasikan.
- Review dependency baru saat PR — hindari menambah library yang fungsinya sudah dicover library lain yang sudah ada (contoh: jangan tambah UI library kedua kalau Tailwind kit sudah cukup).

---

## 10. Definition of Done — Checklist per PR

- [ ] Kode bisnis baru ada di `src/features/[nama-fitur]/` dengan 3 layer domain/data/presentation
- [ ] Tidak ada `any` tanpa justifikasi
- [ ] Tidak ada `console.log` tersisa
- [ ] Unit test untuk usecase & repository baru ditambahkan
- [ ] `npm run lint`, `npm run test`, `tsc -b` semua lulus lokal
- [ ] CI hijau
- [ ] Tidak menambah dependency UI kedua tanpa approval
- [ ] Tidak ada config/env personal ter-commit

---

_Dokumen ini dievaluasi berdasarkan kondisi repo per 2026-07-15. Update dokumen ini setiap ada perubahan struktur/tooling besar._
