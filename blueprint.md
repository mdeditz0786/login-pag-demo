# Project Blueprint

## Overview

This project is a Next.js application with Firebase integration, featuring a user dashboard.

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

## Current Task: Remove OpenAI Integration

**Objective:** Remove all OpenAI-related code from the project.

**Plan:**

1.  **Delete `src/app/api/chat/route.js`:** Remove the file that handles OpenAI API requests.
2.  **Modify `src/app/dashboard/page.js`:** Remove the AI chat section from the dashboard UI and all related state and logic.
3.  **Update `blueprint.md`:** Remove any mention of the AI chat assistant.
