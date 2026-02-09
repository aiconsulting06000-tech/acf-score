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
    {
      dimension: 'DS\nStructurelle',
      score: 100 - ds,
      fullMark: 100,
    },
    {
      dimension: 'DD\nDonnées',
      score: 100 - dd,
      fullMark: 100,
    },
    {
      dimension: 'DT\nTrafic',
      score: 100 - dt,
      fullMark: 100,
    },
    {
      dimension: 'DTr\nTrésorerie',
      score: 100 - (dtr * 100 / 60),
      fullMark: 100,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fill: '#6B7280', fontSize: 14, fontWeight: 600 }}
          style={{ whiteSpace: 'pre-line' }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <Radar 
          name="Score" 
          dataKey="score" 
          stroke="url(#colorGradient)" 
          fill="url(#fillGradient)" 
          fillOpacity={0.6}
          strokeWidth={3}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="fillGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9333EA" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#EC4899" stopOpacity={0.4} />
          </linearGradient>
        </defs>
      </RadarChart>
    </ResponsiveContainer>
  )
}
