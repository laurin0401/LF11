# Deployment-Pipeline – FreshTrack

## Ziel

Für FreshTrack wird eine automatisierte CI/CD-Deployment-Pipeline verwendet.  
Sie stellt sicher, dass Änderungen am Projekt vor der Veröffentlichung geprüft, gebaut und anschließend automatisch als Webanwendung bereitgestellt werden.

Die Pipeline ist als Code im Repository gespeichert. Dadurch ist nachvollziehbar, wie die Anwendung gebaut und veröffentlicht wird. Änderungen an der Deployment-Konfiguration werden ebenfalls versioniert.

---

## Verwendete Technologien

- GitHub Repository zur Versionsverwaltung
- GitHub Actions für Continuous Integration und Continuous Deployment
- Node.js für die Ausführung des React-/Vite-Projekts
- npm für die Installation der Abhängigkeiten
- ESLint für die Code-Analyse
- Vitest für automatisierte Tests
- Vite für den Produktionsbuild
- GitHub Pages zur Bereitstellung der Webanwendung

---

## Pipeline-Datei

Die Pipeline befindet sich im Repository unter folgendem Pfad:

```text
.github/workflows/deploy.yml
