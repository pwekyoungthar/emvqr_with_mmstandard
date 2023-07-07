const fs = require("fs");
const qr = require("qr-image");

// Generate Payload
function generatePayload(
  pim,
  merchantID,
  transactionAmount,
  merchantName,
  merchantCity,
  countryCode,
  mcc,
  currencyCode,
  tipIndicator,
  rfuEmvCo,
  merchantInfo
) {
  const payload = {
    pim,
    merchantID,
    transactionAmount,
    merchantName,
    merchantCity,
    countryCode,
    mcc,
    currencyCode,
    tipIndicator,
    rfuEmvCo,
    merchantInfo,
  };

  return JSON.stringify(payload);
}

// Generate QR Code
function generateQRCode(payload, outputPath) {
  const qrCode = qr.image(payload, { type: "png" });
  const writeStream = fs.createWriteStream(outputPath);
  qrCode.pipe(writeStream);
  writeStream.on("finish", () => {
    console.log(`QR code saved: ${outputPath}`);
  });
}

// Generate Random Merchant ID
function generateMerchantID() {
  const randomID = Math.floor(Math.random() * 10000000000).toString();
  return randomID;
}

// Read merchant data from JSON file

const merchantData = JSON.parse(
  fs.readFileSync("client/src/access/merchantdatas.json")
);

// Generate QR Codes for each merchant
merchantData.forEach((merchant) => {
  const pim = "00";
  const merchantID = generateMerchantID();
  const transactionAmount = "100.00";
  const countryCode = "MM";
  const mcc = "1234";
  const currencyCode = "MMK";
  const tipIndicator = "01";
  const rfuEmvCo = "0000";
  const merchantInfo = {
    templateID: "26",
    guid: "D840000000",
  };

  const { merchantName, merchantCity } = merchant;

  const payload = generatePayload(
    pim,
    merchantID,
    transactionAmount,
    merchantName,
    merchantCity,
    countryCode,
    mcc,
    currencyCode,
    tipIndicator,
    rfuEmvCo,
    merchantInfo
  );

  const fileName = `client/src/access/${merchantName
    .replace(/\s/g, "_")
    .toLowerCase()}_qr_code.png`;
  const outputPath = fileName;
  generateQRCode(payload, outputPath);

  console.log(`QR Code generated for ${merchantName}`);
});
