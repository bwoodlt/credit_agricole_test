# Price Updates Dashboard

A real-time price updates dashboard built with React TypeScript frontend and .NET backend.

## Overview

This application displays a list of 10 items with their IDs, names, prices, and updated timestamps. Users can subscribe to real-time price updates, which are pushed from the server every second. The UI provides visual indicators showing whether prices have gone up, down, or remained unchanged.

## Features

- Display a list of items with ID, name, price, and updated timestamp
- Subscribe/unsubscribe to price updates via buttons
- Real-time price updates with visual indicators (up/down arrows)
- Optimized traffic between server and UI
- Responsive design without external UI libraries

## Tech Stack

### Frontend

- React with TypeScript
- CSS for styling
- Axios for API communication
- React Testing Library for unit tests (minimally for now)

### Backend

- .NET API
- In-memory data store for demonstration purposes
- RESTful endpoints for fetching items and price updates

## Running the Application

### Backend

```bash
cd server/PriceUpdatesApi
dotnet run
```

### Frontend

```bash
cd client
npm install
npm start
```

## Testing

```bash
cd client
npm test
```

## Architecture

The application follows a clean separation of concerns:

- **Frontend**:

  - Components for UI display and user interaction
  - Services layer for API communication
  - Type definitions for type safety

- **Backend**:
  - Controllers for handling HTTP requests
  - Services for business logic
  - Models for data representation

## Future Improvements

1. **WebSockets Integration**: Replace polling with WebSockets for true real-time updates and reduced network traffic
2. **Server-Sent Events**: As an alternative to WebSockets, implement SSE for one-way real-time updates
3. **Pagination**: Add support for large datasets with server-side pagination
4. **Filtering & Sorting**: Allow users to filter and sort the item list
5. **Authentication**: Add user authentication to secure the API
6. **Persistent Storage**: Replace in-memory storage with a database
7. **Caching**: Implement caching strategies to reduce server load
8. **More Comprehensive Testing**: Add more unit tests, integration tests, and end-to-end tests
9. **Performance Optimization**: Implement virtualization for large lists, optimize bundle size
10. **Enhanced UI**: Add more interactive features like price history charts

## Deployment

The frontend can be deployed to Vercel, and the backend can be deployed to Azure App Service or another .NET-compatible hosting service.

## License

MIT
