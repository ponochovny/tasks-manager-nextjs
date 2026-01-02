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
[x] Displayed tasks with ability to toggle "done/undone" state\
[ ] Edit and delete buttons by task.\
[ ] Single page for creating/edit a task
- [ ] Form fields: name, description, priority (low, medium, high), completed date
- [ ] Form validation (all fields are required, date cannot be in the past)

[ ] Tasks list with filters / sorting
- [ ] Done/undone filter
- [ ] Priority filter
- [ ] Created date sorting
- [ ] Completed date sorting
- [ ] Priority sorting

[x] Pagination (10 tasks per page)\
[ ] Single task page with all details and features

### Bonus
[ ] drag-and-drop for\
[ ] Subtasks creation
