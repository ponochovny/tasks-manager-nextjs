# Quick Start for Testing

## Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run a specific test file
npm test -- shared/lib/utils.test.ts

# Run tests matching a test name pattern
npm test -- --testNamePattern="priorityFormat"
```

## 📊 Test Stats

- **Test suites**: 6 ✅
- **Total tests**: 59 ✅
- **API functions**: 100% covered
- **Utilities**: 100% covered
- **UI components**: >80% covered

## 🎯 Where tests live

| Module | Tests | File |
|--------|-------|------|
| Utilities | 15 | `__tests__/shared/lib/utils.test.ts` |
| Task utilities | 5 | `__tests__/entities/task/utils.test.ts` |
| API | 32 | `__tests__/app/api/tasks.api.test.ts` |
| Hooks | 6 | `__tests__/shared/hooks/use-url-sync.test.ts` |
| Select components | 9 | `__tests__/entities/task/ui/select-components.test.tsx` |
| Task buttons | 12 | `__tests__/features/task/ui/task-buttons.test.tsx` |

## 🏗️ Test structure

Example test template:

```typescript
describe('FeatureName', () => {
  beforeEach(() => {
    // Setup before each test
  })

  it('should do something', () => {
    // Arrange - prepare data
    const input = ...
    
    // Act - execute code
    const result = functionToTest(input)
    
    // Assert - verify results
    expect(result).toBe(expected)
  })
})
```

## ✨ Notes

- ✅ All async API calls are mocked
- ✅ Next.js components and hooks are mocked  
- ✅ UI libraries are mocked for isolation
- ✅ Tests focus on behavior
- ✅ Full TypeScript support

## 🔗 Useful links

- [Jest documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Jest DOM matchers](https://github.com/testing-library/jest-dom)
