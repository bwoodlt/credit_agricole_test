# Price Updates Dashboard

A real-time price updates dashboard built with React TypeScript frontend and .NET backend.

## Overview

This application displays a list of 10 items with their IDs, names, prices, and updated timestamps. Users can subscribe to real-time price updates, which are pushed from the server every second. The UI provides visual indicators showing whether prices have gone up, down, or remained unchanged.

Check `output` folder for screenshots.

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
- Axios for client-server interaction
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

## Potential Improvements

1. **WebSockets**: Instead of polling the server every second, I'd implement WebSockets for real-time updates, which would be more efficient and reduce network traffic.
2. **Server-Side Filtering and Pagination**: For larger datasets, I'd add server-side filtering and pagination to limit the amount of data transferred.
3. **Authentication and Authorization**: This is definitely a must in a production application. Will add user authentication to secure the API.
4. **Persistent Storage**: Will replace the in-memory storage with a database like SQL Server or MongoDB.
5. **More Comprehensive Testing**: Will also add more unit tests and integration tests for both frontend and backend.
6. **Error Handling and Retries**: Error handling is pretty minimal at the moment. If I had more time, will implement more robust error handling and retry mechanisms for failed API requests.
7. **Performance Optimization**: For perf optimization on the UI side, will use React.memo for component optimization and implement virtualization for longer lists.
8. **Deploy to Vercel**: Set up CI/CD pipelines for automatic deployment to Vercel or simply just dockerize it and make it portable (Added barebone for now).
9. **PWA Support**: Offline support is very minimal here, will add this in a real-life application and provide better mobile experience.
10. **Accessibility Improvements**: Enhance the application with better aria-labels and keyboard navigation.
11. **State Management**: For larger application, I'd consider using a state manager to robustly manage data within the app.

## License

MIT
