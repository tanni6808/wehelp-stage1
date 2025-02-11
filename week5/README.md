# WeHelp Week 5

## Task 2

    CREATE DATABASE website;

![task2-01](screenshots/2-01.png)

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

![task2-02](screenshots/2-02.png)

## Task 3

    INSERT INTO member (name, username, password)
    VALUE ('test', 'test', 'test');

    INSERT INTO member (name, username, password, follower_count)
    VALUES
    ('Kinako', 'sk0410', '6666', 375),
    ('Mei', 'ym1029', '7777', 500),
    ('Shiki', 'ws0617', '8888', 430),
    ('Natsumi', 'on0807', '9999', 723);

![task3-01](screenshots/3-01.png)

    SELECT * FROM member;

![task3-02](screenshots/3-02.png)

    SELECT * FROM member
    ORDER BY time DESC;

![task3-03](screenshots/3-03.png)

    SELECT * FROM member
    ORDER BY time DESC
    LIMIT 3 OFFSET 1;

![task3-04](screenshots/3-04.png)

    SELECT * FROM member
    WHERE username = 'test';

![task3-05](screenshots/3-05.png)

    SELECT * FROM member
    WHERE name LIKE '%es%';

![task3-06](screenshots/3-06.png)

    SELECT * FROM member
    WHERE username = 'test' AND password = 'test';

![task3-07](screenshots/3-07.png)

    UPDATE member
    SET name = 'test2'
    WHERE username = 'test';

![task3-08](screenshots/3-08.png)
