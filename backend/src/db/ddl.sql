create table cartoons
(
    id          varchar(50) not null
        constraint cartoons_pk
            primary key,
    name        varchar(50) not null,
    age         varchar(20),
    gender      varchar(20),
    description varchar     not null,
    color       varchar(9)  not null,
    show        varchar(50) not null,
    slug        varchar(50) not null,
    hearts      integer     not null,
    stars       integer     not null,
    video       varchar(20) not null
);
create unique index cartoons_name_uindex
    on cartoons (name desc);


create table users
(
    id            varchar(50) not null
        constraint users_pk
            primary key,
    username      varchar(50) not null,
    password_hash varchar     not null
);
create index users_username_index
    on users (username desc);

create sequence comment_id START 16;
create table comments
(
    id         integer default nextval('comment_id'::regclass) not null
        constraint comments_pk
            primary key,
    user_id    varchar(50)                                            not null
        constraint comments_users_id_fk
            references users,
    content    varchar                                                not null,
    post_date  timestamp                                              not null,
    cartoon_id varchar(50)                                            not null
        constraint comments_cartoons_id_fk
            references cartoons
);
create index comments_date_index
    on comments (post_date);


INSERT INTO public.users (id, username, password_hash) VALUES ('1', 'bonky', '$2y$10$0odEynNxGxhQO3poqkVTqO5MRaB6Viha/JYDJRISO393dfd9pZDA.');

INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('9NR0UwzU49GjePct3PnI', 'Danny Phantom', '14', 'Male', '<b>Danny Phantom</b> is a 14-year-old boy who gains ghost powers after an accident in his parents'' ghost-hunting laboratory. He uses his powers to fight against ghosts and other supernatural threats while trying to keep his ghost identity a secret from his friends and family.', '#52525233', 'Danny Phantom', 'danny-phantom', 1079, 213, '2djx83-4XNQ');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('KrTxoA6DzRwwDFRNy1lj', 'Wile E. Coyote', null, 'Male', 'Wile E. Coyote is a cartoon character known for his elaborate and often comically disastrous attempts to catch his arch-nemesis, the Road Runner. Despite his superior intellect and seemingly endless supply of Acme products, he always ends up foiled by the Road Runner''s speed and ingenuity. His schemes are often highly creative and involve complex Rube Goldberg machines or other contraptions, but they almost always end in disaster. Despite this, Wile E. Coyote is persistent in his pursuit of the Road Runner and never gives up hope of one day catching him.', '#BEBEBE33', 'Looney Tunes', 'wile-e-coyote', 3600, 1102, 'xqHk8cH2dnk');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('N5bc7ALVQ3ZCTTxdM66g', 'Jake Long', '13', 'Male', '<b>Jake Long</b> is a teenager who can transform into a dragon and must balance his life as a student with his duties as a dragon protector of the magical creatures of New York City''s underground world. He also has to deal with the challenges of being a half-dragon, half-human hybrid.', '#c72e2e33', 'American Dragon: Jake Long', 'jake-long', 204, 62, '8o3JrdPMNdQ');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('T7h6977i4TxqTIkZTvT7', 'Johnny Bravo', null, 'Male', '<b>Johnny Bravo</b> is a muscular, narcissistic man who tries to attract women with his looks and personality, but often fails due to his stupidity and self-centeredness. He lives with his mother and has a best friend named Carl.', '#2e70c733', 'Johnny Bravo', 'johnny-bravo', 100356, 10384, '_46a4va40Ns');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('xnNVlyKcwtVS7FmoUxzc', 'Inspector Gadget', null, 'Male', '<b>Inspector Gadget</b> is a cyborg police inspector who uses his high-tech gadgets to fight against crime, along with his niece Penny and their dog Brain. Despite his bumbling nature, he always manages to save the day with the help of his gadgets.', '#FFD70033', 'Inspector Gadget', 'inspector-gadget', 8391, 313, 'rZBhkwRF1FI');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('1LFpU0kREPWM5xWDOKCM', 'Edalyn Clawthorne', 'Mid-to-late 40s', 'Female', '<b>Edalyn "Eda" Clawthorne</b> <i>(also known as "The Owl Lady")</i> is one of the two deuteragonists (alongside <i>King</i>) of the Disney Channel animated series, <b><i>The Owl House</i></b>. She is a powerful rebellious witch, who Luz befriends and takes her on as her apprentice.', '#35373b33', 'The Owl House', 'edalyn-clawthorne', 2560, 561, 'UdkgyduXX18');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('49Mq5zz9w0rwXKG8WHRy', 'Tulip Olsen', '13', 'Female', '<b>Tulip Olsen</b> is the main protagonist of <b>Infinity Train</b> <i>(Book One)</i>. She is 12 years old in the series'' pilot, and in the series she is 13 years old. Tulip is a former passenger on the Infinity Train, searching for a way home with One-One and Atticus, until the Season One finale episode "The Engine," where she returns back home after bidding her friends farewell.', '#43FF0015', 'Infinity Train', 'tulip', 444, 98, 'bbybI-eBid4');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('M2FmqDxaPwF5R5xix6sz', 'Jenny Wakeman', '16', 'Female', '<b>Jennifer "Jenny" Wakeman</b> <i>(designation: Robotic Global Response Unit XJ-9)</i> is the protagonist of <b>My Life as a Teenage Robot</b>. She is a state-of-the-art robotic protector of Earth, armed with advanced weaponry and devices at her disposal, but wishes to live the life of a normal teenager. Throughout the series, she tries to balance her life with duties of a crime-fighter while attending high school and proceeding with teenage endeavors.', '#00FFD50D', 'My Life As A Teenage Robot', 'jenny', 11406, 5611, '49WPb5XYvac');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('NFeJfzbyJ7Op2QK7GYc5', 'Maggie Pesky', null, 'Female', '<b>Maggie Pesky</b> is a fly who dreams of making a difference in the world and becoming a rock star. She has to deal with the typical teenage problems of fitting in and standing out, while navigating her way through school and the world of show business.', '#cf17e333', 'The Buzz on Maggie', 'maggie-pesky', 87, 20, 'u-vekbesgr4');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('jTM4OU8ODUQxeMWqtlQz', 'Raven', null, 'Female', '<b>Raven</b> is a half-demon, half-human hybrid who is the quiet and mysterious member of the Teen Titans. She has the power to sense emotions, levitate objects, and create portals, but must constantly struggle with her inner demons and the influence of her demonic father.', '#8B008B33', 'Teen Titans', 'raven', 4700, 875, 'sseXDqBAsGY');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('klGOVFfWiGJlo6inDv8F', 'Cloudy Jay', '22', 'Female', '<b>Cloudy Jay</b> <i>(better known as "CJ")</i> is a cloud-humanoid girl who is <i>Mordecai''s</i> ex-girlfriend, later current friend and supporter character in <b>Regular Show</b>. She hangs out with Mordecai for a little bit after they met on Couple Corral. She is also good at video games. She returns in "New Year''s Kiss" where she and Mordecai unknowingly kiss each other at a masquerade ball.  She is voiced by Linda Cardellini who also played Velma Dinkley from Scooby-Doo live-action movies and voiced Wendy Corduroy from Gravity Falls.', '#FFB37F13', 'Regular Show', 'cloudy-j', 3421, 1800, 'J_hFNXBblGU');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('vUKLnthGVTfUF8whVBYC', 'Kim Possible', '16', 'Female', '<b>Kim Possible</b> is a high school student and a freelance hero who saves the world with the help of her best friend Ron Stoppable and his pet naked mole-rat Rufus. She also has to deal with typical teenage problems like school, relationships, and rivalries.', '#c78a2e33', 'Kim Possible', 'kim-possible', 13910, 3144, '5Y-X1Uz4NgU');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('r6VzM5dDuHvRtFA1Kwa2', 'Millie & Moxxie', 'Both ~27', 'Male, Female', '<b>Mildred "Millie" Knolastname</b> is an assassin at <i>I.M.P</i>, <b>Moxxie''s</b> wife and one of the main protagonists of Helluva Boss. She is a short Imp with a long devilish tail, and a very lively and cheerful individual. <br> <b>Moxxie Knolastname</b> is an assassin and the weapons expert of <i>I.M.P</i>, <b>Millie''s</b> husband and one of the main protagonists of Helluva Boss.  He is the brains of the group and tends to be the most rational, but is also often treated as the butt of the joke.', '#FF171713', 'Helluva Boss', 'millie-moxxie', 603434, 90982, 'zTdxzC8QggQ');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('eFoe7SV5pUIiFSZf2wWf', 'The Pink Panther', null, null, 'The Pink Panther is a smooth and suave cartoon character known for his distinctive walk and smooth talking voice. He often finds himself in absurd situations, and his cool demeanor helps him to navigate them with style and grace. He is known for his love of music, often seen playing a trumpet or other instrument. Originally created as a character in the opening credits of the 1963 film <b>The Pink Panther</b>, he proved so popular that he went on to star in his own animated series.', '#FFC0CB33', 'The Pink Panther Show', 'the-pink-panther', 503955, 33331, 'RmqQrqLhO4I');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('CLKHTgETKUEzgt08UGlI', 'Bonkers', null, 'Male', '<b>Bonkers D. Bobcat</b> is the protagonist of Disney''s 1993-95 animated television series <b><i>"Bonkers"</i></b>. Originally featured on <b>Raw Toonage</b>, he is a former star for cartoon shorts at Wackytoon Studios, an overly energetic and hyperactive, out-of-work, Toon Bobcat who works in the Toon Division of the Hollywood P.D.', '#FF5E0013', 'Bonkers', 'bonkers', 1004, 364, 'eCEpYPPt9ek');
INSERT INTO public.cartoons (id, name, age, gender, description, color, show, slug, hearts, stars, video) VALUES ('XteagWS28Ep0WX5UObyT', 'Yakko, Wakko and Dot', '14, 11, 9', 'Male, Male, Female', '<b>Yakko, Wakko, and Dot</b>, the <i>"Warner Brothers (and the Warner Sister)"</i>, are the main characters of <b>Animaniacs</b>, voiced by Rob Paulsen, Jess Harnell, and Tress MacNeille. Yakko (the oldest child) is a wise-cracking smart-aleck and usually acts as the leader of the trio; Wakko (the middle child) has a Liverpool accent, a huge appetite and a gag bag filled with tricks, and Dot (the youngest child) is cute, sassy and witty.', '#FF000015', 'Animaniacs', 'yakko-wakko-dot', 1000550, 60003, 'Hps_NyqEyKk');

INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (1, '1', 'why does my comment have to be that long tho?', '2023-04-06 00:00:00.000000', 'NFeJfzbyJ7Op2QK7GYc5');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (2, '1', 'LOVE EDAAAA!!!', '2023-03-28 00:00:00.000000', '1LFpU0kREPWM5xWDOKCM');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (3, '1', 'HEY TI MAMI BUKUR!', '2023-03-28 00:00:00.000000', 'T7h6977i4TxqTIkZTvT7');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (4, '1', 'if u dont write 🪄good stuff🪄 bout dis witch ima personally kill u', '2023-03-19 00:00:00.000000', '1LFpU0kREPWM5xWDOKCM');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (5, '1', 'ggdgsdhshshshsh', '2023-05-19 00:00:00.000000', 'M2FmqDxaPwF5R5xix6sz');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (6, '1', 'testfsfsgsgs', '2023-04-18 00:00:00.000000', 'T7h6977i4TxqTIkZTvT7');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (7, '1', 'my fav >:)', '2023-03-20 00:00:00.000000', '9NR0UwzU49GjePct3PnI');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (8, '1', 'i think i have seen that name before *thinking emoji*', '2023-03-20 00:00:00.000000', 'CLKHTgETKUEzgt08UGlI');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (9, '1', 'I love this cartoon!', '2023-03-28 00:00:00.000000', '9NR0UwzU49GjePct3PnI');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (10, '1', 'oh look it''s bonkers 👀', '2023-03-20 00:00:00.000000', 'CLKHTgETKUEzgt08UGlI');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (11, '1', 'love these two so much!!', '2023-03-19 00:00:00.000000', 'r6VzM5dDuHvRtFA1Kwa2');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (12, '1', 'I LOVE EDAAAAAAAAAAAA', '2023-03-19 00:00:00.000000', '1LFpU0kREPWM5xWDOKCM');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (13, '1', 'what does the fox say', '2023-04-02 00:00:00.000000', 'CLKHTgETKUEzgt08UGlI');
INSERT INTO public.comments (id, user_id, content, post_date, cartoon_id) VALUES (15, '1', 'gggggggggggggggggggggggg', '2023-05-21 10:09:47.931000', 'CLKHTgETKUEzgt08UGlI');
