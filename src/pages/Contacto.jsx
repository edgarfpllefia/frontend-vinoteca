import { useState } from "react";

const BANNER = "https://images.unsplash.com/photo-1423345270195-2e5c44fe51a8?auto=format&fit=crop&w=1920&q=80";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada a un servicio de email
    setEnviado(true);
  };

  return (
    <>
      {/* Banner */}
      <section
        className="relative h-56 md:h-72 flex items-center"
        style={{ backgroundImage: `url(${BANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[var(--color-wine)]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-2">Escríbenos</p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-serif)" }}>
            Contacto
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">Información</p>
            <h2 className="text-3xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
              Estamos aquí para ayudarte
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            ¿Tienes dudas sobre un producto, un pedido o quieres hacer una compra especial para un evento? Escríbenos y te respondemos en menos de 24 horas.
          </p>

          <div className="flex flex-col gap-4 mt-2">
            {[
              { icon: "📍", label: "Dirección", value: "Carrer del Vi, 14 · 08001 Barcelona" },
              { icon: "📞", label: "Teléfono", value: "+34 93 123 45 67" },
              { icon: "✉️", label: "Email", value: "hola@vinoteca.com" },
              { icon: "🕐", label: "Horario", value: "Lun–Vie 10:00–20:00 · Sáb 10:00–14:00" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-medium">{item.label}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div>
          {enviado ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-10">
              <span className="text-4xl">✦</span>
              <h3 className="text-xl font-bold text-[var(--color-wine)]" style={{ fontFamily: "var(--font-serif)" }}>
                Mensaje enviado
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">Te responderemos en menos de 24 horas.</p>
              <button
                onClick={() => { setEnviado(false); setForm({ nombre: "", email: "", asunto: "", mensaje: "" }); }}
                className="text-xs tracking-widest uppercase text-[var(--color-wine)] border border-[var(--color-wine)] px-4 py-2 hover:bg-[var(--color-wine)] hover:text-white transition mt-2"
              >
                Enviar otro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { name: "nombre", label: "Nombre", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "asunto", label: "Asunto", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-wine)] transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white border border-[var(--color-cream-dark)] px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-wine)] transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[var(--color-wine)] hover:bg-[var(--color-wine-light)] text-white text-xs tracking-widest uppercase py-3 transition mt-1"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
