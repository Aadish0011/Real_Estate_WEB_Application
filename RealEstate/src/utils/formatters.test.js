import { describe, it, expect } from 'vitest'
import { formatPrice, formatNumber, formatDate, formatPhone, truncateText } from './formatters'

describe('Formatters', () => {
  describe('formatPrice', () => {
    it('should format price in INR currency', () => {
      expect(formatPrice(1000000)).toBe('₹10,00,000')
      expect(formatPrice(50000)).toBe('₹50,000')
      expect(formatPrice(0)).toBe('₹0')
    })

    it('should handle null and undefined', () => {
      expect(formatPrice(null)).toBe('₹NaN')
      expect(formatPrice(undefined)).toBe('₹NaN')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000000)).toBe('1,000,000')
      expect(formatNumber(5000)).toBe('5,000')
    })
  })

  describe('formatDate', () => {
    it('should format date string', () => {
      const date = formatDate('2024-01-15')
      expect(date).toContain('2024')
      expect(date).toContain('January')
    })
  })

  describe('formatPhone', () => {
    it('should format US phone numbers', () => {
      expect(formatPhone('12345678901')).toBe('+1 (234) 567-8901')
    })

    it('should return original for non-US numbers', () => {
      expect(formatPhone('919811707082')).toBe('919811707082')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'a'.repeat(200)
      const truncated = truncateText(longText, 150)
      expect(truncated.length).toBe(153) // 150 + '...'
      expect(truncated).toContain('...')
    })

    it('should not truncate short text', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 150)).toBe(shortText)
    })
  })
})

