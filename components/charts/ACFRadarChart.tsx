'use client'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

interface RadarChartProps {
  ds: number
  dd: number
  dt: number
  dtr: number
}

export default function ACFRadarChart({ ds, dd, dt, dtr }: RadarChartProps) {
  const data = [
    { dimension: 'DS\nStructurelle', score: 100 - ds, fullMark: 100 },
    { dimension: 'DD\nDonnées', score: 100 - dd, fullMark: 100 },
    { dimension: 'DT\nTrafic', score: 100 - dt, fullMark: 100 },
    { dimension: 'DTr\nTrésorerie', score: 100 - (dtr * 100 / 60), fullMark: 100 },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="78%" data={data}>
        <defs>
          <linearGradient id="acfStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#e8c96a" />
          </linearGradient>
          <linearGradient id="acfFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#e8c96a" stopOpacity={0.15} />
          </linearGradient>
          <filter id="acfGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <PolarGrid
          stroke="rgba(201,168,76,0.15)"
          gridType="polygon"
        />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: '#9db0c8', fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}
          style={{ whiteSpace: 'pre-line' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: 'rgba(201,168,76,0.5)', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
          tickCount={5}
          stroke="rgba(201,168,76,0.1)"
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="url(#acfStroke)"
          fill="url(#acfFill)"
          fillOpacity={1}
          strokeWidth={2.5}
          filter="url(#acfGlow)"
          dot={{ fill: '#c9a84c', strokeWidth: 0, r: 4 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
