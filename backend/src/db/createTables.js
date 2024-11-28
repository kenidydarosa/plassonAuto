import { openDb } from './conn.js';

async function createTables() {
  const db = await openDb();

  // Comando para criar a tabela `sector`
  const createSectorTableSQL = `
    CREATE TABLE IF NOT EXISTS sectors (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`;

  // Comando para criar a tabela `users`
  const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        job TEXT NOT NULL,
        sector_id TEXT NOT NULL,
        registration TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Ativo',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (sector_id) REFERENCES sectors(id)
    );`;

  // Comando para criar a tabela `veicules`
  const createVeiculesTableSQL = `
    CREATE TABLE IF NOT EXISTS veicules (
        id TEXT PRIMARY KEY,
        imgKey TEXT NOT NULL,
        model TEXT NOT NULL,
        brand TEXT NOT NULL,
        year INTEGER NOT NULL,
        color TEXT NOT NULL,
        plate TEXT NOT NULL UNIQUE,
        renavam TEXT NOT NULL UNIQUE,
        sector_id TEXT NOT NULL,
        status TEXT NOT NULL,
        kilometers INTEGER NOT NULL,
        booster TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (sector_id) REFERENCES sectors(id)
    );`;

  // Comando para criar a tabela `schedules`
  const createSchedulesTableSQL = `
    CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        veicule_id TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        color TEXT NOT NULL,
        locale TEXT NOT NULL,
        start TEXT NOT NULL,
        end TEXT NOT NULL,
        allDay INTEGER NOT NULL,
        keyHandOverTime TEXT,
        returnOfKeyTime TEXT,
        status TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (veicule_id) REFERENCES veicules(id)
    );`;

  // Comando para criar a tabela `notify`
  const createNotifyTableSQL = `
    CREATE TABLE IF NOT EXISTS notify (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        visualized TEXT NOT NULL,
        user_id TEXT REFERENCES users(id),
        schedule_id TEXT REFERENCES schedules(id),
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`;

  try {
    await db.exec(createSectorTableSQL);
    console.log('Tabela sectors criada ou já existe.');

    await db.exec(createUsersTableSQL);
    console.log('Tabela users criada ou já existe.');

    await db.exec(createVeiculesTableSQL);
    console.log('Tabela veicules criada ou já existe.');

    await db.exec(createSchedulesTableSQL);
    console.log('Tabela schedules criada ou já existe.');

    await db.exec(createNotifyTableSQL);
    console.log('Tabela notify criada ou já existe.');
  } catch (error) {
    console.error('Erro ao criar as tabelas:', error);
  } finally {
    await db.close();
  }
}

export default createTables;

