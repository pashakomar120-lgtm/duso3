import React, { useEffect, useRef, useState, memo } from 'react';

const AnimatedBackground = memo(() => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if device prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable animations on mobile for better performance
    const isMobile = window.innerWidth < 768;
    
    if (prefersReducedMotion || isMobile) {
      setIsVisible(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationId;
    let particles = [];
    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Limit DPR
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Simplified particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '#f97316' : '#10b981';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Fewer particles for better performance
    const particleCount = Math.min(40, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw glowing orbs (static, rendered once per frame)
    const drawOrbs = () => {
      const orbs = [
        { x: 0.15, y: 0.2, size: 250, color: '#f97316', opacity: 0.06 },
        { x: 0.85, y: 0.4, size: 200, color: '#10b981', opacity: 0.05 },
        { x: 0.3, y: 0.8, size: 280, color: '#f97316', opacity: 0.04 },
      ];

      orbs.forEach((orb) => {
        const x = window.innerWidth * orb.x;
        const y = window.innerHeight * orb.y;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(x, y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = orb.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    // Animation loop with throttling
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime >= frameInterval) {
        lastTime = timestamp - (deltaTime % frameInterval);
        
        // Clear canvas
        ctx.fillStyle = '#0a0a0b';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw orbs
        drawOrbs();
        
        // Update and draw particles
        particles.forEach((p) => {
          p.update();
          p.draw();
        });

        // Simple vignette
        const vignette = ctx.createRadialGradient(
          window.innerWidth / 2, window.innerHeight / 2, 0,
          window.innerWidth / 2, window.innerHeight / 2, window.innerWidth * 0.7
        );
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      animationId = requestAnimationFrame(animate);
    };

    // Start animation after a small delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!isVisible) {
    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ 
          background: 'radial-gradient(ellipse at 20% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%), #0a0a0b'
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0a0a0b' }}
    />
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
