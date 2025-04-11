1. List the titles of all content released in 2008

```sql
SELECT title
FROM netflix_shows
WHERE release_year = 2008;
```

2. List the titles of all content with a release year on or after 2018, in alphabetical order.

```sql
SELECT title
FROM netflix_shows
WHERE release_year >= 2018
ORDER BY title ASC;
```

3. Determine the number of movies with a maturity rating of PG-13.

```sql
SELECT COUNT(*)
FROM netflix_shows
WHERE type = 'Movie' AND rating = 'PG-13';
```

4. List the maturity ratings, and determine the number of content with each rating.

```sql
SELECT rating, COUNT(*) AS content_count
FROM netflix_shows
GROUP BY rating;
```

5. List the titles and release years of all Barbie movies, in chronological order.

```sql
SELECT title, release_year
FROM netflix_shows
WHERE title LIKE 'Barbie%'
AND type = 'Movie'
ORDER BY release_year ASC;
```

6. List the names of all people who starred in a movie in which Kevin Bacon also starred

```sql
SELECT cast_members
FROM netflix_shows
WHERE type = 'Movie'
  AND cast_members LIKE '%Kevin Bacon%'
  AND cast_members != 'Kevin Bacon';
```

7. List the title, release year, rating and description of TV shows

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'TV Show'
  AND (
    cast_members LIKE '%Matt LeBlanc%'
    OR cast_members LIKE '%Gerard Butler%'
    OR cast_members LIKE '%Benedict Cumberbatch%'
  );
```

8. List the title, release year, rating and description of Movies

```sql
SELECT title, release_year, rating, description
FROM netflix_shows
WHERE type = 'Movie'
  AND (
    cast_members LIKE '%Robert Pattinson%'
    OR director LIKE '%Quentin Tarantino%'
  );
```

8. List the types, and determine the average release year of each type

```sql
SELECT type, ROUND(AVG(release_year)) AS average_release_year
FROM netflix_shows
GROUP BY type;
```
