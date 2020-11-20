json.merge! post_card.attributes

if post_card.main_tag.present?
  json.main_tag do
    json.partial! partial: 'api/v1/tags/tag', locals: { tag: post_card.main_tag }
  end
end

if post_card.image.attached?
  json.image(
    id: post_card.image.id,
    url: polymorphic_url(
      post_card.image.variant(
        resize: '342^x203',
        gravity: 'center',
        extent: '342x203'
      ),
      only_path: true
    ),
    original_filename: post_card.image.filename.to_s
  )
else
  json.merge!(image: nil)
end
