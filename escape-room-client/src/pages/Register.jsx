import { useState } from 'react'

// EPIC 1 US-01 TASK-02: Utworzenie formularza rejestracji
export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [message, setMessage] = useState(null)

    const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    // EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji -> wysłanie danych do API
    async function submit(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5162/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            // EPIC 1 US-01 TASK-04: Walidacja i komunikaty rejestracji -> komunikat z serwera
            setMessage({ text: data.message, success: res.ok })
        } catch {
            // EPIC 1 US-01 TASK-04: Walidacja i komunikaty rejestracji -> brak połączenia z serwerem
            setMessage({ text: 'Brak połączenia z serwerem.', success: false })
        }
    }

    return (
        <section className="rooms-section">
            <p className="eyebrow">DOŁĄCZ DO GRY</p>
            <h1 className="rooms-heading">
                Załóż <span>konto.</span>
            </h1>

            {/* EPIC 1 US-01 TASK-02: Utworzenie formularza rejestracji -> pola i przycisk */}
            <form className="register-form" onSubmit={submit}>
                <label>
                    NAZWA UŻYTKOWNIKA
                    <input name="username" value={form.username} onChange={change} />
                </label>
                <label>
                    E-MAIL
                    <input name="email" type="email" value={form.email} onChange={change} />
                </label>
                <label>
                    HASŁO
                    <input name="password" type="password" value={form.password} onChange={change} />
                </label>
                <label>
                    POWTÓRZ HASŁO
                    <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={change} />
                </label>

                <p className="register-hint">Hasło: min. 8 znaków, w tym cyfra.</p>

                {/* EPIC 1 US-01 TASK-04: Walidacja i komunikaty rejestracji -> wyświetlenie komunikatu */}
                {message && (
                    <p className={`register-message ${message.success ? 'success' : 'error'}`}>
                        {message.text}
                    </p>
                )}

                <button className="start-button">
                    ZAREJESTRUJ SIĘ <span>→</span>
                </button>
            </form>
        </section>
    )
}