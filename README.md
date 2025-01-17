# How to Run the Project

###  Step 1: Navigate to the Backend Directory

## Go into the repository
```bash
cd backend

// Run the app in DemoApplication.java, which is in:
src/main/java/
```

### Step 2: Navigate to the Frontend Directory
```bash
cd frontend
npm install
npm run dev
```

# Backend Architecture
![image](https://github.com/user-attachments/assets/fcb8f718-32a6-4bb8-8872-5c60ab6bb9e4)

## Key Point
- DTO: We will not directly send or receive information from the model to minimize exposure of unnecessary data to the client and avoid sending redundant information to the backend.
All data exchanged between the client and server will be encapsulated in Data Transfer Objects (DTOs). The client will send DTOs to the server, and the server will utilize a mapper to convert these DTOs into corresponding model objects. This ensures that only essential information is communicated, maintaining clarity, security, and efficiency in the data flow.

## Key Features
- Implemented token based authentication using spring security in config folder
- Implement role based authentication in backend, meaning if you are not a certain role, the backend will block you from accessing the api
