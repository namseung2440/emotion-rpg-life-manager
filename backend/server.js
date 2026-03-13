const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: "soldesk",
  password: "12345",
  connectString: "localhost:1521/XE"
};



// TODOS 조회

// TODOS 저장
app.post("/todos", async (req, res) => {

  let connection;

  try {

    const { content } = req.body;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO SOLDESK.TODOS (ID, CONTENT)
       VALUES (TODOS_SEQ.NEXTVAL, :content)`,
      { content: content },
      { autoCommit: true }
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).send("DB error");

  } finally {

    if (connection) {
      await connection.close();
    }

  }

});


// Todo 완료
app.patch("/todos/:id", async (req, res) => {

  let connection;

  try {

    const id = req.params.id;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `UPDATE SOLDESK.TODOS
       SET IS_DONE = 1
       WHERE ID = :id`,
      { id },
      { autoCommit: true }
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).send("DB error");

  } finally {

    if (connection) {
      await connection.close();
    }

  }

});


// Todo 삭제
app.delete("/todos/:id", async (req, res) => {

  let connection;

  try {

    const id = req.params.id;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `DELETE FROM SOLDESK.TODOS
       WHERE ID = :id`,
      { id },
      { autoCommit: true }
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).send("DB error");

  } finally {

    if (connection) {
      await connection.close();
    }

  }

});









app.get("/todos", async (req, res) => {

  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

  const result = await connection.execute(
  `SELECT ID, CONTENT, IS_DONE FROM SOLDESK.TODOS ORDER BY ID DESC`
);

    res.json(result.rows.map(r => ({
      id: r[0],
      content: r[1],
      done: r[2]
    })));

  } catch (err) {

    console.error(err);
    res.status(500).send("DB error");

  } finally {

    if (connection) {
      await connection.close();
    }

  }

});



// 감정 저장
app.post("/emotions", async (req, res) => {

  let connection;

  try {

    const { emotion, date } = req.body;

    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO EMOTION_DIARY (ID, EMOTION, DATE_RECORD)
       VALUES (EMOTIONS_SEQ.NEXTVAL, :emotion, TO_DATE(:record_date,'YYYY-MM-DD'))`,
      {
        emotion: emotion,
        record_date: date
      },
      { autoCommit: true }
    );

    res.json({ success: true });

  } catch (err) {

    console.error(err);
    res.status(500).send("DB error");

  } finally {

    if (connection) {
      await connection.close();
    }

  }

});



// 감정 조회
app.get("/emotions", async (req, res) => {

  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT ID, EMOTION, DATE_RECORD
       FROM EMOTION_DIARY
       ORDER BY ID DESC`
    );

    res.json(result.rows.map(r => ({
      id: r[0],
      emotion: r[1],
      date: r[2]
    })));

  } catch (err) {

    console.error(err);
    res.status(500).send("DB error");

  } finally {

    if (connection) {
      await connection.close();
    }

  }

});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});