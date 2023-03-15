import React, { useState } from 'react'
//import { QrReader as Reader } from 'react-qr-reader'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { onMount } from 'solid-js';

interface IProps {
  onRead: (res: string) => void
}

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}


function QrReader({ onRead }: IProps) {
  const [error, setError] = useState(null)

  onMount(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: {width: 250, height: 250} },
      /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  })

  return (
    <div style={{ width: '100%' }}>
      {error ? (
        <div>Error accessing camera</div>
      ) : (
        <>
        {/*<Reader
          delay={300}
          onError={(err: any) => setError(err)}
          onResult={(res: any) => res && onRead(res.text)}
          constraints={{ facingMode: 'environment' }}
      />*/}
        <div id="reader"></div>
        </>
      )}
    </div>
  )
}




export default QrReader
