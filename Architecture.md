# BerryMart Backend Architecture

This document provides an overview of the backend architecture for the BerryMart e-commerce application. It details the components, data flow, and key technologies used.

## 1. High-Level Architecture

The backend is a monolithic Node.js application built with the Express framework. It follows a standard Model-View-Controller (MVC) pattern, although the "View" layer is handled by a separate frontend application (not included in this context). The backend exposes a RESTful API, uses MongoDB for data persistence, and handles authentication via JSON Web Tokens (JWT).

Here is a high-level diagram of the system components:

```mermaid
graph TD
    A[Client (Web/Mobile App)] -->|HTTP/S API Calls| B(Node.js / Express Server);
    B -->|Mongoose ODM| C[MongoDB Database];
    B -->|Passport.js| C;
    B -->|Nodemailer| D[SMTP Server];

    subgraph "Backend (This Project)"
        B
    end

    subgraph "Database"
        C
    end

    subgraph "External Services"
        D
    end

    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#9f9,stroke:#333,stroke-width:2px
    style D fill:#ccf,stroke:#333,stroke-width:2px
