import random

def placeRandomBombe(nbBombs, nbColumns, nbLines):
    for i in range(nbBombs):
        x = random.randint(0,nbColumns-1)
        y = random.randint(0,nbLines-1)
        grid[y][x] = 'X'

def gridGenerator(n, m, char):
    array = [[char for column in range(n)] for line in range(m)]
    return array

def displayGrid(gridToDisplay):
    for row in gridToDisplay:
        print("  ".join(str(cell) for cell in row))
        print("")

def case(x, y):
    if x >= 0 and x < len(grid):
        if y >= 0 and y < len(grid[x]):
            playerGrid[y][x] = grid[y][x]
        else:
            print("Out of the grid! Play again")
    else:
        print("Out of the grid! Play again")

if __name__ == "__main__":
    columns = 10
    lines = 5
    grid = gridGenerator(columns, lines, 0)
    playerGrid = gridGenerator(columns, lines, "-")

    placeRandomBombe(1, columns, lines)

    while True:
        print("Enter coordinates to open a case")
        coordinateX = input("Enter x between 1 to "+ str(columns) + " : ")
        coordinateY = input("Enter y between 1 to "+ str(lines) + " : ")

        case(int(coordinateX)-1, int(coordinateY)-1)
        displayGrid(playerGrid)