'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';

export default function LoginForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push('/');
    router.refresh();
  }

  // Consistent UI Shared Tokens
  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    fontSize: '14px',
    marginTop: '6px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    backgroundColor: '#FFFFFF',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#334155',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F8FAFC', // Shared canvas color
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      {/* Shared interaction stylesheet */}
      <style>{`
        .form-input-field:focus {
          border-color: #0F172A !important;
          box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #0F172A; /* Shared Brand Color */
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          fontSize: '14px';
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #1E293B;
        }
        .submit-btn:active:not(:disabled) {
          transform: scale(0.99);
        }
        .submit-btn:disabled {
          background-color: #94A3B8;
          cursor: not-allowed;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#FFFFFF',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#0F172A', 
            margin: '0 0 8px 0',
            letterSpacing: '-0.025em'
          }}>
            Welcome back
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
            Sign in to manage your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="form-input-field"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="form-input-field"
              style={inputStyle}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading && <div className="spinner" />}
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}