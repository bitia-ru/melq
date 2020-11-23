json.merge! setting.attributes

if setting.avatar.attached?
  json.avatar(
    id: setting.avatar.id,
    url: polymorphic_url(
      setting.avatar.variant(
        resize: '87x87^',
        gravity: 'center',
        extent: '87x87'
      ),
      only_path: true
    ),
    original_filename: setting.avatar.filename.to_s
  )
else
  json.merge!(avatar: nil)
end
