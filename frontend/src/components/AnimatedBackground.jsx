import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let lines = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse for interactive effects
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create floating particles
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#f97316' : '#10b981';
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;

        // Mouse interaction - particles move away from cursor
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * pulse;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // Create energy lines
    class EnergyLine {
      constructor() {
        this.reset();
      }

      reset() {
        this.startX = Math.random() * canvas.width;
        this.startY = Math.random() * canvas.height;
        this.length = Math.random() * 200 + 100;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = Math.random() > 0.5 ? '#f97316' : '#10b981';
        this.progress = 0;
        this.width = Math.random() * 2 + 1;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.reset();
          this.progress = 0;
        }
      }

      draw() {
        const endX = this.startX + Math.cos(this.angle) * this.length;
        const endY = this.startY + Math.sin(this.angle) * this.length;
        
        const gradient = ctx.createLinearGradient(this.startX, this.startY, endX, endY);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(this.progress, this.color);
        gradient.addColorStop(Math.min(this.progress + 0.1, 1), 'transparent');

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.globalAlpha = this.opacity;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize particles and lines
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }
    for (let i = 0; i < 15; i++) {
      lines.push(new EnergyLine());
    }

    // Draw perspective grid
    const drawGrid = (time) => {
      const gridSize = 60;
      const vanishY = canvas.height * 0.3;
      const horizonY = canvas.height * 0.5;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      // Horizontal lines with perspective
      for (let i = 0; i < 20; i++) {
        const y = horizonY + i * gridSize;
        const scale = (y - vanishY) / (canvas.height - vanishY);
        const leftX = canvas.width / 2 - (canvas.width * 0.6 * scale);
        const rightX = canvas.width / 2 + (canvas.width * 0.6 * scale);
        
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.globalAlpha = 0.1 * scale;
        ctx.stroke();
      }

      // Vertical lines with perspective
      const numVerticals = 20;
      for (let i = -numVerticals / 2; i <= numVerticals / 2; i++) {
        const xOffset = i * gridSize;
        const startY = horizonY;
        const endY = canvas.height;
        
        const startX = canvas.width / 2 + xOffset * 0.1;
        const endX = canvas.width / 2 + xOffset * 2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.globalAlpha = 0.08;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    // Draw floating hexagons
    const drawHexagons = (time) => {
      const hexagons = [
        { x: canvas.width * 0.1, y: canvas.height * 0.2, size: 60, speed: 0.001, rotSpeed: 0.0005 },
        { x: canvas.width * 0.9, y: canvas.height * 0.3, size: 80, speed: 0.0008, rotSpeed: 0.0003 },
        { x: canvas.width * 0.15, y: canvas.height * 0.7, size: 50, speed: 0.0012, rotSpeed: 0.0006 },
        { x: canvas.width * 0.85, y: canvas.height * 0.8, size: 70, speed: 0.0009, rotSpeed: 0.0004 },
        { x: canvas.width * 0.5, y: canvas.height * 0.15, size: 45, speed: 0.0011, rotSpeed: 0.0007 },
      ];

      hexagons.forEach((hex, index) => {
        const yOffset = Math.sin(time * hex.speed) * 30;
        const rotation = time * hex.rotSpeed;
        const color = index % 2 === 0 ? '#f97316' : '#10b981';
        
        ctx.save();
        ctx.translate(hex.x, hex.y + yOffset);
        ctx.rotate(rotation);
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = Math.cos(angle) * hex.size;
          const y = Math.sin(angle) * hex.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
        
        // Inner glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    };

    // Draw glowing orbs
    const drawOrbs = (time) => {
      const orbs = [
        { x: 0.15, y: 0.2, size: 300, color: '#f97316', opacity: 0.08, speed: 0.0003 },
        { x: 0.85, y: 0.4, size: 250, color: '#10b981', opacity: 0.06, speed: 0.0004 },
        { x: 0.3, y: 0.8, size: 350, color: '#f97316', opacity: 0.05, speed: 0.0002 },
        { x: 0.7, y: 0.9, size: 200, color: '#10b981', opacity: 0.07, speed: 0.0005 },
      ];

      orbs.forEach((orb) => {
        const xOffset = Math.sin(time * orb.speed) * 50;
        const yOffset = Math.cos(time * orb.speed * 1.5) * 30;
        const x = canvas.width * orb.x + xOffset;
        const y = canvas.height * orb.y + yOffset;
        
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

    // Draw connection lines between nearby particles
    const drawConnections = () => {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = (1 - dist / 120) * 0.2;
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;
    };

    // Animation loop
    const animate = (time) => {
      // Clear with dark background
      ctx.fillStyle = '#0a0a0b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw layers
      drawOrbs(time);
      drawGrid(time);
      drawHexagons(time);
      
      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      drawConnections();

      // Update and draw energy lines
      lines.forEach((l) => {
        l.update();
        l.draw();
      });

      // Vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: '#0a0a0b' }}
      />
      {/* Noise overlay for texture */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Scanline effect */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </>
  );
};

export default AnimatedBackground;
