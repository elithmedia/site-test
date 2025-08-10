'use client'
import { useState } from 'react'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function requestMagic() {
    // In a real app, use Supabase auth signInWithOtp. Placeholder UI.
    setSent(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      {!sent ? (
        <div className="max-w-sm space-y-3">
          <input className="border rounded p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="px-4 py-2 rounded bg-black text-white" onClick={requestMagic}>Trimite link de autentificare</button>
          <p className="text-sm opacity-70">Doar emailurile autorizate pot accesa panoul.</p>
        </div>
      ) : (
        <p>Verifica emailul pentru link.</p>
      )}
      <div className="mt-10">
        <h2 className="font-medium mb-2">CRUD (schelet)</h2>
        <ul className="list-disc pl-6">
          <li>Clients, Projects, Media, Tags</li>
          <li>Leads (export CSV)</li>
          <li>Consent stats</li>
        </ul>
      </div>
    </div>
  )
}
