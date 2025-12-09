import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

export function WaitlistModal({ isOpen, onClose, planName }: WaitlistModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    businessType: '',
    employeesCount: '',
    fullName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            business_type: formData.businessType,
            employees_count: formData.employeesCount,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            plan_interest: planName || 'General',
          },
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
            businessType: '',
            employeesCount: '',
            fullName: '',
            email: '',
            phone: '',
        })
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting to waitlist:', err);
      setError('Hubo un error al guardar tus datos. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Unirse a la Lista de Espera</h3>
              {planName && <p className="text-sm text-zinc-500">Interesado en: {planName}</p>}
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {success ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-zinc-900">¡Gracias por registrarte!</h4>
                <p className="text-zinc-500">Te contactaremos pronto cuando tengamos cupo disponible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-zinc-700">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Correo Electrónico
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hola@negocio.com"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        required
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="951 123 4567"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                       <label htmlFor="businessType" className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Giro del Negocio
                      </label>
                      <select
                        required
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="">Selecciona...</option>
                        <option value="Restaurante/Comida">Restaurante / Comida</option>
                        <option value="Comercio Local">Comercio / Tienda</option>
                        <option value="Servicios Profesionales">Servicios Profesionales</option>
                        <option value="Salud/Belleza">Salud / Belleza</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="employeesCount" className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Empleados
                      </label>
                      <select
                        required
                        id="employeesCount"
                        name="employeesCount"
                        value={formData.employeesCount}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      >
                        <option value="">Selecciona...</option>
                        <option value="1 (Solo yo)">1 (Solo yo)</option>
                        <option value="2-5">2 - 5</option>
                        <option value="6-10">6 - 10</option>
                        <option value="11+">Más de 10</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-200 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrando...
                      </>
                    ) : (
                      'Unirme a la Lista'
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-zinc-400">
                    Tus datos están protegidos y no compartiremos tu información.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
