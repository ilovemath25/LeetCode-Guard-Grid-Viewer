function countUnguarded(m, n, guards, walls) {
    const grid = Array.from({ length: m }, () => Array(n).fill("0"));
    for (const [r, c] of guards) grid[r][c] = "g";
    for (const [r, c] of walls) grid[r][c] = "w";
    for (let i = 0; i < m; i++) {
        let seen = false;
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === "w") seen = false;
            else if (grid[i][j] === "g") seen = true;
            else if (seen) grid[i][j] = "1";
        }
    }
    for (let i = 0; i < m; i++) {
        let seen = false;
        for (let j = n - 1; j >= 0; j--) {
            if (grid[i][j] === "w") seen = false;
            else if (grid[i][j] === "g") seen = true;
            else if (seen) grid[i][j] = "1";
        }
    }
    for (let j = 0; j < n; j++) {
        let seen = false;
        for (let i = 0; i < m; i++) {
            if (grid[i][j] === "w") seen = false;
            else if (grid[i][j] === "g") seen = true;
            else if (seen) grid[i][j] = "1";
        }
    }
    for (let j = 0; j < n; j++) {
        let seen = false;
        for (let i = m - 1; i >= 0; i--) {
            if (grid[i][j] === "w") seen = false;
            else if (grid[i][j] === "g") seen = true;
            else if (seen) grid[i][j] = "1";
        }
    }
    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === "0") count++;
        }
    }
    return { count, grid };
}

function showGrid(grid) {
    const root = document.getElementById("grid");
    root.innerHTML = "";

    grid.forEach(row => {
        const r = document.createElement("div");
        r.className = "row";

        row.forEach(cell => {
            const c = document.createElement("div");
            c.className = "cell " +
                (cell === "g" ? "g" :
                 cell === "w" ? "w" :
                 cell === "1" ? "one" : "zero");

            if (cell === "g" || cell === "w") c.textContent = cell;
            r.appendChild(c);
        });

        root.appendChild(r);
    });
}

document.getElementById("runBtn").onclick = () => {
    const m = +document.getElementById("rows").value;
    const n = +document.getElementById("cols").value;

    let guards, walls;
    try { guards = JSON.parse(document.getElementById("guards").value); }
    catch { return alert("Invalid guards format!"); }

    try { walls = JSON.parse(document.getElementById("walls").value); }
    catch { return alert("Invalid walls format!"); }

    const { count, grid } = countUnguarded(m, n, guards, walls);
    document.getElementById("result").textContent = `Unguarded = ${count}`;
    showGrid(grid);
};