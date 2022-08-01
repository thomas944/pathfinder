# simple-genetic-algorithm
Inspired by Code Bullets, dots try to find way to goal, uses genetic algorithm to optimize path

Summary of how this works:
Dots start off going in random direction. After a certain amount of moves or if they hit the wall, they die.
The closer a dot is to the goal, the higher their fitness is.
Once all the dots die, a new generation is created. Dots with higher fitness are more likely to cross over
and have their children in next generation.
Mutation creates randomness in population.
Dot with highest fitness in population is colored in green.

Customize settings in main.js file


![start](https://user-images.githubusercontent.com/72369993/182258800-f221abb9-d1e6-48e6-a797-d02db7cb22f0.PNG)

After letting it run for a couple of generations...
![gen14](https://user-images.githubusercontent.com/72369993/182258802-8d1a8b95-c944-4f0b-aefb-4cebd7af3d1b.PNG)
