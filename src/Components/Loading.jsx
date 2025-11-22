import React from 'react';

// Main loading component with refined colors
export default function Loading({ isVisible = true }) {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fafbfc',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px'
    }}>
      {/* Spinner */}
      <div style={{
        width: '32px',
        height: '32px',
        border: '2px solid #f1f5f9',
        borderTopColor: '#2563eb',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      
      {/* Loading text */}
      <div style={{
        textAlign: 'center',
        color: '#475569'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '500',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-primary)',
          color: '#0f172a'
        }}>
          Loading...
        </h3>
        <p style={{
          fontSize: '14px',
          margin: 0,
          opacity: 0.8,
          fontFamily: 'var(--font-primary)',
          color: '#64748b'
        }}>
          Please wait while we prepare your content
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// SupaDoc healthcare specific loading
export function SupaDocLoading({ isVisible = true }) {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fafbfc',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '32px'
    }}>
      {/* Medical cross spinner with refined styling */}
      <div style={{
        width: '48px',
        height: '48px',
        position: 'relative'
      }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid #f0f4f8',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        {/* Medical cross icon */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          color: '#2563eb',
          fontWeight: '600'
        }}>
          +
        </div>
      </div>
      
      {/* SupaDoc branding */}
      <div style={{
        textAlign: 'center',
        color: '#0f172a'
      }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-primary)',
          color: '#2563eb',
          letterSpacing: '-0.01em'
        }}>
          SupaDoc
        </h3>
        <p style={{
          fontSize: '14px',
          margin: 0,
          fontFamily: 'var(--font-primary)',
          color: '#475569',
          fontWeight: '500'
        }}>
          Preparing your healthcare dashboard...
        </p>
      </div>

      {/* Subtle background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(29, 78, 216, 0.05) 100%)',
        filter: 'blur(40px)',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '20%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
        filter: 'blur(30px)',
        zIndex: -1
      }} />

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Elegant dots loading with healthcare theme
export function DotsLoading({ isVisible = true }) {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fafbfc',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '32px'
    }}>
      {/* Elegant three dots */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        alignItems: 'center'
      }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              animation: `bounce 1.4s ease-in-out ${index * 0.16}s infinite both`
            }}
          />
        ))}
      </div>
      
      {/* Healthcare brand text */}
      <div style={{
        textAlign: 'center',
        color: '#0f172a'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-primary)',
          letterSpacing: '-0.02em',
          color: '#0f172a'
        }}>
          SupaDoc
        </h2>
        <p style={{
          fontSize: '12px',
          margin: 0,
          fontFamily: 'var(--font-primary)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: '600',
          color: '#94a3b8'
        }}>
          Healthcare Platform
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.6);
            opacity: 0.5; 
          }
          40% { 
            transform: scale(1);
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}

// Minimal progress loading
export function ProgressTextLoading({ isVisible = true }) {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fafbfc',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px'
    }}>
      {/* Refined spinner */}
      <div style={{
        width: '28px',
        height: '28px',
        border: '2px solid #f1f5f9',
        borderTopColor: '#2563eb',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      
      {/* Animated text with typography */}
      <div style={{
        textAlign: 'center',
        color: '#475569',
        fontFamily: 'var(--font-primary)'
      }}>
        <p style={{
          fontSize: '16px',
          margin: 0,
          fontWeight: '500',
          color: '#0f172a'
        }}>
          Loading{dots}
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Premium healthcare loading with pulse effect
export function PremiumHealthcareLoading({ isVisible = true }) {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#fafbfc',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '40px'
    }}>
      {/* Premium spinner with pulse */}
      <div style={{
        width: '60px',
        height: '60px',
        position: 'relative'
      }}>
        {/* Outer pulse ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '2px solid rgba(37, 99, 235, 0.2)',
          borderRadius: '50%',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        {/* Main spinner */}
        <div style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          top: '15%',
          left: '15%',
          border: '3px solid #f0f4f8',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        {/* Center icon */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20px',
          color: '#2563eb',
          fontWeight: '700'
        }}>
          ♡
        </div>
      </div>
      
      {/* Premium text */}
      <div style={{
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          margin: '0 0 12px 0',
          fontFamily: 'var(--font-primary)',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          SupaDoc
        </h2>
        <p style={{
          fontSize: '16px',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-primary)',
          color: '#0f172a',
          fontWeight: '600'
        }}>
          Healthcare Excellence
        </p>
        <p style={{
          fontSize: '14px',
          margin: 0,
          fontFamily: 'var(--font-primary)',
          color: '#64748b',
          fontWeight: '400'
        }}>
          Connecting you to quality care...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}