# Testing Guide

## Frontend Testing

### Setup
Tests are configured using Vitest and React Testing Library.

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Files
- `src/utils/formatters.test.js` - Tests for utility functions
- `src/utils/api.test.js` - Tests for API client

### Writing New Tests
Create test files with `.test.js` or `.test.jsx` extension:
```javascript
import { describe, it, expect } from 'vitest'
import { myFunction } from './myModule'

describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe(expected)
  })
})
```

## Backend Testing

### Setup
Tests are configured using pytest with async support.

### Running Tests
```bash
cd backend

# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=. --cov-report=html

# Run with verbose output
pytest -v
```

### Test Files
- `backend/tests/test_auth.py` - Authentication tests
- `backend/tests/test_properties.py` - Property CRUD tests
- `backend/tests/conftest.py` - Test fixtures and configuration

### Test Coverage
After running tests with coverage, view the HTML report:
```bash
# Open htmlcov/index.html in your browser
```

## Test Structure

### Frontend Tests
- **Unit Tests**: Test individual functions and utilities
- **Component Tests**: Test React components (to be added)
- **Integration Tests**: Test API interactions (to be added)

### Backend Tests
- **Unit Tests**: Test individual functions
- **API Tests**: Test HTTP endpoints
- **Integration Tests**: Test database operations

## Continuous Integration

To set up CI/CD, add these steps:

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run frontend tests
        run: npm test
      
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.11'
      - name: Install backend dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      - name: Run backend tests
        run: |
          cd backend
          pytest
```

## Best Practices

1. **Write tests first** (TDD) for new features
2. **Test edge cases** and error conditions
3. **Keep tests isolated** - each test should be independent
4. **Use descriptive test names** that explain what is being tested
5. **Mock external dependencies** (APIs, databases in unit tests)
6. **Maintain high coverage** - aim for >80% code coverage
7. **Run tests before committing** code

## Troubleshooting

### Frontend Tests
- If tests fail with "Cannot find module", ensure all dependencies are installed: `npm install`
- For React component tests, ensure `@testing-library/react` is installed

### Backend Tests
- If database errors occur, ensure test database is properly configured in `conftest.py`
- If import errors occur, ensure you're running tests from the `backend` directory
- For async test issues, ensure `pytest-asyncio` is installed

