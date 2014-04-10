# survival-wolf

A JavaScript implementation of a King of the Hill type survival game that [appeared on Code Golf Stack Exchange](http://codegolf.stackexchange.com/questions/25347/survival-game-create-your-wolf).

The rules are changed a bit while this is still being developed, and because it's in JavaScript instead of Java.

## Rules
See the [CodeGolf Question](http://codegolf.stackexchange.com/questions/25347/survival-game-create-your-wolf).

## Rule Differences
### Game
* The board is a fixed size (currently 800x800)
* The game lasts 500 iterations
### Animals
* Animals are represented by coloured circles, not letters
* Wolves are not yet implemented in the game (although some code exists)
* Animals don't have to call super('char') in their constructor
* Animals are passed *char[][] surroundings* as a parameter to the *move()* method
* Moves are just strings, as follows:
  * *'u'* - up
  * *'r'* - right
  * *'d'* - down
  * *'l'* - left
  * *'h'* - hold
* Attacks are just strings, as follows:
  * *'r'* - rock
  * *'p'* - paper
  * *'s'* - scissors
  * *'x'* - suicide

