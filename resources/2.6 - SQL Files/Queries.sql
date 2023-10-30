SELECT Name
	FROM Genres
	WHERE Name = 'Action';
	
SELECT * FROM Movies
	WHERE GenreID = 1;

UPDATE Users
	SET email='bjohnson@gmail.com'
	WHERE username = 'bjohnson';

DELETE FROM Movies
	WHERE MovieID = 4;