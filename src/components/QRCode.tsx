import { QRCodeSVG } from 'qrcode.react';

export default function QRCode() {
  const currentUrl = window.location.href;
  
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-cafe-800">Scan to Share</h3>
      <QRCodeSVG value={currentUrl} size={128} />
      <p className="text-sm text-gray-600">Scan this code to access our offer on your mobile device</p>
    </div>
  );
}