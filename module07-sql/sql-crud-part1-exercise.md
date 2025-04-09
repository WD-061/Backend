```sql
-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Insert at least 10 users
INSERT INTO users (name, email, password) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'password123'),
('Bob Smith', 'bob.smith@example.com', 'securepass456'),
('Charlie Brown', 'charlie.brown@example.com', 'mypassword789'),
('Diana Prince', 'diana.prince@example.com', 'wonderwoman123'),
('Ethan Hunt', 'ethan.hunt@example.com', 'missionpass456'),
('Fiona Gallagher', 'fiona.gallagher@example.com', 'shameless789'),
('George Martin', 'george.martin@example.com', 'winteriscoming123'),
('Hannah Baker', 'hannah.baker@example.com', '13reasonswhy456'),
('Ian Malcolm', 'ian.malcolm@example.com', 'jurassic789'),
('Jane Doe', 'jane.doe@example.com', 'janepass123');
```
