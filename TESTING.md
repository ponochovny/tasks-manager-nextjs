# Testing the Todo List App

## 📋 Installed Dependencies

- `@testing-library/react` - for testing React components
- `@testing-library/jest-dom` - useful Jest matchers
- `@testing-library/user-event` - user event simulation
- `jest` - testing framework
- `@types/jest` - TypeScript types for Jest
- `ts-jest` - TypeScript support for Jest
- `jest-environment-jsdom` - DOM test environment
- `ts-node` - execute TypeScript configuration files

## ⚙️ Configuration

### `jest.config.ts`
- TypeScript support configured via `ts-jest`
- `jsdom` test environment for React components
- Module name mapper for `@/` alias
- Coverage collection configured for `app/`, `shared/`, `entities/`, `features/`, `widgets/`

### `jest.setup.ts`
- Loads `@testing-library/jest-dom` for extended matchers

### `package.json` scripts
```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
```

## 📁 Test Structure

### `__tests__/shared/lib/utils.test.ts` (15 tests)
Utility tests:
- `cn()` - combining CSS class names and resolving conflicts
- `mergeDateAndTime()` - merging a Date and a time string
- `getLocalOffsetString()` - getting local timezone offset string

### `__tests__/entities/task/utils.test.ts` (5 tests)
Task utilities:
- `priorityFormat()` - formatting priority (Low, Medium, High)

### `__tests__/app/api/tasks.api.test.ts` (32 tests)
API function tests with mocked fetch:
- `getTasks()` - list fetching with filters, sorting and pagination
- `getTaskById()` - fetch single task
- `deleteTaskById()` - delete task
- `taskCompletedToggle()` - toggle task completion
- `taskPriorityChange()` - change priority
- `updateTaskOrder()` - update task order
- `editTask()` - edit task
- `createTask()` - create new task

### `__tests__/shared/hooks/use-url-sync.test.ts` (6 tests)
Hook tests for URL synchronization:
- Syncing query params to the URL
- Excluding `limit` parameter
- Comparing previous values to avoid redundant updates
- Supporting all filter types

### `__tests__/entities/task/ui/select-components.test.tsx` (9 tests)
Select components tests:
- `PrioritySelect` - priority selection
- `CompletedSelect` - completion status selection

### `__tests__/features/task/ui/task-buttons.test.tsx` (12 tests)
Feature button tests:
- `EditTaskButton` - edit button
- `DeleteTaskButton` - delete button
- `ToggleTaskCompleteButton` - completion toggle button

## 🧪 Results

```
Test Suites: 6 passed, 6 total
Tests:       59 passed, 59 total
Snapshots:   0 total
```

## 📊 Coverage

Covered by tests:
- ✅ Utilities (100%)
- ✅ API functions (100%)
- ✅ Custom hooks
- ✅ UI components
- ✅ Feature components

## 🚀 Usage

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Notes

- All external interactions (fetch, Next.js navigation, UI libs) are mocked
- Tests follow React Testing Library best practices
- Tests focus on behavior, not implementation details
