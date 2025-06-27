// Traduction code exoTests Python -> JavaScript
const readline = require('readline');

class Minesweeper {
    constructor(columns = 10, lines = 5, nbBombs = 1) {
        this.columns = columns;
        this.lines = lines;
        this.nbBombs = nbBombs;
        this.grid = this.gridGenerator(columns, lines, 0);
        this.playerGrid = this.gridGenerator(columns, lines, "-");
        this.placeRandomBombe(nbBombs, columns, lines);
    }

    placeRandomBombe(nbBombs, nbColumns, nbLines) {
        for (let i = 0; i < nbBombs; i++) {
            const x = Math.floor(Math.random() * nbColumns);
            const y = Math.floor(Math.random() * nbLines);
            this.grid[y][x] = 'X';
        }
    }

    gridGenerator(n, m, char) {
        const array = [];
        for (let line = 0; line < m; line++) {
            const row = [];
            for (let column = 0; column < n; column++) {
                row.push(char);
            }
            array.push(row);
        }
        return array;
    }

    displayGrid(gridToDisplay) {
        let result = "";
        for (const row of gridToDisplay) {
            result += row.map(cell => String(cell)).join("  ") + "\n\n";
        }
        console.log(result);
        return result; // Pour les tests
    }

    case(x, y) {
        if (x >= 0 && x < this.grid[0].length) {
            if (y >= 0 && y < this.grid.length) {
                this.playerGrid[y][x] = this.grid[y][x];
                return true; // Succès
            } else {
                console.log("Out of the grid! Play again");
                return false;
            }
        } else {
            console.log("Out of the grid! Play again");
            return false;
        }
    }

    // Méthode pour jouer (séparée pour faciliter les tests)
    async play() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const askQuestion = (question) => {
            return new Promise((resolve) => {
                rl.question(question, resolve);
            });
        };

        while (true) {
            console.log("Enter coordinates to open a case");
            const coordinateX = await askQuestion(`Enter x between 1 to ${this.columns} : `);
            const coordinateY = await askQuestion(`Enter y between 1 to ${this.lines} : `);
            
            this.case(parseInt(coordinateX) - 1, parseInt(coordinateY) - 1);
            this.displayGrid(this.playerGrid);
        }
    }
}

// Point d'entrée principal
if (require.main === module) {
    const game = new Minesweeper(10, 5, 1);
    game.play();
}

module.exports = Minesweeper;