import { openDb } from '../db/conn.js';
import createTables from '../db/createTables.js';
import { v4 as uuidv4 } from 'uuid';

createTables();

class BaseModel {
  async getAll(
    table,
    columnsArray,
    whereColumn1 = null,
    whereValue1 = null,
    whereColumn2 = null,
    whereValue2 = null
  ) {
    const db = await openDb();
    try {
      // Cria a base da query
      let query = `SELECT ${columnsArray.join(', ')} FROM ${table}`;

      // Armazena os valores para os parâmetros WHERE
      let params = [];

      // Adiciona a primeira condição WHERE se whereColumn1 e whereValue1 forem fornecidos
      if (whereColumn1 !== null && whereValue1 !== null) {
        query += ` WHERE ${whereColumn1} = ?`;
        params.push(whereValue1); // Adiciona o valor de whereValue1 nos parâmetros
      }

      // Adiciona a segunda condição WHERE se whereColumn2 e whereValue2 forem fornecidos
      if (whereColumn2 !== null && whereValue2 !== null) {
        if (params.length > 0) {
          query += ` AND ${whereColumn2} = ?`; // Adiciona 'AND' se já houver uma cláusula WHERE
        } else {
          query += ` WHERE ${whereColumn2} = ?`; // Adiciona 'WHERE' se for a primeira condição
        }
        params.push(whereValue2); // Adiciona o valor de whereValue2 nos parâmetros
      }

      // Executa a query com ou sem os valores de WHERE
      const response = await db.all(query, params);

      return response;
    } catch (error) {
      throw error;
    } finally {
      await db.close();
    }
  }

  async getByID(table, columnsArray, id) {
    const db = await openDb();
    try {
      const queryText = `SELECT ${columnsArray.join(', ')} FROM ${table} WHERE id = ?`;
      const result = await db.get(queryText, [id]);

      return result;
    } catch (error) {
      throw error;
    } finally {
      await db.close();
    }
  }

  async create(
    table,
    columnsArray,
    valuesArray,
    whereColumn1 = null,
    whereValue1 = null,
    whereColumn2 = null,
    whereValue2 = null
  ) {
    const db = await openDb();

    try {
      // Gera um UUID e adiciona ao início dos valores
      const id = uuidv4();
      valuesArray.unshift(id); // Adiciona o ID no início do valuesArray

      // Adiciona "id" como a primeira coluna
      const baseColumnsArray = ['id', ...columnsArray];

      // Gera os placeholders para a query (um "?" para cada valor)
      const flagsArray = new Array(baseColumnsArray.length).fill('?').join(', ');

      // Monta a query, incluindo o campo "id"
      const queryText = `INSERT INTO ${table} (${baseColumnsArray.join(
        ', '
      )}) VALUES (${flagsArray})`;

      // Inicia a transação
      await db.exec('BEGIN TRANSACTION');

      // Executa a consulta de inserção
      await db.run(queryText, valuesArray);

      // Confirma a transação
      await db.exec('COMMIT');

      // Cria a base da query SELECT
      let query = `SELECT * FROM ${table}`;

      // Armazena os valores para os parâmetros WHERE
      let params = [];

      // Adiciona a primeira condição WHERE se whereColumn1 e whereValue1 forem fornecidos
      if (whereColumn1 !== null && whereValue1 !== null) {
        query += ` WHERE ${whereColumn1} = ?`;
        params.push(whereValue1); // Adiciona o valor de whereValue1 nos parâmetros
      }

      // Adiciona a segunda condição WHERE se whereColumn2 e whereValue2 forem fornecidos
      if (whereColumn2 !== null && whereValue2 !== null) {
        if (params.length > 0) {
          query += ` AND ${whereColumn2} = ?`; // Adiciona 'AND' se já houver uma cláusula WHERE
        } else {
          query += ` WHERE ${whereColumn2} = ?`; // Adiciona 'WHERE' se for a primeira condição
        }
        params.push(whereValue2); // Adiciona o valor de whereValue2 nos parâmetros
      }

      // Executa a query com os parâmetros WHERE, se fornecidos
      const response = await db.all(query, params);

      // Retorna a resposta com os itens inseridos e todos os itens da tabela
      return response;
    } catch (error) {
      // Desfaz a transação em caso de erro
      await db.exec('ROLLBACK');
      console.error('Erro ao inserir no banco:', error);
      throw error; // Propaga o erro
    } finally {
      // Fecha a conexão com o banco de dados
      await db.close();
    }
  }

  async update(table, columnsArray, valuesArray, id) {
    const db = await openDb();
    try {
      // Monta a parte SET da query com cada coluna recebendo o seu valor
      const flagsArray = columnsArray.map((column) => `${column} = ?`).join(', ');
      // Monta a query de atualização
      const queryText = `UPDATE ${table} SET ${flagsArray} WHERE id = ?`;

      // Inicia a transação
      await db.exec('BEGIN TRANSACTION');
      // Executa a query de atualização
      await db.run(queryText, [...valuesArray, id]);
      // Confirma a transação
      await db.exec('COMMIT');
      // Recupera todos os itens da tabela após a inserção
      const allItems = await db.all(`SELECT * FROM ${table}`);

      // Retorna a resposta com os itens inseridos e todos os itens da tabela
      return allItems;
    } catch (error) {
      // Desfaz a transação em caso de erro
      await db.exec('ROLLBACK');
      throw error;
    } finally {
      // Fecha a conexão com o banco de dados
      await db.close();
    }
  }

  async delete(table, id) {
    const db = await openDb();
    try {
      // Monta a query de atualização
      const queryText = `DELETE FROM ${table} WHERE id = ?`;
      // Inicia a transação
      await db.exec('BEGIN TRANSACTION');
      // Executa a query de atualização
      // const response = await db.run(queryText, [id]);
      const response = await db.run(queryText, [id]);
      // Confirma a transação
      await db.exec('COMMIT');

      // Retorna o usuário que foi apagado
      return response;
    } catch (error) {
      // Desfaz a transação em caso de erro
      await db.exec('ROLLBACK');
      console.log(error);
      throw error;
    } finally {
      // Fecha a conexão com o banco de dados
      await db.close();
    }
  }
}

export default BaseModel;
