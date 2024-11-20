BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS sector (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT,
    email TEXT NOT NULL,
    job TEXT NOT NULL,
    sector TEXT,
    registration TEXT NOT NULL,
    FOREIGN KEY (sector) REFERENCES sector(id)
);

CREATE TABLE IF NOT EXISTS veicules (
    id INTEGER PRIMARY KEY,
    imgKey TEXT NOT NULL,
    model TEXT NOT NULL,
    brand TEXT NOT NULL,
    year INTEGER NOT NULL,
    color TEXT NOT NULL,
    plate TEXT NOT NULL,
    renavam TEXT NOT NULL,
    sector TEXT NOT NULL,
    status TEXT NOT NULL,
    kilometers INTEGER NOT NULL,
    booster TEXT NOT NULL,
    FOREIGN KEY (sector) REFERENCES sector(id)
);


CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY,
    user_id TEXT NOT NULL,
    veicule_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    color TEXT NOT NULL,
    locale TEXT NOT NULL,
    start TEXT NOT NULL,
    end TEXT NOT NULL,
    allDay BOOLEAN NOT NULL,
    keyHandOverTime TEXT NOT NULL,
    returnOfKeyTime TEXT,
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (veicule_id) REFERENCES veicules(id)
);





-- COMMIT;

SELECT * FROM users;