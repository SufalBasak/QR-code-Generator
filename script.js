// qr-generator.js
let canvasElement = null;

function generateQRCode() {
  const text = document.getElementById("text").value;
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";
  if (text.trim() === "") {
    alert("Please enter some text or URL.");
    return;
  }
  QRCode.toCanvas(
    document.createElement("canvas"),
    text,
    { width: 200 },
    function (error, canvas) {
      if (error) console.error(error);
      canvasElement = canvas;
      qrcodeDiv.appendChild(canvas);
    }
  );
}

function shareQRCode() {
  if (!canvasElement) {
    alert("Please generate a QR code first.");
    return;
  }

  canvasElement.toBlob((blob) => {
    const file = new File([blob], "qrcode.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          files: [file],
          title: "QR Code",
          text: "Here is your QR Code.",
        })
        .catch((err) => console.error("Sharing failed", err));
    } else {
      alert("Sharing not supported on this browser/device.");
    }
  });
}
