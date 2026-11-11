import React, { useMemo, useState } from 'react'
import {
  LayoutDashboard, Building2, BadgeCheck, Handshake, BookOpenCheck,
  ShieldCheck, FileBarChart2, Search, Bell, ChevronDown, Menu, X,
  Download, Filter, ArrowUpRight, AlertTriangle, CheckCircle2, Clock3,
  MapPin, CalendarDays, Database, RefreshCw, CircleHelp
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend
} from 'recharts'

const lpkData = [
  { id:'LPK-001', name:'LPK Cakrawala Kompetensi', region:'Jawa Tengah', city:'Semarang', accreditation:'Terakreditasi', expiry:'2027-04-18', programs:8, partners:3, quality:'Valid' },
  { id:'LPK-002', name:'Balai Latihan Karya Mandiri', region:'Jawa Barat', city:'Bandung', accreditation:'Belum Terakreditasi', expiry:'—', programs:5, partners:2, quality:'Perlu verifikasi' },
  { id:'LPK-003', name:'LPK Teknologi Nusantara', region:'DKI Jakarta', city:'Jakarta Selatan', accreditation:'Terakreditasi', expiry:'2026-12-10', programs:11, partners:5, quality:'Valid' },
  { id:'LPK-004', name:'LPK Bina Keterampilan', region:'Jawa Timur', city:'Surabaya', accreditation:'Dalam Proses', expiry:'—', programs:4, partners:1, quality:'Data belum lengkap' },
  { id:'LPK-005', name:'Pusat Pelatihan Cipta Kerja', region:'DI Yogyakarta', city:'Sleman', accreditation:'Terakreditasi', expiry:'2027-08-02', programs:7, partners:4, quality:'Valid' },
  { id:'LPK-006', name:'LPK Mitra Profesi', region:'Jawa Tengah', city:'Kudus', accreditation:'Terakreditasi', expiry:'2026-11-28', programs:6, partners:2, quality:'Perlu verifikasi' },
  { id:'LPK-007', name:'LPK Digital Skill Center', region:'Banten', city:'Tangerang', accreditation:'Belum Terakreditasi', expiry:'—', programs:9, partners:6, quality:'Valid' },
  { id:'LPK-008', name:'LPK Karya Mandiri Sejahtera', region:'Jawa Barat', city:'Bekasi', accreditation:'Dalam Proses', expiry:'—', programs:3, partners:1, quality:'Data belum lengkap' },
]

const accreditation = [
  { name:'Terakreditasi', value:4, color:'#249b8a' },
  { name:'Belum terakreditasi', value:2, color:'#e7b65b' },
  { name:'Dalam proses', value:2, color:'#4b87b4' },
]
const regional = [
  { region:'Jawa Tengah', total:2 }, { region:'Jawa Barat', total:2 },
  { region:'DKI Jakarta', total:1 }, { region:'Jawa Timur', total:1 },
  { region:'DI Yogyakarta', total:1 }, { region:'Banten', total:1 },
]
const navItems = [
  { id:'dashboard', label:'Dashboard', icon:LayoutDashboard, group:'MENU UTAMA' },
  { id:'lpk', label:'Data LPK', icon:Building2, group:'MENU UTAMA' },
  { id:'accreditation', label:'Akreditasi', icon:BadgeCheck, group:'MENU UTAMA' },
  { id:'partnership', label:'Kemitraan', icon:Handshake, group:'MENU UTAMA' },
  { id:'training', label:'Program Pelatihan', icon:BookOpenCheck, group:'MENU UTAMA' },
  { id:'validation', label:'Validasi Data', icon:ShieldCheck, group:'PENGELOLAAN DATA' },
  { id:'reports', label:'Laporan', icon:FileBarChart2, group:'PENGELOLAAN DATA' },
]

function Badge({ children, tone='gray' }) {
  const styles = {
    green:'bg-emerald-50 text-emerald-700 ring-emerald-200',
    amber:'bg-amber-50 text-amber-700 ring-amber-200',
    blue:'bg-blue-50 text-blue-700 ring-blue-200',
    red:'bg-rose-50 text-rose-700 ring-rose-200',
    gray:'bg-slate-100 text-slate-600 ring-slate-200'
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[tone]}`}>{children}</span>
}

function StatCard({ title, value, note, icon:Icon, accent='blue' }) {
  const iconColors = { blue:'bg-blue-50 text-blue-700', teal:'bg-teal-50 text-teal-700', amber:'bg-amber-50 text-amber-700', purple:'bg-violet-50 text-violet-700' }
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold tracking-tight text-ink">{value}</p></div>
      <div className={`rounded-xl p-3 ${iconColors[accent]}`}><Icon size={21}/></div>
    </div>
    <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500"><ArrowUpRight size={14} className="text-teal-600"/>{note}</div>
  </div>
}

function App() {
  const [active, setActive] = useState('dashboard')
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('Semua wilayah')
  const [status, setStatus] = useState('Semua status')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => lpkData.filter(row => {
    const q = query.toLowerCase()
    return (!q || `${row.id} ${row.name} ${row.city}`.toLowerCase().includes(q))
      && (region === 'Semua wilayah' || row.region === region)
      && (status === 'Semua status' || row.accreditation === status)
  }), [query, region, status])

  const title = navItems.find(x => x.id === active)?.label || 'Dashboard'
  const exportCsv = () => {
    const rows = [['ID LPK','Nama LPK','Wilayah','Kota','Akreditasi','Masa Berlaku','Program','Mitra','Kualitas Data'], ...filtered.map(x => [x.id,x.name,x.region,x.city,x.accreditation,x.expiry,x.programs,x.partners,x.quality])]
    const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8;' }))
    const a = document.createElement('a'); a.href=url; a.download='data-lpk-simulasi.csv'; a.click(); URL.revokeObjectURL(url)
    setNotice('File CSV simulasi berhasil disiapkan.')
  }

  const sidebar = <aside className="flex h-full flex-col bg-ink text-white">
    <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Database size={22}/></div>
      <div><div className="text-sm font-bold tracking-wide">LPK INTEGRATED</div><div className="mt-0.5 text-[10px] tracking-[.18em] text-slate-300">DATA MONITORING</div></div>
    </div>
    <div className="px-4 pt-7">
      {['MENU UTAMA','PENGELOLAAN DATA'].map(group => <div key={group} className="mb-3 mt-4">
        <p className="mb-2 px-3 text-[10px] font-bold tracking-[.16em] text-slate-400">{group}</p>
        {navItems.filter(n=>n.group===group).map(item => {
          const Icon=item.icon; const selected=active===item.id
          return <button key={item.id} onClick={()=>{setActive(item.id);setMobileOpen(false)}} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${selected?'bg-white text-ink shadow-sm':'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
            <Icon size={18}/><span className="font-medium">{item.label}</span>{selected&&<span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-600"/>}
          </button>
        })}
      </div>)}
    </div>
    <div className="mt-auto p-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold"><CircleHelp size={15}/> Pusat Bantuan</div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-300">Prototype konseptual untuk simulasi pengelolaan data LPK.</p>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4 text-[10px] text-slate-400">PROTOTYPE • DATA SIMULASI</div>
    </div>
  </aside>

  const tableRows = active==='validation' ? filtered.filter(r=>r.quality!=='Valid') : filtered
  const pageDescription = {
    dashboard:'Ringkasan informasi lembaga pelatihan kerja dalam satu tampilan.',
    lpk:'Daftar lembaga pelatihan kerja dan informasi dasarnya.',
    accreditation:'Pemantauan status dan masa berlaku akreditasi lembaga.',
    partnership:'Ringkasan kemitraan yang tercatat pada data simulasi.',
    training:'Ringkasan program pelatihan berdasarkan lembaga.',
    validation:'Pemeriksaan kelengkapan dan status kualitas data.',
    reports:'Rekap data untuk kebutuhan evaluasi dan pelaporan.'
  }[active]

  return <div className="min-h-screen bg-[#f4f7fa]">
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:block lg:w-[258px]">{sidebar}</div>
    {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-black/40" onClick={()=>setMobileOpen(false)}/><div className="relative h-full w-[280px]">{sidebar}<button onClick={()=>setMobileOpen(false)} className="absolute right-3 top-5 rounded-lg p-2 text-white"><X size={18}/></button></div></div>}
    <div className="lg:pl-[258px]">
      <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button>
          <div><p className="text-xs text-slate-400">Workspace / {title}</p><h1 className="text-lg font-bold text-ink">{title}</h1></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block"><p className="text-xs font-semibold text-slate-700">Administrator</p><p className="text-[10px] text-slate-400">Akses prototype</p></div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">AD</div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800 ring-1 ring-amber-200"><span className="h-1.5 w-1.5 rounded-full bg-amber-500"/> MODE DEMO • DATA SIMULASI</div><h2 className="text-2xl font-bold tracking-tight text-ink">{active==='dashboard'?'Monitoring Lembaga Pelatihan Kerja':title}</h2><p className="mt-1 text-sm text-slate-500">{pageDescription}</p></div>
          <div className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={15}/> Pembaruan simulasi: 11 November 2026</div>
        </div>

        {notice && <div className="mb-4 flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800"><span>{notice}</span><button onClick={()=>setNotice('')}><X size={16}/></button></div>}

        {active==='dashboard' && <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total LPK" value="8" note="Data lembaga pada simulasi" icon={Building2} accent="blue"/>
            <StatCard title="Terakreditasi" value="4" note="50% dari data simulasi" icon={BadgeCheck} accent="teal"/>
            <StatCard title="Perlu Tindak Lanjut" value="4" note="Data perlu verifikasi / belum lengkap" icon={AlertTriangle} accent="amber"/>
            <StatCard title="Kemitraan Tercatat" value="24" note="Akumulasi mitra pada data simulasi" icon={Handshake} accent="purple"/>
          </div>
          <div className="mt-6 grid gap-5 xl:grid-cols-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
              <div className="mb-5 flex items-start justify-between"><div><h3 className="font-bold text-ink">Jumlah LPK per Wilayah</h3><p className="mt-1 text-xs text-slate-500">Distribusi lembaga berdasarkan wilayah</p></div><span className="rounded-lg bg-slate-50 p-2 text-slate-500"><MapPin size={17}/></span></div>
              <div className="h-[270px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={regional} margin={{top:5,right:10,left:-18,bottom:35}}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf2"/><XAxis dataKey="region" angle={-25} textAnchor="end" interval={0} tick={{fontSize:10,fill:'#64748b'}}/><YAxis allowDecimals={false} tick={{fontSize:11,fill:'#64748b'}}/><Tooltip/><Bar dataKey="total" name="Jumlah LPK" fill="#246b8e" radius={[6,6,0,0]} barSize={28}/></BarChart></ResponsiveContainer></div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-2"><h3 className="font-bold text-ink">Status Akreditasi</h3><p className="mt-1 text-xs text-slate-500">Komposisi status pada data simulasi</p></div>
              <div className="h-[235px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={accreditation} dataKey="value" nameKey="name" cx="50%" cy="48%" innerRadius={58} outerRadius={88} paddingAngle={3}>{accreditation.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip/><Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize:11}}/></PieChart></ResponsiveContainer></div>
            </section>
          </div>
          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-ink">Perlu Perhatian</h3><p className="mt-1 text-xs text-slate-500">Contoh data yang membutuhkan tindak lanjut</p></div><button onClick={()=>setActive('validation')} className="text-xs font-semibold text-brand hover:underline">Lihat semua</button></div>
              <div className="space-y-3">
                {lpkData.filter(x=>x.quality!=='Valid').slice(0,3).map(x=><div key={x.id} className="flex flex-col justify-between gap-2 rounded-xl border border-slate-100 p-3 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold text-slate-800">{x.name}</p><p className="mt-1 text-xs text-slate-500">{x.id} • {x.city}</p></div><Badge tone={x.quality==='Perlu verifikasi'?'amber':'red'}>{x.quality}</Badge></div>)}
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-ink">Status Pipeline</h3><p className="mt-1 text-xs text-slate-500">Ilustrasi alur pembaruan data</p>
              <div className="mt-5 space-y-4">
                {[['Sumber data','Terhubung (simulasi)',CheckCircle2,'text-teal-600'],['Validasi & cleaning','Pemeriksaan contoh data',RefreshCw,'text-blue-600'],['Data Warehouse','PostgreSQL (rancangan)',Database,'text-blue-600']].map(([a,b,I,c])=><div className="flex gap-3" key={a}><div className={`mt-0.5 ${c}`}><I size={18}/></div><div><p className="text-sm font-semibold text-slate-700">{a}</p><p className="text-xs text-slate-500">{b}</p></div></div>)}
              </div>
              <div className="mt-5 rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-blue-800">Status ini hanya ilustrasi antarmuka, bukan koneksi pipeline yang benar-benar berjalan.</div>
            </section>
          </div>
        </>}

        {active!=='dashboard' && <>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div><h3 className="font-bold text-ink">{active==='validation'?'Daftar Pemeriksaan Kualitas Data':`Daftar ${title}`}</h3><p className="mt-1 text-xs text-slate-500">Menampilkan {tableRows.length} baris data simulasi</p></div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari nama, ID, atau kota..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand sm:w-64"/></div>
                <select value={region} onChange={e=>setRegion(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-brand"><option>Semua wilayah</option>{[...new Set(lpkData.map(x=>x.region))].map(x=><option key={x}>{x}</option>)}</select>
                <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-brand"><option>Semua status</option>{['Terakreditasi','Belum Terakreditasi','Dalam Proses'].map(x=><option key={x}>{x}</option>)}</select>
                <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"><Download size={16}/> Ekspor CSV</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                <thead><tr className="border-y border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">{['ID / Lembaga','Wilayah','Akreditasi','Masa berlaku','Program','Kualitas data'].map(h=><th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
                <tbody>{tableRows.map(row=><tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                  <td className="px-4 py-4"><p className="font-semibold text-slate-800">{row.name}</p><p className="mt-1 text-xs text-slate-400">{row.id} • {row.city}</p></td>
                  <td className="px-4 py-4 text-slate-600">{row.region}</td>
                  <td className="px-4 py-4"><Badge tone={row.accreditation==='Terakreditasi'?'green':row.accreditation==='Dalam Proses'?'blue':'amber'}>{row.accreditation}</Badge></td>
                  <td className="px-4 py-4 text-slate-600">{row.expiry}</td>
                  <td className="px-4 py-4 text-slate-600">{row.programs}</td>
                  <td className="px-4 py-4"><Badge tone={row.quality==='Valid'?'green':row.quality==='Perlu verifikasi'?'amber':'red'}>{row.quality}</Badge></td>
                </tr>)}</tbody>
              </table>
              {tableRows.length===0 && <div className="py-12 text-center text-sm text-slate-500">Tidak ada data yang sesuai dengan filter.</div>}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>Data simulasi untuk demonstrasi konsep.</span><span>{tableRows.length} data ditampilkan</span></div>
          </section>
          {active==='validation' && <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4"><p className="text-xs text-rose-700">Data belum lengkap</p><p className="mt-1 text-2xl font-bold text-rose-800">2</p><p className="mt-1 text-xs text-rose-700">Perlu dilengkapi oleh pemilik data</p></div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4"><p className="text-xs text-amber-700">Perlu verifikasi</p><p className="mt-1 text-2xl font-bold text-amber-800">2</p><p className="mt-1 text-xs text-amber-700">Perlu konfirmasi ke sumber resmi</p></div>
            <div className="rounded-xl border border-teal-100 bg-teal-50 p-4"><p className="text-xs text-teal-700">Valid</p><p className="mt-1 text-2xl font-bold text-teal-800">4</p><p className="mt-1 text-xs text-teal-700">Lolos pemeriksaan simulasi</p></div>
          </div>}
        </>}
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-[11px] text-slate-400 sm:flex-row"><span>LPK Integrated Data Monitoring • Prototype konseptual</span><span>Seluruh nama, angka, dan status merupakan data simulasi.</span></footer>
      </main>
    </div>
  </div>
}

export default App
