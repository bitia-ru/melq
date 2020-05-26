json.merge!(
    id: image.id,
    original_filename: image.filename.to_s,
    url: polymorphic_url(image, only_path: true),
)
