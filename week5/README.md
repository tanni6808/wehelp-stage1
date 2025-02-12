# WeHelp Week 5

## Task 2

- Create a new database named website.

        CREATE DATABASE website;

  ![task2-01](screenshots/2-01.png)

- Create a new table named member, in the website database.

        USE website;
        CREATE TABLE member (
            id bigint AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            username varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            follower_count int NOT NULL DEFAULT 0,
            time datetime DEFAULT CURRENT_TIMESTAMP(),
            PRIMARY KEY (id)
        );
        ALTER TABLE member
        MODIFY time datetime NOT NULL;

  ![task2-02](screenshots/2-02.png)

## Task 3

- INSERT a new row to the member table where name, username and password must
  be set to test. INSERT additional 4 rows with arbitrary data.

        INSERT INTO member (name, username, password)
        VALUE ('test', 'test', 'test');

        INSERT INTO member (name, username, password, follower_count)
        VALUES
        ('Kinako', 'sk0410', '6666', 375),
        ('Mei', 'ym1029', '7777', 500),
        ('Shiki', 'ws0617', '8888', 430),
        ('Natsumi', 'on0807', '9999', 723);

  ![task3-01](screenshots/3-01.png)

- SELECT all rows from the member table.

        SELECT \* FROM member;

  ![task3-02](screenshots/3-02.png)

- SELECT all rows from the member table, in descending order of time.

        SELECT \* FROM member
        ORDER BY time DESC;

  ![task3-03](screenshots/3-03.png)

- SELECT total 3 rows, second to fourth, from the member table, in descending order
  of time.

        SELECT * FROM member
        ORDER BY time DESC
        LIMIT 3 OFFSET 1;

  ![task3-04](screenshots/3-04.png)

- SELECT rows where username equals to test.

        SELECT * FROM member
        WHERE username = 'test';

  ![task3-05](screenshots/3-05.png)

- SELECT rows where name includes the es keyword.

        SELECT * FROM member
        WHERE name LIKE '%es%';

  ![task3-06](screenshots/3-06.png)

- SELECT rows where both username and password equal to test.

        SELECT * FROM member
        WHERE username = 'test' AND password = 'test';

  ![task3-07](screenshots/3-07.png)

- UPDATE data in name column to test2 where username equals to test.

        UPDATE member
        SET name = 'test2'
        WHERE username = 'test';

  ![task3-08](screenshots/3-08.png)

## Task4

- SELECT how many rows from the member table.

        SELECT COUNT(\*)
        FROM member;

  ![task4-01](screenshots/4-01.png)

- SELECT the sum of follower_count of all the rows from the member table.

        SELECT SUM(follower_count)
        FROM member;

  ![task4-02](screenshots/4-02.png)

- SELECT the average of follower_count of all the rows from the member table.

        SELECT AVG(follower_count)
        FROM member;

  ![task4-03](screenshots/4-03.png)

- SELECT the average of follower_count of the first 2 rows, in descending order of
  follower_count, from the member table.

        SELECT AVG(follower_count)
        FROM (SELECT follower_count
        FROM member
        ORDER BY follower_count DESC
        LIMIT 2) AS F;

  ![task4-04](screenshots/4-04.png)

## Task5

- Create a new table named message, in the website database.

        CREATE TABLE message (
            id bigint AUTO_INCREMENT,
            member_id bigint NOT NULL,
            content varchar(255) NOT NULL,
            like_count int NOT NULL DEFAULT 0,
            time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
            PRIMARY KEY (id),
            FOREIGN KEY (member_id) REFERENCES member(id)
        );

  ![task5-01](screenshots/5-01.png)

- SELECT all messages, including sender names.

        SELECT message.\*, member.name
        FROM message
        LEFT JOIN member ON message.member_id = member.id;

  ![task5-02](screenshots/5-02.png)

- SELECT all messages, including sender names, where sender username equals to
  test.

        SELECT message.\*, member.name
        FROM message
        LEFT JOIN member ON message.member_id = member.id
        WHERE member.username = 'test';

  ![task5-03](screenshots/5-03.png)

- Use SELECT, SQL Aggregation Functions with JOIN statement, get the average like
  count of messages where sender username equals to test.

        SELECT AVG(like_count)
        FROM (SELECT message.\*, member.username
        FROM message
        LEFT JOIN member ON message.member_id = member.id) AS M
        WHERE username = 'test';

  ![task5-04](screenshots/5-04.png)

- Use SELECT, SQL Aggregation Functions with JOIN statement, get the average like
  count of messages GROUP BY sender username.

        SELECT username, AVG(like_count)
        FROM (SELECT message.\*, member.username
        FROM message
        LEFT JOIN member ON message.member_id = member.id) AS M
        GROUP BY username;

  ![task5-05](screenshots/5-05.png)
