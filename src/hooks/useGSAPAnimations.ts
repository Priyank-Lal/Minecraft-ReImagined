import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Create main timeline
    timelineRef.current = gsap.timeline();

    // Hero section animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: false,
      }
    });

    heroTl
      .to('.hero-earth', {
        scale: 1.5,
        x: '30vw',
        duration: 1,
        ease: 'power2.out'
      })
      .to('.hero-content', {
        opacity: 0,
        y: -100,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.2);

    // Edition cards animations
    gsap.utils.toArray('.edition-card').forEach((card: any, index) => {
      gsap.fromTo(card, 
        {
          opacity: 0,
          y: 100,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // 3D model hover animations
    const setupModelHover = (selector: string) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            scale: 1.1,
            rotationY: 15,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    };

    // Setup hover animations after a delay to ensure elements are rendered
    setTimeout(() => {
      setupModelHover('.model-container');
    }, 1000);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      timelineRef.current?.kill();
    };
  }, []);

  return timelineRef.current;
};