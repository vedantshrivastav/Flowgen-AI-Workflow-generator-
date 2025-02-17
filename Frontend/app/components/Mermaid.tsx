"use client";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0); // Force re-render when needed

  useEffect(() => {
    // Reset mermaid to clear any previous configurations
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default'
    });

    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        // Clear the container first
        containerRef.current.innerHTML = '';
        
        // Add the chart source
        containerRef.current.innerHTML = chart;

        // Let the DOM update before rendering
        await new Promise(resolve => setTimeout(resolve, 0));
        
        // Render all mermaid charts in the container
        await mermaid.run({
          querySelector: `.mermaid-${key}`,
        });
      } catch (error) {
        console.error('Error rendering mermaid chart:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = 'Error rendering chart';
        }
      }
    };

    renderChart();
  }, [chart, key]);

  // If chart fails to render, provide a retry button
  const handleRetry = () => {
    setKey(prev => prev + 1); // Force re-render
  };

  return (
    <div>
      <div 
        ref={containerRef}
        className={`mermaid mermaid-${key}`}
      />
      <button 
        onClick={handleRetry}
        className="mt-2 text-sm text-gray-600 hover:text-gray-800"
        style={{ display: 'none' }} // Hidden by default, can be shown when needed
      >
        Retry rendering
      </button>
    </div>
  );
}