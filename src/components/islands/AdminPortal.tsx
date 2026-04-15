import { useEffect, useMemo, useState } from 'preact/hooks';

type ContactLead = {
  _id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  interest: string;
  message?: string;
  notes?: string;
  wantsBrochure?: boolean;
  isRead: boolean;
  createdAt: string;
};

type GalleryImage = {
  _id: string;
  src: string;
  title: string;
  desc?: string;
  category: 'main' | 'extra';
  order: number;
};

type Tab = 'leads' | 'gallery';

const TOKEN_KEY = 'admin_token';

function getToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(TOKEN_KEY) || '';
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
}

export default function AdminPortal() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('leads');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [dataError, setDataError] = useState('');
  const [saving, setSaving] = useState(false);
  const [savingLeadId, setSavingLeadId] = useState('');

  const [newImage, setNewImage] = useState({
    src: '',
    title: '',
    desc: '',
    category: 'main',
  });

  useEffect(() => {
    const existing = getToken();
    setToken(existing);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    void loadData();
  }, [token]);

  const unreadCount = useMemo(() => leads.filter((x) => !x.isRead).length, [leads]);

  async function loadData() {
    setDataLoading(true);
    setDataError('');
    try {
      const [leadsRes, galleryRes] = await Promise.all([
        fetch('/api/contacts', { headers: authHeaders() }),
        fetch('/api/gallery'),
      ]);

      if (leadsRes.status === 401) {
        handleLogout();
        return;
      }

      if (!leadsRes.ok || !galleryRes.ok) throw new Error('Failed to fetch admin data');

      const leadsData = (await leadsRes.json()) as ContactLead[];
      const galleryData = (await galleryRes.json()) as GalleryImage[];
      setLeads(leadsData);
      setGallery(galleryData);
    } catch (err: any) {
      setDataError(err?.message || 'Unable to load admin data');
    } finally {
      setDataLoading(false);
    }
  }

  async function handleLogin(e: Event) {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.token) {
        setLoginError(data?.error || 'Invalid admin credentials');
        return;
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setEmail('');
      setPassword('');
    } catch {
      setLoginError('Server not reachable. Start API server and try again.');
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setLeads([]);
    setGallery([]);
  }

  async function markRead(id: string) {
    await fetch(`/api/contacts/${id}/read`, { method: 'PATCH', headers: authHeaders() });
    setLeads((prev) => prev.map((x) => (x._id === id ? { ...x, isRead: true } : x)));
  }

  function updateLeadNotes(id: string, notes: string) {
    setLeads((prev) => prev.map((x) => (x._id === id ? { ...x, notes } : x)));
  }

  async function saveLeadNotes(id: string) {
    const lead = leads.find((x) => x._id === id);
    if (!lead) return;
    setSavingLeadId(id);
    try {
      const res = await fetch(`/api/contacts/${id}/notes`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ notes: lead.notes || '' }),
      });
      if (!res.ok) throw new Error('Failed to save notes');
    } catch (err: any) {
      alert(err?.message || 'Failed to save notes');
    } finally {
      setSavingLeadId('');
    }
  }

  async function addImage(e: Event) {
    e.preventDefault();
    if (!newImage.src || !newImage.title) return;
    setSaving(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          ...newImage,
          order: gallery.length,
          aspect: 'aspect-[16/10]',
        }),
      });
      if (!res.ok) throw new Error('Failed to add image');
      const created = (await res.json()) as GalleryImage;
      setGallery((prev) => [...prev, created]);
      setNewImage({ src: '', title: '', desc: '', category: 'main' });
    } catch (err: any) {
      alert(err?.message || 'Failed to add image');
    } finally {
      setSaving(false);
    }
  }

  async function saveImage(item: GalleryImage) {
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${item._id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
          src: item.src,
          title: item.title,
          desc: item.desc || '',
          category: item.category,
          order: item.order,
        }),
      });
      if (!res.ok) throw new Error('Failed to update image');
    } catch (err: any) {
      alert(err?.message || 'Failed to update image');
    } finally {
      setSaving(false);
    }
  }

  async function deleteImage(id: string) {
    await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers: authHeaders() });
    setGallery((prev) => prev.filter((x) => x._id !== id));
  }

  if (loading) return <div class="mx-auto max-w-3xl px-4 py-12 text-center text-muted">Loading admin…</div>;

  if (!token) {
    return (
      <div class="mx-auto max-w-md px-4 py-12">
        <div class="rounded-2xl border border-stone/40 bg-white p-6 shadow-sm">
          <h1 class="font-serif text-3xl text-charcoal">Admin Login</h1>
          <p class="mt-2 text-sm text-muted">Sign in to manage contact leads and gallery images.</p>
          <form class="mt-6 space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              placeholder="admin@thesky49.com"
              required
              class="w-full rounded-lg border border-stone/50 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              placeholder="Password"
              required
              class="w-full rounded-lg border border-stone/50 px-4 py-3 text-sm text-charcoal focus:border-gold focus:outline-none"
            />
            {loginError ? <p class="text-sm text-red-600">{loginError}</p> : null}
            <button
              type="submit"
              disabled={loginLoading}
              class="w-full rounded-lg bg-charcoal px-4 py-3 text-sm font-semibold text-white transition hover:bg-gold hover:text-charcoal disabled:opacity-60"
            >
              {loginLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div class="mb-6 flex items-center justify-between gap-4">
        <h1 class="font-serif text-3xl text-charcoal">Admin Dashboard</h1>
        <button class="rounded-lg bg-stone/20 px-4 py-2 text-sm text-charcoal hover:bg-stone/30" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div class="mb-6 flex gap-2">
        <button
          class={`rounded-lg px-4 py-2 text-sm font-medium ${tab === 'leads' ? 'bg-charcoal text-white' : 'bg-stone/20 text-charcoal'}`}
          onClick={() => setTab('leads')}
        >
          Leads ({dataLoading ? '...' : leads.length})
        </button>
        <button
          class={`rounded-lg px-4 py-2 text-sm font-medium ${tab === 'gallery' ? 'bg-charcoal text-white' : 'bg-stone/20 text-charcoal'}`}
          onClick={() => setTab('gallery')}
        >
          Gallery ({dataLoading ? '...' : gallery.length})
        </button>
      </div>

      {dataError ? <p class="mb-4 text-sm text-red-600">{dataError}</p> : null}

      {tab === 'leads' ? (
        <div class="space-y-3">
          <p class="text-sm text-muted">Unread: {dataLoading ? '...' : unreadCount}</p>
          {dataLoading ? (
            <div class="space-y-3" aria-live="polite" aria-busy="true">
              {Array.from({ length: 4 }).map((_, idx) => (
                <article class="animate-pulse rounded-xl border border-stone/40 bg-white p-4 shadow-sm" key={`lead-skeleton-${idx}`}>
                  <div class="h-4 w-48 rounded bg-stone/30"></div>
                  <div class="mt-3 h-3 w-64 rounded bg-stone/20"></div>
                  <div class="mt-2 h-3 w-full rounded bg-stone/20"></div>
                  <div class="mt-4 flex gap-2">
                    <div class="h-7 w-20 rounded bg-stone/20"></div>
                    <div class="h-7 w-24 rounded bg-stone/20"></div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          {!dataLoading ? leads.map((lead) => (
            <article class="rounded-xl border border-stone/40 bg-white p-4 shadow-sm">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="font-semibold text-charcoal">
                  {lead.firstName} {lead.lastName || ''}
                </p>
                <p class="text-xs text-muted">{new Date(lead.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <p class="mt-1 text-sm text-muted">
                {lead.email || 'No email'} • {lead.phone} • {lead.interest}
              </p>
              {lead.message ? <p class="mt-2 text-sm text-charcoal/80">{lead.message}</p> : null}
              <div class="mt-3 space-y-2">
                <label class="text-[11px] font-medium uppercase tracking-wider text-muted">Notes</label>
                <textarea
                  value={lead.notes || ''}
                  onInput={(e) => updateLeadNotes(lead._id, (e.target as HTMLTextAreaElement).value)}
                  rows={2}
                  placeholder="Add notes about this lead..."
                  class="w-full rounded-lg border border-stone/50 px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-gold focus:outline-none"
                />
              </div>
              <div class="mt-3 flex gap-2">
                {!lead.isRead ? (
                  <button class="rounded-lg bg-charcoal px-3 py-1.5 text-xs text-white" onClick={() => markRead(lead._id)}>
                    Mark read
                  </button>
                ) : (
                  <span class="rounded-lg bg-green-100 px-3 py-1.5 text-xs text-green-700">Read</span>
                )}
                <button
                  class="rounded-lg bg-blue-100 px-3 py-1.5 text-xs text-blue-700"
                  onClick={() => saveLeadNotes(lead._id)}
                  disabled={savingLeadId === lead._id}
                >
                  {savingLeadId === lead._id ? 'Saving...' : 'Save notes'}
                </button>
              </div>
            </article>
          )) : null}
          {!dataLoading && leads.length === 0 ? <p class="text-sm text-muted">No leads yet.</p> : null}
        </div>
      ) : (
        <div>
          <form class="mb-6 grid gap-3 rounded-xl border border-stone/40 bg-white p-4 shadow-sm md:grid-cols-2" onSubmit={addImage}>
            <input
              type="text"
              placeholder="Title"
              value={newImage.title}
              onInput={(e) => setNewImage((p) => ({ ...p, title: (e.target as HTMLInputElement).value }))}
              class="rounded-lg border border-stone/50 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              required
            />
            <input
              type="url"
              placeholder="Image URL or /public-path.jpg"
              value={newImage.src}
              onInput={(e) => setNewImage((p) => ({ ...p, src: (e.target as HTMLInputElement).value }))}
              class="rounded-lg border border-stone/50 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newImage.desc}
              onInput={(e) => setNewImage((p) => ({ ...p, desc: (e.target as HTMLInputElement).value }))}
              class="rounded-lg border border-stone/50 px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
            <div class="flex gap-2">
              <select
                value={newImage.category}
                onChange={(e) =>
                  setNewImage((p) => ({ ...p, category: (e.target as HTMLSelectElement).value as 'main' | 'extra' }))
                }
                class="flex-1 rounded-lg border border-stone/50 px-3 py-2 text-sm focus:border-gold focus:outline-none"
              >
                <option value="main">Main</option>
                <option value="extra">Extra</option>
              </select>
              <button
                type="submit"
                disabled={saving}
                class="rounded-lg bg-charcoal px-4 py-2 text-sm font-medium text-white hover:bg-gold hover:text-charcoal disabled:opacity-60"
              >
                Add
              </button>
            </div>
          </form>

          <div class="space-y-3">
            {dataLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <article class="animate-pulse grid gap-3 rounded-xl border border-stone/40 bg-white p-4 shadow-sm md:grid-cols-[120px_1fr_auto]" key={`gallery-skeleton-${idx}`}>
                  <div class="h-24 w-full rounded-lg bg-stone/20"></div>
                  <div class="space-y-2">
                    <div class="h-9 w-full rounded bg-stone/20"></div>
                    <div class="h-9 w-full rounded bg-stone/20"></div>
                  </div>
                  <div class="h-9 w-16 rounded bg-stone/20"></div>
                </article>
              ))
            ) : gallery.map((img) => (
              <article class="grid gap-3 rounded-xl border border-stone/40 bg-white p-4 shadow-sm md:grid-cols-[120px_1fr_auto]">
                <img src={img.src} alt={img.title} class="h-24 w-full rounded-lg object-cover" />
                <div class="space-y-2">
                  <input
                    value={img.title}
                    onInput={(e) =>
                      setGallery((prev) =>
                        prev.map((x) => (x._id === img._id ? { ...x, title: (e.target as HTMLInputElement).value } : x))
                      )
                    }
                    class="w-full rounded-lg border border-stone/50 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    value={img.src}
                    onInput={(e) =>
                      setGallery((prev) =>
                        prev.map((x) => (x._id === img._id ? { ...x, src: (e.target as HTMLInputElement).value } : x))
                      )
                    }
                    class="w-full rounded-lg border border-stone/50 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div class="flex items-start gap-2">
                  <button
                    class="rounded-lg bg-charcoal px-3 py-2 text-xs text-white hover:bg-gold hover:text-charcoal"
                    onClick={() => saveImage(img)}
                  >
                    Save
                  </button>
                </div>
              </article>
            ))}
            {!dataLoading && gallery.length === 0 ? <p class="text-sm text-muted">No gallery images yet.</p> : null}
          </div>
        </div>
      )}
    </div>
  );
}
