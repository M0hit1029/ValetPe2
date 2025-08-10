export default function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('fulfilled') || statusLower.includes('delivered')) {
      return {
        color: '#10b981',
        background: 'rgba(16, 185, 129, 0.1)',
        icon: '✅'
      };
    }
    if (statusLower.includes('unfulfilled') || statusLower === '' || statusLower === 'null') {
      return {
        color: '#ef4444',
        background: 'rgba(239, 68, 68, 0.1)',
        icon: '❌'
      };
    }
    if (statusLower.includes('pending') || statusLower.includes('processing')) {
      return {
        color: '#f59e0b',
        background: 'rgba(245, 158, 11, 0.1)',
        icon: '⏳'
      };
    }
    if (statusLower.includes('cancelled') || statusLower.includes('failed')) {
      return {
        color: '#ef4444',
        background: 'rgba(239, 68, 68, 0.1)',
        icon: '🚫'
      };
    }
    if (statusLower.includes('partial')) {
      return {
        color: '#8b5cf6',
        background: 'rgba(139, 92, 246, 0.1)',
        icon: '📦'
      };
    }
    // Default for unknown status
    return {
      color: '#6b7280',
      background: 'rgba(107, 114, 128, 0.1)',
      icon: '❓'
    };
  };

  const config = getStatusConfig(status);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      color: config.color,
      background: config.background,
      border: `1px solid ${config.color}20`,
      textTransform: 'capitalize'
    }}>
      <span style={{ fontSize: '10px' }}>{config.icon}</span>
      {status || 'Unknown'}
    </span>
  );
}