json.merge! post.attributes

json.tags do
  json.array!(post.tags, partial: 'api/v1/tags/tag', as: 'tag')
end

json.images do
  json.array!(post.images, partial: 'api/v1/posts/image', as: 'image')
end

json.card do
  json.partial! partial: 'api/v1/post_cards/post_card', locals: { post_card: post.card }
end
