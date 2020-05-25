json.merge! user.attributes

if user.avatar.attached?
  json.avatar(
    url: polymorphic_path(
      user.avatar.variant(
        resize: '150x150^',
        gravity: 'center',
        extent: '150x150'
      ),
      only_path: false
    ),
    original_filename: user.avatar.filename.to_s
  )
else
  json.merge!(avatar: nil)
end
