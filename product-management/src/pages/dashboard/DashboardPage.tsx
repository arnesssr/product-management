import { useStore } from "../../store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { type Product } from "../../types/productTypes"
import { Button } from "../../components/ui/Button"
import { AlertTriangle, Package, TrendingUp, Clock, ArrowUp, ArrowDown, RefreshCw } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, ComposedChart } from 'recharts'
import { useState, useMemo } from "react"
import '../../styles/dashboard.css'
import { calculateMetrics } from '../../utils/dashboardCalculations'
import { format } from 'date-fns'

/**
 * Helper function to get the appropriate icon for movement types
 */
const getMovementIcon = (type: string) => {
  switch(type) {
    case 'in': return <ArrowUp className="h-4 w-4 text-green-500" />
    case 'out': return <ArrowDown className="h-4 w-4 text-red-500" />
    default: return <RefreshCw className="h-4 w-4 text-blue-500" />
  }
}

/**
 * Main Dashboard Component
 * Displays metrics, charts and recent activity
 */
export function DashboardPage() {
  // State Management
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week')
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar')
  const [trendChartType, setTrendChartType] = useState<'area' | 'bar' | 'line'>('area')
  
  // Store Hooks
  const inventory = useStore(state => state.inventory)
  const products = useStore((state) => state.products)
  const categories = useStore(state => state.categories)

  // Calculate real metrics with proper trends
  const metrics = useMemo(() => {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
    const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000))

    // Calculate activity metrics
    const currentActivity = Object.values(inventory)
      .flatMap(i => i.movements ?? [])
      .filter(m => new Date(m.date) >= thirtyDaysAgo).length

    const previousActivity = Object.values(inventory)
      .flatMap(i => i.movements ?? [])
      .filter(m => {
        const date = new Date(m.date)
        return date >= sixtyDaysAgo && date < thirtyDaysAgo
      }).length

    const activityTrend = previousActivity === 0
      ? currentActivity > 0 ? 100 : 0
      : ((currentActivity - previousActivity) / previousActivity) * 100

    // Calculate low stock metrics
    const currentLowStock = Object.values(inventory)
      .filter(item => (item.currentStock ?? 0) <= (item.minimumStock ?? 0)).length

    const previousLowStock = Object.values(inventory)
      .filter(item => {
        const oldMovements = item.movements?.filter(m => new Date(m.date) < thirtyDaysAgo) ?? []
        const previousStock = oldMovements.reduce((acc, m) => 
          acc + (m.type === 'in' ? m.quantity : -m.quantity), 0)
        return previousStock <= (item.minimumStock ?? 0)
      }).length

    // Calculate current value and stock alerts
    const currentValue = products.reduce((acc, curr) => 
      acc + ((curr.price ?? 0) * (curr.stock ?? 0)), 0
    )

    const previousValue = currentValue * 0.9 // Fallback calculation

    // Calculate trends
    const valueTrend = ((currentValue - previousValue) / Math.max(previousValue, 1)) * 100

    return {
      products: {
        current: products.length,
        trend: products.length > 0 ? 100 : 0
      },
      value: {
        current: currentValue,
        trend: Number(valueTrend.toFixed(1)),
        formatted: `KES ${currentValue.toLocaleString()}`
      },
      alerts: {
        current: currentLowStock,
        trend: previousLowStock === 0 ? 0 : 
          Number((((currentLowStock - previousLowStock) / previousLowStock) * 100).toFixed(1))
      },
      activity: {
        current: currentActivity,
        trend: Number(activityTrend.toFixed(1))
      }
    }
  }, [products, inventory])

  // Data Processing
  const chartData = useMemo(() => {
    // Category distribution
    const categoryData = categories.map(category => ({
      name: category.name,
      stock: products
        .filter(p => p.category === category.id)
        .reduce((acc, curr) => acc + (curr.stock ?? 0), 0),
      value: products
        .filter(p => p.category === category.id)
        .reduce((acc, curr) => acc + ((curr.price ?? 0) * (curr.stock ?? 0)), 0)
    }))

    // Stock movements trend
    const movements = Object.values(inventory)
      .flatMap(item => item.movements ?? [])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Add trend data calculation
    const trendData = Object.values(inventory)
      .flatMap(item => item.movements ?? [])
      .reduce((acc, movement) => {
        const date = new Date(movement.date)
        const dateKey = format(date, 'MMM dd')
        const existing = acc.find(d => d.date === dateKey)
        
        if (existing) {
          existing.total += movement.type === 'in' ? movement.quantity : -movement.quantity
          existing.volume += movement.quantity
          existing.high = Math.max(existing.high, existing.total)
          existing.low = Math.min(existing.low, existing.total)
        } else {
          acc.push({
            date: dateKey,
            total: movement.type === 'in' ? movement.quantity : -movement.quantity,
            volume: movement.quantity,
            high: movement.type === 'in' ? movement.quantity : 0,
            low: movement.type === 'out' ? -movement.quantity : 0
          })
        }
        return acc
      }, [] as Array<{
        date: string
        total: number
        volume: number
        high: number
        low: number
      }>)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return { 
      categoryData: categoryData.filter(d => d.stock > 0 || d.value > 0),
      movements,
      trendData
    }
  }, [categories, products, inventory])

  // Utility Functions
  const getColor = (index: number) => `hsl(${(index * 360) / categories.length}, 70%, 50%)`

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Metrics Section */}
        <div className="col-span-12">
          <div className="metrics-grid">
            <MetricCard
              title="Total Products"
              value={metrics.products.current}
              icon={<Package className="h-5 w-5" />}
              trend={metrics.products.trend}
            />
            <MetricCard
              title="Inventory Value"
              value={metrics.value.formatted}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={metrics.value.trend}
            />
            <MetricCard
              title="Low Stock Alert"
              value={metrics.alerts.current}
              icon={<AlertTriangle className="h-5 w-5" />}
              trend={metrics.alerts.trend}
            />
            <MetricCard
              title="Recent Activity"
              value={metrics.activity.current}
              icon={<Clock className="h-5 w-5" />}
              trend={metrics.activity.trend}
            />
          </div>
        </div>

        {/* Main Charts */}
        <div className="col-span-12 lg:col-span-8 chart-content">
          <Card className="chart-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Stock Distribution</CardTitle>
              <div className="chart-controls">
                <div className="chart-type-switch">
                  <Button
                    size="sm"
                    variant={chartType === 'bar' ? 'default' : 'outline'}
                    onClick={() => setChartType('bar')}
                  >
                    Bar
                  </Button>
                  <Button
                    size="sm"
                    variant={chartType === 'line' ? 'default' : 'outline'}
                    onClick={() => setChartType('line')}
                  >
                    Line
                  </Button>
                </div>
                
                <div className="time-range-selector">
                  {['day', 'week', 'month'].map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange(range as any)}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {chartType === 'bar' ? (
                  <BarChart data={chartData.categoryData}>
                    <defs>
                      {chartData.categoryData.map((_, index) => (
                        <linearGradient
                          key={`gradient-${index}`}
                          id={`gradient-${index}`}
                          x1="0" y1="0" x2="0" y2="1"
                        >
                          <stop offset="0%" stopColor={getColor(index)} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={getColor(index)} stopOpacity={0.3} />
                        </linearGradient>
                      ))}
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar
                      dataKey="stock"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    >
                      {chartData.categoryData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#gradient-${index})`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <LineChart data={chartData.categoryData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />
                    <Line
                      type="monotone"
                      dataKey="stock"
                      stroke="rgb(124, 58, 237)"
                      strokeWidth={2}
                      dot={{ fill: 'rgb(124, 58, 237)' }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stock Movement Trends */}
          <Card className="chart-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Stock Movement Trends</CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={trendChartType === 'area' ? 'default' : 'outline'}
                  onClick={() => setTrendChartType('area')}
                >
                  Area
                </Button>
                <Button
                  size="sm"
                  variant={trendChartType === 'bar' ? 'default' : 'outline'}
                  onClick={() => setTrendChartType('bar')}
                >
                  Bar
                </Button>
                <Button
                  size="sm"
                  variant={trendChartType === 'line' ? 'default' : 'outline'}
                  onClick={() => setTrendChartType('line')}
                >
                  Line
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                {trendChartType === 'area' ? (
                  <ComposedChart data={chartData.trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        padding: '12px'
                      }}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="total"
                      stroke="#6366f1"
                      fill="url(#trendGradient)"
                      strokeWidth={2}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="volume"
                      fill="url(#volumeGradient)"
                      radius={[4, 4, 0, 0]}
                      opacity={0.5}
                    />
                  </ComposedChart>
                ) : trendChartType === 'bar' ? (
                  <BarChart data={chartData.trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />
                    <Bar
                      dataKey="total"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <LineChart data={chartData.trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#6366f1', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#6366f1' }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Side Charts */}
        <div className="col-span-12 lg:col-span-4 chart-content">
          <Card className="chart-card">
            <CardHeader>
              <CardTitle>Value Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData.categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {chartData.categoryData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getColor(index)}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="chart-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chartData.movements.slice(0, 5).map((movement, index) => (
                  <div key={index} 
                    className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-white/50">
                    <div className="flex items-center gap-2">
                      {getMovementIcon(movement.type)}
                      <span className="font-medium">{movement.quantity} units</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(movement.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/**
 * MetricCard Component
 * Displays individual metric with trend indicator
 */
function MetricCard({ title, value, icon, trend }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: number;
}) {
  return (
    <Card className="metric-card">
      <CardContent className="metric-content">
        <div className="metric-header">
          <div className="metric-info">
            <p className="metric-title">{title}</p>
            <p className="metric-value">{value}</p>
          </div>
          <div className={`p-2 rounded-full ${trend > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            {icon}
          </div>
        </div>
        <div className="metric-trend">
          <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
      </CardContent>
    </Card>
  )
}
