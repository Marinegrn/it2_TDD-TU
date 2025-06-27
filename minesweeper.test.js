const Minesweeper = require('./minesweeper');

describe('Minesweeper', () => {
    let game;

    beforeEach(() => {
        // Créer une nouvelle instance avant chaque test
        game = new Minesweeper(5, 3, 1);
    });

    describe('gridGenerator', () => {
        test('devrait créer une grille avec les bonnes dimensions', () => {
            const grid = game.gridGenerator(3, 2, 0);
            expect(grid).toHaveLength(2); // 2 lignes
            expect(grid[0]).toHaveLength(3); // 3 colonnes
            expect(grid[1]).toHaveLength(3); // 3 colonnes
        });

        test('devrait remplir la grille avec le caractère spécifié', () => {
            const grid = game.gridGenerator(2, 2, 'A');
            expect(grid[0][0]).toBe('A');
            expect(grid[0][1]).toBe('A');
            expect(grid[1][0]).toBe('A');
            expect(grid[1][1]).toBe('A');
        });
    });

    describe('placeRandomBombe', () => {
        test('devrait placer le bon nombre de bombes', () => {
            // Créer une grille vide
            game.grid = game.gridGenerator(3, 3, 0);
            game.placeRandomBombe(2, 3, 3);
            
            // Compter les bombes
            let bombCount = 0;
            for (let row of game.grid) {
                for (let cell of row) {
                    if (cell === 'X') bombCount++;
                }
            }
            expect(bombCount).toBe(2);
        });
    });

    describe('case', () => {
        test('devrait révéler une case valide', () => {
            // Placer une valeur connue dans la grille
            game.grid[1][2] = 'X';
            
            const result = game.case(2, 1);
            
            expect(result).toBe(true);
            expect(game.playerGrid[1][2]).toBe('X');
        });

        test('devrait rejeter les coordonnées hors limites (x négatif)', () => {
            const result = game.case(-1, 1);
            expect(result).toBe(false);
        });

        test('devrait rejeter les coordonnées hors limites (y négatif)', () => {
            const result = game.case(1, -1);
            expect(result).toBe(false);
        });

        test('devrait rejeter les coordonnées hors limites (x trop grand)', () => {
            const result = game.case(game.columns, 1);
            expect(result).toBe(false);
        });

        test('devrait rejeter les coordonnées hors limites (y trop grand)', () => {
            const result = game.case(1, game.lines);
            expect(result).toBe(false);
        });
    });

    describe('displayGrid', () => {
        test('devrait retourner une chaîne formatée correctement', () => {
            const testGrid = [['A', 'B'], ['C', 'D']];
            const result = game.displayGrid(testGrid);
            
            expect(result).toContain('A  B');
            expect(result).toContain('C  D');
        });
    });

    describe('constructor', () => {
        test('devrait initialiser le jeu avec les bonnes dimensions', () => {
            const customGame = new Minesweeper(8, 6, 3);
            
            expect(customGame.columns).toBe(8);
            expect(customGame.lines).toBe(6);
            expect(customGame.nbBombs).toBe(3);
            expect(customGame.grid).toHaveLength(6);
            expect(customGame.grid[0]).toHaveLength(8);
            expect(customGame.playerGrid).toHaveLength(6);
            expect(customGame.playerGrid[0]).toHaveLength(8);
        });

        test('devrait utiliser les valeurs par défaut', () => {
            const defaultGame = new Minesweeper();
            
            expect(defaultGame.columns).toBe(10);
            expect(defaultGame.lines).toBe(5);
            expect(defaultGame.nbBombs).toBe(1);
        });
    });
});
