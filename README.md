# Tasks manager Web-app

Manage tasks: create, edit, delete, filter.\
Efficient UI/UX with modern practices React-development.\
json-server for API & backend imitation.

### Start the project
For the frontend
```
npm run dev
```
For the database
```
npm run mock
```

### Structure & Practices:
- Global Context API
- Functional components with useState, useEffect, useContext hooks
- Adaptive for mobile
- React.memo for caching, React.lazy for imports, Suspense for preventing errors & loading states
- Clean, structured, SOLID principles

### Features:
- [x] Displayed tasks with ability to toggle "done/undone" state
- [x] Edit and delete buttons by task
- [x] Pagination (5 tasks per page)
- [x] Single task page with all details and features

Single page for creating/editing a task
- [x] Form fields: name, description, priority (low, medium, high), completed date
- [x] Form validation (all fields are required, date cannot be in the past)

Tasks list with filters / sorting
- [x] Done/undone filter
- [x] Priority filter
- [x] Created date sorting
- [x] Completed date sorting
- [x] Priority sorting

### Bonus
- [x] Drag-and-drop for order change
- [ ] Subtasks creation
- [x] Dark/Light theme mode


### Fixes
- [ ] Multiple requests once d-n-d
- [ ] If we are on 3d page and change filter and last page possible is 2nd
