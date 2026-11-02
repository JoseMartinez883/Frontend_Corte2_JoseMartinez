import React, { useState, useEffect } from 'react';
import { reporteService, platoService } from '../services/mockApiService';
import { 
  TrendingUp, Users, Car, Star, DollarSign, CheckCircle2, ShieldCheck, 
  Award, FileText, Search, Utensils, RefreshCw, Layers, Check, X,
  Clock, ChefHat, Sparkles, AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('resumen'); // 'resumen', 'finanzas', 'populares', 'menu'
  const [metricas, setMetricas] = useState(null);
  const [ingresos, setIngresos] = useState(null);
  const [platosPopulares, setPlatosPopulares] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('TODAS');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [met, ing, pop, pl] = await Promise.all([
        reporteService.getMetricas(),
        reporteService.getIngresos(),
        reporteService.getPlatosPopulares(),
        platoService.getAll()
      ]);
      setMetricas(met);
      setIngresos(ing);
      setPlatosPopulares(pop);
      setPlatos(pl);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTogglePlato = async (id, nombre) => {
    const updated = await platoService.toggleDisponible(id);
    toast.info(`El plato '${nombre}' ahora está marcado como ${updated.disponible ? 'Disponible' : 'Agotado'}.`);
    loadData();
  };

  const filteredPlatos = platos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoriaFilter === 'TODAS' || p.categoria === categoriaFilter;
    return matchSearch && matchCat;
  });

  if (loading || !metricas) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-28 text-center">
        <div className="w-14 h-14 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>
        <h3 className="font-serif text-xl font-bold text-stone-800">Cargando Panel Administrativo...</h3>
        <p className="text-sm text-stone-500 mt-1">Sincronizando métricas operativas y estado de carta</p>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-[#faf8f5] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                Administración General
              </span>
              <span className="text-xs text-stone-500 capitalize">• {currentDate}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Panel de Control Gerencial
            </h1>
            <p className="text-sm text-stone-500 max-w-2xl">
              Monitoreo ejecutivo de ventas, ocupación de mesas, control de cocina y gestión de la carta en tiempo real.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center shrink-0">
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Actualizar Datos</span>
            </button>
            <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Servicio Activo</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'resumen'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Resumen Operativo</span>
          </button>

          <button
            onClick={() => setActiveTab('finanzas')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'finanzas'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Finanzas & Facturación</span>
          </button>

          <button
            onClick={() => setActiveTab('populares')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'populares'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Platos Más Populares</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'menu'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Gestión de Carta ({platos.length})</span>
          </button>
        </div>

        {/* TAB 1: RESUMEN OPERATIVO */}
        {activeTab === 'resumen' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Stat 1 */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Recaudo Consolidado
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-stone-900">
                  ${(ingresos?.totalFinal || metricas.totalVentas).toLocaleString('es-CO')}
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-700 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+14.5% vs semana anterior</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Ocupación de Sala
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-stone-900">
                  {metricas.mesasOcupadas} <span className="text-lg text-stone-400 font-normal">/ {metricas.totalMesas} mesas</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${(metricas.mesasOcupadas / metricas.totalMesas) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Estacionamiento
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-stone-900">
                  {metricas.cuposParqueaderoDisponibles} <span className="text-lg text-stone-400 font-normal">cupos libres</span>
                </div>
                <p className="text-xs text-stone-500 mt-3">
                  {metricas.vehiculosEnParqueadero} vehículos en estancia activa
                </p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Satisfacción Comensal
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-stone-900">{metricas.promedioCalificacion}</span>
                  <span className="text-sm font-semibold text-stone-400">de 5.0</span>
                </div>
                <p className="text-xs text-stone-500 mt-3">
                  Calificación promedio verificada
                </p>
              </div>

            </div>

            {/* Operational Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Estado de Sala */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-700" />
                  Estado del Salón
                </h3>
                <p className="text-xs text-stone-500">
                  Distribución física de las mesas del local en tiempo real.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Mesas Disponibles</span>
                    <span className="font-mono font-bold text-emerald-700">{metricas.totalMesas - metricas.mesasOcupadas}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Mesas con Cuenta Abierta</span>
                    <span className="font-mono font-bold text-rose-700">{metricas.mesasOcupadas}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Capacidad Total del Salón</span>
                    <span className="font-mono font-bold text-stone-900">46 personas</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Cocina & Comandas */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-700" />
                  Operación de Cocina
                </h3>
                <p className="text-xs text-stone-500">
                  Flujo de comandas entrantes y tiempo promedio de despacho.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Comandas en Preparación</span>
                    <span className="font-mono font-bold text-amber-700">{metricas.pedidosEnCocina || 1} comanda</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Tiempo Promedio de Salida</span>
                    <span className="font-mono font-bold text-stone-900">16 minutos</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Eficiencia de Despacho</span>
                    <span className="font-mono font-bold text-emerald-700">98.2% a tiempo</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Estacionamiento */}
              <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-700" />
                  Tarifas y Aforo Vehicular
                </h3>
                <p className="text-xs text-stone-500">
                  Control de parqueadero anexo para clientes del restaurante.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Tarifa Automóviles</span>
                    <span className="font-mono font-bold text-stone-900">$100 / minuto</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Tarifa Motocicletas</span>
                    <span className="font-mono font-bold text-stone-900">$50 / minuto</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-stone-50 text-xs">
                    <span className="font-semibold text-stone-700">Tarifa Mínima de Estancia</span>
                    <span className="font-mono font-bold text-stone-900">$2.000 COP</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: FINANZAS Y FACTURACIÓN */}
        {activeTab === 'finanzas' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Main Ledger Card */}
              <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-stone-900">
                    Balance Financiero y Cierre de Caja
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Auditoría acumulada de cuentas cerradas, desglose de consumos y propinas voluntarias.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="text-xs font-semibold text-stone-500 block">Subtotal Consumos</span>
                    <span className="text-2xl font-black font-mono text-stone-900 mt-2 block">
                      ${(ingresos?.subtotalBruto || 2850000).toLocaleString('es-CO')}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-1 block">Consumos sin propina</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <span className="text-xs font-semibold text-amber-900 block">Propinas Recaudadas (10%)</span>
                    <span className="text-2xl font-black font-mono text-amber-900 mt-2 block">
                      ${(ingresos?.totalPropina || 285000).toLocaleString('es-CO')}
                    </span>
                    <span className="text-[11px] text-amber-700 mt-1 block">Fondo de meseros</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300">
                    <span className="text-xs font-bold text-emerald-950 uppercase block">Total Consolidado</span>
                    <span className="text-2xl font-black font-mono text-emerald-950 mt-2 block">
                      ${(ingresos?.totalFinal || 3135000).toLocaleString('es-CO')}
                    </span>
                    <span className="text-[11px] text-emerald-800 font-semibold mt-1 block">Recaudo final en caja</span>
                  </div>
                </div>

                {/* Métodos de Pago */}
                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Distribución por Medio de Pago
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Tarjetas de Crédito / Débito (Datáfono)</span>
                        <span className="font-mono">52% ($1.630.200)</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-full rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Efectivo en Caja</span>
                        <span className="font-mono">33% ($1.034.550)</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '33%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Transferencias Digitales</span>
                        <span className="font-mono">15% ($470.250)</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Summary */}
              <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                    Métricas de Facturación
                  </h3>
                  <p className="text-xs text-stone-500 mb-6">
                    Indicadores de rendimiento de servicio por mesa.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <span className="text-[11px] font-bold uppercase text-stone-400 block">Comprobantes Liquidados</span>
                      <span className="text-xl font-bold font-mono text-stone-900 mt-1 block">
                        {ingresos?.cuentasLiquidadas || 18} facturas
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <span className="text-[11px] font-bold uppercase text-stone-400 block">Ticket Promedio por Mesa</span>
                      <span className="text-xl font-bold font-mono text-stone-900 mt-1 block">
                        ${Math.round((ingresos?.totalFinal || 3135000) / (ingresos?.cuentasLiquidadas || 18)).toLocaleString('es-CO')}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <span className="text-[11px] font-bold uppercase text-stone-400 block">Adhesión a Propina Voluntaria</span>
                      <span className="text-xl font-bold font-mono text-emerald-700 mt-1 block">
                        94.4% de las mesas
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <p className="font-semibold">Política de Transparencia:</p>
                  <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                    Las propinas se liquidan semanalmente al equipo de cocina y meseros de acuerdo a las horas de servicio.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PLATOS MÁS POPULARES */}
        {activeTab === 'populares' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-stone-900">
                    Ranking de Preferencia Gastronómica
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Platos con mayor rotación en pedidos, utilizados para planificación de compras y mise en place.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold self-start">
                  Top 5 Especialidades
                </span>
              </div>

              <div className="space-y-4">
                {platosPopulares.slice(0, 5).map((plato, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-stone-200/90 hover:border-amber-300 transition-all bg-stone-50/40 hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 font-mono font-black text-lg flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-base text-stone-900">
                          {plato.nombre}
                        </h4>
                        <p className="text-xs text-stone-500">
                          Volumen acumulado en sala y pedidos para llevar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 sm:w-64">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-stone-500">Demanda</span>
                          <span className="font-mono font-bold text-stone-900">{plato.cantidad} órdenes</span>
                        </div>
                        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-600 h-full rounded-full"
                            style={{ width: `${Math.min(100, Math.max(20, (plato.cantidad / (platosPopulares[0]?.cantidad || 42)) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GESTIÓN DE CARTA Y DISPONIBILIDAD */}
        {activeTab === 'menu' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              
              {/* Header and filters */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-stone-900">
                    Control de Carta y Disponibilidad de Menú
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Activa o marca como agotado cualquier ítem de la carta ante falta de ingredientes en bodega.
                  </p>
                </div>

                {/* Search & Category Pills */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Buscar plato..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <select
                    value={categoriaFilter}
                    onChange={(e) => setCategoriaFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="TODAS">Todas las Categorías</option>
                    <option value="PASTA">Pastas</option>
                    <option value="PIZZA">Pizzas</option>
                    <option value="ENTRADA">Entradas</option>
                    <option value="POSTRE">Postres</option>
                    <option value="BEBIDA">Bebidas</option>
                  </select>
                </div>
              </div>

              {/* Grid of Dishes with Generous Spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {filteredPlatos.map(p => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl border border-stone-200/90 bg-white hover:border-amber-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
                  >
                    <div className="flex gap-4">
                      <img
                        src={p.imagenUrl}
                        alt={p.nombre}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-stone-100"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block mb-1">
                          {p.categoria}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug line-clamp-1">
                          {p.nombre}
                        </h4>
                        <span className="font-mono font-bold text-stone-900 text-sm mt-1 block">
                          ${p.precio.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className={`text-xs font-semibold ${p.disponible ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {p.disponible ? 'Disponible en Carta' : 'Marcado como Agotado'}
                      </span>
                      <button
                        onClick={() => handleTogglePlato(p.id, p.nombre)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 ${
                          p.disponible
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {p.disponible ? (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Marcar Agotado</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Habilitar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
