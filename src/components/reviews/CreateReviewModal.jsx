import React, { useState } from 'react';
import { X, Star, MessageSquareQuote, Check } from 'lucide-react';
import { resenaService } from '../../services/mockApiService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function CreateReviewModal({ isOpen, onClose, defaultPedidoId, onReviewCreated }) {
  const [calificacion, setCalificacion] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comentario, setComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const toast = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) {
      toast.error("Por favor escribe tu opinión sobre los platos.");
      return;
    }

    try {
      setLoading(true);
      await resenaService.create({
        idPedido: defaultPedidoId || `ped-${Date.now()}`,
        clienteEmail: currentUser?.email || 'comensal@bellaciao.com',
        clienteNombre: currentUser?.nombre || 'Comensal Feliz',
        calificacion,
        comentario
      });

      toast.success("¡Gracias por calificar a Bella Ciao! Tu reseña ha sido publicada con éxito.");
      setComentario('');
      if (onReviewCreated) onReviewCreated();
      onClose();
    } catch (err) {
      toast.error("Error al registrar reseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950">
              <Star className="w-5 h-5 fill-stone-950" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Califica tu Experiencia</h2>
              <p className="text-xs text-stone-400">Comparte tu opinión sobre la experiencia gastronómica</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Star selector */}
          <div className="text-center">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
              ¿Cómo calificarías los platos y la atención?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setCalificacion(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoverRating || calificacion) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-amber-800 mt-1 block">
              {calificacion === 5 ? '¡Excelente! 5/5' : `${calificacion} de 5 estrellas`}
            </span>
          </div>

          {/* Comment */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Tu Opinión Sincera *
            </label>
            <textarea
              rows="3"
              required
              placeholder="Cuéntanos qué plato te gustó más, la textura de la pasta o la masa de la pizza..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Publicando...' : 'Publicar Reseña'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}

