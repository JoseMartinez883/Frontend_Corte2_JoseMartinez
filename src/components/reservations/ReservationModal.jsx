import React, { useState, useEffect } from 'react';
import { reservaService } from '../../services/mockApiService';
import { X, Calendar, Clock, Users, Phone, Mail, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ReservationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    telefono: '',
    email: '',
    idMesa: 3,
    numeroPersonas: 4,
    fechaHora: '',
    notas: ''
  });
  const [reservas, setReservas] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Set default date to tomorrow at 20:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20, 0, 0, 0);
    const isoLocal = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setFormData(prev => ({ ...prev, fechaHora: isoLocal }));

    loadReservas();
  }, [isOpen]);

  const loadReservas = async () => {
    const list = await reservaService.getAll();
    setReservas(list);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombreCliente || !formData.telefono || !formData.email || !formData.fechaHora) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      setLoading(true);
      await reservaService.create(formData);
      toast.success(`¡Reserva confirmada con éxito para ${formData.nombreCliente} en Mesa ${formData.idMesa}!`);
      loadReservas();
      setShowList(true);
    } catch (err) {
      toast.error(err.message || "Error al registrar reserva.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    await reservaService.cancel(id);
    toast.info("Reserva cancelada exitosamente.");
    loadReservas();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Reserva de Mesa</h2>
              <p className="text-xs text-stone-400">Restaurante Bella Ciao • Bloque exclusivo de 2 horas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 shrink-0">
          <button
            onClick={() => setShowList(false)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
              !showList ? 'border-amber-600 text-amber-900 bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Nueva Reserva
          </button>
          <button
            onClick={() => setShowList(true)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition ${
              showList ? 'border-amber-600 text-amber-900 bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Ver Reservas Registradas ({reservas.filter(r => r.activa).length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!showList ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sofía Vergara"
                    value={formData.nombreCliente}
                    onChange={(e) => setFormData({ ...formData, nombreCliente: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Teléfono Móvil *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 312 345 6789"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="sofia@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              {/* Mesa y Personas en 2 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Mesa Preferida</label>
                  <select
                    value={formData.idMesa}
                    onChange={(e) => setFormData({ ...formData, idMesa: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value={1}>Mesa 1 (Terraza • 2 pers.)</option>
                    <option value={2}>Mesa 2 (Salón Principal • 4 pers.)</option>
                    <option value={3}>Mesa 3 (Salón Principal • 4 pers.)</option>
                    <option value={4}>Mesa 4 (Salón Principal • 6 pers.)</option>
                    <option value={5}>Mesa 5 (Terraza • 2 pers.)</option>
                    <option value={6}>Mesa 6 (Zona VIP • 8 pers.)</option>
                    <option value={7}>Mesa 7 (Salón Principal • 4 pers.)</option>
                    <option value={8}>Mesa 8 (Terraza • 2 pers.)</option>
                    <option value={9}>Mesa 9 (Salón Principal • 6 pers.)</option>
                    <option value={10}>Mesa 10 (Zona VIP • 10 pers.)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Número de Personas</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.numeroPersonas}
                    onChange={(e) => setFormData({ ...formData, numeroPersonas: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Fecha y Hora en su propia fila completa (evita que se corte AM/PM) */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Fecha y Hora de la Reserva *</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    required
                    value={formData.fechaHora}
                    onChange={(e) => setFormData({ ...formData, fechaHora: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Petición Especial / Ocasión (Opcional)</label>
                <textarea
                  rows="2"
                  placeholder="Ej: Celebración de aniversario, mesa cerca a la terraza..."
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              {/* Informative Service Note */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Asignación Exclusiva de Mesa:</strong> Cada reserva cuenta con una franja de 2 horas para garantizar una experiencia relajada. Si el horario seleccionado coincide con otra visita en la misma mesa, el sistema te sugerirá disponibilidad alternativa.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition"
              >
                {loading ? 'Validando horario con el sistema...' : 'Confirmar Reserva de Mesa'}
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              {reservas.filter(r => r.activa).length === 0 ? (
                <p className="text-center text-sm text-stone-400 py-8">No hay reservas activas en este momento.</p>
              ) : (
                reservas.filter(r => r.activa).map(r => (
                  <div key={r.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-stone-900 text-sm mb-1">
                        <span>Mesa #{r.idMesa}</span>
                        <span className="text-xs text-stone-500 font-normal">({r.numeroPersonas} personas)</span>
                      </div>
                      <p className="text-stone-600">Cliente: <strong>{r.nombreCliente}</strong> • {r.telefono}</p>
                      <p className="text-amber-800 font-medium mt-1">
                        Horario: {new Date(r.fechaHora).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCancel(r.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold transition text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

