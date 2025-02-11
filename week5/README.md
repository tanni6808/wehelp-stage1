# WeHelp Week 5

## Task 2

    CREATE DATABASE website;

![task2-01](screenshots/2-01.png)

    CREATE TABLE member (
        id bigint AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        follwer_count int NOT NULL DEFAULT 0,
        time datetime DEFAULT CURRENT_TIMESTAMP(),
        PRIMARY KEY (id)
    );

![task2-02](screenshots/2-02.png)

## Task 3
