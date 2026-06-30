# Shelter Connect 🏠

**Shelter Connect** is a prototype software application designed to solve one of the most pressing urban social issues: the lack of coordination between concerned citizens, destitute individuals (such as beggars at traffic lights), and the organizations capable of providing shelter.

This project was built as an **Awareness & Demonstration Prototype** to showcase how local governments, states, or national bodies can leverage technology to actively reduce street homelessness and begging by streamlining the rescue and rehabilitation process.

---

## 🛑 The Problem it Solves

In most modern cities, citizens often spot destitute individuals or beggars—especially at red light traffic stops, on pavements, and in severe weather conditions. 

**The current challenges are:**
1. **Bystander Helplessness**: Citizens want to help but do not know who to call, or they hand out small change which doesn't solve the systemic issue of homelessness.
2. **Disconnected NGOs & Government Bodies**: Shelters and Non-Governmental Organizations (NGOs) have beds and resources, but they lack a real-time tracking system to locate people in immediate need on the streets.
3. **Duplication of Effort**: Multiple organizations might attempt to help the same area while neglecting other areas entirely.
4. **Lack of Accountability**: When a citizen reports an issue to a helpline, they rarely receive updates on whether the person was actually helped.

## 💡 The Shelter Connect Solution

Shelter Connect bridges this gap by providing an **End-to-End Tracking Ecosystem**.

### 1. For the Everyday Citizen (The Reporter)
- **Interactive Reporting**: A user can take a photo of a person in need (e.g., a beggar at a traffic light) and instantly log their exact GPS coordinates on a live map.
- **Personalized Tracking**: The citizen has a personal dashboard where they can track the exact status of their report (Pending -> Resolved).
- **Transparency**: Once an NGO acts, the citizen sees *exactly* which organization helped and what action was taken (e.g., "Provided temporary shelter and food").

### 2. For the NGOs and Government Responders
- **Live Impact Dashboard**: NGOs log into a dedicated portal to view all `PENDING` cases across the city map.
- **Claiming System**: To prevent duplicated efforts, an NGO can officially "Claim" a case. This updates the status globally, letting other NGOs know the case is being handled.
- **Action Logging**: Organizations update the system once the rescue is complete, providing data on rehabilitation.

---

## 🚀 Running the Prototype

This project is fully containerized with Docker, making it incredibly easy to spin up the entire ecosystem (Frontend, Backend, and Database) with a single command.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed and running.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Start the Application

1. Open your terminal at the root of the project directory.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```

3. **Access the platforms:**
   - **Frontend (UI)**: `http://localhost:3000`
   - **Backend API**: `http://localhost:8080`
   - **MongoDB Database**: Runs internally on port `27017`

### Demo Credentials (If Dummy Data Seeded)
- **NGO Login**: `contact1@hopeshelter.org` | Password: `password123`
- **User Login**: `alex.m@example.com` | Password: `password123`

---

## 🏗 Technology Stack
- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion (for premium animations), Lucide Icons.
- **Backend**: Java 8, Spring Boot 2.7, Spring Data REST.
- **Database**: MongoDB (NoSQL) for flexible spatial and document storage.
- **Deployment**: Docker & Docker Compose.

---
*Disclaimer: This is a prototype application meant for demonstration and awareness purposes to inspire real-world implementation by governments and welfare organizations.*
