

---

```markdown
# Prompt: Ganti Data Dummy dengan Data dari Library (Tanpa Mengubah Styling)

## Status
Library `github-portfolio-fetcher` sudah terinstall dan ter-link.

## Yang Ingin Dilakukan
Ganti **data dummy** di komponen Featured Projects dengan **data real** dari library. 
**PERTAHANKAN** semua styling, animation, dan struktur HTML yang sudah ada.

## Langkah Implementasi

### 1. Import library
```typescript
import { fetchRepos } from 'github-portfolio-fetcher';
```

### 2. Buat state untuk data
```typescript
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### 3. Hardcode list repository
```typescript
const myRepos = [
  { owner: 'sipangkar-daniel', repo: 'personal-portofolio' }
];
```

### 4. Fetch data di useEffect (ganti data dummy)
```typescript
useEffect(() => {
  fetchRepos(myRepos)
    .then(setProjects)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

### 5. Kondisi render
- **Jika loading**: tampilkan loading state yang sudah ada (jangan diubah)
- **Jika error**: tampilkan pesan error (bisa pakai styling yang sudah ada)
- **Jika sukses**: mapping `projects` ke struktur HTML yang **SAMA PERSIS** dengan yang saat ini digunakan untuk data dummy

### 6. Mapping data dari library ke props yang ada saat ini

Library mengembalikan:
```typescript
{
  name: string,
  description: string,
  stars: number,
  forks: number,
  language: string,
  htmlUrl: string,
  imageUrl?: string
}
```

Silakan sesuaikan mappingnya dengan struktur data dummy yang saat ini digunakan.

Contoh:
```tsx
{projects.map((repo) => (
  // Gunakan struktur HTML dan className yang SAMA PERSIS dengan yang sekarang
  // Ganti nilai dummy dengan: repo.name, repo.description, repo.stars, etc.
  // Jangan ubah className, animation, atau struktur HTML
))}
```

## Yang TIDAK Boleh Dilakukan
- ❌ Jangan mengubah styling (className, Tailwind, CSS modules)
- ❌ Jangan mengubah struktur HTML (div, section, card layout)
- ❌ Jangan mengubah animation yang sudah ada
- ❌ Jangan menghapus atau mengganti komponen yang sudah ada selain data dummynya
- ❌ Jangan membuat file baru

## Yang BOLEH Dilakukan
- ✅ Hanya mengganti sumber data (dari dummy ke state projects)
- ✅ Menambahkan import library
- ✅ Menambahkan useState, useEffect
- ✅ Menambahkan loading dan error handling (dengan styling yang sudah ada)

## Output yang Diharapkan
Setelah selesai, website akan:
1. Tetap terlihat SAMA PERSIS secara visual
2. Data yang tampil berasal dari GitHub API
3. Ada loading saat pertama fetch
4. Ada pesan error jika fetch gagal

Langsung eksekusi dan cari komponen Featured Projects yang saat ini pakai data dummy.
```

---
