# HexGrid

## Project Description  
HexGrid is a lightweight web-based tool designed to procedurally generate **customizable hexagonal grid patterns** using dynamic relaxation algorithms and triangle grouping. It's ideal for creating **TTRPG maps** such as towns, roads, sewer systems, or even entire countries.

This tool is inspired by and based on code from **kchapelier’s JavaScript port** of **Cédric Guillemet’s** implementation of **Oskar Stålberg’s** irregular grid algorithm within a hexagon.

The generated grids can be exported as `.png` images with filenames that include the relevant generation parameters, ensuring easy reproducibility and version control.

---

## 🧪 How It Works

HexGrid uses a combination of procedural generation, triangle pairing, and point relaxation to form irregular patterns inside a hexagon. The process follows these steps:

### 1. **User Input Collection**  
Users can customize various grid parameters:
- **Side count**: Number of sides the base hexagon will use.
- **Seed**: Determines random generation (user-defined or randomly generated).
- **Relaxation type**: `none`, `standard`, or `weighted` smoothing of point positions.
- **Grouping iterations**: Controls how many attempts are made to combine triangles into quads.
- **Line width & color**
- **Canvas size**: Determines resolution of the output image.

### 2. **Event Listeners & Input Handling**  
- JavaScript listens for UI changes and updates the grid preview in real time.
- Clicking the **Generate** button triggers the full grid construction and rendering pipeline.

### 3. **Grid Construction & Relaxation**  
- A hexagonal grid is subdivided into triangles and optionally grouped into quads.
- Each point is repositioned using the chosen relaxation method:
  - **Standard**: Averages neighboring point positions.
  - **Weighted**: Weighted average based on distance to neighbors (produces tighter patterns).
- Side enforcement ensures that the outer boundary maintains a near-circular hexagon if enabled.

### 4. **Canvas Rendering**  
- The entire structure is rendered on an **HTML5 `<canvas>`**.
- The drawing respects line thickness, color, and hex geometry.

### 5. **Grid Export**  
- Users can download the final result as a `.png` file.
- Filenames are auto-generated with all relevant parameters

## 🎛️ Features Overview

- 🔷 Generate complex hexagonal grid layouts
- 🎚️ Customizable parameters:
- Sides, seed, iterations, relaxation, canvas size, line styles
- 💾 PNG export with parameter-based filename
- 💡 Random seed generator for endless variations
- 🔁 Lightweight and self-contained—runs in any modern browser

---

## 🖼️ Example Use Cases

- Procedural TTRPG map generation
- Stylized town or dungeon layouts
- World-building tools
- Pattern design or abstract visualization

---

## 📥 Export Formats

- `.png` images via canvas
- Auto-labeled filenames for easy organization
- Future plans may include `.svg` export

---

## 📄 Credits & License

- Inspired by [Oskar Stålberg](https://oskarstalberg.com)'s irregular grid algorithm  
- JavaScript port by [kchapelier](https://github.com/kchapelier)
- C++ version by [Cedric Guillemet](https://github.com/CedricGuillemet)
- Modified and extended by this project
- Licensed under the **MIT License**

---

> ✨ Feel free to fork, adapt, and extend this tool for your creative projects, games, or design experiments!