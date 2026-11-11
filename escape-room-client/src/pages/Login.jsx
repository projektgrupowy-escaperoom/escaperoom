import { useState } from 'react'

// EPIC 1 US-01 TASK-05: Utworzenie formularza logowania
export default function Login() {
    const [form, setForm] = useState({ login: '', password: '' })
    const [message, setMessage] = useState(null)

    const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> wysłanie danych do API
    async function submit(e) {
        e.preventDefault()
        setMessage(null)

        try {

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                // EPIC 1 US-01 TASK-07: Przesyłanie ciasteczka sesji
                credentials: 'include',

                body: JSON.stringify(form),
            })



            const data = await res.json()

            // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> komunikat z serwera
            setMessage({ text: data.message, success: res.ok })
            // EPIC 1 US-01 TASK-07: Aktualizacja stanu sesji po logowaniu
            if (res.ok) {
                window.dispatchEvent(new Event('auth-changed'))
            }
        } catch {
            // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> brak połączenia z serwerem
            setMessage({ text: 'Brak połączenia z serwerem.', success: false })
        }
    }

    return (
        <section className="rooms-section">
            <p className="eyebrow">WRÓĆ DO GRY</p>
            <h1 className="rooms-heading">
                Zaloguj <span>się.</span>
            </h1>

            {/* EPIC 1 US-01 TASK-05: Utworzenie formularza logowania -> pola i przycisk */}
            <form className="register-form" onSubmit={submit}>
                <label>
                    E-MAIL LUB NAZWA UŻYTKOWNIKA
                    <input
                        name="login"
                        type="text"
                        value={form.login}
                        onChange={change}
                        required
                    />
                </label>

                <label>
                    HASŁO
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={change}
                        required
                    />
                </label>

                {/* EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> wyświetlenie komunikatu */}
                {message && (
                    <p className={`register-message ${message.success ? 'success' : 'error'}`}>
                        {message.text}
                    </p>
                )}

                <button type="submit" className="start-button">
                    ZALOGUJ SIĘ <span>→</span>
                </button>
            </form>
        </section>
    )
}