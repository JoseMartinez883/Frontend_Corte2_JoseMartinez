import React, { useState } from 'react';
import OrderTracker from '../components/orders/OrderTracker';
import CreateReviewModal from '../components/reviews/CreateReviewModal';

export default function TrackingPage() {
  const [reviewOrder, setReviewOrder] = useState(null);

  return (
    <div>
      <OrderTracker onOpenReview={(pedido) => setReviewOrder(pedido)} />

      {reviewOrder && (
        <CreateReviewModal
          isOpen={true}
          onClose={() => setReviewOrder(null)}
          defaultPedidoId={reviewOrder.id}
          onReviewCreated={() => setReviewOrder(null)}
        />
      )}
    </div>
  );
}

