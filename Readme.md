# Library Management System API

A RESTful API for managing a library's book collection, built with Spring Boot.

## Features

1. List all books in the library
2. CRUD operations on books (Create, Read, Update, Delete)
3. Search functionality
4. Pagination support
5. Swagger API documentation

## API Documentation
API documentation is available at http://localhost:8080/library-api/swagger-ui/index.html#/ after starting the app.

### Pre-Requirements
- [Java 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Gradle](https://gradle.org/)

## Tech Stack
- Spring Boot 3.2.3
- Spring Data JPA
- H2 in-memory database
- Lombok
- SpringDoc OpenAPI (Swagger)

## Getting Started

### Build
```bash
./gradlew build
```

### Run Tests
```bash
./gradlew test
```

### Start Application
```bash
./gradlew bootRun
```

The application will start on port 8080 with context path `/library-api`.

## Project Structure
- `src/main/java/com/digicert/libraryapi/` - Main application code
  - `controller/` - REST controllers
  - `service/` - Business logic
  - `persistence/` - Data access layer
  - `exception/` - Custom exceptions and error handling
  - `config/` - Configuration classes

## Design Decisions
- H2 in-memory database for quick setup and development
- SOLID principles and clean code practices
- Comprehensive unit testing with Mockito
- Exception handling with custom error responses
- CORS configuration for frontend integration

## Future Enhancements
- Implement authentication and authorization
- Add more advanced search capabilities
- Migrate to a persistent database
- Add CI/CD pipeline
- Implement caching
- Add rate limiting