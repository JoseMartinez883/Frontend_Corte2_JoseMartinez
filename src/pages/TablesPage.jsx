import React, { useState } from 'react';
import TablesView from '../components/tables/TablesView';
import BillingModal from '../components/billing/BillingModal';

export default function TablesPage() {
  const [selectedMesaCobro, setSelectedMesaCobro] = useState(null);

  return (
    <div>
      <TablesView onSelectCobrar={(idMesa) => setSelectedMesaCobro(idMesa)} />

      {selectedMesaCobro && (
        <BillingModal
          idMesa={selectedMesaCobro}
          onClose={() => setSelectedMesaCobro(null)}
          onPagoCompletado={() => setSelectedMesaCobro(null)}
        />
      )}
    </div>
  );
}

