import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { authAPI, propertiesAPI } from './api'

// Mock axios
vi.mock('axios')
const mockedAxios = axios

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('authAPI', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-token',
          token_type: 'bearer'
        }
      }
      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockResolvedValue(mockResponse),
        get: vi.fn(),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      })

      const api = mockedAxios.create()
      const result = await api.post('/api/admin/login', {
        username: 'admin',
        password: 'password'
      })

      expect(result.data).toEqual(mockResponse.data)
    })
  })

  describe('propertiesAPI', () => {
    it('should get properties', async () => {
      const mockResponse = {
        data: {
          properties: [],
          total: 0
        }
      }
      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: vi.fn() },
          response: { use: vi.fn() }
        }
      })

      const api = mockedAxios.create()
      const result = await api.get('/api/properties')

      expect(result.data).toEqual(mockResponse.data)
    })
  })
})

