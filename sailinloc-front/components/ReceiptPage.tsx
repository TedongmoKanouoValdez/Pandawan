// ReceiptPage.tsx

const { bookingId } = useParams();
useEffect(() => {
  fetch(`/api/contrat/${bookingId}`).then(res => res.json()).then(setData);
}, []);
