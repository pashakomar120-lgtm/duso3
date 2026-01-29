import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#0d1117] to-[#0a0a0b]" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
          animation: 'float1 20s ease-in-out infinite',
          filter: 'blur(100px)'
        }}
      />
      <div 
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
          animation: 'float2 25s ease-in-out infinite',
          filter: 'blur(80px)'
        }}
      />
      <div 
        className="absolute bottom-0 left-1/3 w-[700px] h-[700px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
          animation: 'float3 30s ease-in-out infinite',
          filter: 'blur(90px)'
        }}
      />
      <div 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
          animation: 'float4 22s ease-in-out infinite',
          filter: 'blur(70px)'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />
      
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: i % 2 === 0 ? '#f97316' : '#10b981',
            opacity: Math.random() * 0.3 + 0.1,
            animation: `particle ${Math.random() * 20 + 10}s linear infinite`,
            animationDelay: `-${Math.random() * 20}s`
          }}
        />
      ))}
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(100px, 50px) scale(1.1); }
          50% { transform: translate(50px, 100px) scale(0.9); }
          75% { transform: translate(-50px, 50px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-80px, -40px) scale(1.15); }
          50% { transform: translate(-40px, -80px) scale(0.85); }
          75% { transform: translate(40px, -40px) scale(1.1); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -60px) scale(1.2); }
          66% { transform: translate(-60px, -30px) scale(0.8); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-100px, 100px) scale(1.3); }
        }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;