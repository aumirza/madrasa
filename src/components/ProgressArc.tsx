'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ProgressArcProps {
  progress?: number[]; // Array of 5 values between 0 and 1
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressArc({
  progress = [1, 1, 0.5, 0, 0],
  size = 360,
  strokeWidth = 16,
  className = '',
}: ProgressArcProps) {
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  const radius = size * 0.45; // ~100 for size 220
  const center = size / 2;
  const segments = 5;
  const totalArcAngle = 140; // Less than 180 for a smaller arc
  const gap = 9; // degrees - increased gap for better separation
  const segmentAngle = (totalArcAngle - (segments - 1) * gap) / segments;
  const startOffset = (180 - totalArcAngle) / 2; // Center the arc

  // Animate progress on mount and when progress changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timer);
  }, [progress]);

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) => {
    const angleRad = ((angleDeg - 180) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    const sweepFlag = 1; // Change sweep direction to reverse the bend
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  };

  const getProgressPath = (
    isCurrentSegment: boolean,
    centerX: number,
    radiusValue: number,
    startAngle: number,
    angle: number,
    progressValue: number,
    progressEnd: number
  ) => {
    return isCurrentSegment
      ? describeArc(
          centerX,
          centerX,
          radiusValue,
          startAngle,
          startAngle + angle * progressValue
        )
      : describeArc(centerX, centerX, radiusValue, startAngle, progressEnd);
  };

  return (
    <div className={`-mb-[5.5rem] -ml-[2rem] relative mx-auto ${className}`}>
      <svg
        className="overflow-visible"
        height={size * 0.55}
        viewBox={`0 0 ${size} ${size * 0.55}`}
        width={size}
      >
        <title>Progress Arc Chart</title>
        {animatedProgress.map((subProgress, i) => {
          const start = startOffset + i * (segmentAngle + gap);
          const end = start + segmentAngle;
          const subEnd = start + segmentAngle * subProgress;
          const segmentId = `arc-segment-${start}-${end}`;

          // Check if this is the current segment (not full and not empty)
          const isCurrentSegment = subProgress > 0 && subProgress < 1;

          return (
            <motion.g key={segmentId}>
              {/* Background arc */}
              <path
                className="text-white/60"
                d={describeArc(center, center, radius, start, end)}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={strokeWidth}
              />
              {/* Progress arc with animation */}
              {subProgress > 0 && (
                <motion.path
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  className="text-white"
                  d={getProgressPath(
                    isCurrentSegment,
                    center,
                    radius,
                    start,
                    segmentAngle,
                    subProgress,
                    subEnd
                  )}
                  fill="none"
                  initial={{
                    pathLength: isCurrentSegment ? 0 : 1,
                    opacity: isCurrentSegment ? 0 : 1,
                  }}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={strokeWidth}
                  transition={{
                    duration: isCurrentSegment ? 1.5 : 0,
                    delay: 0,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
