import React, { useEffect, useRef } from 'react';

const Stars = ({ count }) => {
  const canvas_ref = useRef(null);
  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame_id;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    const mouse = { x: null, y: null, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseRadius: Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      baseAlpha: Math.random() * 0.5 + 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        let radius = star.baseRadius;
        let alpha = star.baseAlpha;
        let blur = 8;

        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const hoverRadius = 120;

          if (distance < hoverRadius) {
            const factor = 1 - distance / hoverRadius;
            radius = star.baseRadius + factor * 4;
            alpha = Math.min(1, star.baseAlpha + factor * 0.5);
            blur = 14 + factor * 10;
          }
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowBlur = blur;
        ctx.shadowColor = '#ffffffe6';
        ctx.fill();
      });
      frame_id = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frame_id);
    };
  }, [count]);

  return <canvas ref={canvas_ref} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1 }} />
};

export default Stars;