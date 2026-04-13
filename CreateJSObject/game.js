function Game(name, year, genre, color, rating) {
    this.name = name;
    this.year = year;
    this.genre = genre;
    this.color = color;
    this.rating = rating;

    this.display = function() {
        return `
            <div class="card">
                <h2>${this.name}</h2>
                <p>Released: ${this.year}</p>
                <p>Type: ${this.genre}</p>
                <p>Color Only: ${this.color}</p>
                <p>Score: ${this.rating}/10</p>
            </div>`;
    };
}

var myGames = [
    new Game("Pokemon Crystal", 2000, "RPG", "Yes", 10),
    new Game("Mario Deluxe", 1999, "Action", "No", 9),
    new Game("Zelda Ages", 2001, "Adventure", "Yes", 10),
    new Game("Wario Land 3", 2000, "Platform", "Yes", 8),
    new Game("Tetris DX", 1998, "Puzzle", "No", 9)
];

var container = document.getElementById("game-box");

myGames.forEach(function(item) {
    container.innerHTML += item.display();
});