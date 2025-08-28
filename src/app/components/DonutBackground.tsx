"use client";
import React from 'react';

interface DonutRingProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center' | 'center-left' | 'center-right';
  opacity: number;
  className?: string;
  strokeWidth?: number;
  segments?: Array<{ value: number; color: string; }>;
}

const DonutRing: React.FC<DonutRingProps> = ({ 
  size, 
  position, 
  opacity, 
  className = '', 
  strokeWidth,
  segments = [
    // { value: 30, color: '#3b82f6' }, // blue
    // { value: 25, color: '#10b981' }, // emerald
    // { value: 20, color: '#f59e0b' }, // amber
    { value: 25, color: '#ef4444' }  // red
  ]
}) => {
  // Size configurations for donut rings (increased sizes)
  const sizeConfig = {
    sm: { diameter: 130, defaultStroke: 14 },
    md: { diameter: 200, defaultStroke: 20 },
    lg: { diameter: 260, defaultStroke: 26 },
    xl: { diameter: 340, defaultStroke: 34 }
  };

  // Position configurations
  const positionConfig = {
    'top-left': 'top-10 left-10',
    'top-right': 'top-10 right-10',
    'bottom-left': 'bottom-10 left-10',
    'bottom-right': 'bottom-10 right-10',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-center': 'top-20 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
    'center-left': 'top-1/2 left-20 -translate-y-1/2',
    'center-right': 'top-1/2 right-20 -translate-y-1/2'
  };

  const { diameter, defaultStroke } = sizeConfig[size];
  const stroke = strokeWidth || defaultStroke;
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = diameter / 2;
  
  // Calculate segment paths
  let cumulativeValue = 0;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  
  const segmentPaths = segments.map((segment, index) => {
    const percentage = segment.value / total;
    const dashArray = circumference * percentage;
    const dashOffset = -cumulativeValue * circumference / total;
    
    cumulativeValue += segment.value;
    
    return {
      ...segment,
      dashArray,
      dashOffset,
      id: `segment-${index}`
    };
  });

  const positionClass = positionConfig[position];

  return (
    <div 
      className={`absolute ${positionClass} ${className}`}
      style={{ opacity }}
    >
      <div className="relative" style={{ width: diameter, height: diameter }}>
        {/* SVG Donut Ring */}
        <svg
          width={diameter}
          height={diameter}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-gray-200"
            opacity={0.3}
          />
          
          {/* Segment rings */}
          {segmentPaths.map((segment, index) => (
            <circle
              key={segment.id}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={stroke}
              strokeDasharray={`${segment.dashArray} ${circumference}`}
              strokeDashoffset={segment.dashOffset}
              strokeLinecap="round"
              className="transition-all duration-300 hover:opacity-80"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          ))}
        </svg>
        
        {/* Optional center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 opacity-60">
              {total}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DonutBackgroundProps {
  children: React.ReactNode;
  density?: 'low' | 'medium' | 'high';
  className?: string;

  style?: React.CSSProperties; // change by me 
}

const DonutBackground: React.FC<DonutBackgroundProps> = ({ 
  children, 
  density = 'medium',
  className = ''
}) => {
  // Define donut ring configurations based on density (3-4 donuts with red shades)
  const donutConfigs = {
    low: [
      { 
        size: 'lg' as const, 
        position: 'top-center' as const, 
        opacity: 0.15, 
        className: 'translate-x-32 translate-y-16',
        segments: [
          { value: 40, color: '#ef4444' }, // red-500
          { value: 35, color: '#f87171' }, // red-400
          { value: 25, color: '#fca5a5' }  // red-300
        ]
      },
      { 
        size: 'md' as const, 
        position: 'center-left' as const, 
        opacity: 0.12, 
        className: 'translate-x-20 translate-y-32',
        segments: [
          { value: 50, color: '#dc2626' }, // red-600
          { value: 30, color: '#ef4444' }, // red-500
          { value: 20, color: '#f87171' }  // red-400
        ]
      },
      { 
        size: 'sm' as const, 
        position: 'bottom-center' as const, 
        opacity: 0.1, 
        className: '-translate-x-40 -translate-y-20',
        segments: [
          { value: 60, color: '#b91c1c' }, // red-700
          { value: 40, color: '#dc2626' }  // red-600
        ]
      },
    ],
    medium: [
      { 
        size: 'xl' as const, 
        position: 'center' as const, 
        opacity: 0.12, 
        className: 'translate-x-96 translate-y-20',
        segments: [
          { value: 35, color: '#ef4444' }, // red-500
          { value: 30, color: '#f87171' }, // red-400
          { value: 20, color: '#fca5a5' }, // red-300
          { value: 15, color: '#fecaca' }  // red-200
        ]
      },
      { 
        size: 'lg' as const, 
        position: 'center-left' as const, 
        opacity: 0.1, 
        className: 'translate-x-40 translate-y-60',
        segments: [
          { value: 45, color: '#dc2626' }, // red-600
          { value: 35, color: '#ef4444' }, // red-500
          { value: 20, color: '#f87171' }  // red-400
        ]
      },
      { 
        size: 'md' as const, 
        position: 'top-center' as const, 
        opacity: 0.08, 
        className: '-translate-x-32 translate-y-40',
        segments: [
          { value: 70, color: '#b91c1c' }, // red-700
          { value: 30, color: '#dc2626' }  // red-600
        ]
      },
      { 
        size: 'sm' as const, 
        position: 'center-right' as const, 
        opacity: 0.06, 
        className: '-translate-x-32 -translate-y-20',
        segments: [
          { value: 55, color: '#991b1b' }, // red-800
          { value: 45, color: '#b91c1c' }  // red-700
        ]
      },
    ],
    high: [
      { 
        size: 'xl' as const, 
        position: 'center' as const, 
        opacity: 0.1, 
        className: 'translate-x-80 translate-y-40',
        segments: [
          { value: 25, color: '#ef4444' }, // red-500
          { value: 25, color: '#f87171' }, // red-400
          { value: 25, color: '#fca5a5' }, // red-300
          { value: 25, color: '#fecaca' }  // red-200
        ]
      },
      { 
        size: 'lg' as const, 
        position: 'top-center' as const, 
        opacity: 0.08, 
        className: 'translate-x-20 translate-y-60',
        segments: [
          { value: 40, color: '#dc2626' }, // red-600
          { value: 30, color: '#ef4444' }, // red-500
          { value: 30, color: '#f87171' }  // red-400
        ]
      },
      { 
        size: 'md' as const, 
        position: 'bottom-center' as const, 
        opacity: 0.06, 
        className: '-translate-x-60 -translate-y-40',
        segments: [
          { value: 55, color: '#b91c1c' }, // red-700
          { value: 25, color: '#dc2626' }, // red-600
          { value: 20, color: '#ef4444' }  // red-500
        ]
      },
      { 
        size: 'sm' as const, 
        position: 'center-left' as const, 
        opacity: 0.05, 
        className: 'translate-x-60 translate-y-80',
        segments: [
          { value: 60, color: '#991b1b' }, // red-800
          { value: 40, color: '#b91c1c' }  // red-700
        ]
      },
    ]
  };

  const selectedDonuts = donutConfigs[density];

  return (
    <div className={`relative ${className}`}>
      {/* Background Donut Ring Charts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {selectedDonuts.map((donut, index) => (
          <DonutRing
            key={index}
            size={donut.size}
            position={donut.position}
            opacity={donut.opacity}
            className={donut.className}
            segments={donut.segments}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DonutBackground;