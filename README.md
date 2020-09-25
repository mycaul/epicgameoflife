# EPIC GAME OF LIFE!!!!!

                            Cellular Automata and Conway's "Game of Life"
                                   ------------------------------


Welcome to John Conway's "Game of Life"! This is a computer science classic from 1970, a program that simulates a cellular automaton (plural automata). It has connections to all kinds of different aspects of computer science and nature.

Over the course of this week, students will work on creating their own application in which users will be able to run different "Game of Life" scenarios. This module leads the reader through the fundamentals of Conways's "Game of Life" and will guide them through the process of creating an app utilizing tools and frameworks that have been taught over the course of their specific track.

Objectives
-----------
Student should be able to create a unique, high-quality project that can be added to a professional portfolio
Student should be able to describe the rules of Conway’s “Game of Life”
Student should be able to explain what cellular automata are and describe how they are useful in real life
Student should be able to correctly analyze the ‘Turing Completeness’ of Conway’s “Game of Life”
Student should be able to implement a visualization of Conway’s “Game of Life” using technologies related to their specific track.
Student should be able to utilize "double buffering" to implement the game
MVP Features

Preliminary Work
-----------------
Research Conway’s "Game of Life". Figure out how it works, why it’s useful, and how the notion of Turing Completeness is related to this topic.

Visualizing the "Game of Life"
------------------------------
The main entry point of your application should house the visualization of this cellular automaton. Include necessary components, such as:

Grid to display cells.
Cell objects or components that, at a minimum, should have:
Properties
current state: (alive, dead), (black, white)
Clickable/Tappable:
can be clicked to allow user to setup initial cell configuration
should NOT be clickable while simulation is running
Behaviors
Toggle state functionality: switch between alive & dead either because user manually toggled cell before starting simulation or simulation is running and rules of life caused cell to change state
An appropriate data structure to hold a grid of cells that is at least 25x25. Go as big as you want.
Text to display current generation # being displayed
Utilize a timeout function to build the next generation of cells & update the display at the chosen time interval
Button(s) that start & stop the animation
Button to clear the grid
Write an algorithm that:

Implements the following basic steps:
--------------------------------------
For each cell in the current generation's grid:
Examine state of all eight neighbors (it's up to you whether you want cells to wrap around the grid and consider cells on the other side or not)
Apply rules of life to determine if this cell will change states
When main loop completes:
Swap current and next grids
Repeat until simulation stopped
Breaks down above steps into appropriate sub-tasks implemented with helper functions to improve readability
Uses double buffering to update grid with next generation.
Does something well-documented with the edge of the grid. (e.g. wrap around to the far side--most fun!--or assumes all edge cells are permanently dead.)
Custom Features

Implement at least 3 of the following features:
----------------------------------------------
Create a few sample cell configurations that users can load and run
Add an option that creates a random cell configuration that users can run
Add additional cell properties, like color or size, and incorporate them into your visualization
Allow users to specify the speed of the simulation
Provide functionality to manually step through the simulation one generation at a time, as opposed to animating automatically
Allow users to change the dimension of the grid being displayed
Given a specific generation, calculate the configuration of cells at that point in time, and jump to that state, bypassing animation (i.e. skip ahead n generations).
If you have an idea for a custom feature on this list, run it by your TL or instructor
About

On the main entry point of the application, include a separate section or link to another page or popup that describes the two main rules (birth & death) of Conway’s Game of Life

Stretch Goals
--------------
-Deploy your app to a hosting service or, for iOS, to TestFlight (or the App Store!). Web devs can see more deployment info here.

-Write a how-to guide or blog post that walks readers through the work you did to implement your project

-Expand your simulation into the third dimension. Google 3D Conways Life. Google for how to do 3D stuff on your platform. Web users might check out 3D-ThreeJS, and iOS might look at SceneKit.

