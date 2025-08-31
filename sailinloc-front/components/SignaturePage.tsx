// SignaturePage.tsx

const handleValidate = async () => {
  await fetch("/api/contrat/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookingId,
      signature: signatureDataURL,
    }),
  });

  router.push("/recapitulatif-location?bookingId=123");
};
