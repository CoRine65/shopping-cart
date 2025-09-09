TOP: https://www.theodinproject.com/lessons/react-new-shopping-cart

Goal: Create an online shopping cart simulation. 
Personal goal: learn to re-use and re-purpose old code and adapt it to a new one. Using testing techniques to ensure app functions properly. 

1. Set up project
2. Copied memory-card code and ensured functionality. 
- Goal from here is to implement a [COIN] system to function as the curency for future shop
    - going to add states: coins, setCoins to remember the amount of coins a user retains after each game: accumulation of score = coins, every one 1 point = 1 coin, multiple games can increase coin value
    - update handleclick to iterate through allCards
    - **error** making sure there is at least one unique card within each shuffle until all are clicked: meaning rewriting #pickRandomSix function: rewrite with new variables and a new pool variable to hold the !clicked cards