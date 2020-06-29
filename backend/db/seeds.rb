User.create!(
  email: 'root@email.ru',
  password_digest: BCrypt::Password.create('123456')
)

Setting.create!(
  nickname: 'Nickname',
  about: 'About',
  in_development: true,
  access_key: '123456',
  copyright_year: '2020',
  about_blog_slug: 'about-blog-slug',
  privacy_policy_slug: 'privacy-policy-slug'
)

Post.create!(
  slug: 'about-blog-slug',
  title: 'About blog',
  content: 'About blog'
)

Post.create!(
  slug: 'privacy-policy-slug',
  title: 'Privacy policy',
  content: 'Privacy policy'
)
