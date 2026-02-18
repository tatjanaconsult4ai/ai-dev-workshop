AI Dev Workshop – React + Node + TypeScript
Voraussetzungen

Bitte vor dem Workshop installieren:

Node.js LTS (https://nodejs.org)

Git (https://git-scm.com)

Test im Terminal:

node -v
npm -v
git --version

Projekt herunterladen
git clone https://github.com/tatjanaconsult4ai/ai-dev-workshop.git
cd ai-dev-workshop

Backend starten
cd backend
npm install
npm run dev


Backend läuft auf:
http://localhost:3001/health

Frontend starten (neues Terminal)
cd frontend
npm install
npm run dev


Frontend läuft auf:
http://localhost:5173

Demo-Zustände

Startzustand:

git checkout demo-0-start


Bugfix-Version:

git checkout demo-1-bugfix


Security-Fix-Version:

git checkout demo-2-securityfix
