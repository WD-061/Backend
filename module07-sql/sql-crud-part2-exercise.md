```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    cover TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE
);
```

### Queries for posts table

#### READ – Get all posts

```sql
SELECT * FROM posts;
```

#### CREATE – Create a new post, return the new post

```sql
INSERT INTO posts (author, title, content, cover)
VALUES (1, 'Sample Title', 'This is a sample content for the post.', 'sample_cover.jpg')
RETURNING *;
```

#### READ – Get a single post, along with information about the author

```sql
SELECT posts.*, users.name AS author_name, users.email AS author_email
FROM posts
JOIN users ON posts.author = users.id
WHERE posts.id = 1;
```

#### UPDATE – Update a single post, return the updated post

```sql
UPDATE posts
SET title = 'Updated Title', content = 'Updated content', cover = 'updated_cover.jpg'
WHERE id = 1
RETURNING *;
```

#### DELETE – Delete a single post

```sql
DELETE FROM posts
WHERE id = 1
```

### Queries for users table

#### READ – Get all information about a user (except their password), along with all of the information about all of their posts

```sql
SELECT users.id, users.name, users.email, posts.*
FROM users
LEFT JOIN posts ON users.id = posts.author
WHERE users.id = 1;

```
