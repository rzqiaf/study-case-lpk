# LPK Integrated Data Monitoring — Prototype

Prototype frontend untuk study case Data Engineer. Aplikasi ini menggunakan **data simulasi** dan belum terhubung ke sistem/data resmi Kemnaker.

## Fitur
- Dashboard ringkasan LPK, status akreditasi, dan distribusi wilayah.
- Navigasi Data LPK, Akreditasi, Kemitraan, Program Pelatihan, Validasi Data, dan Laporan.
- Pencarian nama/ID/kota dan filter wilayah/status.
- Ekspor tabel yang sedang difilter ke CSV.
- Tampilan responsif untuk desktop dan mobile.

## Teknologi
- React + Vite
- Tailwind CSS
- Recharts
- Lucide React

## Menjalankan di komputer
Pastikan Node.js (versi LTS) dan npm sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite, biasanya `http://localhost:5173`.

Untuk membuat build:
```bash
npm run build
```

## Catatan penting untuk presentasi
- Seluruh nama lembaga, angka, wilayah, jumlah program, dan status di aplikasi ini adalah data fiktif/simulasi.
- Status pipeline yang terlihat hanya ilustrasi tampilan, bukan koneksi ETL yang sudah berjalan.
- Prototype ini belum memiliki backend, autentikasi sungguhan, atau koneksi PostgreSQL.
- Untuk implementasi, perlu konfirmasi sumber data, ID unik lembaga, definisi indikator, hak akses, dan jadwal pembaruan kepada pemilik proses.
