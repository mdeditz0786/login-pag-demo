# Project Blueprint

## Overview

This project is a Next.js application with Firebase integration, featuring a dashboard with an AI chat assistant.

## Style, Design, and Features

* **Framework:** Next.js
* **Styling:** Tailwind CSS
* **Authentication:** Firebase Authentication
* **Dashboard:**
    * **New Gemini-Inspired Light Theme:**
        * Clean, visually balanced layout.
        * Vibrant and energetic color palette.
        * Modern fonts and improved typography.
    * **Dynamic Background Color Changer:**
        * A color palette in the sidebar allows users to change the application's background color.
    * Displays user information
    * Basic navigation sidebar
    * AI chat functionality
* **AI Chat:**
    * User can send messages to an AI assistant.
    * The AI assistant, powered by OpenAI, responds to user queries.

## Current Task: Add Dynamic Background Color Changer

**Objective:** Add a dynamic background color changer to the dashboard.

**Plan:**

1.  **Read `src/app/dashboard/page.js`:** Get the current dashboard code.
2.  **Add State for Background Color:** Create a state variable to hold the current background color.
3.  **Create Color Palette:** Add a UI element in the sidebar to display a selection of colors.
4.  **Implement Color Change Logic:** When a color is clicked, update the background color state, which will dynamically change the background of the application.
5.  **Update `blueprint.md`:** Document the new dynamic background color feature.
