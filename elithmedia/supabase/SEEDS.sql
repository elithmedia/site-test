insert into admins (email) values ('contact@elithmedia.com')
on conflict (email) do nothing;

insert into clients (name, avatar_url, instagram_url, tiktok_url, slug) values
('Client Alpha', '/placeholder-avatar.jpg', 'https://instagram.com/clientalpha', 'https://tiktok.com/@clientalpha', 'client-alpha'),
('Client Beta', '/placeholder-avatar.jpg', null, 'https://tiktok.com/@clientbeta', 'client-beta'),
('Client Gamma', '/placeholder-avatar.jpg', 'https://instagram.com/clientgamma', null, 'client-gamma')
on conflict do nothing;

insert into projects (client_id, title, description, tags)
select id, 'Campanie lansare', 'Reels + Ads', array['reels','ads'] from clients where slug='client-alpha';
insert into projects (client_id, title, description, tags)
select id, 'UGC si TikTok', 'Creator collab', array['ugc','tiktok'] from clients where slug='client-beta';
insert into projects (client_id, title, description, tags)
select id, 'Shorts + Search', 'YouTube & Google', array['shorts','google'] from clients where slug='client-gamma';
