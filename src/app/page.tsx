import React, { useRef, useEffect } from 'react';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

const verifyProof = async (proof) => {
  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...proof, action: 'verify' }),
  });

  if (response.ok) {
    const { verified } = await response.json();
    return verified;
  } else {
    const { code, detail } = await response.json();
    throw new Error(`Error Code ${code}: ${detail}`);
  }
};

const onSuccess = () => {
  console.log('Success');
};

export default function HomePage() {
  const shadowRootRef = useRef(null);

  useEffect(() => {
    if (shadowRootRef.current) {
      const shadowRoot = shadowRootRef.current.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>
          .container-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
        </style>
        <div class="container-center">
          <h1>Community Site</h1>
          <p>월드 커뮤니티는 세계 최초로 월드 ID만 사용하는 완전 영지식 증명 커뮤니티입니다.</p>
          <button id="verify-button">Verify with World ID</button>
        </div>
      `;

      const button = shadowRoot.getElementById('verify-button');
      button.addEventListener('click', () => {
        // handle verify button click
      });
    }
  }, []);

  return <div ref={shadowRootRef}></div>;
}
