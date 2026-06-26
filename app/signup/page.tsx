import { signUp } from '../components/actions';
import { redirect } from 'next/navigation'; // Import for redirection
import authe  from '../auti'

async function handleSubmit(formData: FormData) {
  'use server';

  const session = await authe();
  // if (session?.user) {
  //   redirect('/dd'); 
  // }
  

  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as 'customer' | 'gatekeeper') || 'customer';

  await signUp(email, name, password, role);
  
  // Optionally redirect after successful signup:
  redirect('/dd');
}

export default function SignupTestPage() {
  // Reusable component styles
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
      backgroundColor: '#F8FAFC', // Base App Background
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      {/* Pure CSS injection to safely handle interactive states on the server */}
      <style>{`
        .form-input-field:focus {
          border-color: #0F172A !important;
          box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #0F172A; /* Slate 900 Primary Brand Color */
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          fontSize: '14px';
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .submit-btn:hover {
          background-color: #1E293B; /* Slate 800 Hover state */
        }
        .submit-btn:active {
          transform: scale(0.99);
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
            Create an account
          </h2>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
            Get started with your test account today.
          </p>
        </div>

        {/* Form */}
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="John Doe"
              required 
              className="form-input-field"
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="you@example.com"
              required 
              className="form-input-field"
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"
              required 
              className="form-input-field"
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={labelStyle}>Account Role</label>
            <div style={{ position: 'relative' }}>
              <select 
                name="role" 
                className="form-input-field"
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              >
                <option value="customer">Customer</option>
                <option value="gatekeeper">Gatekeeper</option>
              </select>
              {/* Subtle custom indicator arrow for select menu */}
              <div style={{
                position: 'absolute',
                right: '14px',
                top: '56%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: '#64748B',
                fontSize: '12px'
              }}>▼</div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
