INSERT INTO Genres(Name, Description) VALUES('Action', 'Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work.');
INSERT INTO Genres(Name, Description) VALUES('Comedy', 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.');
INSERT INTO Genres(Name, Description) VALUES('Thriller', 'Thrillers tend to be action-packed, page-turners with moments full of tension, anxiety, and fear.');
INSERT INTO Genres(Name, Description) VALUES('Horror', 'Seek to elicit responses of fear, terror, disgust, shock, suspense, and, of course, horror from their viewers.');

INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Christopher Nolan', 'Christopher Nolan is a visionary director celebrated for his mind-bending, visually stunning films.', '1970-07-30', NULL);
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Jonathan Demme', 'Jonathan Demme was a versatile director best known for being emotionally charged and politically relevant.', '1944-02-22', '2017-04-26');
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Bong Joon Ho', 'Bong Joon Ho is a South Korean auteur renowned for his socially conscious and genre-defying works.', '1969-09-14', NULL);
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Martin Scorsese', 'Martin Scorsese is an iconic American filmmaker known for his gritty, character-driven narratives and masterful storytelling.', '1942-11-17', NULL);
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Peter Weir', 'Peter Weir, an Australian director, is celebrated for his thought-provoking and visually compelling films.', '1944-08-21', NULL);
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Stanley Kubrick', 'Stanley Kubrick was a legendary filmmaker known for his uncompromising vision and cinematic innovation.', '1928-06-26', '1999-03-07');
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('William Friedkin', 'William Friedkin is an influential director who has left an indelible mark on the crime and horror genres in cinema.', '1935-08-29', '2023-08-07');
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Ridley Scott', 'Ridley Scott, a British director, is famous for his visually stunning and epic films.', '1937-11-30', NULL);

INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 1, 1, 'darkknight.png', True);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', 1, 1, 'inception.png', True);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Silence of the Lambs', 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.', 3, 2, 'silence_of_the_lambs.png', True);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('Parasite', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 3, 3, 'parasite.png', False);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Departed', 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.', 3, 4, 'thedeparted.png', False);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Wolf of Wall Street', 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.', 2, 4, 'wolfwallstreet.png', False);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Truman Show', 'An insurance salesman discovers his whole life is actually a reality TV show.', 2, 5, 'trumanshow.png', False);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Shining', 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.', 4, 6, 'theshining.png', True);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('The Exorcist', 'When a young girl is possessed by a mysterious entity, her mother seeks the help of two Catholic priests to save her life.', 4, 7, 'exorcist.png', True);
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageUrl, Featured) VALUES('Alien', 'The crew of a commercial spacecraft encounters a deadly lifeform after investigating an unknown transmission.', 4, 8, 'alien.png', False);

INSERT INTO Users(Username, Password, Email, Birth_date) VALUES('dsmith', 'PW123', 'dsmith@gmail.com', '1994-01-01');
INSERT INTO Users(Username, Password, Email, Birth_date) VALUES('bjohnson', 'PW456', 'bjohnson@gmail.com', '1982-03-05');
INSERT INTO Users(Username, Password, Email, Birth_date) VALUES('ejones', 'PW789', 'ejones@gmail.com', '1976-08-14');

INSERT INTO User_Movies(UserID, MovieID) VALUES(1, 3);
INSERT INTO User_Movies(UserID, MovieID) VALUES(2, 5);
INSERT INTO User_Movies(UserID, MovieID) VALUES(3, 9);